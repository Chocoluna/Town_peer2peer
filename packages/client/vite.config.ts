import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve('./public/img'),
    },
  },
  plugins: [react(), nodePolyfills()],
  define: {
    'process.env': {},
  },
})
