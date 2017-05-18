var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: {
		script: './client/script.js'
	},
	output: {
		path: __dirname,
		filename: 'client/[name].min.js'
	},
	plugins: [
		new ExtractTextPlugin("client/styles/style.min.css"),
		new OptimizeCssAssetsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
	],
	watch: true,
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties', 'transform-decorators-legacy', "transform-object-rest-spread"]
				}
			}, {
				test: /\.scss?$/,
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					loader: "css-loader!sass-loader"
				})
			}
		]
	}
}