import { proxy, useSnapshot } from 'valtio'

export type TRecordType = 'read' | 'monologue' | 'chat'
export type TRecordItem = {
  text: string
  audioUrl: string
}
export type TRecord = {
  list: TRecordItem[]
  index: number
  total: number
}

const initialRecord = {
  list: [],
  index: 0,
  total: 0
}

const recordStore = proxy<{
  read: TRecord
  monologue: TRecord
  chat: TRecord
}>({
  read: { ...initialRecord },
  monologue: { ...initialRecord },
  chat: { ...initialRecord }
})

export function useRecordStore() {
  return useSnapshot(recordStore)
}

export function resetRecord(type: TRecordType | 'all') {
  if (type !== 'all') {
    recordStore[type] = { ...initialRecord }
  } else {
    recordStore['read'] = { ...initialRecord }
    recordStore['monologue'] = { ...initialRecord }
    recordStore['chat'] = { ...initialRecord }
  }
}

export function modifyRecord(
  type: TRecordType,
  index: number,
  data: TRecordItem
) {
  if (recordStore[type]['list'][index]) {
    recordStore[type]['list'][index] = {
      ...recordStore[type]['list'][index],
      ...data
    }
    recordStore[type].index = index
  }
}

export function addRecord(type: TRecordType, data: TRecordItem) {
  recordStore[type].list.push(data)
  recordStore[type].index = recordStore[type].list.length - 1
}
