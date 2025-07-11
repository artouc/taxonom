import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            preprocessOptions: {
                pug: {
                    doctype: 'html'
                }
            }
        }
    })],
    css: {
        preprocessorOptions: {
            sass: {
                // NOTE: グローバルな@useは削除し、各コンポーネントで個別に読み込む
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port: 3000,
        open: true
    }
})