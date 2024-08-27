// // Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// const isProduction = process.env.NODE_ENV == 'production';


// const stylesHandler = MiniCssExtractPlugin.loader;



// const config = {
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//     },
//     devServer: {
//         open: true,
//         host: 'localhost',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: 'index.html',
//         }),

//         new MiniCssExtractPlugin(),

//         // Add your plugins here
//         // Learn more about plugins from https://webpack.js.org/configuration/plugins/
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/i,
//                 loader: 'babel-loader',
//             },
//             {
//                 test: /\.css$/i,
//                 use: [stylesHandler,'css-loader'],
//             },
//             {
//                 test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
//                 type: 'asset',
//             },

//             // Add your rules for custom modules here
//             // Learn more about loaders from https://webpack.js.org/loaders/
//         ],
//     },
// };

// module.exports = () => {
//     if (isProduction) {
//         config.mode = 'production';
        
        
//         config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
//     } else {
//         config.mode = 'development';
//     }
//     return config;
// };


// {
//     resolve: {
//       modules: [...],
//       fallback: {
//         "fs": false,
//         "tls": false,
//         "net": false,
//         "path": false,
//         "zlib": false,
//         "http": false,
//         "https": false,
//         "stream": false,
//         "crypto": false,
//         "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
//       } 
//     },
//     entry: [...],
//     output: {...},
//     module: {
//       rules: [...]
//     },
//     plugins: [...],
//     optimization: {
//       minimizer: [...],
//     },
//     // node: {
//     //   fs: 'empty',
//     //   net: 'empty',
//     //   tls: 'empty'
//     // },
//     }

const path = require('path');

module.exports = {
  
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'public/bundle.js', // Output bundle
  },
  devServer: {
    static: {                               
      directory: path.join(__dirname, './'),  
      watch: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use env and react presets
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "os": false,
      "querystring": false,
      "child_process": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    } 
  },
  devtool: 'source-map', // Enable source maps for debugging
  externals: {
    express: 'express',
  },
  
};