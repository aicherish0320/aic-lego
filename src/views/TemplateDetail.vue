<template>
  <div class="work-detail-container">
    <a-row type="flex" justify="center" v-if="template">
      <a-col :span="8" class="cover-img">
        <a :href="template.coverImg"
          ><img :src="template.coverImg" alt="" id="cover-img"
        /></a>
      </a-col>
      <a-col :span="8">
        <h2>{{ template.title }}</h2>
        <p>{{ template.desc }}</p>
        <div class="author">
          <a-avatar>V</a-avatar>
          该模版由 <b>{{ template.author }}</b> 创作
        </div>
        <div class="bar-code-area">
          <span>扫一扫，手机预览</span>
          <canvas id="barcode-container"></canvas>
        </div>
        <div class="use-button">
          <router-link to="/editor">
            <a-button type="primary" size="large"> 使用模版 </a-button>
          </router-link>
          <a-button size="large"> 下载图片海报 </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'TemplateDetail',
  setup() {
    const template = reactive({
      _id: '61a739f38d5263ce811e7065',
      id: 19,
      uuid: 'kWHu5n',
      title: '1024 程序员日',
      desc: '1024 程序员日',
      author: '185****2625',
      coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
      isTemplate: true,
      status: 2,
      copiedCount: 866,
      latestPublishAt: '2021-12-02T02:27:46.730Z',
      isHot: true,
      isPublic: true,
      createdAt: '2020-11-26T09:27:19.000Z',
      updatedAt: '2022-02-22T09:21:41.307Z',
      user: '617d33bed38dbc5025755a8b',

      channels: [{ name: '默认', id: 'qOZbBt' }],
      __v: 0
    })
    return {
      template
    }
  }
})
</script>

<style scoped>
.work-detail-container {
  margin-top: 50px;
}
.cover-img {
  margin-right: 30px;
}
.cover-img img {
  width: 100%;
}
.use-button {
  margin: 30px 0;
}
.ant-avatar {
  margin-right: 10px;
}
.bar-code-area {
  margin: 20px 0;
}
#barcode-container {
  display: block;
}
</style>
