module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],
    webpackFinal: async (config) => {
        // config for css modules
        config.module.rules.find(
            rule => rule.test.toString() === '/\\.css$/',
        ).exclude = /\.module\.css$/;

        config.module.rules.push({
            test: /\.module\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
                'postcss-loader',
            ],
        })

        return config;
    },
}