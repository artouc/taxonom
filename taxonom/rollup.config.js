import typescript from '@rollup/plugin-typescript'
import { resolve } from 'path'

export default {
    input: 'src/index.ts',
    external: ['vue'],
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'es'
        }
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: './dist',
            rootDir: './src',
            importHelpers: false
        })
    ]
}