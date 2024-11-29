import { useEffect, useMemo, useState } from 'react'
import { Swiper } from 'react-vant'
import { MicIcon, Square } from 'lucide-react'

import { useUserStore } from '@/stores/user-store'
import { READ } from '@/config/read-config'
import { cn } from '@/lib/utils'

export default function Page() {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 px-4 py-6">
      <Sections />
      <Tip type="recording" />
      <div>
        <div className="relative h-[65px] w-[65px]">
          <div
            className={cn(
              'absolute inset-0 -left-[7.5px] -top-[7.5px] h-[80px] w-[80px] rounded-full bg-gradient-to-r from-[#f89096] to-[#b1b4e5] opacity-50 blur-sm transition-all',
              isSpeaking && 'from-[#88d1f1] to-[#b1b5e5]'
            )}
          ></div>
          <button
            className="relative flex h-full w-full items-center justify-center rounded-full bg-white"
            onClick={() => setIsSpeaking((pre) => !pre)}
          >
            {isSpeaking ? (
              <Square color="#FF4F5E" size={24} />
            ) : (
              <MicIcon color="#FF4F5E" size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function Sections() {
  const { user } = useUserStore()
  const texts = useMemo(() => READ[user?.areaCode?.[0] ?? ''] || [], [user])

  useEffect(() => {
    console.log('texts', texts, user?.areaCode)
  }, [texts, user])

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

function Tip({
  type = ''
}: {
  type: 'start' | 'middle' | 'end' | 'recording' | ''
}) {
  let Msg = null
  switch (type) {
    case 'start':
      Msg = (
        <>
          点按
          <MicIcon color="#FF4F5E" size={24} className="mx-3" />
          朗读句子
        </>
      )
      break
    case 'middle':
      Msg = (
        <>
          继续加油，再录一次
          <MicIcon color="#FF4F5E" size={24} className="ml-3" />
        </>
      )
      break
    case 'end':
      Msg = (
        <>
          <MicIcon color="#FF4F5E" size={24} className="mr-3" />
          最后一个！
        </>
      )
      break
    case 'recording':
      Msg = (
        <>
          完成后点按
          <Square className="ml-3" size={24} color="#FF4F5E" />
        </>
      )
      break
  }

  return (
    <p className="flex w-full items-center justify-center text-center text-[#575757]">
      {Msg}
    </p>
  )
}
