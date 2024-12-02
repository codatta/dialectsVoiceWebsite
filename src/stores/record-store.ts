import { proxy, useSnapshot } from 'valtio'
import { type TUser, userActions } from './user-store'

import READ_CORPUS from '@/config/read-config'
import api from '@/apis/record.api'

export type TRecordType = 'read' | 'monologue' | 'chat'
export type TAudio = {
  url: string
  duration: number //seconds
}
export type TRecordItem = {
  text: string
  audio: TAudio | null
}
export type TRecord = {
  recordedList: TRecordItem[]
  recordingItem: TRecordItem | null
  recorded: boolean
}

const initialRecord: TRecord = {
  recordedList: [],
  recordingItem: null,
  recorded: false
}

const recordStore = proxy<{
  read: TRecord
  monologue: TRecord
  chat: TRecord
  user: TUser | null
}>({
  read: {
    ...initialRecord
  },
  monologue: {
    ...initialRecord
  },
  chat: {
    ...initialRecord
  },
  user: null
})

export function useRecordStore() {
  return useSnapshot(recordStore)
}

export function resetRecord(type: TRecordType | 'all') {
  if (type !== 'all') {
    recordStore[type] = {
      ...initialRecord
    }
  } else {
    recordStore['read'] = {
      ...initialRecord
    }
    recordStore['monologue'] = {
      ...initialRecord
    }
    recordStore['chat'] = {
      ...initialRecord
    }
  }
}

export function initRecord(type: TRecordType) {
  recordStore.user = userActions.getUser() as TUser
  nextRecord(type)
}

function nextReadRecord(): boolean {
  // Get user's province code from area code
  const provinceCode = recordStore.user?.areaCode?.[0]
  if (!provinceCode) return false

  // Get corpus texts for this province
  const texts = READ_CORPUS[provinceCode]
  if (!texts?.length) return false

  // Get texts that haven't been recorded yet
  const recordedTexts = recordStore.read.recordedList.map((item) => item.text)
  const availableTexts = texts.filter((text) => !recordedTexts.includes(text))

  // If all texts recorded, return
  if (!availableTexts.length) return false

  // Pick random text from available ones
  const randomIndex = Math.floor(Math.random() * availableTexts.length)
  const nextText = availableTexts[randomIndex]

  if (!nextText) return false
  // Update recording item with new text
  recordStore.read.recordingItem = {
    text: nextText,
    audio: null
  }

  return true
}

export function nextRecord(type: TRecordType) {
  // Only handle read type for now
  if (type === 'read') {
    return nextReadRecord()
  }
}

/**
 * Updates the currently recording item data
 * @param type Recording type (read/monologue/chat)
 * @param data The recording item data to update
 */
export function updateRecordingItem(
  type: TRecordType,
  data: Partial<TRecordItem>
) {
  recordStore[type].recorded = false
  recordStore[type].recordingItem = Object.assign(
    recordStore[type].recordingItem || {},
    data
  ) as TRecordItem
}

export async function submitRecordItem(
  recordType: TRecordType,
  audioBlob: Blob
) {
  if (recordStore[recordType].recorded) return console.warn('Already saved')
  if (!recordStore[recordType].recordingItem)
    return console.warn('No data available to save')

  recordStore[recordType].recordedList.push(
    recordStore[recordType].recordingItem
  )

  const user = userActions.getUser()

  if (!user) return console.warn('User Info not available!')

  console.log('user', user)

  await api.saveRecord({
    invitationCode: user!.invitationCode as string,
    tel: user!.tel as string,
    dialects: user!.dialects as string[],
    text: recordStore[recordType].recordingItem.text,
    audioBlob,
    recordType
  })
}

export const recordActions = {
  initRecord,
  resetRecord,
  nextRecord,
  submitRecordItem,
  updateRecordingItem
}
