import { useEffect, useRef } from 'react'
import { Swiper, SwiperInstance } from 'react-vant'

import Record from '@/components/record'

import { useUserStore } from '@/stores/user-store'
import { TAudio, useRecordStore, recordActions } from '@/stores/record-store'

import { READ } from '@/config/read-config'
import api from '@/apis/frontiter.api'
import { DIALECT_LABEL_MAP } from '@/config/dialect-config'

export default function Page() {
  const {
    read: { current: currentRecord, list, index: recordIndex }
  } = useRecordStore()
  const { user } = useUserStore()

  useEffect(() => {
    recordActions.initRecord('read', {
      texts: READ[user?.areaCode?.[0] ?? ''] || []
    })
  }, [user?.areaCode])

  useEffect(() => {
    console.log('read', currentRecord)
  }, [currentRecord])

  const onRecordEnd = (audio: TAudio) => {
    recordActions.updateRecord('read', recordIndex, {
      audio
    })

    console.log('onRecordEnd', audio, recordIndex)
  }

  const onRecordNext = (audioBlob: Blob, duration: number) => {
    if (recordIndex === list.length - 1) {
      console.log('on end')
    }

    api.saveRecord({
      tel: user!.tel,
      dialects: [...user!.dialects],
      text: currentRecord.text!,
      audioBlob,
      recordType: 'read',
      duration
    })
    recordActions.nextRecord('read')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 bg-gray-50 px-4 py-6">
      <div className="w-full">
        <h2 className="mb-6 text-center text-lg">
          请用
          <span className="font-semibold text-blue-500">
            {DIALECT_LABEL_MAP[user?.dialects[0] as string] || '方言'}
          </span>
          朗读下文
        </h2>
        <Sections
          texts={list.map((item) => item.text as string)}
          index={recordIndex}
        />
      </div>

      <div className="w-full">
        <Record
          onRecordEnd={onRecordEnd}
          onRecordNext={onRecordNext}
          recordIndex={recordIndex}
        />
      </div>
    </div>
  )
}

function Sections({ texts, index = 0 }: { texts: string[]; index: number }) {
  const ref = useRef<SwiperInstance>(null)

  useEffect(() => {
    if (index !== undefined) {
      ref.current?.swipeTo(index)
    }
  }, [index, texts, ref])

  return (
    <Swiper
      ref={ref}
      touchable={false}
      indicator={(total, current) => (
        <div className="absolute bottom-0 w-full px-2 pb-1 text-right">
          <span className="text-blue-500">{current + 1}</span>/{total}
        </div>
      )}
    >
      {texts.map((text) => (
        <Swiper.Item key={text}>
          <p className="flex min-h-[200px] items-center rounded-sm bg-white p-5 shadow-md">
            {text}
          </p>
        </Swiper.Item>
      ))}
    </Swiper>
  )
}
