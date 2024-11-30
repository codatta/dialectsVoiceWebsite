import { AxiosInstance } from 'axios'

import request from './request'
import { db } from './cloudbase'

// import { type TRecordType } from '@/stores/record-store'
import { type TUser } from '@/stores/user-store'

class frontier {
  constructor(private request: AxiosInstance) {}

  async saveUserInfo(user: TUser) {
    // Check if user with tel exists
    const { total } = await db
      .collection('dialects-label-user')
      .where({ tel: user.tel })
      .count()

    if (total > 0) {
      // Update existing record
      return await db
        .collection('dialects-label-user')
        .where({ tel: user.tel })
        .update(user)
    }
    return await db.collection('dialects-label-user').add(user)
  }

  // async submi(recordType: TRecordType, data: {}) {}
}

export default new frontier(request)
