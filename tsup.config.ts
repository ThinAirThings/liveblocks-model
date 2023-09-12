import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.browser.ts'],
    // entry: {
    //     indexNode: 'src/index.node.ts',
    //     indexBrowser: 'src/index.browser.ts',
    // },
    clean: true,
    shims: true,
    dts: true,
    format: ['cjs', 'esm'],
})