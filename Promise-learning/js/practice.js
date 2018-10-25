// -------------实现一个生成一个0~2随机数，如果随机数小于1那么返回成功，否则返回失败-------------
// let promise = new Promise((resolve, reject) => {
//   let random = Math.random() * 2;
//   setTimeout(() => {
//     if (random < 1) {
//       resolve('成功: ' + random);
//     } else {
//       reject('失败: ' + random);
//     }
//   }, random * 1000)
// })

// promise.then((resolve) => {
//   console.log(resolve);
// }).catch((reject) => {
//   console.log(reject);
// });

// -------------ajax使用Promise封装-------------
// function ajax(method, url, data) {
//   let request = new XMLHttpRequest();
//   return new Promise((resolve, reject) => {
//     request.onreadystatechange = function() {
//       if (request.readyState === 4) {
//         if (request.status === 200) {
//           resolve(request.responseText);
//         } else {
//           reject(request.status);
//         }
//       }
//     }
//     request.open(method, url);
//     request.send(data);
//   });   
// }
// ajax('GET', 'api/test')
//   .then(resolve => {
//     console.log(resolve);
//   })
//   .catch(error => {
//     console.log(error);
//   })

// -------------并行任务的Promise-------------
// let promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, 'P1');
// })

// let promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3333, 'P2');
// })

// // 以最后一个执行完为准
// Promise.all([promise1, promise2]).then(function(result) {
//   console.log(result);
// });

// -------------竞速Promise-------------
// let promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, 'P1');
// })

// let promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3333, 'P2');
// })

// // 以最后一个执行完为准
// Promise.race([promise1, promise2]).then(function(result) {
//   console.log(result);
// });