/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'naive-ui': ['useMessage', 'useDialog', 'useNotification'],
        },
      ],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,

      resolvers: [
        NaiveUiResolver(),
      ],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        // devOptions: {
        //   enabled: true,
        // },
        name: 'CROEarn',
        short_name: 'CROEarn',
        theme_color: '#061121',
        background_color: '#061121',
        lang: 'it',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
