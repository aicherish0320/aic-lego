import { Module } from 'vuex'
import { GlobalDataProps } from '.'
import { v4 as uuidv4 } from 'uuid'
import { TextComponentProps } from '@/defaultProps'
import { AllComponentProps, textDefaultProps } from 'aic-lego-component'
import { message } from 'ant-design-vue'
import { cloneDeep, sample } from 'lodash-es'
import store from './index'
export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right'

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

export interface PageProps {
  backgroundColor: string
  backgroundImage: string
  backgroundRepeat: string
  backgroundSize: string
  height: string
}

export type AllFormProps = PageProps & AllComponentProps

export interface PageData {
  props: PageProps
  title: string
}

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
  // 当前编辑的是哪个元素，uuid
  currentElement: string
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
  page: PageData
  // 当前被复制的组件
  copiedComponent?: ComponentData
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    layerName: '图层1',
    props: {
      ...textDefaultProps,
      text: 'hello',
      fontSize: '20px',
      color: '#000000',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: '',
      width: '100px',
      height: '100px',
      backgroundColor: '#efefef',
      left: '100px',
      top: '150px'
    }
  }
  // {
  //   id: uuidv4(),
  //   name: 'l-text',
  //   layerName: '图层1',
  //   props: {
  //     ...textDefaultProps,
  //     color: '#000000',
  //     text: 'hello1',
  //     fontSize: '40px',
  //     lineHeight: '1',
  //     textAlign: 'center',
  //     fontFamily: '"SimHei","STHeiti"'
  //   }
  // }
  // {
  //   id: uuidv4(),
  //   name: 'l-text',
  //   layerName: '图层2',
  //   props: {
  //     ...textDefaultProps,
  //     text: 'hello2',
  //     fontSize: '40px',
  //     fontWeight: 'bold',
  //     lineHeight: '2',
  //     textAlign: 'right',
  //     fontFamily: '"KaiTi","STKaiti"'
  //   }
  // },
  // {
  //   id: uuidv4(),
  //   name: 'l-text',
  //   layerName: '图层3',
  //   props: {
  //     ...textDefaultProps,
  //     text: 'hello44',
  //     fontSize: '40px'
  //   }
  // },
  // {
  //   id: uuidv4(),
  //   name: 'l-image',
  //   layerName: '图层4',
  //   props: {
  //     ...textDefaultProps,
  //     src: 'http://aic-lego-test.oss-cn-beijing.aliyuncs.com/upload-files/kj-750681.jpeg',
  //     width: '200px'
  //   }
  // }
]

const pageDefaultProps = {
  backgroundColor: '#ffffff',
  // backgroundImage:
  //   'url("http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg")',
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '560px'
}

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
    page: {
      props: pageDefaultProps,
      title: 'test title'
    }
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
      component.layerName = '图层' + (state.components.length + 1)
      console.log(component)
      state.components.push(component)
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    copyComponent(state, id) {
      const currentComponent = state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
      if (currentComponent) {
        state.copiedComponent = currentComponent
        message.success('已拷贝当前图层', 1)
      }
    },
    deleteComponent(state, id) {
      const currentComponent = state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
      if (currentComponent) {
        state.components = state.components.filter(
          (component) => component.id !== currentComponent.id
        )
        message.success('已删除当前图层', 1)
      }
    },
    moveComponent(
      state,
      data: { direction: MoveDirection; amount: number; id: string }
    ) {
      const currentComponent = state.components.find(
        (component) => component.id === data.id
      )
      if (currentComponent) {
        const oldTop = parseInt(currentComponent.props.top || '0')
        const oldLeft = parseInt(currentComponent.props.left || '0')
        const { direction, amount } = data
        switch (direction) {
          case 'Up': {
            const newValue = oldTop - amount + 'px'
            store.commit('updateComponent', {
              key: 'top',
              value: newValue,
              id: data.id
            })
            break
          }
          case 'Down': {
            const newValue = oldTop + amount + 'px'
            store.commit('updateComponent', {
              key: 'top',
              value: newValue,
              id: data.id
            })
            break
          }
          case 'Left': {
            const newValue = oldLeft - amount + 'px'
            store.commit('updateComponent', {
              key: 'left',
              value: newValue,
              id: data.id
            })
            break
          }
          case 'Right': {
            const newValue = oldLeft + amount + 'px'
            store.commit('updateComponent', {
              key: 'left',
              value: newValue,
              id: data.id
            })
            break
          }

          default:
            break
        }
      }
    },
    pasteCopiedComponent(state) {
      if (state.copiedComponent) {
        const clone = cloneDeep(state.copiedComponent)
        clone.id = uuidv4()
        clone.layerName = clone.layerName + '副本'
        state.components.push(clone)
        message.success('已黏贴当前图层', 1)
      }
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
    },
    updatePage(state, { key, value }) {
      state.page.props[key as keyof PageProps] = value
    }
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      )
    },
    getElement: (state) => (id: string) => {
      return state.components.find(
        (component) => component.id === (id || state.currentElement)
      )
    }
  }
}

export default editor
