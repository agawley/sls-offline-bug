/* eslint-disable @typescript-eslint/no-var-requires */
// webpack.config.js
const slsw = require('serverless-webpack');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    mode: 'production',
    node: false,
    devtool: 'source-map',
    ignoreWarnings: [{ message: /Critical dependency: the request of a dependency is an expression/ }],
    stats: 'errors-warnings',
    optimization: {
        minimize: false,
    },
    performance: {
        // Turn off size warnings for entry points
        hints: false,
    },
    resolve: { extensions: ['*', '.js', '.jsx', '.ts', '.tsx'] },
    module: {
        rules: [
            {
                test: /\.jsx?|tsx?$/,
                loader: 'babel-loader',
                include: __dirname,
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-typescript',
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    node: '14',
                                },
                            },
                        ],
                    ],
                    plugins: ['@babel/transform-runtime'],
                },
            },
        ],
    },
};
