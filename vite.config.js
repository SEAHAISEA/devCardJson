import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import legacyPlugin from '@vitejs/plugin-legacy';
// https://vite.dev/config/
export default defineConfig({
  resolve: {
  alias:{
    '@':resolve(__dirname,'./src'),
    '/images': '/src/assets/icons',
  },
  },
  plugins: [vue(),["@vue/app", { useBuiltIns: "entry", polyfills: ["es6.promise", "es6.symbol"] }],
  ["@babel/preset-env", { modules: false, useBuiltIns: "entry", corejs: 2 }]],
})
