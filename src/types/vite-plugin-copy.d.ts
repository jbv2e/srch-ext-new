declare module 'vite-plugin-copy' {
  import { Plugin } from 'vite'

  interface CopyOptions {
    targets: Array<{ src: string | string[]; dest: string }>
    // 다른 옵션들이 있을 수 있지만, 여기서는 필요한 최소한의 타입만 정의합니다.
  }

  export default function copy(options: CopyOptions): Plugin
}
