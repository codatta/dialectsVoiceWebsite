import { areaList } from '@vant/area-data'
import { pickBy } from 'lodash-es'

const SOME_PROVINCES = [
  '河北省',
  '重庆市',
  '贵州省',
  '天津市',
  '辽宁省',
  '吉林省',
  '黑龙江省'
]
const SOME_CITIES = [
  '石家庄市',
  '重庆市',
  '贵阳市',
  '天津市',
  '沈阳市',
  '长春市',
  '哈尔滨市'
]

export const PROVINCES = pickBy(areaList.province_list, (name) =>
  SOME_PROVINCES.includes(name)
)

export const CITIES = pickBy(areaList.city_list, (name) =>
  SOME_CITIES.includes(name)
)

console.log('areaList', areaList, PROVINCES, CITIES)

export const AREA_LIST = {
  province_list: PROVINCES,
  city_list: CITIES,
  county_list: areaList.county_list
}

export type TDIALECT = {
  value: string
  label: string
}

export const DIALECT_MAP: Record<string, TDIALECT[]> = {
  130000: [
    { value: 'jizhong_guanhua', label: '冀中官话' },
    { value: 'jidong_guanhua', label: '冀东官话' },
    { value: 'jinan_guanhua', label: '冀南官话' }
  ],
  500000: [
    { value: 'chongqing_hua', label: '重庆话' },
    { value: 'sichuan_hua', label: '四川话' }
  ],
  520000: [
    { value: 'guizhou_hua', label: '贵州话' },
    { value: 'qiandong_hua', label: '黔东话' },
    { value: 'qiannan_hua', label: '黔南话' }
  ],
  120000: [
    { value: 'tianjin_hua', label: '天津话' },
    { value: 'beifang_guanhua', label: '北方官话' }
  ],
  210000: [
    { value: 'dongbei_guanhua', label: '东北官话' },
    { value: 'liaoning_hua', label: '辽宁话' }
  ],
  220000: [
    { value: 'dongbei_guanhua', label: '东北官话' },
    { value: 'jilin_hua', label: '吉林话' }
  ],
  230000: [
    { value: 'dongbei_guanhua', label: '东北官话' },
    { value: 'heilongjiang_hua', label: '黑龙江话' }
  ]
} as const
