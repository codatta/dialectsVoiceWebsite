import Record from '@/components/record'

import { useUserStore } from '@/stores/user-store'
import { useRecordStore, recordActions } from '@/stores/record-store'

import { DIALECT_LABEL_MAP } from '@/config/dialect-config'
import { useEffect, useMemo } from 'react'

export default function Page() {
  const { user } = useUserStore()
  const {
    read: { recordedList, recordingItem }
  } = useRecordStore()
  const minites = useMemo(() => {
    const totalDuration = recordedList.reduce((acc, item) => {
      return acc + (item.audio?.duration || 0)
    }, 0)
    return (totalDuration / 60).toFixed(1)
  }, [recordedList])

  useEffect(() => {
    if (user) {
      recordActions.initRecord('read')
    }
  }, [user])

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 bg-gray-50 px-4 py-6">
      <div className="flex w-full flex-col items-center">
        <h2 className="mb-2 text-center text-base">
          请用
          <span className="font-semibold text-blue-500">
            {DIALECT_LABEL_MAP[user?.dialects[0] as string]}
          </span>
          朗读下文
        </h2>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>已完成: {recordedList.length}段</span>
          <span>总时长: {minites}分钟</span>
        </div>
      </div>

      <p className="flex min-h-[200px] w-full items-center rounded-sm bg-white p-5 shadow-md">
        {recordingItem?.text}
      </p>

      <div className="w-full">
        <Record recordType="read" recordedIndex={recordedList.length} />
      </div>
    </div>
  )
}
