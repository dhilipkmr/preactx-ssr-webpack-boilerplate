
const path = require("path");
var webpack = require('webpack');
// Plugins
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin')

// set globals
const { get_globals } = require('./env_setter');

// Output the generated js and css files' names in assets.json file
var assetsPluginInstance = new AssetsPlugin({
  filename: 'assets.json',
  prettyPrint: true
});

/* Getting Global variables for `DefinePlugin` */
const global_variables = get_globals();
// Has to be wrapped by Quotes so that at build Time it will be able to consider the values for these variables as string
const outputGlobalVariables = Object.keys(global_variables).reduce((acc, key) => {
  return {
    ...acc,
    [key]: '"' + global_variables[key] + '"'
  };
}, {});

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'; // To allow source map debugging
  return (
    {
      entry: {
        main: [
          "./src/index.js",
        ],
        vendor: [
          'preact'
        ]
      },
      output: {
        path: path.join(__dirname, "public/dist"),
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
              plugins: ['transform-class-properties', "transform-es2015-arrow-functions"]
            }
          }
        ]
      },
      resolve: {
        alias: {
          'react': 'preact/compat',
          'react-dom': 'preact/compat',
        }
      },
      optimization: {
        splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          },
        }
        } 
      },
      devtool: isDevelopment ? "inline-source-map" : false,
      plugins: [
        new CleanWebpackPlugin(),
        assetsPluginInstance,
        new webpack.DefinePlugin({
          ...outputGlobalVariables
        }),
        new CompressionPlugin({
          algorithm: 'gzip',
          filename: '[path].gz[query]',
          test: /\.(js|css|html)$/,
          deleteOriginalAssets: false
        }),
        // new BundleAnalyzerPlugin() // Enable this to find file size distribution in View after build
      ]
    }
  );
};
