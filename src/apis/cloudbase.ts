import cloudbase from '@cloudbase/js-sdk'
import { CLOUDBASE_ID } from '@/config'

const app = cloudbase.init({
  env: CLOUDBASE_ID
})

export async function callMyFunction(functionName: string, params: object) {
  try {
    const res = await app.callFunction({
      name: functionName,
      data: params
    })
    console.log('Function call result:', res)
    return res.result
  } catch (error) {
    console.error('Error calling function:', error)
    throw error
  }
}

export const db = app.database()
