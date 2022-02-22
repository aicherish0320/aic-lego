import { Module } from 'vuex'
import { GlobalDataProps } from '.'

export interface UserDataProps {
  username?: string
  id?: string
  phoneNumber?: string
  nickName?: string
  description?: string
  updatedAt?: string
  createdAt?: string
  iat?: number
  exp?: number
  picture?: string
  gender?: string
}

export interface UserProps {
  isLogin: boolean
  token?: string
  data: UserDataProps
}

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    isLogin: false,
    data: {}
  },
  mutations: {
    logout(state) {
      state.isLogin = false
    }
  }
}

export default user
