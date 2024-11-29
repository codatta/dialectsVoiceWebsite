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
