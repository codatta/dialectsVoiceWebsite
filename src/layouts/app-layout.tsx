import { useUserStore } from '@/stores/user-store'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Tabbar, Toast } from 'react-vant'
import { AudioLines, Mic, User } from 'lucide-react'

export default function AppLayout() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const [tabName, setTabName] = useState('setting')
  const loacation = useLocation()

  useEffect(() => {
    if (!user) {
      Toast.info('请录入个人信息')
      navigate('/account/signup')
    }
  }, [])

  function handleTabChange(tabName: string | number) {
    if (typeof tabName === 'number') return
    navigate(tabName)
  }

  useEffect(() => {
    setTabName(loacation.pathname)
  }, [loacation])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex flex-1 justify-center bg-gradient-to-t from-white from-20% to-[#f8f7f5]">
        <Outlet />
      </div>
      <Tabbar className="py-2" value={tabName} onChange={handleTabChange}>
        <Tabbar.Item name="/read" icon={<Mic />}>
          朗读
        </Tabbar.Item>
        <Tabbar.Item name="/monologue" icon={<AudioLines />}>
          自由录音
        </Tabbar.Item>
        <Tabbar.Item name="/user" icon={<User />}>
          我的
        </Tabbar.Item>
      </Tabbar>
    </div>
  )
}
