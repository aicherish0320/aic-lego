<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <LText v-bind="item"></LText>
    </div>
  </div>
  <StyledUploader @success="onImageUploaded"></StyledUploader>
</template>

<script lang="ts">
import { imageDefaultProps, TextComponentProps } from '@/defaultProps'
import { defineComponent, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import LText from './LText.vue'
import StyledUploader from './StyledUploader.vue'
import { UploadResp } from '../extraType'
import { ComponentData } from '@/store/editor'
import { message } from 'ant-design-vue'
import { getImageDimensions } from '@/helper'
export default defineComponent({
  name: 'ComponentList',
  components: {
    LText,
    StyledUploader
  },
  props: {
    list: {
      type: Array as PropType<TextComponentProps[]>,
      required: true
    }
  },
  emits: ['on-item-click'],
  setup(props, context) {
    const onItemClick = (data: any) => {
      context.emit('on-item-click', data)
    }

    const onImageUploaded = (data: { resp: UploadResp; file: File }) => {
      const { resp, file } = data
      const componentData: ComponentData = {
        name: 'l-image',
        id: uuidv4(),
        props: {
          ...imageDefaultProps
        }
      }
      message.success('上传成功')
      componentData.props.src = resp.data.url
      getImageDimensions(file).then(({ width }) => {
        const maxWidth = 373
        componentData.props.width = (width > maxWidth ? maxWidth : width) + 'px'
        context.emit('on-item-click', componentData)
      })
    }

    return {
      onItemClick,
      onImageUploaded
    }
  }
})
</script>

<style scoped>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}
</style>
