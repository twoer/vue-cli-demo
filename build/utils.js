'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const sassResourcesLoader = {
    loader: "sass-resources-loader",
    options:
    {
      resources: getSassResources()
    }
  }

  const px2remDprLoader = {
    loader: "px2rem-dpr-loader",
    options: getPx2remConfig()
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if( loader === 'sass' || loader === 'scss' )
    {
      loaders.push(px2remDprLoader);
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if( loader === 'sass' || loader === 'scss' )
    {
      loaders.push(sassResourcesLoader);
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

function getPx2remConfig(){
  var px2remConfig = {
    baseDpr: 1,             // base device pixel ratio (default: 2)
    remUnit: 64,            // rem unit value (default: 75)
    remPrecision: 2,        // rem value precision (default: 6)
    forcePxComment: 'px',   // force px comment (default: `px`)
    keepComment: 'no',       // no transform value comment (default: `no`)
    shouldUseDprRule: function(rule){
      var list = ['font', 'font-size'];
      return list.some(function(item) {
        return item === rule.property;
      })
    },
    shouldIgnoreRule: function(rule) {
      if( /\.00px$/.test(rule.value) )
      {
        rule.value = rule.value.replace(/\.00px$/, 'px');
        return true;
      }
      if( /border/.test(rule.property) || /^1px$/.test(rule.value) || /box-shadow/.test(rule.property) )
      {
        return true;
      }
      if( /font|font-size?/.test(rule.property) )
      {
        return true;
      }
      return false;
    }
  };
  return px2remConfig; 
}



function getSassResources()
{
  return [
    path.resolve(__dirname, "../src/assets/lib/var.scss")
  ]
}
