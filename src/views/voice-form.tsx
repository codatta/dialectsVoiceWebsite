import { Mic, Play, RefreshCcw } from 'lucide-react'

interface VoiceFormProps {
  title: string
}

export default function VoiceForm({ title }: VoiceFormProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* 顶部栏 */}
      <div className="flex items-center justify-between bg-white px-4 py-3">
        <span className="text-gray-600">太棒了！</span>
        <div className="flex items-center space-x-2">
          <button className="p-2">
            <Mic className="text-red-500" />
          </button>
          <span className="text-gray-500">来录制下一个片段</span>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="mb-8 text-center text-lg">{title}</div>

        {/* 语音波形动画区域 */}
        <div className="flex h-32 w-full items-center justify-center">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Mic className="text-red-500" />
            </div>
            <div className="absolute inset-0 animate-pulse rounded-full bg-red-50" />
          </div>
        </div>
      </div>

      {/* 右侧控制栏 */}
      <div className="fixed right-4 top-1/2 flex -translate-y-1/2 flex-col space-y-4">
        <button className="rounded-full bg-white p-2 shadow">
          <Play />
        </button>
        <button className="rounded-full bg-white p-2 shadow">
          <RefreshCcw />
        </button>
        <div className="text-center">1</div>
        <div className="text-center">2</div>
        <div className="text-center">3</div>
        <div className="text-center">4</div>
        <div className="text-center">5</div>
      </div>

      {/* 右下角按钮 */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button className="rounded-full bg-white px-4 py-2 shadow">跳过</button>
        <button className="rounded-full bg-gray-100 px-4 py-2">提交</button>
      </div>
    </div>
  )
}
