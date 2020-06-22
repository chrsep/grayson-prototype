// next.config.js
const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")
const withPrefresh = require("@prefresh/next")
const withPWA = require("next-pwa")
const path = require("path")

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
    withPrefresh,
    optimizedImages,
  ],
  {
    experimental: {
      modern: true,
      polyfillsOptimization: true,
      precacheHomePage: false,
    },

    webpack(config, { dev, isServer }) {
      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const cacheGroups = splitChunks.cacheGroups
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
        if (cacheGroups.framework) {
          cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
            test: preactModules,
          })
          cacheGroups.commons.name = "framework"
        } else {
          cacheGroups.preact = {
            name: "commons",
            chunks: "all",
            test: preactModules,
          }
        }
      }

      // Install webpack aliases:
      const aliases = config.resolve.alias || (config.resolve.alias = {})
      aliases.react = aliases["react-dom"] = "preact/compat"
      aliases.preact = path.resolve(__dirname, "node_modules", "preact")

      // inject Preact DevTools
      if (dev && !isServer) {
        const entry = config.entry
        config.entry = () =>
          entry().then((entries) => {
            // entries["main.js"] = ["preact/debug"].concat(entries["main.js"] || [])
            return entries
          })
      }

      return config
    },
  }
)
