/* eslint-disable no-param-reassign */
// next.config.js
const withPlugins = require("next-compose-plugins")
const withPreact = require("next-plugin-preact")

module.exports = withPlugins([withPreact], {
  experimental: {
    modern: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
})
