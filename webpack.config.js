module.exports = {
    entry: './src/client/index',
    output: {
        path: `${__dirname}/public/build`,
        filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'react-hot-loader!babel-loader',
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
    plugins: [],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
};
