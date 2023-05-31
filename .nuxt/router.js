import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _26b37a94 = () => interopDefault(import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */))
const _a1972326 = () => interopDefault(import('../pages/patient/index.vue' /* webpackChunkName: "pages/patient/index" */))
const _2fa445b9 = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _7bf47e59 = () => interopDefault(import('../pages/hosp/booking.vue' /* webpackChunkName: "pages/hosp/booking" */))
const _4d32f272 = () => interopDefault(import('../pages/hosp/schedule.vue' /* webpackChunkName: "pages/hosp/schedule" */))
const _bb4f256e = () => interopDefault(import('../pages/order/show.vue' /* webpackChunkName: "pages/order/show" */))
const _0939637c = () => interopDefault(import('../pages/patient/add.vue' /* webpackChunkName: "pages/patient/add" */))
const _560a6eb2 = () => interopDefault(import('../pages/patient/show.vue' /* webpackChunkName: "pages/patient/show" */))
const _4802b637 = () => interopDefault(import('../pages/weixin/callback.vue' /* webpackChunkName: "pages/weixin/callback" */))
const _7418c510 = () => interopDefault(import('../pages/hosp/detail/_hoscode.vue' /* webpackChunkName: "pages/hosp/detail/_hoscode" */))
const _40a83251 = () => interopDefault(import('../pages/hosp/notice/_hoscode.vue' /* webpackChunkName: "pages/hosp/notice/_hoscode" */))
const _3ecfedaa = () => interopDefault(import('../pages/hosp/_hoscode.vue' /* webpackChunkName: "pages/hosp/_hoscode" */))
const _6450ddf7 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/order",
    component: _26b37a94,
    name: "order"
  }, {
    path: "/patient",
    component: _a1972326,
    name: "patient"
  }, {
    path: "/user",
    component: _2fa445b9,
    name: "user"
  }, {
    path: "/hosp/booking",
    component: _7bf47e59,
    name: "hosp-booking"
  }, {
    path: "/hosp/schedule",
    component: _4d32f272,
    name: "hosp-schedule"
  }, {
    path: "/order/show",
    component: _bb4f256e,
    name: "order-show"
  }, {
    path: "/patient/add",
    component: _0939637c,
    name: "patient-add"
  }, {
    path: "/patient/show",
    component: _560a6eb2,
    name: "patient-show"
  }, {
    path: "/weixin/callback",
    component: _4802b637,
    name: "weixin-callback"
  }, {
    path: "/hosp/detail/:hoscode?",
    component: _7418c510,
    name: "hosp-detail-hoscode"
  }, {
    path: "/hosp/notice/:hoscode?",
    component: _40a83251,
    name: "hosp-notice-hoscode"
  }, {
    path: "/hosp/:hoscode?",
    component: _3ecfedaa,
    name: "hosp-hoscode"
  }, {
    path: "/",
    component: _6450ddf7,
    name: "index"
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
