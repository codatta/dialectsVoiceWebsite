import { proxy, useSnapshot } from 'valtio'

export type TRecordType = 'read' | 'monologue' | 'chat'
export type TRecordItem = {
  text: string
  audioUrl: string
}

const recordStore = proxy<{
  read: TRecordItem[]
  monologue: TRecordItem[]
  chat: TRecordItem[]
}>({
  read: [],
  monologue: [],
  chat: []
})

export function useRecordStore() {
  return useSnapshot(recordStore)
}

export function resetRecord(type: TRecordType | 'all') {
  if (type !== 'all') {
    recordStore[type] = []
  }
}

export function modifyRecord(
  type: TRecordType,
  index: number,
  data: TRecordItem
) {
  if (recordStore[type][index]) {
    recordStore[type][index] = { ...recordStore[type][index], ...data }
  }
}

export function addRecord(type: TRecordType, data: TRecordItem) {
  recordStore[type].push(data)
}
