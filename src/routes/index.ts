import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// import Editor from '@/views/Editor.vue'
import Index from '@/views/Index.vue'
import Works from '@/views/Works.vue'
import TemplateDetail from '@/views/TemplateDetail.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/',
    //   component: Home
    // },
    // {
    //   path: '/editor',
    //   name: 'editor',
    //   component: Editor
    // },
    // {
    //   path: '/template/:id',
    //   name: 'template',
    //   component: TemplateDetail
    // },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: { title: '欢迎来到慕课乐高' }
        },
        {
          path: 'template/:id',
          name: 'template',
          component: TemplateDetail,
          meta: { title: '模版详情' }
        },
        {
          path: 'works',
          name: 'works',
          component: Works,
          meta: { title: '我的作品', requiredLogin: true }
        }
      ]
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: () =>
        import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
      meta: { requiredLogin: true, title: '编辑我的设计' }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        redirectAlreadyLogin: true,
        title: '登录到慕课乐高',
        disableLoading: true
      }
    }
  ]
})

export default router
