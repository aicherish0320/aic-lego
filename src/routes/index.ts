import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Editor from '@/views/Editor.vue'
import TemplateDetail from '@/views/TemplateDetail.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/template/:id',
      name: 'template',
      component: TemplateDetail
    }
  ]
})

export default router
