<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">
            <img
              alt="慕课乐高"
              src="../assets/logo-simple.png"
              class="logo-img"
            />
          </router-link>
        </div>
      </a-layout-header>
    </a-layout>
    <a-layout>
      <a-layout-sider width="300" style="background: #0f0">
        <div class="sidebar-container">
          组件列表
          <ComponentList
            :list="defaultTextTemplates"
            @on-item-click="addItem"
          ></ComponentList>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div>
            <EditorWrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              :active="component.id === (currentElement && currentElement.id)"
              @set-active="setActive"
            >
              <component
                :is="component.name"
                v-bind="component.props"
              ></component>
            </EditorWrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #ccc"
        class="settings-panel"
      >
        组件属性
        <PropsTable
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        ></PropsTable>
        <pre>{{ currentElement?.props }}</pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import LText from '@/components/LText.vue'
import EditorWrapper from '@/components/EditorWrapper.vue'
import { ComponentData } from '@/store/editor'
import ComponentList from '@/components/ComponentList.vue'
import { defaultTextTemplates } from '@/defaultProps'
import PropsTable from '@/components/PropsTable.vue'

export default defineComponent({
  name: 'Editor',
  components: {
    LText,
    EditorWrapper,
    ComponentList,
    PropsTable
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )
    const addItem = (props: any) => {
      store.commit('addComponent', props)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }

    const handleChange = (e: any) => {
      console.log('e >>> ', e)
    }

    return {
      components,
      addItem,
      setActive,
      currentElement,
      defaultTextTemplates,
      handleChange
    }
  }
})
</script>

<style scoped>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.page-title {
  display: flex;
}
.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}
.preview-list.canvas-fix .edit-wrapper > * {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>
