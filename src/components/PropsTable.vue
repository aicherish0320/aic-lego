<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <template v-if="value">
        <span class="label">{{ value.text }}</span>
        <component
          :is="value.component"
          :value="value.value"
          v-bind="value.extraProps"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, k) in value.options"
              :key="k"
              :value="option.value"
              >{{ option.text }}</component
            >
          </template>
        </component>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from '@/defaultProps'
import { mapPropsToForm, PropsToForms } from '@/propsMap'
import { reduce } from 'lodash'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  setup(props) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForm[newKey]
          if (item) {
            item.value = item.initialTransform
              ? item.initialTransform(value)
              : value
            result[newKey] = item
          }
          return result
        },
        {} as PropsToForms
      )
    })
    return {
      finalProps
    }
  }
})
</script>

<style scoped></style>
