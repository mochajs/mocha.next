const pkg = require('./package.json');
const webpack = require('webpack');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const GaugePlugin = require('gauge-webpack-plugin');
const defaultsDeep = require('lodash/defaultsDeep');

const baseConfig = {
  output: {
    sourcePrefix: ''
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!mocha-|stampit|kefir)/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'es2015',
              {
                modules: false
              }
            ]
          ],
          plugins: [
            require('babel-plugin-lodash')
          ],
          babelrc: false
        }
      }
    ]
  },
  resolve: {
    mainFields: [
      'jsnext:main',
      'main'
    ]
  },
  devtool: 'source-map'
};

module.exports = [
  defaultsDeep({
    entry: pkg['jsnext:main'],
    output: {
      filename: pkg.main,
      library: pkg.name,
      libraryTarget: 'commonjs-module',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      pathinfo: true
    },
    plugins: [
      new GaugePlugin('node target'),
      new LodashWebpackPlugin({
        currying: true,
        exotics: true,
        paths: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        sourceMap: true
      }),
      new webpack.optimize.DedupePlugin()
    ],
    target: 'node',
    resolve: {
      descriptionFiles: ['package.json'],
      mainFields: [
        'jsnext:main',
        'main'
      ]
    },
    node: {
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
      setImmediate: false
    }
  }, baseConfig),
  defaultsDeep({
    entry: pkg['jsnext:main'],
    output: {
      filename: pkg.browser,
      library: pkg.name,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: [
      new GaugePlugin('web target'),
      new LodashWebpackPlugin({
        currying: true,
        exotics: true,
        paths: true
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        sourceMap: true
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ],
    resolve: {
      mainFields: [
        'jsnext:main',
        'main',
        'browser'
      ]
    }
  }, baseConfig)
];

