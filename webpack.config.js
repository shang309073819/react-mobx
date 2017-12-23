'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const CSS_LOADER = 'style-loader!css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!sass-loader';
const extarctCSS = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader?module&importLoaders=1&localIdentName=[hash:base64:5]!sass-loader'
});


const config = {
	context: path.join(__dirname, '/src/'),

	entry: {
		index: ['babel-polyfill', './index']
	},

	output: {
		path: path.join(__dirname, 'build'),
		filename: "bundle.js",
		publicPath: "/"
	},

	resolve: {
		modules: [path.resolve('node_modules')],
		extensions: ['.web.js', '.js', '.jsx', '.json', '.scss', 'css']
	},

	devtool: NODE_ENV === 'development' ? 'eval' : false,
	target: "web",

	module: {

		rules: [
			// eslint
			// {
			// 	enforce: "pre",
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	loader: "eslint-loader",
			// 	options: {
			// 		configFile: './.eslintrc'
			// 	}
			// },
			{
				test: /\.jsx?$/,
				loaders: [
					'react-hot-loader/webpack',
					{
						loader: 'babel-loader',
						options: {
							presets: ["env", "stage-1", "react", "flow"],
							plugins: ["transform-decorators-legacy", "transform-class-properties", "react-flow-props-to-prop-types"]
						}
					}
				],
				exclude: /node_modules/,
				include: __dirname,
			},
			{
				test: /\.scss$/,
				loader: NODE_ENV === 'development' ? CSS_LOADER : extarctCSS,
				exclude: /node_modules/
			},
			{
				test: /\.(woff2?|otf|ttf|eot|svg)$/,
				loader: 'file-loader?name=[path][name].[ext]?[hash:base64:5]',
			},
			{
				test: /\.(mp4|webm)$/,
				loader: 'file-loader?name=[path][name].[ext]'
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: '[path][name].[ext]?[hash:base64:5]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							pngquant: {
								quality: "75",
								speed: 4
							},
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlaced: true,
							},
							optipng: {
								optimizationLevel: 7,
							}
						}
					}]
			}
		]
	},


	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				secure: false
			}
		},
		// contentBase: "./public", //本地服务器所加载的页面所在的目录
		//终端中输出结果为彩色
		stats: {
			colors: true
		},
		historyApiFallback: true, //跳转, 适用于: react-router为browserRouter的场景
		inline: true, //实时刷新
		hot: true,  // 使用热加载插件 HotModuleReplacementPlugin
		host: 'localhost',
		port: 9092,
	},

	plugins: [
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		new FlowStatusWebpackPlugin({
			failOnError: true
		})
	]
};

if (NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false
		})
	)
}

if (NODE_ENV === 'development') {
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
}

module.exports = config;

