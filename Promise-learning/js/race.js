// 1.Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
// const p = Promise.race([p1, p2, p3]);

// 2.只要p1,p2,p3之中有一个实体率先改变状态,p的状态就跟着改变.
//   那个率先改变的 Promise实例的返回值, 就传递给p的回调函数
const p = Pomise.race([
  fetch('/resource-that-may-take-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
])l

p
 .then(console.log)
 .catch(console.error)