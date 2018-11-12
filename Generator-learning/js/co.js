/* co模块
  -------------------------- */
  // co模块要求yield表达式中所有的的值为Thunk模块，或者是Promise
  // var gen = function* () {
  //   var f1 = yield fs.readFile('./application.js');
  //   var f2 = yield fs.readFile('./index.js');
  //   console.log(f1.toString());
  //   console.log(f2.toString());
  // }

  // var co = require('co');
  
  // co(gen).then(function (){
  //   console.log('Generator 函数执行完成');
  // });

/* 基于Promise对象的自动执行
-------------------------- */
// var fs = require('fs');

// var readFile = function(fileName) {
//   return new Promise(function(resolve, reject){
//     fs.readFile(fileName, function(error, data) {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   }); 
// };

// var gen = function* () {
//   var f1 = yield readFile('./application.js');
//   var f2 = yield readFile('./index.js');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };

// var g = gen();

// // 手动调用Generator
// g.next().value.then(function(data) {
//   g.next(data).value.then(function(data) {
//     g.next(data);
//   });
// });

// // 自己写一个co模块
// function run(gen) {
//   var g = gen();

//   function next(data) {
//     var result = g.next(data);
//     if (result.done) return result.value;
//     result.value.then(function(data) {
//       next(data);
//     })
//   }
//   next();
// }

/* co的源码
-------------------------- */
// 1. 首先返回一个Promise对象
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch(e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
            '出错了'
        )
      )
    }
  });
}