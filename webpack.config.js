const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin");
const resolvePath = relativePath => path.resolve(__dirname, relativePath);
const proxy = {
    development: {
        '/api/': {
            target: '',
            changeOrigin: true,
            pathRewrite: {'^': ''},
        }
    },
    test: {
        '/api/': {
            target: '',
            changeOrigin: true,
            pathRewrite: {'^': ''},
        },
    },
    production: {
        '/api/': {
            target: 'your pre url',
            changeOrigin: true,
            pathRewrite: {'^': ''},
        },
    },
};
const env = process.env.NODE_ENV

let isDev = process.env.NODE_ENV === 'development'
const publicPath = "/"
module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: isDev ? "/" : publicPath,
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: "babel-loader",
                options: {
                    "presets": [
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "chrome": "49",
                                    "ios": "10"
                                }
                            }
                        ]
                    ],
                    "plugins": [
                        ["import", {
                            "libraryName": "antd-mobile",
                            "libraryDirectory": "es/components",
                            "style": false
                        }]
                    ]
                }
            },
            {
                test: /\.less$/i,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            }
                        }
                    },
                    "postcss-loader",
                    "less-loader",
                ],
                include: /\.module\.less$/,
            },
            {
                test: /\.less$/i,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ],
                exclude: /\.module\.less$/,
            },
            {
                test: /\.css$/i,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ],
            },
            {
                test: /\.(png|jpg|jpeg|webp)$/,
                type: 'asset'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", '.ts', '.js'],
        alias: {
            '@': resolvePath('src'),
        }
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        proxy: proxy[env],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(isDev ? 'development' : "production"),
            __PATH__: JSON.stringify(isDev ? "/" : publicPath),
        }),
        // new BundleAnalyzerPlugin()
    ]
}
