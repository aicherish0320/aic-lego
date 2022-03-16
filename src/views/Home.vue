<template>
  <div class="content-container">
    <a-row :gutter="16">
      <TemplateList :list="testData"></TemplateList>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button
        type="primary"
        size="large"
        @click="loadMorePage"
        v-if="!isLastPage"
        :loading="isLoading"
        >加载更多</a-button
      >
    </a-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import TemplateList from '@/components/TemplateList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import useLoadMore from '@/hooks/useLoadMore'
export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const testData = computed(() => store.state.templates.data)
    const total = computed(() => store.state.templates.totalTemplates)
    const { loadMorePage, isLastPage } = useLoadMore('fetchTemplates', total, {
      pageIndex: 0,
      pageSize: 4
    })
    const isLoading = computed(() =>
      store.getters.isOpLoading('fetchTemplates')
    )

    onMounted(() => {
      store.dispatch('fetchTemplates')
    })

    return {
      testData,
      isLoading,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style>
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
