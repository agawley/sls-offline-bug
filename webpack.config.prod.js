/* eslint-disable @typescript-eslint/no-var-requires */
const sharedConfig = require('./webpack.config.shared');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    ...sharedConfig,
    mode: 'production',
    performance: {
        maxAssetSize: 400000,
        maxEntrypointSize: 800000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
};
