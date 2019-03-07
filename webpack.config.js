module.exports = {
    entry: "./src/index.js",
    devtool: "eval-source-map",
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output : {
        path: __dirname + "./dist", //will set this directory as the root
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
};
