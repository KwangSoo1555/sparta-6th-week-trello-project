const WebpackPnpExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: [
      'webpack/hot/poll?100', // HMR 엔트리 포인트 수정
      options.entry
    ],
    externals: [
      WebpackPnpExternals({ allowlist: ['webpack/hot/poll?100'] }) // allowlist 사용
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: true }), // autoRestart: true로 변경
    ],
  };
}
