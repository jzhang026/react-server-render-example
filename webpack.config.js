const loaders = [
  {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
  {test: /\.json$/, loader: 'json-loader',},
  {test: /\.txt$/, loader: 'raw-loader',},
  {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=1024',},
  {test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader',},
  {test: /\.scss$/, loader: 'style-loader/useable!css-loader!sass-loader!postcss-loader',},
  {test: /\.css$/, loader: 'style-loader/useable!css-loader!postcss-loader',},
];

var config = {
  entry: './browser.js',
  output: {
    path: './public',
    filename: './bundle1'
  },
  module: {
    loaders: loaders
  },
};

export default config