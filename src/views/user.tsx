import {
  Form,
  Button,
  Radio,
  Input,
  Area,
  Field,
  Selector,
  Toast
} from 'react-vant'
import { useState, useEffect } from 'react'

import { useUserStore, saveUser, type TUser } from '@/stores/user-store'
import { DIALECT_MAP, type TDIALECT } from '@/config/dialect-config'
import { AREA_LIST } from '@/config/area-config'
import api from '@/apis/frontiter.api'

export default function UserFormPage() {
  const [form] = Form.useForm()
  const [dialectList, setDialectList] = useState<TDIALECT[]>([])
  const { user } = useUserStore()

  useEffect(() => {
    if (user) {
      // 初始化方言列表

      if (user.areaCode?.[0]) {
        setDialectList(DIALECT_MAP[user.areaCode?.[0]] || [])
      }

      // 设置表单初始值
      form.setFieldsValue(user)
    }
  }, [user, form])

  const onAreaChange = (areaCode: [string, string, string]) => {
    console.log('onAreaChange', areaCode)
    setDialectList(DIALECT_MAP[areaCode[0]] || [])
  }

  const onFinish = async (values: TUser) => {
    const [provinceCode, cityCode, countyCode] = values.areaCode || []
    const areaName: [string, string, string] = [
      AREA_LIST.province_list[provinceCode],
      AREA_LIST.city_list[cityCode],
      AREA_LIST.county_list[countyCode]
    ]

    const userInfo = {
      tel: values.tel,
      username: values.username,
      age: Number(values.age),
      gender: values.gender,
      areaCode: values.areaCode,
      areaName: areaName,
      dialect: values.dialect
    }
    saveUser(userInfo)

    try {
      await api.saveUserInfo(userInfo)
      Toast.success('保存成功')
    } catch (e) {
      console.error('Unknown error occurred', e)
      Toast.fail('保存失败')
    }
  }

  return (
    <div className="bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
          用户资料
          <div className="mt-2 text-sm font-normal text-gray-600">
            我们收集这些信息是为了提高语音识别引擎的准确性，帮助我们更好地服务不同地区、不同年龄段的用户
          </div>
        </h1>

        <Form
          form={form}
          className="rounded-lg bg-white p-6 shadow"
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                保存
              </Button>
            </div>
          }
        >
          <Form.Item
            name="tel"
            label="手机号"
            rules={[
              { required: true, message: '请填写手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]}
          >
            <Input placeholder="请输入您的手机号" type="tel" prefix="" />
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请填写用户名' }]}
          >
            <Input placeholder="请输入您的用户名" maxLength={10} />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[
              { required: true, message: '请填写年龄' },
              {
                validator: (_, value) => {
                  const age = Number(value)
                  if (
                    isNaN(age) ||
                    !Number.isInteger(age) ||
                    age < 6 ||
                    age > 100
                  ) {
                    return Promise.reject('年龄必须是6-100岁之间的整数')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input type="number" placeholder="请输入您的年龄" maxLength={2} />
          </Form.Item>

          <Form.Item
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Radio.Group direction="horizontal" defaultValue="">
              <Radio name="male">男</Radio>
              <Radio name="female">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="areaCode"
            label="地区"
            rules={[{ required: true, message: '请选择地区' }]}
            className="flex items-center justify-center"
          >
            <Area
              popup={{
                round: true
              }}
              title="选择地区"
              areaList={AREA_LIST}
              onConfirm={(area) => onAreaChange([area[0], area[1], area[2]])}
            >
              {(_, selectRows, actions) => {
                return (
                  <Field
                    label=""
                    value={selectRows.map((row) => row?.text).join(',')}
                    onClick={() => actions.open()}
                  />
                )
              }}
            </Area>
          </Form.Item>
          <Form.Item name="dialect" label="选择方言">
            <Selector
              options={dialectList}
              className=""
              style={{
                '--rv-selector-margin':
                  'var(--rv-padding-xs) var(--rv-padding-xs)'
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
