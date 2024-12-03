import { proxy, useSnapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import api from '@/apis/frontiter.api'

export interface TUser {
  tel: string // 作为唯一id
  username: string
  gender: 'male' | 'female'
  age: number
  areaCode: [string, string, string] // [省、市、区]
  areaName?: [string, string, string]
  dialects: string[] // 方言
  invitationCode: string
}

const STORAGE_KEY = 'xny_user_store'

function loadFromStorage(): TUser | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

const userStore = proxy<{
  user: TUser | null
  isLoggedIn: boolean
}>({
  user: loadFromStorage(),
  get isLoggedIn() {
    return !!this.user?.tel
  }
})

console.log(userStore.user?.dialects)

// Subscribe to user changes and save to localStorage
subscribeKey(userStore, 'user', (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
})

export function useUserStore() {
  return useSnapshot(userStore)
}

export function resetUser() {
  userStore.user = null
}

export async function saveUser(user: Partial<TUser>) {
  const newUserInfo = { ...(userStore.user || {}), ...user } as TUser

  await api.saveUserInfo(newUserInfo)
  userStore.user = newUserInfo
}

export const userActions = {
  saveUser,
  resetUser
}
