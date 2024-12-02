export type TDIALECT = {
  value: string
  label: string
}

/** key值对应的是省份编号 */
export const DIALECT_MAP: Record<string, TDIALECT[]> = {
  120000: [
    { value: 'tianjin_hua', label: '天津话' },
    { value: 'beifang_guanhua', label: '北方官话' }
  ],
  130000: [
    { value: 'jizhong_guanhua', label: '冀中官话' },
    { value: 'jidong_guanhua', label: '冀东官话' },
    { value: 'jinan_guanhua', label: '冀南官话' }
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
  ],
  500000: [
    { value: 'chongqing_hua', label: '重庆话' },
    { value: 'sichuan_hua', label: '四川话' }
  ],
  520000: [
    { value: 'guizhou_hua', label: '贵州话' },
    { value: 'qiandong_hua', label: '黔东话' },
    { value: 'qiannan_hua', label: '黔南话' }
  ]
}

export function getDialectByKey(key: string): string {
  let res = ''
  const dialectList = Object.values(DIALECT_MAP)
  dialectList.forEach((list) => {
    list.forEach((item) => {
      if (item.value === key) {
        res = item.label
      }
    })
  })
  return res
}

export const DIALECT_LABEL_MAP = {
  tianjin_hua: '天津话',
  beifang_guanhua: '北方官话',
  dongbei_guanhua: '东北官话'
}
