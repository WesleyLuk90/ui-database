const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/client/index',
    output: {
        path: `${__dirname}/public/build`,
        filename: 'bundle.js',
        publicPath: '/build/',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        inline: true,
        port: 3001,
        hot: true,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
        }, {
            test: /\.(png|jpg|gif|woff|woff2|svg|ttf|eot)$/,
            loader: 'url-loader?limit=8192',
        }],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
