/* eslint-disable no-param-reassign */
// next.config.js
const withPlugins = require("next-compose-plugins")
const withOptimizedImage = require("next-optimized-images")
const withPrefresh = require("@prefresh/next")
const withPWA = require("next-pwa")
const path = require("path")
const runtimeCaching = require("./sw-cache.js")

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: "public",
          buildExcludes: [/.*images.*$/],
          runtimeCaching,
        },
      },
    ],
    withPrefresh,
    withOptimizedImage,
  ],
  {
    experimental: {
      modern: true,
      polyfillsOptimization: true,
    },

    webpack(config, { dev, isServer }) {
      const splitChunks = config.optimization && config.optimization.splitChunks
      if (splitChunks) {
        const { cacheGroups } = splitChunks
        const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
        if (cacheGroups.framework) {
          cacheGroups.preact = { ...cacheGroups.framework, test: preactModules }
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
      aliases.react = "preact/compat"
      aliases["react-dom"] = "preact/compat"
      aliases.preact = path.resolve(__dirname, "node_modules", "preact")

      // inject Preact DevTools
      if (dev && !isServer) {
        const { entry } = config
        config.entry = () =>
          entry().then((entries) => {
            entries["main.js"] = ["preact/debug"].concat(
              entries["main.js"] || []
            )
            return entries
          })
      }

      return config
    },
  }
)
