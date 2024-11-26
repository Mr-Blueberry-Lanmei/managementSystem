import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 或者 'modern'
      }
    }
  },
  server: {
    proxy: {
      '/bw/api': {
        target: 'https://zyxcl.xyz/exam_api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bw\/api/, '')
      }
    }
  },
})
