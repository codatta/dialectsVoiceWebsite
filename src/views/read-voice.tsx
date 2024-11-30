import { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperInstance } from 'react-vant'

import Record from '@/components/record'
import RecordTip from '@/components/record-tip'

import { useUserStore } from '@/stores/user-store'
import { TAudio, useRecordStore, recordActions } from '@/stores/record-store'

import { READ } from '@/config/read-config'

export default function Page() {
  const { user } = useUserStore()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const {
    read: { current, list, index: recordIndex }
  } = useRecordStore()

  useEffect(() => {
    recordActions.initRecord('read', {
      texts: READ[user?.areaCode?.[0] ?? ''] || []
    })
  }, [user?.areaCode])

  useEffect(() => {
    console.log('read', current)
  }, [current])

  const onRecordEnd = (audio: TAudio) => {
    setIsRecording(false)
    recordActions.updateRecord('read', recordIndex, {
      audio
    })

    console.log('onRecordEnd', audio, recordIndex)
  }

  const onRecordNext = () => {
    recordActions.nextRecord('read')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 px-4 py-6">
      <Sections
        texts={list.map((item) => item.text as string)}
        index={recordIndex}
      />
      <div className="w-full">
        <RecordTip type={isRecording ? 'recording' : 'start'} />
        <Record
          onRecordStart={() => setIsRecording(true)}
          onRecordEnd={onRecordEnd}
          onRecordNext={onRecordNext}
          recordedUrl={current?.audio?.recordedUrl}
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
          <span className="text-[#629ff4]">{current + 1}</span>/{total}
        </div>
      )}
    >
      {texts.map((text) => (
        <Swiper.Item key={text}>
          <p className="flex h-[300px] items-center rounded-sm bg-white p-5">
            {text}
          </p>
        </Swiper.Item>
      ))}
    </Swiper>
  )
}
