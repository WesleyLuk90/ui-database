const webpack = require('./webpack.config');

module.exports = function configure(config) {
    config.set({
        files: [
            { pattern: 'spec/client/index.js', watched: false },
        ],

        preprocessors: {
            'spec/**/*.js': ['webpack'],
            'spec/**/*.jsx': ['webpack'],
            'src/**/*.js': ['webpack'],
            'src/**/*.jsx': ['webpack'],
        },

        webpack: (() => {
            webpack.plugins = [];
            webpack.entry = null;
            return webpack;
        })(),

        webpackMiddleware: {
            stats: 'errors-only',
        },

        browsers: ['Chrome'],
    });
};
