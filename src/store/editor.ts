import { Module } from 'vuex'
import { GlobalDataProps } from '.'
import { v4 as uuidv4 } from 'uuid'

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: { [key: string]: any }
  // id，uuid v4 生成
  id: string
  // 业务组件库名称 l-text，l-image 等等
  name: string
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: { text: 'hello', fontSize: '20px' }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: { text: 'hello', fontSize: '30px', color: 'red' }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '50px',
      actionType: 'url',
      url: 'https://www.baidu.com'
    }
  }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents
  }
}

export default editor
