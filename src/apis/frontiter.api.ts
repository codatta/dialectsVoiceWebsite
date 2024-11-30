import { AxiosInstance } from 'axios'

import request from './request'
import { db } from './cloudbase'
import commonApi from './common.api'

import { type TRecordType } from '@/stores/record-store'
import { type TUser } from '@/stores/user-store'

const USER_COLLECTION = 'dialects-label-user'
const DIALECTS_COLLECTION = 'dialects-label'

class frontier {
  constructor(private request: AxiosInstance) {}

  async saveUserInfo(user: TUser) {
    // Check if user with tel exists
    const { total } = await db
      .collection(USER_COLLECTION)
      .where({ tel: user.tel })
      .count()

    if (total > 0) {
      // Update existing record
      return await db
        .collection(USER_COLLECTION)
        .where({ tel: user.tel })
        .update(user)
    }
    return await db.collection(USER_COLLECTION).add(user)
  }

  async saveRecord({
    recordType,
    audioBlob,
    text,
    tel,
    dialects
  }: {
    recordType: TRecordType
    audioBlob: Blob
    text: string
    tel: string
    dialects: string[]
  }) {
    console.log('saveRecord', recordType, audioBlob, text)
    const file = new File([audioBlob], `${recordType}-${Date.now()}.webm`, {
      type: audioBlob.type
    })

    const { file_path } = await commonApi.uploadFile(file)

    return await db.collection(DIALECTS_COLLECTION).add({
      tel,
      dialects,
      recordType,
      text,
      audioUrl: file_path
    })
  }
}

export default new frontier(request)
