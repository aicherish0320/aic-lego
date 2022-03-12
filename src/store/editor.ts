import { Module } from 'vuex'
import { GlobalDataProps } from '.'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps } from '@/defaultProps'
import { textDefaultProps } from 'aic-lego-component'

export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: { [key: string]: any }
  // id，uuid v4 生成
  id: string
  // 业务组件库名称 l-text，l-image 等等
  name: string
  // 图层是否隐藏
  isHidden?: boolean
  // 图层是否锁定
  isLocked?: boolean
  // 图层名称
  layerName?: string
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
    layerName: '图层1',
    props: {
      ...textDefaultProps,
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
    layerName: '图层2',
    props: {
      ...textDefaultProps,
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
    layerName: '图层3',
    props: {
      ...textDefaultProps,
      text: 'hello44',
      fontSize: '40px'
    }
  },
  {
    id: uuidv4(),
    name: 'l-image',
    layerName: '图层4',
    props: {
      ...textDefaultProps,
      src: 'http://aic-lego-test.oss-cn-beijing.aliyuncs.com/upload-files/kj-750681.jpeg',
      width: '200px'
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
    updateComponent(state, { key, value, id, isRoot }) {
      const updatedComponent = state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
      if (updatedComponent) {
        if (isRoot) {
          // eslint-disable-next-line no-extra-semi
          ;(updatedComponent as any)[key] = value
        } else {
          updatedComponent.props[key as keyof TextComponentProps] = value
        }
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
