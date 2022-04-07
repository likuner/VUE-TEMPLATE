const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const config = {
  entry: './src/main.js',
  output: {
    clean: true,
    filename: 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  // devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.scss', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
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
        test: /\.(png|jpe?g|svg|webp|mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
              outputPath: 'assets',
              limit: 8192,
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
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
    })
  ],
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  },
  watchOptions: {
    aggregateTimeout: 1000,
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
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true
    },
    client: {
      overlay: true
    }
  }
}

module.exports = config