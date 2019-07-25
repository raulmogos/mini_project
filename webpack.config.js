module.exports = {
    entry: './contacts/main.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      port: 3002
    }
  };