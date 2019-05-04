var nodeExternals = require('webpack-node-externals');

module.exports = {
    name: 'server',
    target: 'node',
    entry: {
        common: './src/server/server.ts'
    },
    output: {
        filename: "server.js",
        path: __dirname + "/dist/server"
    },
    module: {
        rules: [
                    // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                    { 
                        test: /\.ts?$/, 
                        /*loader: 'ts-loader?configFileName=./src/server/tsconfig.json',*/
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: './src/server/tsconfig.json'
                        },
                    }
                ]
    },
    externals: [
    nodeExternals()
    ]
}
