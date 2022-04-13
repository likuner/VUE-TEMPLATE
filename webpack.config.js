const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'

// write global variables to process.env
// priority: process.env > .env.** > .env
dotenvExpand.expand(dotenv.config({ path: `./.env.${NODE_ENV}` }))
dotenvExpand.expand(dotenv.config())

const config = {
  entry: './src/main.js',
  output: {
    clean: true,
    filename: 'js/[name].[contenthash].js',
    // chunkFilename: 'js/chunk.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.scss', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime']
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              isCustomElement: (tag) => ['lazy-img'].includes(tag)
            }
          }
        }
      },
      {
        test: /\.s?css$/,
        sideEffects: true,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              esModule: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'assets',
              limit: 8192,
              esModule: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body',
      minify: false,
      title: 'VUE-TEMPLATE',
      resource: ['vendors/lazy-img.js'],
      buildTime: new Date().toLocaleString()
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          filter: (resourcePath) => !resourcePath.endsWith('/index.html')
        }
      ]
    }),
    new webpack.ProvidePlugin({
      Vue: 'vue'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new EslintPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: false
  },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: ['**/node_modules']
  },
  devServer: {
    open: false,
    port: 8080,
    proxy: {
      // '/api': {
      //   target: 'https://localhost:8080'
      // }
    },
    liveReload: true,
    watchFiles: ['src'],
    client: {
      overlay: false
    },
    devMiddleware: {
      writeToDisk: true
    }
  }
}

module.exports = config
