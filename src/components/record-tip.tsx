import { cn } from '@/lib/utils'
import { MicIcon, Square } from 'lucide-react'

export default function Tip({
  type = '',
  className
}: {
  type: 'start' | 'middle' | 'end' | 'recording' | ''
  className?: string
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
    <p
      className={cn(
        'flex w-full items-center justify-center text-center text-[#575757]',
        className
      )}
    >
      {Msg}
    </p>
  )
}
