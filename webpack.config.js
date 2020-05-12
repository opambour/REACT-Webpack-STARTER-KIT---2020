const path = require('path');
const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // mode: 'development'
    target: 'web',
    performance: {
        hints: 'warning',
        maxAssetSize: 4000000, // int (in bytes),
        maxEntrypointSize: 4000000, // int (in bytes)
        assetFilter(assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: 'cheap-eval-source-map', // source-map | inline-source-map
    resolve: {
        // Add `.ts`, `.tsx`, '.js' and '.es6' as a resolvable extension.
        extensions: ['.js', '.jsx']
    },
    entry: {
        index: './src/Index.jsx'
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'dist')
        // publicPath: ''
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        watchContentBase: true,
        compress: true,
        port: 4200,
        watchOptions: {
            poll: true
        },
        hot: true, // enable hot module replacement
        historyApiFallback: true,
        index: 'index.html',
        stats: 'errors-only',
        open: true
    },
    // stats normal is standard output
    // stats minimal will output when errors or new compilation happen
    // verbose Output everything
    // "errors-only" Only output when errors happen
    stats: 'errors-only',

    // optimization
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                include: /\/dist/,
                exclude: /\/node_modules/,
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production,
                extractComments: false,
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                react: {
                    automaticNamePrefix: 'react-chunks-prefix'
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: '[name].bundle.js',
                    enforce: true
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },

    // module
    module: {
        rules: [
            // eslint loader
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'eslint-loader',
                options: {
                    cache: true
                }
            },
            // .js and .jsx | ES 6 or Next using babel loader
            {
                test: /\.(js|jsx)$/,
                use: [
                    'cache-loader',
                    'source-map-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-object-rest-spread'
                            ],
                            cacheDirectory: true
                        }
                    }
                ],
                // enforce: 'pre',
                include: path.resolve('src/'),
                exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'dist')] // /(node_modules|bower_components)/
            },
            // css loader: This enables you to import './style.css' into the file that depends on that styling.
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // scss/sass
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    // compiles Sass to CSS, using Node Sass by default
                    {
                        loader: 'sass-loader',
                        options: {
                            // You can also pass options directly to Node Sass
                            includePaths: ['./node_modules/node-sass'],
                            implementation: require('node-sass')
                        }
                    }
                ]
            },
            // url loader: A loader for webpack which transforms files into base64 URIs.
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    fallback: 'file-loader'
                }
            }
        ]
    },

    // plugins
    plugins: [
        // Cleaning up the /dist folder
        new CleanWebpackPlugin(),
        /**
         * MiniCssExtractPlugin extracts CSS into separate files. It creates a CSS file per JS
         * file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
         */
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        // html plugin
        new HtmlWebpackPlugin({
            title: 'React Webpack Starter Kit',
            filename: 'index.html',
            template: './public/index.html',
            favicon: '',
            inject: true, // all javascript resources will be placed at the bottom of the body element
            hash: true
        })
        /**
         * The DefinePlugin allows you to create global constants which can be configured at compile time.
         */
        // new Webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('development'),
        //     __isBrowser__: false
        // })
    ]
};
