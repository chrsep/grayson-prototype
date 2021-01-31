/* eslint-disable no-param-reassign */
// next.config.js
// const withPlugins = require("next-compose-plugins")
const withPreact = require("next-plugin-preact")

module.exports = withPreact({
  experimental: {
    modern: true,
  },
  images: {
    domains: ["res.cloudinary.com", "s.gravatar.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
})
