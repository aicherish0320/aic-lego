import { Module } from 'vuex'
import { GlobalDataProps } from '.'

export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
  _id?: string
  desc?: string
  isHot?: boolean
  createdAt?: string
  user: any
}

const testData: TemplateProps[] = [
  {
    _id: '61a739f38d5263ce811e7064',
    id: 18,
    title: '前端架构师直播海报',
    desc: '未命名作品',
    author: '136****5632',
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    copiedCount: 1183,
    isHot: true,
    createdAt: '2020-11-18T05:47:04.000Z',
    user: {
      _id: '617d33bed38dbc5025755a8b',
      username: '13611915632',
      nickName: '乐高5632'
    }
  },
  {
    _id: '61a739f38d5263ce811e7065',
    id: 19,
    title: '1024 程序员日',
    desc: '1024 程序员日',
    author: '185****2625',
    coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
    copiedCount: 866,
    isHot: true,
    createdAt: '2020-11-26T09:27:19.000Z',
    user: {
      _id: '617d33bed38dbc5025755a8b',
      username: '13611915632',
      nickName: '乐高5632'
    }
  },
  {
    _id: '61a739f48d5263ce811e7068',
    id: 22,
    title: '慕课 Live Java 入门编程课',
    desc: '慕课 Live 只需3天 每天1.5 小时 0 基础新人 Java 入门编程课',
    author: '136****5632',
    coverImg:
      'https://static.imooc-lego.com/upload-files/screenshot-133701.png',
    copiedCount: 120,
    isHot: false,
    createdAt: '2020-11-21T09:28:24.000Z',
    user: {
      _id: '617d33bed38dbc5025755a8b',
      username: '13611915632',
      nickName: '乐高5632'
    }
  }
]

export interface TemplatesProps {
  data: TemplateProps[]
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData
  },
  getters: {
    getTemplateById: (state, getters, rootState) => (id: number) => {
      return state.data.find((t) => t.id === id)
    }
  }
}

export default templates
