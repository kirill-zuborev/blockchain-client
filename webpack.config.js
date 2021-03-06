const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /Client/, use: 'awesome-typescript-loader?silent=true' },
            ]
        },
        plugins: [
            new CheckerPlugin(),
        ]
    });

    const htmlConfig = () => ({
        stats: { modules: false },
        resolve: { extensions: ['.html'] },
        output: {
            publicPath: '/'
        },
        module: {
            rules: [
                { test: /\.html$/, loader: 'raw-loader' }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'Client/index.html'
            })
        ]
    });

    const clientBundleOutputDir = '../wwwroot';
    const clientBundleConfig = merge(sharedConfig(), htmlConfig(), {
        entry: { 'app': './Client/index.tsx' },
        module: {
            rules: [
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) },
                { test: /\.less$/, exclude: /node_modules/, loaders: ['style-loader', 'css-loader', 'less-loader'] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new ExtractTextPlugin('site.css'),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(`${clientBundleOutputDir}/dist/vendor-manifest.json`)
            }),
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]')
            })
        ] : [
                new webpack.optimize.UglifyJsPlugin()
            ])
    });

    return [clientBundleConfig];
};