import * as esbuild from 'esbuild'

const libraryBundleConfig = {
    entryPoints: ['src/index.ts'],
    platform: 'node',
    tsconfig: 'tsconfig.json',
    bundle: true,
    packages: 'external'
}

// Build for esm
await esbuild.build({
    ...libraryBundleConfig,
    outfile: 'dist/index.js',
    format:'esm',
})

// Build for cjs
await esbuild.build({
    ...libraryBundleConfig,
    outfile: 'dist/index.cjs',
    format:'cjs',
})