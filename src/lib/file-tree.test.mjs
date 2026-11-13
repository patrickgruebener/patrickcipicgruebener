import assert from 'node:assert/strict'
import test from 'node:test'
import { flattenFileTree } from './file-tree.ts'

test('root row has no prefix and is a folder', () => {
  const rows = flattenFileTree({ name: 'ki-system/' })
  assert.deepEqual(rows, [{ prefix: '', name: 'ki-system/', isDir: true, note: undefined }])
})

test('draws branches, pipes and last branches like the moodboard tree', () => {
  const rows = flattenFileTree({
    name: 'ki-system/',
    children: [
      { name: 'CLAUDE.md', note: 'Regeln' },
      { name: 'memory/', children: [{ name: 'kunden/' }, { name: 'wissen/' }] },
      { name: 'sessions/' },
    ],
  })
  assert.deepEqual(
    rows.map((row) => row.prefix + row.name),
    [
      'ki-system/',
      '├── CLAUDE.md',
      '├── memory/',
      '│   ├── kunden/',
      '│   └── wissen/',
      '└── sessions/',
    ],
  )
  assert.equal(rows[1].isDir, false)
  assert.equal(rows[1].note, 'Regeln')
})

test('children of a last folder are indented with spaces', () => {
  const rows = flattenFileTree({
    name: 'root/',
    children: [{ name: 'skills/', children: [{ name: 'angebot/' }] }],
  })
  assert.equal(rows[2].prefix, '    └── ')
})
