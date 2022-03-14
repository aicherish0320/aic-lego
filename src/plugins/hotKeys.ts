import useHotKey from '@/hooks/useHotKey'
import { GlobalDataProps } from '@/store'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default function initHotKeys() {
  const store = useStore<GlobalDataProps>()
  const currentId = computed(() => store.state.editor.currentElement)
  useHotKey('ctrl+c, command+c', () => {
    store.commit('copyComponent', currentId.value)
  })
  useHotKey('ctrl+v, command+v', () => {
    store.commit('pasteCopiedComponent')
  })
  useHotKey('backspace, delete', () => {
    store.commit('deleteComponent', currentId.value)
  })
  useHotKey('esc', () => {
    store.commit('setActive', '')
  })
}
