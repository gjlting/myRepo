module.exports = {
  devServer: {
      host: "0.0.0.0",
      port: '8080',
      proxy: {
          '/api': {
              target: 'http://139.9.50.244:8870',
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          '/asset': {
              target: 'http://139.9.50.244:8872',
              changeOrigin: true,
              pathRewrite: {
                  '^/asset': ''
              }
          },
          '/file': {
              target: 'http://139.9.50.244:8880',
              changeOrigin: true,
              pathRewrite: {
                  '^/file': ''
              }
          },
          '/pass': {
              target: 'http://139.9.50.244:8874',
              changeOrigin: true,
              pathRewrite: {
                  '^/pass': ''
              }
          }
      }
  },
  transpileDependencies: [
      'vue-echarts',
      'resize-detector'
  ],
  configureWebpack: {
      optimization: {
          splitChunks: {
              chunks: 'all'
          }
      },
      resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js' 
          }
        },
        externals:{ './cptable': 'var cptable' },
  },
  // 配置网站 icon 图标
  pwa: {
      iconPaths: {
          favicon32: 'favicon1.ico',
          favicon16: 'favicon1.ico',
          appleTouchIcon: 'favicon1.ico',
          maskIcon: 'favicon1.ico',
          msTileImage: 'favicon1.ico'
      }
  }
}