<template>
  <div class="content-container">
    <a-row :gutter="16">
      <TemplateList :list="testData"></TemplateList>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button type="primary" size="large">加载更多</a-button>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TemplateList from '@/components/TemplateList.vue'
export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  },
  setup() {
    const testData = ref([
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
      }
    ])
    return {
      testData
    }
  }
})
</script>

<style scoped>
.page-title {
  color: #fff;
}
.content-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 85vh;
  max-width: 1200px;
  margin: 50px auto;
  width: 100%;
}
</style>
