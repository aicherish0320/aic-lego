import { h, VNode } from 'vue'
import { TextComponentProps } from './defaultProps'

export interface PropToForm {
  component: string
  subComponent?: string
  extraProps?: { [key: string]: any }
  text?: string
  options?: { text: string | VNode; value: any }[]
  initialTransform?: (v: any) => any
  afterTransform?: (v: any) => any
  valueProp?: string
  eventName?: string
}

export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropToForm
}

const fontFamilyArr = [
  {
    text: '宋体',
    value: '"SimSun","STSong"'
  },
  {
    text: '黑体',
    value: '"SimHei","STHeiti"'
  },
  {
    text: '楷体',
    value: '"KaiTi","STKaiti"'
  },
  {
    value: '"FangSong","STFangsong"',
    text: '放松'
  }
]

const fontFamilyOptions = fontFamilyArr.map((font) => {
  return {
    value: font.value,
    // text: h('span', { style: { fontFamily: font.value } }, font.text)
    text: <span style={{ fontFamily: font.value }}>{font.text}</span>
  }
})

export const mapPropsToForms: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: {
      rows: 3
    }
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initialTransform: (v: string) => parseInt(v)
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1
    },
    initialTransform: (v: string) => parseFloat(v)
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      {
        value: 'left',
        text: '左'
      },
      {
        value: 'center',
        text: '中'
      },
      {
        value: 'right',
        text: '右'
      }
    ]
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      {
        value: '',
        text: '无'
      },
      ...fontFamilyOptions
    ]
  }
}
