import { useEffect, useRef, useState } from 'react'
import { Field, Swiper, SwiperInstance, Toast } from 'react-vant'

import Record from '@/components/record'
import RecordTip from '@/components/record-tip'

import { TAudio, useRecordStore, recordActions } from '@/stores/record-store'

export default function Page() {
  const [text, setText] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const {
    chat: { current, list, index: recordIndex }
  } = useRecordStore()

  useEffect(() => {
    recordActions.initRecord('chat', {
      texts: Array(8).fill('')
    })
  }, [])

  useEffect(() => {
    console.log('chat', current)
    setText('')
  }, [recordIndex])

  const onRecordEnd = (audio: TAudio) => {
    setIsRecording(false)
    recordActions.updateRecord('chat', recordIndex, {
      text,
      audio
    })

    console.log('onRecordEnd chat', audio, recordIndex)
  }

  const onRecordNext = () => {
    if (!text.trim()) {
      Toast.fail('请完成对话内容编辑')
      return
    }

    if (recordIndex === list.length - 1) {
      console.log('on end')
    } else {
      console.log('on end')
      recordActions.nextRecord('chat')
    }
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 px-4 py-6">
      <Sections
        texts={list.map((item) => item.text as string)}
        index={recordIndex}
        onChange={(content) => setText(content)}
      />
      <div className="w-full">
        <RecordTip type={isRecording ? 'recording' : 'start'} />
        <Record
          onRecordStart={() => setIsRecording(true)}
          onRecordEnd={onRecordEnd}
          onRecordNext={onRecordNext}
          recordIndex={recordIndex}
        />
      </div>
    </div>
  )
}

function TextArea({
  onChange,
  initialContent = ''
}: {
  onChange: (content: string) => void
  initialContent?: string
}) {
  const [content, setContent] = useState<string>(initialContent)
  const _onContentChange = (content: string) => {
    setContent(content)
    onChange?.(content)
  }

  return (
    <Field
      rows={8}
      value={content}
      maxLength={300}
      onChange={_onContentChange}
      // showWordLimit
      clearable
      placeholder="请编辑对话内容（300字以内）"
      type="textarea"
      autoSize
      className="flex h-[300px] items-center rounded-sm bg-white p-5"
    />
  )
}

function Sections({
  texts,
  index = 0,
  onChange
}: {
  texts: string[]
  index: number
  onChange: (content: string) => void
}) {
  const ref = useRef<SwiperInstance>(null)

  useEffect(() => {
    if (index !== undefined) {
      ref.current?.swipeTo(index)
    }

    console.log('chat sections: ', texts)
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
      {texts.map((text, index) => (
        <Swiper.Item key={text + index}>
          <TextArea onChange={onChange} />
        </Swiper.Item>
      ))}
    </Swiper>
  )
}
