import { TextComponentProps } from './defaultProps'

export interface PropToForm {
  component: string
  value?: string
  extraProps?: {
    [key: string]: any
  }
  text?: string
}

export type PropsToForms = {
  [p in keyof TextComponentProps]?: PropToForm
}

export const mapPropsToForm: PropsToForms = {
  text: {
    text: '文本',
    component: 'a-texarea',
    extraProps: {
      rows: 3
    }
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number'
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1
    }
  }
}
