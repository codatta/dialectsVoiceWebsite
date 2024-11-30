import { proxy, useSnapshot } from 'valtio'

export type TRecordType = 'read' | 'monologue' | 'chat'
export type TAudio = {
  recordedUrl?: string
  url?: string
  blob?: Blob
  time?: number
}
export type TRecordItem = {
  text?: string
  audio?: TAudio
}
export type TRecord = {
  list: TRecordItem[]
  index: number
  inited: boolean
  current: TRecordItem
}

const initialRecord = {
  list: [],
  index: 0,
  inited: false
}

const recordStore = proxy<{
  read: TRecord
  monologue: TRecord
  chat: TRecord
}>({
  read: {
    ...initialRecord,
    get current() {
      return this.list[this.index]
    }
  },
  monologue: {
    ...initialRecord,
    get current() {
      return this.list[this.index]
    }
  },
  chat: {
    ...initialRecord,
    get current() {
      return this.list[this.index]
    }
  }
})

export function useRecordStore() {
  return useSnapshot(recordStore)
}

export function resetRecord(type: TRecordType | 'all') {
  if (type !== 'all') {
    recordStore[type] = {
      ...initialRecord,
      get current() {
        return this.list[this.index]
      }
    }
  } else {
    recordStore['read'] = {
      ...initialRecord,
      get current() {
        return this.list[this.index]
      }
    }
    recordStore['monologue'] = {
      ...initialRecord,
      get current() {
        return this.list[this.index]
      }
    }
    recordStore['chat'] = {
      ...initialRecord,
      get current() {
        return this.list[this.index]
      }
    }
  }
}

export function updateRecord(
  type: TRecordType,
  index: number,
  data: TRecordItem
) {
  if (recordStore[type]['list'][index]) {
    recordStore[type]['list'][index] = {
      ...recordStore[type]['list'][index],
      ...data
    }
  }
}

export function nextRecord(type: TRecordType, index?: number) {
  recordStore[type].index = Math.min(
    recordStore[type].list.length - 1,
    index ?? recordStore[type].index + 1
  )
}

export function initRecord(type: TRecordType, { texts }: { texts: string[] }) {
  recordStore[type].list = texts.map((text) => ({
    text,
    audio: {}
  }))
  recordStore[type].index = 0
  recordStore[type].inited = true
}

export const recordActions = {
  resetRecord,
  initRecord,
  updateRecord,
  nextRecord
}
