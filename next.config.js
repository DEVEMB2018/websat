/*eslint-disable no-undef*/

const webpack = require('webpack')
const withSass = require('@zeit/next-sass')

const withOptimizedImages = require('next-optimized-images')
const path = require('path')

const nextConfig = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }

    config.resolve = {
      alias: {
        components: path.resolve('./components'),
        styles: path.resolve('./styles')
      }
    }

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js')
      }
      return entries
    }

    return config
  },
  cssModules: true
}

module.exports = withOptimizedImages(withSass(nextConfig))
