// ES8 标准引入async函数, 使得异步操作变得更加方便
// async函数是什么，它就是Generator函数的语法糖
// 前面Generator中有个例子，一次读取两个文件
const fs = require('fs');

const readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('./index.js');
  const f2 = yield readFile('./index.js');
  console.log(f1.toString());
  console.log(f2.toString());
}

// 写成async的话就是这样子
const asyncReadFile = async function() {
  const f1 = await readFile('./index.js');
  const f2 = await readFile('./index.js');
  console.log(f1.toString());
  console.log(f2.toString());
}


// 相对于Generator的话，async函数有以下4点改进

/* 1.内置执行器
-------------------------- */
// Generator函数的执行必须靠执行器，所以才有了co模块
// 而async函数的执行与普通一样
asyncReadFile();

/* 2.更好的语义
-------------------------- */
// async和await，比起星号和yield, 语义更清楚了
// async表示函数有异步操作,await表示紧跟在后面的表达式需要等待结果

/* 3.更广的适用性
-------------------------- */
// co模块规定，yield命令后面只能是Thunk或者是Promise对象
// 而async函数的await后面可以以是Promise对象和原始类型的值

/* 4.返回值是Promise
-------------------------- */
// async函数返回的是Promise对象，比Generator函数返回的Iterator方便多了
// 而await命令是then命令的语法糖