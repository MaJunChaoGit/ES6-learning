const getJson = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.readyState === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });
  return promise;
}

// 1. Promise.prototype.catch方法是.then(null, rejection)的别名
// 如果catch前上个then中的回调函数发生错误也会被捕获
// getJson("../json/test.json").then(function(posts) {

// }).catch(function(error) {
//   console.log('发生错误');
// })
  
// 2.Promise.prototype.catch方法是.then(null, rejection)的别名
// p.then((val) => console.log('fulfilled:', val))
//   .catch((err) => console.log('rejected', err));

// // 等同于
// p.then((val) => console.log('fulfilled:', val))
//   .then(null, (err) => console.log("rejected:", err));

// 3.catch的基本写法
// 写法一
// const promise = new Promise(function(resolve, reject) {
//   try {
//     throw new Error('发生错误');
//   } catch(e) {
//     reject(e);
//   }
// });

// promise.catch(function(error) {
//   console.log(error);
// })
// 写法二
// const promise = new Promise((resolve, reject) => {
//   reject(new Error('test '));
// });
// 可以看出reject方法等同于抛出错误
// promise.catch(e => console.log(e));

// 4.如果Promise的状态已经是resolve, 再抛出错误是无效的
// 因为他是Promise! 他将会永久保持状态
// const promise = new Promise((resolve, reject) => {
//   resolve('ok');
//   throw new Error('test');
// });
// promise
//   .then(val => console.log(val))
//   .catch(err => console.log(err));

// 5.Promise的对象的错误具有"冒泡性质",会一直向后传递，直到被捕获为止.
//   也就是说不要用then的第二参数，总是使用catch方法可以捕获前面所有的异常

// // bad
// promise
//   .then(
//     data => console.log(data),
//     err => console.log(err)
//   );
// // good
// promise
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   })

// 6.如果没有使用catch方法指定错误处理的回调函数
//   Promise对象抛出的错误不会传递到外层代码
//   也就是Promise内部的错误不会阻止外部代码运行
// const someAsyncThing = function() {
//   return new Promise((resolve, reject) => {
//     // 下面会报错
//     resolve(x + 2);
//   });
// };

// someAsyncThing().then(() => {
//   console.log('ok')
// });

// setTimeout(() => {
//   console.log(123)
// }, 2000);

// process.on('unhandledRejection', function(err, p) {
//   throw err;
// });

// 7.test错误会将在下一次的事件循环后被抛出
// 也就是说这时Promise已经运行完了，他冒泡到最外层,成了未捕获的错误
// const promise = new Promise((resolve, reject) => {
//   resolve('ok');
//   setTimeout(() =>{throw new Error('test')}, 0);
// });

// promise.then(val => console.log(val));

// 8.catch返回的还是一个Promise对象，可以接着用then
// 如果catch前没有内部异常，将会直接跳过

// Promise.resolve()
// .catch(err => {
//   console.log('error');
// })
// .then(() => {
//   console.log('ok');
// })

// 9.catch方法之中, 还能再抛出错误
// const someAsyncThing = function() {
//   return new Promise((resolve, reject) => {
//     resolve(x + 2);
//   });
// };

// someAsyncThing().then(function() {
//   return someAsyncThing();
// }).catch(function(error) {
//   console.log('oh no', error);
//   y + 2;
// }).catch(function(error) {
//   console.log('carry on');
// });
