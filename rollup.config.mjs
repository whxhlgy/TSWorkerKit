import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: ['src/WebWorker.ts', 'src/ChannelCenter.ts'],
        output: {
            dir: 'dist',
        },
        plugins: [
            typescript( { target: 'esnext' })
        ],
    },
    {
        input: 'test/Test1.ts',
        output: {
            file: 'test/Test1.js'
        },
        plugins: [
            // nodeResolve(),
            typescript( { target: 'esnext' })
        ],
    }
]