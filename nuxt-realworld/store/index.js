const cookieparser = process.server ? require('cookieparser') : undefined
// 
export const state = () => {
  return {
    user: null
  }
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
export const actions = {
  // 特殊的方法，在服务端渲染自动调用，初始化容器中的数据
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}
