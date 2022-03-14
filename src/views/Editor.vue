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
      <a-layout-sider width="300" style="background: #eee">
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
          <div class="preview-list" id="canvas-area">
            <div class="body-container" :style="page.props">
              <EditorWrapper
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                :active="component.id === (currentElement && currentElement.id)"
                :hidden="component.isHidden"
                :props="component.props"
                @set-active="setActive"
                @update-position="updatePosition"
              >
                <component
                  :is="component.name"
                  v-bind="component.props"
                ></component>
              </EditorWrapper>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #ccc"
        class="settings-panel"
      >
        <a-tabs type="card" v-model:activeKey="activePanel">
          <a-tab-pane key="component" tab="属性设置" class="no-top-radius">
            <div v-if="currentElement">
              <EditGroup
                v-if="!currentElement.isLocked"
                :props="currentElement.props"
                @change="handleChange"
              ></EditGroup>
              <div v-else>
                <a-empty>
                  <template #description>
                    <p>该元素被锁定，无法编辑</p>
                  </template>
                </a-empty>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="layer" tab="图层设置">
            <LayerList
              :list="components"
              :selectedId="currentElement && currentElement.id"
              @change="handleChange"
              @select="setActive"
            >
            </LayerList>
          </a-tab-pane>
          <a-tab-pane key="page" tab="页面设置">
            <props-table :props="page.props" @change="pageChange"></props-table>
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import initHotKeys from '@/plugins/hotKeys'
// import LText from '@/components/LText.vue'
// import LImage from '@/components/LImage.vue'
import EditorWrapper from '@/components/EditorWrapper.vue'
import { ComponentData } from '@/store/editor'
import ComponentList from '@/components/ComponentList.vue'
import { defaultTextTemplates } from '@/defaultProps'
import PropsTable from '@/components/PropsTable.vue'
import LayerList from '../components/LayerList.vue'
import EditGroup from '@/components/EditGroup.vue'
import { pickBy, forEach } from 'lodash'

export type TabType = 'component' | 'layer' | 'page'

export default defineComponent({
  name: 'Editor',
  components: {
    // LText,
    // LImage,
    EditorWrapper,
    ComponentList,
    PropsTable,
    LayerList,
    EditGroup
  },
  setup() {
    initHotKeys()
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const activePanel = ref<TabType>('component')
    const page = computed(() => store.state.editor.page)
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    )
    const addItem = (component: any) => {
      store.commit('addComponent', component)
    }
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    const pageChange = (e: any) => {
      store.commit('updatePage', e)
    }
    const handleChange = (e: any) => {
      store.commit('updateComponent', e)
    }
    const updatePosition = (data: {
      left: number
      top: number
      id: string
    }) => {
      const { id } = data
      const updatedData = pickBy<number>(data, (v, k) => k !== 'id')
      forEach(updatedData, (v, key) => {
        store.commit('updateComponent', { key, value: v + 'px', id })
      })
      // const keysArr = Object.keys(updatedData)
      // const valuesArr = Object.values(updatedData).map((v) => v + 'px')
      // store.commit('updateComponent', { key: keysArr, value: valuesArr, id })
    }

    return {
      components,
      addItem,
      setActive,
      currentElement,
      defaultTextTemplates,
      handleChange,
      activePanel,
      pageChange,
      page,
      updatePosition
    }
  }
})
</script>

<style>
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
