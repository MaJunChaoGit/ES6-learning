var path = require('path');

// 路径别名导出
exports.alias = {
  source: path.resolve(__dirname, '../src'),
  ex: path.resolve(__dirname, '../examples/'),
};
// 不进行测试的文件与路径
exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
