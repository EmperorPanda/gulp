import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f69b5bc8 = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "" */))
const _04211c47 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "" */))
const _7b13fe05 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _cf0e4ff2 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _e4599388 = () => interopDefault(import('..\\pages\\article\\creatOrEdit.vue' /* webpackChunkName: "" */))
const _50f399d0 = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "" */))
const _41993d76 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _f69b5bc8,
    children: [{
      path: "/",
      component: _04211c47,
      name: "home"
    }, {
      path: "/login",
      component: _7b13fe05,
      name: "login"
    }, {
      path: "/register",
      component: _7b13fe05,
      name: "register"
    }, {
      path: "/settings",
      component: _cf0e4ff2,
      name: "settings"
    }, {
      path: "/editor",
      component: _e4599388,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _50f399d0,
      name: "article"
    }, {
      path: "/profile/:username",
      component: _41993d76,
      name: "profile"
    }, {
      path: "/profile/:username/favorites",
      component: _41993d76,
      name: "profile"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
