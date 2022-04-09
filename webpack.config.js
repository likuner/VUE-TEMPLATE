const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const dotenv = require('dotenv')

const nodeEnv = process.env.NODE_ENV
const isProd =  nodeEnv === 'production'

const config = {
  entry: './src/main.js',
  output: {
    clean: true,
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/chunk-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: isProd ? 'production' : 'development',
  devtool: 'inline-source-map',
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
          // options: {
          //   compilerOptions: {
          //     isCustomElement: tag => tag.includes('-')
          //   }
          // }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
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
      minify: false
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash].css'
      // chunkFilename: 'css/[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          filter: (resourcePath) => {
            return !resourcePath.endsWith('/index.html')
          }
        }
      ]
    }),
    // new Dotenv({
    //   path: './.env'
    // }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...dotenv.config().parsed,
        ...dotenv.config({ path: './.env.' + nodeEnv, override: true }).parsed,
        NODE_ENV: nodeEnv
      })
    })
  ],
  optimization: {
    usedExports: true
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
    watchFiles: ['src'],
    client: {
      overlay: true
    }
  }
}

module.exports = config