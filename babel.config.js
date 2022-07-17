module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
    // plugins: [ 'babel-plugin-transform-vite-meta-env' ],
    // presets: [
    //     [
    //         '@babel/preset-env',
    //         { targets: { esmodules: true } },
    //     ],
    //     [ '@babel/preset-typescript' ],
    //     [ 'babel-preset-vite' ],
    // ],
};