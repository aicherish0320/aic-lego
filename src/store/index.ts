import { createStore } from 'vuex'
import user, { UserProps } from './user'
import templates, { TemplatesProps } from './templates'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
}

const store = createStore({
  modules: {
    user,
    templates
  }
})

export default store
