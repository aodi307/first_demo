const MiniCssExtractPlugin = require("mini-css-extract-plugin");//分离css

module.exports = [
  {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'//解决css背景图的路径问题
        }
      },
      "css-loader",
      'postcss-loader'
    ]
  },
  {
    test:/\.less$/,
    // use:['style-loader','css-loader','less-loader']
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'//解决css背景图的路径问题
        }
      },
      "css-loader",
      'postcss-loader',
      'less-loader'
    ]
  },
  {
    test:/\.(sass|scss)$/,
    use: [

      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'//解决css背景图的路径问题
        }
      },
      "css-loader",
      'postcss-loader',
      "sass-loader"
    ]
  }
]
