<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <template v-if="value">
        <span class="label">{{ value.text }}</span>
        <component
          :is="value.component"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, k) in value.options"
              :key="k"
              :value="option.value"
            >
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms } from '../propsMap'
import { reduce } from 'lodash'
import { computed, defineComponent, PropType, VNode } from 'vue'
import ColorPicker from './ColorPicker.vue'
import ImageProcesser from '../components/ImageProcesser.vue'
import BackgroundProcesser from '../components/BackgroundProcesser.vue'
import ShadowPicker from '../components/ShadowPicker.vue'
import IconSwitch from '../components/IconSwitch.vue'
import RenderVnode from './RenderVnode'

interface FormProps {
  component: string
  subComponent?: string
  value: string
  extraProps?: { [key: string]: any }
  text?: string
  options?: { text: string | VNode; value: any }[]
  valueProp: string
  eventName: string
  events: { [key: string]: (e: any) => void }
}

export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  components: {
    ColorPicker,
    ImageProcesser,
    RenderVnode,
    ShadowPicker,
    IconSwitch,
    BackgroundProcesser
  },
  emits: ['change'],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initialTransform
            } = item
            const newItem: FormProps = {
              ...item,
              value: initialTransform ? initialTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  console.log('e >>> ', e)
                  context.emit('change', { key, value: e })
                }
              }
            }

            result[newKey] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps }
      )
    })
    return {
      finalProps
    }
  }
})
</script>

<style scoped></style>
