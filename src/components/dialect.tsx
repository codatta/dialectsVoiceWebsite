import { AREA_LIST } from '@/config/area-config'
import { DIALECT_MAP, getDialectByKey, TDIALECT } from '@/config/dialect-config'
import { TUser, userActions, useUserStore } from '@/stores/user-store'
import { useEffect, useState } from 'react'
import { Area, Button, Field, Form, Popup, Selector, Toast } from 'react-vant'

export default function Dialect() {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const { user } = useUserStore()
  const [dialectList, setDialectList] = useState<TDIALECT[]>([])
  const [dialects, setDialects] = useState<string[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      if (user.areaCode?.[0]) {
        setDialectList(DIALECT_MAP[user.areaCode?.[0]] || [])
      }
      form.setFieldsValue({
        areaCode: user.areaCode,
        dialects: user.dialects
      })
    }
  }, [user, form])

  useEffect(() => {
    setDialects([])
  }, [visible])

  const onAreaChange = (areaCode: [string, string, string]) => {
    setDialectList(DIALECT_MAP[areaCode[0]] || [])
    setDialects([])
  }
  const onDialectChange = (dialect: string[]) => {
    setDialects(dialect)
  }

  const onCancel = () => {
    setVisible(false)
  }
  const onFinish = async (values: TUser) => {
    const [provinceCode, cityCode, countyCode] = values.areaCode || []
    const areaName: [string, string, string] = [
      AREA_LIST.province_list[provinceCode],
      AREA_LIST.city_list[cityCode],
      AREA_LIST.county_list[countyCode]
    ]

    const userInfo = {
      areaCode: values.areaCode,
      areaName: areaName,
      dialects: values.dialects
    }
    console.log('onFinish', userInfo)

    try {
      setLoading(true)
      await userActions.saveUser(userInfo)

      Toast.success('保存成功')
      setVisible(false)
    } catch (e) {
      console.error('用户资料保存失败', e)
      Toast.fail('保存失败')
    }

    setLoading(false)
  }

  return (
    <>
      <Field
        isLink
        readOnly
        value={getDialectByKey(user?.dialects[0] || '')}
        label="方言"
        onClick={() => setVisible(true)}
      />
      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        className="w-full bg-transparent"
        position="bottom"
      >
        <div className="mx-auto w-full rounded-t-3xl bg-white px-3 py-6">
          <h1 className="mb-8 px-4 text-center text-lg text-gray-800">
            请选择方言
          </h1>

          <Form
            form={form}
            className="rounded-lg bg-white"
            onFinish={onFinish}
            footer={
              <div className="flex gap-4">
                <Button
                  className="mt-4"
                  round
                  type="primary"
                  block
                  onClick={onCancel}
                >
                  取消
                </Button>
                <Button
                  className="mt-4"
                  disabled={!dialects.length || isLoading}
                  round
                  nativeType="submit"
                  type="primary"
                  block
                  loading={isLoading}
                  loadingText="保存中..."
                >
                  保存
                </Button>
              </div>
            }
          >
            <Form.Item
              name="areaCode"
              label="方言地区"
              rules={[
                {
                  required: true,
                  type: 'array',
                  len: 3,
                  message: '请完整选择省市区'
                }
              ]}
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
                      value={selectRows
                        .map((row) => row?.text)
                        .filter((val) => !!val)
                        .join(',')}
                      onClick={() => actions.open()}
                    />
                  )
                }}
              </Area>
            </Form.Item>

            <Form.Item
              name="dialects"
              label={dialectList?.length && '选择方言'}
              className={`flex items-center justify-center ${!dialectList?.length && 'hidden'}`}
              rules={[{ required: true, message: '请选择方言' }]}
            >
              <Selector
                options={dialectList}
                onChange={onDialectChange}
                style={{
                  '--rv-selector-margin':
                    'var(--rv-padding-xs) var(--rv-padding-xs)'
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Popup>
    </>
  )
}
