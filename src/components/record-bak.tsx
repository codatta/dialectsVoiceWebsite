import { useEffect, useRef, useState } from 'react'
import { MicIcon, Square } from 'lucide-react'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import wavesurfer from 'wavesurfer.js'

import { type TAudio } from '@/stores/record-store'
import { cn } from '@/lib/utils'
import WaveSurfer from 'wavesurfer.js'

export default function Record({
  onRecordStart,
  onRecordEnd,
  onRecordNext,
  recordIndex
}: {
  onRecordStart?: () => void
  onRecordEnd?: (audio: TAudio) => void
  onRecordNext?: () => void
  recordIndex: number
}) {
  const wavesurferObject = useRef<WaveSurfer>()
  const recordRef = useRef<RecordPlugin | null>(null)
  const deviceIdRef = useRef<string>('')
  const [recordedUrl, setRecordedUrl] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const blobRef = useRef<Blob>()

  const getAvailableAudioDevice = async (): Promise<string> => {
    if (deviceIdRef.current) return deviceIdRef.current

    return RecordPlugin.getAvailableAudioDevices().then((devices) => {
      if (devices.length) {
        deviceIdRef.current = devices[0].deviceId
      }
      console.log(
        'getAvailableAudioDevice:',
        devices,
        'default deviceId: ',
        deviceIdRef.current
      )
      return deviceIdRef.current
    })
  }

  const onTogglePlay = () => {
    if (wavesurfer) wavesurferObject.current?.playPause()
  }

  const onToggleRecord = async () => {
    console.log('onToggleRecord', recordRef.current)

    if (!recordRef.current) return

    if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
      recordRef.current.stopRecording()
      return
    }

    const deviceId = await getAvailableAudioDevice()
    recordRef.current.startRecording({ deviceId }).then(() => {
      console.log('recording: ', deviceId)
      //   recordRef.current?.startMic()
    })
  }

  const onNext = () => {
    wavesurferObject.current?.empty()
    onRecordNext?.()
  }

  useEffect(() => {
    wavesurferObject.current = wavesurfer.create({
      container: '#wave-container',
      url: recordedUrl,
      waveColor: 'purple',
      height: 100
    })

    wavesurferObject.current.on('play', () => {
      setIsPlaying(true)
    })
    wavesurferObject.current.on('pause', () => {
      setIsPlaying(false)
    })

    const record = wavesurferObject.current.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: true,
        scrollingWaveform: true
      })
    ) as RecordPlugin

    record.on('record-end', (blob) => {
      blobRef.current = blob
      setIsRecording(false)
      setRecordedUrl(recordedUrl)
      onRecordEnd?.({
        recordedUrl,
        blob
      })
    })

    record.on('record-start', () => {
      setIsRecording(true)
      setRecordedUrl('')
      onRecordStart?.()
    })

    recordRef.current = record
  }, [])

  useEffect(() => {
    setRecordedUrl('')
  }, [recordIndex])

  return (
    <>
      <div id="wave-container"></div>
      <div className="flex items-center justify-center gap-6">
        <div className="relative my-6 h-[65px] w-[65px]">
          <div
            className={cn(
              'absolute inset-0 -left-[7.5px] -top-[7.5px] h-[80px] w-[80px] rounded-full bg-gradient-to-r from-[#f89096] to-[#b1b4e5] opacity-50 blur-sm transition-all',
              isRecording && 'from-[#88d1f1] to-[#b1b5e5]'
            )}
          ></div>
          <button
            className="relative flex h-full w-full items-center justify-center rounded-full bg-white"
            onClick={onToggleRecord}
          >
            {isRecording ? (
              <Square color="#FF4F5E" size={24} />
            ) : (
              <MicIcon color="#FF4F5E" size={24} />
            )}
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={onTogglePlay}
          disabled={!recordedUrl}
          className="flex h-10 w-20 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        >
          {isPlaying ? '暂停' : '试听'}
        </button>
        <button
          onClick={onNext}
          disabled={!recordedUrl}
          className="flex h-10 w-20 items-center justify-center rounded-full bg-[#FF4F5E] text-sm text-white hover:bg-[#ff3545] disabled:opacity-50"
        >
          下一个
        </button>
      </div>
    </>
  )
}
