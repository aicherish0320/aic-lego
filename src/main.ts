import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import AicLegoComponent from 'aic-lego-component'
import 'aic-lego-component/dist/bundle.css'
import 'cropperjs/dist/cropper.css'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { RespData } from './store/respTypes'

export type ICustomAxiosConfig = AxiosRequestConfig & {
  opName?: string
}

const baseBackEndURL = 'http://182.92.168.192:8081/api'
axios.defaults.baseURL = baseBackEndURL

axios.interceptors.request.use((config) => {
  const newConfig = config as ICustomAxiosConfig
  store.commit('setError', { status: false, message: '' })
  store.commit('startLoading', { opName: newConfig.opName })
  return config
})

axios.interceptors.response.use(
  (resp: AxiosResponse<RespData>) => {
    const { config, data } = resp
    const newConfig = config as ICustomAxiosConfig
    store.commit('finishLoading', { opName: newConfig.opName })
    const { errno, message } = data
    if (errno && errno !== 0) {
      store.commit('setError', { status: true, message })
      return Promise.reject(data)
    }
    return resp
  },
  (e: AxiosError) => {
    const newConfig = e.config as ICustomAxiosConfig
    store.commit('setError', { status: true, message: '服务器错误' })
    store.commit('finishLoading', { opName: newConfig.opName })
    return Promise.reject(e)
  }
)

const app = createApp(App)

app.use(AicLegoComponent).use(Antd).use(router).use(store)
app.mount('#app')
