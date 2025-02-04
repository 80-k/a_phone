import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/a_phone/',  // 여기를 GitHub repository 이름으로 수정
  plugins: [react()],
})
