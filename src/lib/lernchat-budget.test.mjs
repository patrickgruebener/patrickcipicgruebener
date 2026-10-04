import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { reserveChatBudget, settleChatBudget } from './lernchat-budget.ts'
import { getSessionSignature, hasChatSession, isValidAccessKey } from './lernchat-security.ts'

async function withTemporaryBudget(run) {
  const directory = await mkdtemp(path.join(tmpdir(), 'lernchat-budget-'))
  const originalPath = process.env.LEARNING_CHAT_BUDGET_FILE
  const originalRate = process.env.LEARNING_CHAT_USD_TO_EUR_RATE
  process.env.LEARNING_CHAT_BUDGET_FILE = path.join(directory, 'budget.json')
  process.env.LEARNING_CHAT_USD_TO_EUR_RATE = '1'
  try {
    await run()
  } finally {
    if (originalPath === undefined) delete process.env.LEARNING_CHAT_BUDGET_FILE
    else process.env.LEARNING_CHAT_BUDGET_FILE = originalPath
    if (originalRate === undefined) delete process.env.LEARNING_CHAT_USD_TO_EUR_RATE
    else process.env.LEARNING_CHAT_USD_TO_EUR_RATE = originalRate
    await rm(directory, { recursive: true, force: true })
  }
}

test('monthly budget refuses reservations above five euros', async () => {
  await withTemporaryBudget(async () => {
    const results = await Promise.all(Array.from({ length: 105 }, () => reserveChatBudget()))
    assert.equal(results.filter(Boolean).length, 100)
    assert.equal(results.filter((result) => result === null).length, 5)
  })
})

test('settlement replaces the conservative reservation with measured token cost', async () => {
  await withTemporaryBudget(async () => {
    const reservations = await Promise.all(Array.from({ length: 100 }, () => reserveChatBudget()))
    const first = reservations.find(Boolean)
    assert.ok(first)
    await settleChatBudget(first, 0, 0)
    assert.ok(await reserveChatBudget())
  })
})

test('missing persistent budget config fails closed', async () => {
  const originalPath = process.env.LEARNING_CHAT_BUDGET_FILE
  delete process.env.LEARNING_CHAT_BUDGET_FILE
  try {
    await assert.rejects(() => reserveChatBudget(), /Budgetpfad fehlt/)
  } finally {
    if (originalPath !== undefined) process.env.LEARNING_CHAT_BUDGET_FILE = originalPath
  }
})

test('access requires the configured secret and a matching session signature', () => {
  const originalKey = process.env.LEARNING_CHAT_ACCESS_KEY
  process.env.LEARNING_CHAT_ACCESS_KEY = 'a'.repeat(64)
  try {
    assert.equal(isValidAccessKey('a'.repeat(64)), true)
    assert.equal(isValidAccessKey('b'.repeat(64)), false)
    const signature = getSessionSignature()
    assert.ok(signature)
    assert.equal(hasChatSession({ cookies: { get: () => ({ value: signature }) } }), true)
    assert.equal(hasChatSession({ cookies: { get: () => ({ value: 'wrong' }) } }), false)
  } finally {
    if (originalKey === undefined) delete process.env.LEARNING_CHAT_ACCESS_KEY
    else process.env.LEARNING_CHAT_ACCESS_KEY = originalKey
  }
})
