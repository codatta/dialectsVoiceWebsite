import { useEffect, useRef, useState } from 'react'
import { MicIcon, Square } from 'lucide-react'

import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.esm.js'

import { TRecordType, recordActions } from '@/stores/record-store'
import RecordTip from './record-tip'
import { cn } from '@/lib/utils'
import { Toast } from 'react-vant'

export default function Record({
  recordType,
  recordedIndex
}: {
  recordType: TRecordType
  recordedIndex: number
}) {
  const wavesurferObject = useRef<WaveSurfer>()
  const recordRef = useRef<RecordPlugin | null>(null)
  const deviceIdRef = useRef<string>('')
  const recordDurationRef = useRef<number>(0)
  const [recordedUrl, setRecordedUrl] = useState<string>('')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false)
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
    if (WaveSurfer) wavesurferObject.current?.playPause()
  }

  const onToggleRecord = async () => {
    console.log('onToggleRecord', recordRef.current)

    if (!recordRef.current) return

    if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
      recordRef.current.stopRecording()
      return
    }

    const deviceId = await getAvailableAudioDevice()
    recordRef.current.startRecording({ deviceId })
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await recordActions.submitRecordItem(recordType, blobRef.current as Blob)
      Toast.success('提交成功').then(() => recordActions.nextRecord(recordType))
    } catch (e) {
      Toast.fail('提交失败')
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (wavesurferObject.current) return

    wavesurferObject.current = WaveSurfer.create({
      container: '#wave-container',
      waveColor: '#f89096',
      progressColor: '#b1b4e5',
      height: 100,
      url: recordedUrl
    })

    wavesurferObject.current.on('play', () => {
      setIsPlaying(true)
    })
    wavesurferObject.current.on('pause', () => {
      setIsPlaying(false)
    })

    wavesurferObject.current.registerPlugin(
      TimelinePlugin.create({
        height: 12,
        timeInterval: 0.1,
        primaryLabelInterval: 1,
        style: {
          fontSize: '10px',
          color: '#6A3274'
        }
      })
    )
    const record = wavesurferObject.current.registerPlugin(
      RecordPlugin.create({
        renderRecordedAudio: true,
        scrollingWaveform: true
      })
    ) as RecordPlugin

    record.on('record-start', () => {
      setIsRecording(true)
      setRecordedUrl('')
    })

    record.on('record-end', (blob) => {
      blobRef.current = blob
      const recordedUrl = URL.createObjectURL(blob)
      setIsRecording(false)

      if (recordDurationRef.current < 1) {
        return Toast.fail('录音时间太短，请重录')
      }

      setRecordedUrl(recordedUrl)
      recordActions.updateRecordingItem(recordType, {
        audio: {
          url: recordedUrl,
          duration: recordDurationRef.current
        }
      })
    })

    record.on('record-progress', (time) => {
      recordDurationRef.current = Math.floor(time / 100) / 10
      console.log('progress', recordDurationRef.current)
    })

    recordRef.current = record
  }, [wavesurferObject])

  useEffect(() => {
    wavesurferObject.current?.empty()
    setRecordedUrl('')
  }, [recordedIndex])

  return (
    <div>
      <div id="wave-container"></div>
      <div className="mb-6 mt-10 flex items-center justify-between gap-6">
        <button
          onClick={onTogglePlay}
          disabled={!recordedUrl}
          className="flex h-10 w-20 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-gray-200 disabled:opacity-50"
        >
          {isPlaying ? '暂停' : '回放'}
        </button>
        <div className="relative h-[65px] w-[65px] select-none">
          <div
            className={cn(
              'absolute inset-0 -left-[7.5px] -top-[7.5px] h-[80px] w-[80px] rounded-full bg-gradient-to-r from-[#f89096] to-[#b1b4e5] opacity-50 blur-sm transition-all',
              isRecording && 'from-[#88d1f1] to-[#b1b5e5]'
            )}
          ></div>
          <button
            className={cn(
              'relative flex h-full w-full items-center justify-center rounded-full bg-white transition-all duration-300',
              isRecording && 'scale-110 animate-pulse'
            )}
            onClick={onToggleRecord}
            onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
            disabled={isSubmiting}
          >
            <div
              className={cn(
                'absolute inset-0 rounded-full',
                isRecording &&
                  'before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-[#FF4F5E]/20'
              )}
            />
            {isRecording ? (
              <Square color="#FF4F5E" size={24} />
            ) : (
              <MicIcon color="#FF4F5E" size={24} />
            )}
          </button>
        </div>
        <button
          onClick={onSubmit}
          disabled={!recordedUrl || isSubmiting}
          className="flex h-10 w-20 items-center justify-center rounded-full bg-[#FF4F5E] text-sm text-white hover:bg-[#ff3545] disabled:opacity-50"
        >
          {isSubmiting ? '提交中...' : '提交'}
        </button>
      </div>
      <RecordTip type={isRecording ? 'recording' : 'start'} className="my-3" />
    </div>
  )
}
