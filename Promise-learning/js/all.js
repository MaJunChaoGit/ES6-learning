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

// 1.Promise.all方法用于将多个Promise实体包装成一个新的Promise实例
// const p = Promise.all([p1, p2, p3]);

// 2.p的状态分为两种:
//  1. 当p1, p2, p3都为fulfilled时 p => fulfilled
//  2. 当p1, p2, p3其中一个rejected时, p => rejected
// const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
//   return getJson('/post' + id + '.json');
// });

// Promise.all(promises).then(function(posts) {

// }).catch(function(reason) {
//   console.log(reason)
// })

// 3.当作为参数的Promise实例，
//   自己定义了catch方法,那么它一旦被reject，并不会触发
//   Promise.all()的catch方法
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]