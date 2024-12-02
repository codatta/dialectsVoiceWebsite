export type TDIALECT = {
  value: string
  label: string
}

export const DIALECT_MAP: Record<string, TDIALECT[]> = {
  hebei: [
    { value: 'jizhongguanhua', label: '冀中官话' },
    { value: 'jidongguanhua', label: '冀东官话' },
    { value: 'jinanguanhua', label: '冀南官话' }
  ],
  chongqing: [
    { value: 'chongqinghua', label: '重庆话' },
    { value: 'sichuanhua', label: '四川话' }
  ],
  guizhou: [
    { value: 'guizhouhua', label: '贵州话' },
    { value: 'qiandonghua', label: '黔东话' },
    { value: 'qiannanhua', label: '黔南话' }
  ],
  tianjin: [
    { value: 'tianjinhua', label: '天津话' },
    { value: 'beifangguanhua', label: '北方官话' }
  ],
  liaoning: [
    { value: 'dongbeiguanhua', label: '东北官话' },
    { value: 'liaoninghua', label: '辽宁话' }
  ],
  jilin: [
    { value: 'dongbeiguanhua', label: '东北官话' },
    { value: 'jilinhua', label: '吉林话' }
  ],
  heilongjiang: [
    { value: 'dongbeiguanhua', label: '东北官话' },
    { value: 'heilongjianghua', label: '黑龙江话' }
  ]
} as const

export type ProvinceKey = keyof typeof DIALECT_MAP
export type DialectType = (typeof DIALECT_MAP)[ProvinceKey][number]
