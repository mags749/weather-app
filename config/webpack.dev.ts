import { merge } from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import commonConfig from './webpack.common';

const config: webpack.Configuration = {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheet/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(process.cwd(), 'build'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
    stats: 'minimal',
    clientLogLevel: 'warning',
    proxy: {
      '/': {
        target: 'https://www.metaweather.com',
        secure: false,
        changeOrigin: true,
        onProxyReq: proxyReq => {
          if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', 'https://www.metaweather.com');
          }
          if (proxyReq.getHeader('Host')) {
            proxyReq.setHeader('Host', 'www.metaweather.com');
          }
          if (proxyReq.getHeader('Referer')) {
            proxyReq.setHeader('Referer', 'https://www.metaweather.com');
          }
          // console.info(proxyReq);
        }
      }
    }
  }
};

export default merge(commonConfig, config);
