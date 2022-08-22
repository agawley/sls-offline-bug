/* eslint-disable @typescript-eslint/no-var-requires */
const sharedConfig = require('./webpack.config.shared');

module.exports = {
    ...sharedConfig,
    mode: 'development',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    watch: true,
};
