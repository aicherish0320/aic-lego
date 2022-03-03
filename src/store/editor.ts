import { Module } from 'vuex'
import { GlobalDataProps } from '.'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps } from '@/defaultProps'

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
  // 当前编辑的是哪个元素，uuid
  currentElement: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      color: '#000000',
      text: 'hello1',
      fontSize: '40px',
      lineHeight: '1',
      textAlign: 'center',
      fontFamily: '"SimHei","STHeiti"'
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'right',
      fontFamily: '"KaiTi","STKaiti"'
    }
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '40px'
    }
  }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  mutations: {
    // addComponent(state, props: Partial<TextComponentProps>) {
    //   const newComponent: ComponentData = {
    //     id: uuidv4(),
    //     name: 'l-text',
    //     props
    //   }
    //   state.components.push(newComponent)
    // },
    addComponent(state, component: ComponentData) {
      state.components.push(component)
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updateComponent(state, { key, value }) {
      const updatedComponent = state.components.find(
        (component) => component.id === state.currentElement
      )
      if (updatedComponent) {
        updatedComponent.props[key as keyof TextComponentProps] = value
      }
    }
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      )
    }
  }
}

export default editor
