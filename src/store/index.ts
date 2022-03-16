import { ActionContext, createStore } from 'vuex'
import { compile } from 'path-to-regexp'
import user, { UserProps } from './user'
import templates, { TemplatesProps } from './templates'
import editor, { EditorProps } from './editor'
import global, { GlobalStatus } from './global'
import axios, { AxiosRequestConfig } from 'axios'
import { forEach } from 'lodash-es'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
}
// 第二部，确定参数
export function actionWrapper(
  url: string,
  commitName: string,
  config: AxiosRequestConfig = { method: 'get' }
) {
  // 第一步 不管三七二十一，先返回一个函数和原来的函数处理一摸一样
  return async (
    context: ActionContext<any, any>,
    payload: ActionPayload = {}
  ) => {
    //第三部 写内部重复的逻辑
    const { urlParams, data, searchParams } = payload
    const newConfig = { ...config, data, opName: commitName }
    let newURL = url
    if (urlParams) {
      const toPath = compile(url, { encode: encodeURIComponent })
      newURL = toPath(urlParams)
      console.log(newURL)
    }
    if (searchParams) {
      const search = new URLSearchParams()
      forEach(searchParams, (value, key) => {
        search.append(key, value)
      })
      newURL += '?' + search.toString()
      // 另外一种方式
      // newURL += '?' + objToQueryString(searchParams)
    }
    const resp = await axios(newURL, newConfig)
    context.commit(commitName, { payload, ...resp.data })
    return resp.data
  }
}

const store = createStore({
  modules: {
    user,
    templates,
    editor,
    global
  }
})

export interface ActionPayload {
  urlParams?: { [key: string]: any }
  data?: any
  searchParams?: { [key: string]: any }
}

export default store
