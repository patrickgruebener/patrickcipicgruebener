import { mkdir, open, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const MONTHLY_BUDGET_EUR_MICROS = 5_000_000
const MAX_REQUEST_RESERVE_EUR_MICROS = 50_000
const LOCK_TIMEOUT_MS = 8_000
const STALE_LOCK_MS = 120_000

type BudgetState = { month: string; spentEurMicros: number }

function monthKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zagreb', year: 'numeric', month: '2-digit',
  }).formatToParts(now)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  if (!year || !month) throw new Error('Monatsbudget kann nicht bestimmt werden.')
  return `${year}-${month}`
}

function requiredBudgetConfig() {
  const filePath = process.env.LEARNING_CHAT_BUDGET_FILE
  const exchangeRate = Number(process.env.LEARNING_CHAT_USD_TO_EUR_RATE)
  if (!filePath || !path.isAbsolute(filePath)) throw new Error('Persistenter Budgetpfad fehlt.')
  if (!Number.isFinite(exchangeRate) || exchangeRate < 0.5 || exchangeRate > 2) {
    throw new Error('Wechselkurs für die Budgetberechnung fehlt oder ist ungültig.')
  }
  return { filePath, exchangeRate }
}

async function withBudgetLock<T>(filePath: string, action: () => Promise<T>): Promise<T> {
  const lockPath = `${filePath}.lock`
  await mkdir(path.dirname(filePath), { recursive: true })
  const deadline = Date.now() + LOCK_TIMEOUT_MS
  let lockHandle
  while (!lockHandle) {
    try {
      lockHandle = await open(lockPath, 'wx', 0o600)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      try {
        const lockInfo = await stat(lockPath)
        if (Date.now() - lockInfo.mtimeMs > STALE_LOCK_MS) {
          await rm(lockPath, { force: true })
          continue
        }
      } catch {
        continue
      }
      if (Date.now() >= deadline) throw new Error('Budgetprüfung ist gerade ausgelastet.')
      await new Promise((resolve) => setTimeout(resolve, 5))
    }
  }
  try {
    return await action()
  } finally {
    await lockHandle.close()
    await rm(lockPath, { force: true })
  }
}

async function readState(filePath: string): Promise<BudgetState> {
  try {
    const parsed = JSON.parse(await readFile(filePath, 'utf8')) as BudgetState
    if (!Number.isSafeInteger(parsed.spentEurMicros) || parsed.spentEurMicros < 0) {
      throw new Error('Budgetdatei ist ungültig.')
    }
    return parsed
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { month: monthKey(), spentEurMicros: 0 }
    }
    throw error
  }
}

async function writeState(filePath: string, state: BudgetState) {
  const temporaryPath = `${filePath}.${process.pid}.${Date.now()}.tmp`
  await writeFile(temporaryPath, JSON.stringify(state), { encoding: 'utf8', mode: 0o600 })
  await rename(temporaryPath, filePath)
}

export async function reserveChatBudget() {
  const { filePath } = requiredBudgetConfig()
  const reservedMonth = monthKey()
  return withBudgetLock(filePath, async () => {
    const currentMonth = monthKey()
    const saved = await readState(filePath)
    const state = saved.month === currentMonth
      ? saved
      : { month: currentMonth, spentEurMicros: 0 }
    if (state.spentEurMicros + MAX_REQUEST_RESERVE_EUR_MICROS > MONTHLY_BUDGET_EUR_MICROS) {
      return null
    }
    state.spentEurMicros += MAX_REQUEST_RESERVE_EUR_MICROS
    await writeState(filePath, state)
    return { filePath, month: reservedMonth, reserveEurMicros: MAX_REQUEST_RESERVE_EUR_MICROS }
  })
}

export async function settleChatBudget(
  reservation: { filePath: string; month: string; reserveEurMicros: number },
  inputTokens: number,
  outputTokens: number,
) {
  const { exchangeRate } = requiredBudgetConfig()
  const actualUsdMicros = inputTokens * 0.75 + outputTokens * 4.5
  const actualEurMicros = Math.ceil(actualUsdMicros * exchangeRate)
  await withBudgetLock(reservation.filePath, async () => {
    const state = await readState(reservation.filePath)
    if (state.month !== reservation.month) return
    state.spentEurMicros = Math.max(
      0,
      state.spentEurMicros - reservation.reserveEurMicros + actualEurMicros,
    )
    await writeState(reservation.filePath, state)
  })
}
