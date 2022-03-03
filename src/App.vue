<template>
  <a-layout :style="{ background: '#fff' }">
    <a-layout-header class="header">
      <div class="page-title">
        <router-link to="/">慕课乐高</router-link>
      </div>
      <user-profile :user="user"></user-profile>
    </a-layout-header>
    <a-layout-content class="home-layout">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer>
      © 慕课网（imooc.com）版权所有 | 津ICP备20000929号-2
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  color: #fff;
}
</style>
