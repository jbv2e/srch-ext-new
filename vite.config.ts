import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { OutputOptions } from 'rollup'

// 환경변수: BUILD_TARGET=content, popup 또는 ui
const buildTarget = process.env.BUILD_TARGET

let input: string
let output: OutputOptions | OutputOptions[]

switch (buildTarget) {
  case 'content':
    input = resolve(__dirname, 'src/content.tsx')
    output = {
      format: 'iife',
      entryFileNames: 'content.js',
      inlineDynamicImports: true,
    }
    break
  case 'popup':
    input = resolve(__dirname, 'src/popup.html')
    output = {
      format: 'es',
      entryFileNames: 'popup.js', // 팝업을 위한 별도의 entry 파일 이름
      inlineDynamicImports: false,
    }
    break
  default: // ui (index.html)
    input = resolve(__dirname, 'index.html')
    output = {
      format: 'es',
      entryFileNames: 'assets/[name]-[hash].js',
      inlineDynamicImports: false,
    }
    break
}

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false, // 두 타겟 모두 build 가능하게
    outDir: 'dist',
    rollupOptions: {
      input,
      output,
    },
  },
})
