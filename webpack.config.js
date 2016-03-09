var fs = require("fs");
var path = require("path");
var webpack = require("webpack");

/**
 * Custom webpack plugins
 */
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * PostCSS packages
 */

var autoprefixer = require("autoprefixer");
var cssimport = require("postcss-import");
var cssnext = require("postcss-cssnext");
var modulesValues = require("postcss-modules-values");
var atImport = require("postcss-import");

/**
 * Webpack configuration
 */
module.exports = {

  entry: './example/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve('./example')
  },

  // Plugin definitions
  plugins: [
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ],

  // Plugin/loader specific-configuration
  cssnext: {
    map: false,
    compress: false
  },
  postcss: function() {
    return {
      defaults: [
        cssimport({
          // Add each @import as a dependency so the bundle is rebuilt
          // when imported files change.
          onImport: function (files) {
            files.forEach(this.addDependency);
          }.bind(this)
        }),
        cssnext(),
        autoprefixer,
        modulesValues,
        atImport()
      ],
      cleaner:  [autoprefixer({ browsers: ["last 2 versions"] })]
    };
  },

  // Set the resolve paths to _our_ node_modules
  // For modules
  resolve: {
    alias: {
      "formalist-theme": path.join(__dirname, './lib/components/ui')
    },
    fallback: [path.join(__dirname, '../node_modules')]
  },
  // Same issue, for loaders like babel
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },

  // General configuration
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: "babel?presets[]=react,presets[]=es2015",
        exclude: [/node_modules/, /src/]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|ttf|otf|eot|ico)/,
        loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.mcss$/,
        // The ExtractTextPlugin pulls all CSS out into static files
        // rather than inside the JavaScript/webpack bundle
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.css$/,
        // The ExtractTextPlugin pulls all CSS out into static files
        // rather than inside the JavaScript/webpack bundle
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  }
};
