import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import type { PluginOptions } from 'vue-gtag'
import VueGtag from 'vue-gtag'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/redo.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)
  .use(router)

import.meta.env.PROD && app.use(VueGtag, {
  config: { id: 'UA-126520117-3' },
  appName: 'CroEarn',
  pageTrackerScreenviewEnabled: true,
} as PluginOptions, router)

app.mount('#app')
