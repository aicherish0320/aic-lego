import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import AicLegoComponent from 'aic-lego-component'
import 'aic-lego-component/dist/bundle.css'
import 'cropperjs/dist/cropper.css'

import axios from 'axios'

const baseBackEndURL = 'http://182.92.168.192:8081/api'
axios.defaults.baseURL = baseBackEndURL

const app = createApp(App)

app.use(AicLegoComponent).use(Antd).use(router).use(store)
app.mount('#app')
