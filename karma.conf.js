const webpack = require('./webpack.config');

module.exports = function configure(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            { pattern: 'spec/client/index.js', watched: false },
        ],

        preprocessors: {
            'spec/**/*.js': ['webpack', 'sourcemap'],
            'spec/**/*.jsx': ['webpack', 'sourcemap'],
            'src/**/*.js': ['webpack', 'sourcemap'],
            'src/**/*.jsx': ['webpack', 'sourcemap'],
        },

        webpack: (() => {
            webpack.plugins = [];
            webpack.entry = null;
            webpack.externals = {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
            };
            return webpack;
        })(),

        webpackMiddleware: {
            stats: 'errors-only',
        },

        browsers: ['Chrome'],
    });
};
