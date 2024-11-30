import { useEffect, useMemo, useState } from 'react'
import { Swiper } from 'react-vant'

import Record from '@/components/record'
import RecordTip from '@/components/record-tip'

import { useUserStore } from '@/stores/user-store'
import { READ } from '@/config/read-config'

export default function Page() {
  const { user } = useUserStore()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const texts = useMemo(() => READ[user?.areaCode?.[0] ?? ''] || [], [user])

  useEffect(() => {
    console.log('texts', texts, user?.areaCode)
  }, [texts, user])

  const onRecordingChange = (isRecording: boolean) => {
    setIsRecording(isRecording)
  }

  const onPlayNext = () => {
    console.log('onPlay next')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 px-4 py-6">
      <Sections texts={texts} />
      <div className="w-full">
        <RecordTip type={isRecording ? 'recording' : 'start'} />
        <Record onRecordingChange={onRecordingChange} onNext={onPlayNext} />
      </div>
    </div>
  )
}

function Sections({ texts }: { texts: string[] }) {
  return (
    <Swiper
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
