const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';

var rootPath = __dirname;
var srcPath = path.join(rootPath, 'src/client');
var distPath = path.join(rootPath, 'dist/client');
var serverPath = path.join(rootPath, 'src/server');

const htmlPlugin = new HtmlWebPackPlugin({
    template: __dirname + "/src/client/views/index.html",
    filename: "./index.html",
    excludeChunks: ['express', './src/server/server.ts']
});

const miniCssPlugin = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "client.min.css"
});

const copyFilesPlugin = new CopyWebpackPlugin([
    { from: __dirname + '/src/client/assets', to: __dirname + '/dist/client/assets', force: true }
]);

var clientTsConfigPath = './src/client/tsconfig.json';

var config = {
    // TODO: Add common Configuration
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
       
    },
};

var clientConfig = Object.assign({}, config, {
    name: 'client',
    target: 'web',
    entry: {
        common: './src/client/ts/client.tsx'
    },
    output: {
        filename: "client.bundle.js",
        path: __dirname + "/dist/client"
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".ejs"],
        modules: ['./src/client', './node_modules']
        /*plugins: [
            new TsConfigPathsPlugin({clientTsConfigPath})
        ]*/
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                /*loader: 'ts-loader?cacheDirectory',*/
                loader: 'awesome-typescript-loader',
                options: { 
                    allowTsInNodeModules: true,
                    onlyCompileBundledFiles: true
                 },
                 exclude: /src\/server\//
            },
            { test: /\.ejs$/, loader: 'ejs-loader?variable=data' },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            
            { 
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      "includePaths": [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'dist'),
                        path.resolve(__dirname, 'src/client')
                      ]
                    }
                  }
                ],
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000' 
            }
        ]
    },

    plugins: [
        htmlPlugin, 
        miniCssPlugin, 
        copyFilesPlugin,
        new webpack.IgnorePlugin(/express/),
        new webpack.DefinePlugin({ "global.GENTLY": false }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
});

var serverConfig = Object.assign({}, config, {
    name: 'server',
    target: 'node',
    entry: {
        common: './src/server/server.ts'
    },
    output: {
        filename: "server.js",
        path: __dirname + "/dist/server"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".ejs"],
        modules: ['./src/server', './node_modules']
        /*plugins: [
            new TsConfigPathsPlugin({clientTsConfigPath})
        ]*/
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
                        exclude: '/src/client/'
                    }
                ]
    }
});

// Return Array of Configurations
module.exports = [
    serverConfig, clientConfig,       
];