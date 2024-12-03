import { Field, Cell, Button, Dialog, Selector, Toast } from 'react-vant'
import { resetUser, userActions, useUserStore } from '@/stores/user-store'
import { useNavigate } from 'react-router-dom'
import { DIALECT_MAP, getDialectByKey } from '@/config/dialect-config'
import { useEffect, useRef, useState } from 'react'
import api from '@/apis/frontiter.api'

function UserInfoHead() {
  const { user } = useUserStore()
  const [readDuration, setReadDuration] = useState<string>('0.0')
  const [monologueDuration, setMonologueDuration] = useState<string>('0.0')

  async function getTotalRecordTime() {
    if (!user?.tel) return
    const res = await api.getRecordList(user?.tel)

    let totalRead = 0
    let totalMonologue = 0

    res.forEach((item) => {
      if (item.recordType === 'read') {
        totalRead += item.duration || 0
      }
      if (item.recordType === 'monologue') {
        totalMonologue += item.duration || 0
      }
    })

    console.log('totalRead', totalRead)
    console.log('totalMonologue', totalMonologue)
    setReadDuration((totalRead / 60).toFixed(1))
    setMonologueDuration((totalMonologue / 60).toFixed(1))
  }

  useEffect(() => {
    if (!user?.tel) return
    getTotalRecordTime()
  }, [user])

  return (
    <div>
      <div className="bg-[var(--rv-primary-color)] pb-10 pt-6">
        <div className="m-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-white">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512.143332 1023.54743a511.766293 511.766293 0 1 1 511.404237-511.404237 510.227554 510.227554 0 0 1-508.507788 511.404237z m0-800.234488A182.566787 182.566787 0 0 0 330.753227 408.052065v2.172337a185.644264 185.644264 0 0 0 181.028049 186.187348 186.187348 186.187348 0 0 0 0-372.284182z m0 432.74755a434.467316 434.467316 0 0 0-325.850487 144.18884 413.830119 413.830119 0 0 0 581.190549 69.786313 410.571614 410.571614 0 0 0 69.786313-69.786313 434.467316 434.467316 0 0 0-325.850487-144.18884z"
              fill="#eee"
            ></path>
          </svg>
        </div>
        <div className="text-center text-lg text-white">{user?.username}</div>
      </div>
      <div className="relative -top-6 px-4">
        <div className="flex items-center justify-center rounded-2xl bg-white py-5 shadow-lg">
          <div className="w-[50%] border-r border-black border-opacity-5 px-6 text-center">
            <div className="text-xs text-black text-opacity-35">朗读时长</div>
            <div>
              <em className="text-4xl font-bold">{readDuration}</em>
              <span className="text-sm text-black text-opacity-50"> 分钟</span>
            </div>
          </div>
          <div className="w-[50%] px-6 text-center">
            <div className="text-xs text-black text-opacity-35">
              自由录音时长
            </div>
            <div>
              <em className="text-4xl font-bold">{monologueDuration}</em>
              <span className="text-sm text-black text-opacity-50"> 分钟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserFormPage() {
  const selectedDialectsRef = useRef<string[]>([])
  const { user } = useUserStore()
  const navigate = useNavigate()

  function handleLogout() {
    Dialog.confirm({
      title: '确认退出',
      message: '确认要退出登录么？',
      onConfirm: () => {
        resetUser()
        navigate('/account/signup')
      }
    })
  }

  return (
    <div className="w-full">
      <UserInfoHead></UserInfoHead>

      <div className="px-4 py-2 font-bold text-black text-opacity-80">
        个人信息
      </div>
      <Cell.Group>
        <Field readOnly value={user?.invitationCode} label="邀请码" />
        <Field readOnly value={user?.tel} label="手机" />
        <Field readOnly value={user?.username} label="用户名" />
        <Field readOnly value={user?.age.toString()} label="年龄" />
        <Field
          readOnly
          value={user?.gender == 'male' ? '男' : '女'}
          label="性别"
        />
        <Field readOnly value={user?.areaName?.join(',')} label="地区" />
        <Field
          readOnly
          value={getDialectByKey(user?.dialects[0] || '')}
          label="方言"
          rightIcon={
            <Button
              size="small"
              className="mr-2"
              onClick={() => {
                Dialog.confirm({
                  title: '修改方言',
                  message: (
                    <Selector
                      className="dialect-selector"
                      options={DIALECT_MAP[user?.areaCode[0] || '']}
                      defaultValue={[user?.dialects[0] || '']}
                      onChange={(value) => {
                        console.log('setSelectedDialect', value)
                        selectedDialectsRef.current = value
                      }}
                      style={{
                        '--rv-selector-margin':
                          'var(--rv-padding-xs) var(--rv-padding-xs)'
                      }}
                    />
                  ),
                  onConfirm: async () => {
                    if (selectedDialectsRef.current.length) {
                      try {
                        await userActions.saveUser({
                          dialects: selectedDialectsRef.current
                        })
                      } catch (e) {
                        Toast.fail('修改失败')
                      }
                    }
                  }
                })
              }}
            >
              编辑
            </Button>
          }
        />
      </Cell.Group>

      <div className="mt-10 text-center">
        <Button round className="px-10" onClick={handleLogout}>
          退出登录
        </Button>
      </div>
    </div>
  )
}
