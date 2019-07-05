const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';

const entry = isProduction
	? ['babel-polyfill', path.resolve(path.join(__dirname, './src/app.ts'))]
	: ['babel-polyfill', path.resolve(path.join(__dirname, './src/app.ts'))];

module.exports = {
	mode: nodeEnv,
	entry: path.resolve(path.join(__dirname, './src/app.ts')),
	externals: [nodeExternals()],
	devtool: '#inline-source-map',
	name: 'API',
	context: __dirname,
	target: 'node',
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js',
		publicPath: '/',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		// Add '.ts' and '.tsx' as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js'],
		modules: [path.resolve(__dirname, 'node_modules')],
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx'
			// extension will be handled by 'ts-loader'
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: [/node_modules/, /dist/],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [/node_modules/, /dist/],
				options: {
					babelrc: true,
				},
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
	},
};
