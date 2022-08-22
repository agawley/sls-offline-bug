/* eslint-disable @typescript-eslint/no-var-requires */
// webpack.config.js
const path = require('path');
const slsw = require('serverless-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

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
    plugins: [
        new LoadablePlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/public/*',
                },
                {
                    context: path.resolve(__dirname, 'src', 'servers', 'lib'),
                    from: './templates/*',
                    to: 'src/servers/',
                },
            ],
        }),
    ],
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
                        [
                            '@babel/preset-react',
                            {
                                runtime: 'automatic',
                            },
                        ],
                    ],
                    plugins: ['@babel/transform-runtime', '@loadable/babel-plugin'],
                },
            },
        ],
    },
};
