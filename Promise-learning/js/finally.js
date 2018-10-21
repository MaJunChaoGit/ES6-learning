// 1.finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
// promise
//   .then(result => {...})
//   .catch(error => {...})
//   .finally(() => {...})

// 2.下面是一个例子,服务器处理Promise请求,然后使用finally方法关掉服务器
// server.listen(port)
//   .then(function () {
//     // ...
//   })
//   .finally(server.stop);

// 3.finally本质上还是then
// promise
//   .finally(() => {
//     // 语句
//   })
// 等同于
// promise
//   .then(
//     result => {
//       return result;
//     },
//     error => {
//       throw error;
//     }
//   );

// Promise.prototype.finally = function (callback) {
//   let P = this.constructor;
//   return this.then(
//     value  => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => { throw reason })
//   );
// };
// // resolve 的值是 undefined
// Promise.resolve(2).then(() => {}, () => {});
// // resolve 的值是 2
// Promise.resolve(2).finally(() => {});
// // reject 的值是 undefined
// Promise.reject(3).then(() => {}, () => {})
// // reject 的值是 3
// Promise.reject(3).finally(() => {})