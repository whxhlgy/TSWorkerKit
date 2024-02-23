import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: 'src/WebWorker.ts',
        output: {
            file: 'dist/WebWorker.js',
        },
        plugins: [
            // nodeResolve(),
            typescript( { target: 'esnext' })
        ],
    },
    {
        input: 'test/Cook.ts',
        output: {
            file: 'test/Cook.js'
        },
        plugins: [
            // nodeResolve(),
            typescript( { target: 'esnext' })
        ],
    }
]