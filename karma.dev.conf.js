/* eslint-disable no-console */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.entry = './spec/client/index.js';
webpackConfig.plugins = [];
webpackConfig.externals = {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
};
webpackConfig.devtool = 'cheap-module-source-map';
webpackConfig.output = {
    path: `${__dirname}/build`,
    filename: 'test-bundle.js',
};
const compiler = webpack(webpackConfig);

compiler.watch({

}, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
    }));
});

module.exports = function configure(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            { pattern: './build/test-bundle.js', watched: true },
        ],

        preprocessors: {
            './build/test-bundle.js': ['sourcemap'],
        },
        browsers: ['Chrome'],
    });
};
