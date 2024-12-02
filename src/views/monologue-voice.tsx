import { useEffect, useRef, useState } from 'react'
import { Field, Swiper, SwiperInstance, Toast } from 'react-vant'

import Record from '@/components/record'

import { TAudio, useRecordStore, recordActions } from '@/stores/record-store'

import api from '@/apis/frontiter.api'
import { useUserStore } from '@/stores/user-store'
import { DIALECT_LABEL_MAP } from '@/config/dialect-config'

export default function Page() {
  const [text, setText] = useState<string>('')
  const {
    monologue: { list, index: recordIndex }
  } = useRecordStore()
  const { user } = useUserStore()

  useEffect(() => {
    recordActions.initRecord('monologue', {
      texts: Array(10).fill('')
    })
  }, [])

  useEffect(() => {
    setText('')
  }, [recordIndex])

  const onRecordEnd = (audio: TAudio) => {
    recordActions.updateRecord('monologue', recordIndex, {
      text,
      audio
    })

    console.log('onRecordEnd monologue', audio, recordIndex)
  }

  const onRecordNext = (audioBlob: Blob, duration: number) => {
    if (!text.trim()) {
      Toast.fail('请完成对话内容编辑')
      return
    }

    if (recordIndex === list.length - 1) {
      console.log('on end')
    }

    api.saveRecord({
      tel: user!.tel,
      dialects: [...user!.dialects],
      recordType: 'monologue',
      text,
      audioBlob,
      duration
    })

    recordActions.nextRecord('monologue')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-around gap-6 px-4 py-6">
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
        onChange={(content) => setText(content)}
      />
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
      rows={4}
      value={content}
      maxLength={300}
      onChange={_onContentChange}
      clearable
      placeholder="请先编辑或复制粘贴一段朗读文本（300字以内）"
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

    console.log('monologue sections: ', texts)
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
