/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          const miniCssExtractPlugin = webpackConfig.plugins.find(
            (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
          );

          if (miniCssExtractPlugin) {
            miniCssExtractPlugin.options.ignoreOrder = true;
          }

          return webpackConfig;
        },
      },
      options: {},
    },
  ],

  devServer: {
    headers: {
      "X-Frame-Options": "Deny",
      "Content-Security-Policy": "frame-ancestors 'self';",
    },
  },
};
