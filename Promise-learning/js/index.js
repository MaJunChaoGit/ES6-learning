// 1.Promise简单例子
// function timeout(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms, 'done');
//   });
// }

// timeout(1000).then(value => {
//   console.log(value);
// });

// 2.Promise新建后就立即执行
// let promise = new Promise((resolve, reject) => {
//   console.log('Promise');
//   resolve();
// });

// promise.then(() => {
//   console.log('resolved');
// })

// console.log('Hi!');
// 'Promise'
// 'Hi!'
// 'resolved'

// // 3.异步加载图片
// function loadImageAsync(url) {
//   // 首先新建Promise时会缓存图片
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     // 当图片正确加载时会使Promise的状态从pending进化成fulfilled
//     // 这时外部调用then(image)就可以正确控制异步函数了
//     image.onload = function() {
//       resolve(image);
//     };
//     // 当图片加载方式错误时使Promise状态从pending进化成reject
//     image.onerror = function() {
//       reject(new Error('Could not load image at ' + url));
//     };
//     // 当设置src时，图片就在被缓存了
//     image.src = url;
//   });
// }
// // 调用函数测试并未body设置背景图片
// loadImageAsync('images/test.jpg').then(image => {
//   document.body.appendChild(image)
// })

// 4.封装ajax实现
// const getJson = function(url) {
//   const promise = new Promise(function(resolve, reject) {
//     const handler = function() {
//       if (this.readyState !== 4) {
//         return;
//       }
//       if (this.readyState === 200) {
//         resolve(this.response);
//       } else {
//         reject(new Error(this.statusText));
//       }
//     };
//     const client = new XMLHttpRequest();
//     client.open('GET', url);
//     client.onreadystatechange = handler;
//     client.responseType = 'json';
//     client.setRequestHeader('Accept', 'application/json');
//     client.send();
//   });
//   return promise;
// }

// getJson('./json/test.json').then(val => {
//   console.log(val);
// }, error => {
//   console.log(error);
// })
// 5.Promise的作用感觉就像一个容器，这个容器去派发不同的状态
//   当然resolve状态函数的参数可以是另一个Promise
// const p1 = new Promise((resolve, reject) => {
//   // console.log('我是p1')
//   // 
//   resolve(1);
// });

// const p2 = new Promise((resolve, reject) => {
//   // console.log('我是p2')
//   resolve(p1);
// })
// // then方法会等所有的Promise全部执行完才执行
// p2.then(val => {
//   console.log(val)
// });
  
// 6.通过Promise中使用setTimeout改变Promise的状态
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => reject(new Error('fail')), 3000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => resolve(p1), 1000);
// });

// p2
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

// 7.调用resolve或者reject并不会终结Promise的参数函数执行
// resolve或reject总是在本轮同步任务最后执行
// new Promise((resolve, reject) => {
//   // 如果这里
//   // return resolve(1) 那么下面就不会执行了
//   // 一般来说, 使用完resolve或reject后, Promise的使命就完成了后续操作应该放在then里
//   resolve(1);
//   console.log(2);
// }).then(val => {
//   console.log(val);
// })