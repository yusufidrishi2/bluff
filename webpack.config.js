const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
	return {
		optimization: {
			splitChunks: {
				cacheGroups: {
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true
					}
				}
			}
		},
		entry: {
			app :[ './src/services/app/app.tsx']
		},
		mode: 'none',
		target: 'node',
		devtool: 'inline-source-map',
		output: {
			path : path.resolve(__dirname, 'dist'),
			filename : '[name]_bundle.[contenthash].js'
		},
		module : {
			rules : [
				{
					test: /\.tsx?$/,
					use : [
						'ts-loader'
					]
				},
				{
					test : /\.html$/,
					use : ['html-loader']
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.html'
			}),
			new webpack.IgnorePlugin(/^\.\/env.js$/),
			new CopyPlugin([
				{ 
					from: 'img', 
					to: 'img' 
				},
				{ 
					from: 'styles', 
					to: 'styles' 
				},
				{
					from : 'src/env.js',
					to : './'
				}
			])
		],
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ]
		}
	};
};
