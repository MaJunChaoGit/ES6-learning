// ES8 标准引入async函数, 使得异步操作变得更加方便
// async函数是什么，它就是Generator函数的语法糖
// 前面Generator中有个例子，一次读取两个文件
// const fs = require('fs');

// const readFile = function(fileName) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, function(err, data) {
//       if (err) return reject(err);
//       resolve(data);
//     });
//   });
// };

// const gen = function* () {
//   const f1 = yield readFile('./index.js');
//   const f2 = yield readFile('./index.js');
//   console.log(f1.toString());
//   console.log(f2.toString());
// }

// 写成async的话就是这样子
// const asyncReadFile = async function() {
//   const f1 = await readFile('./index.js');
//   const f2 = await readFile('./index.js');
//   console.log(f1.toString());
//   console.log(f2.toString());
// }


// 相对于Generator的话，async函数有以下4点改进

/* 1.内置执行器
-------------------------- */
// Generator函数的执行必须靠执行器，所以才有了co模块
// 而async函数的执行与普通一样
// asyncReadFile();

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

/* 基本用法
 -------------------------- */
// async函数返回一个Promise对象,可以使用then方法添加回调函数.当函数执行的时候
// 一旦遇到await就会先返回,等到异步操作完成再接着执行函数体内的后面的语句
// function timeout(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve,ms);
//   });
// }
// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value);
// }

// asyncPrint('hello world', 50);

//  因为await后面是Promise对象, 所以也可以写作
// async function timeout(ms) {
//   await new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// }
// async function asyncPrint(value, ms) {
//   await timeout(ms);
//   console.log(value);
// }

// asyncPrint('hello world', 50);

/* 多种使用形式
 -------------------------- */

// 函数声明
// async function foo() {}
// // 函数表达式声明
// var foo = async function() {};
// // 对象的方法
// var obj = {async foo() {} };
// obj.foo().then(); 

// // Class 的方法
// class Storage {
//   constructor() {
//     this.cachePromise = cache.open('avatars');
//   }

//   async getAvatar(name) {
//     const cache = await this.cachePromise;
//     return cache.match(`/avatars/${name}.jpg`);
//   }
// }

// var storage = new Storage();
// storage.getAvatar('jake').then();

// // 箭头函数 
// var foo = asycn () => {};

// async函数内部return语句返回的值,会成为then方法回调函数的参数
// async function foo() {
//   return 'hello';
// }

// foo().then(v => console.log(v)); // 'hello'
// async函数内部抛出的错误,会改变Promise的状态为reject,从而通过catch方法捕获
// async function foo () {
//   throw new Error('出错了');
// }

// foo().then(
//     v => console.log(v),
//     e => console.log(e) // 出错了
//   )

// 只有等async函数内部所有的await命令全部执行完之后才会改变Promise对象的状态,除非遇到return或者抛出错误
// async function getTitle(url) {
//   let response = await fetch(url);
//   let html = await response.text();
//   return html.match(/<title>([\s\S]+)<\/title>/i)[1];
// }
// getTitle('https://tc39.github.io/ecma262/').then(console.log);
// ECMAScript® 2019 Language&nbsp;Specification

/* await命令
 -------------------------- */
// async function f() {
//   return await 123; // 命令的参数是数值123,这时等同于return 123;
// }

// f().then(v => console.log(v));

// 只要一个await后面的Promise变为了reject,那么整个async函数都会中断执行

// async function f() {
//   await Promise.reject('出错了 ');
//   await Promise.resolve('hello world');
// }
// f().then(
//     v => console.log(v),
//     e => console.log(e)
//   );

// 有的时候我们希望Promise不被中断,那么我们只需要在函数体内部catch就好

// async function f() {
//   try {
//     // statements
//     await Promise.reject('出错了 ');
//   } catch(e) {
//     // statements
//     console.log(e); // '出错了 '
//   }
//   return await Promise.resolve('hello world');
// }
// f().then(
//     v => console.log(v) // 'hello world'
//   );

/* 错误处理
 -------------------------- */
// 如果有多个await命令,可以统一放在try...catch里面
// async function main() {
//   try {
//     const val1 = await firstStep();
//     const val2 = await secondStep(val1);
//     const val3 = await thirdStep(val1, val2);
//     console.log('Final: ', val3);
//   } catch(e) {
//     // statements
//     console.log(e);
//   }
// }

// 下面是多次请求尝试
// const superagent = require('superagent');
// const NUM_RETRIES = 3;

// async function test() {
//   let i;
//   for (var i = 0; i < NUM_RETRIES.length; i++) {
//     try {
//       await superagent.get('http...');
//       break;
//     } catch(e) {
//       // statements
//       console.log(e);
//     }
//   }
// }
// test();

/* 使用的注意点
 -------------------------- */
// 1. await命令最好放在try...catch中
// async function foo() {
//   try {
//     await tryDoSomething();
//   } catch(e) {
//     // statements
//     console.log(e);
//   }
// }

// 等同于
// async function foo() {
//   await tryDoSomething()
//     .catch(e => console.log(e));
// }

// 2. 多个await命令,如果不存在继发关系的话,最好让他们同时触发
// 如果不同时触发会将异步函数运行成同步函数

// function v1() {
//   return new Promise(resolve => {
//      setTimeout(function() {
//        console.log('a');
//        resolve(2);
//      }, 5000)
//   })
// }
// function v2() {
//   return new Promise(resolve => {
//      setTimeout(function() {
//        console.log('b');
//        resolve(2);
//      }, 4000)
//   })
// }

// async function foo() {
//   let a = v1();
//   let b = v2();
//   await a;
//   await b;
//   return a + b;
// }

// 3.await命令只能用在async函数中,如果用在普通函数就会出错
// async function dbFuc(db) {
//   let docs = [{}, {}, {}];
//   docs.forEach(function(doc) {
//     await db.post(doc); // 报错
//   })
// }

// 上面报错的问题是,await无法再非async函数中运行
// 如果将其回调函数改为async呢
// 这时forEach循环中的操作将为并发执行,也就是同时执行,而不是继发操作
// 他会得到错误的结果
// async function foo() {
//   let arr = [1,2,3,4];

//   arr.forEach(async function(val) {
//     await timeout(val);
//   })
// }
// function timeout(val) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log(val);
//       resolve(val);
//     }, 1000);
//   });
  
// }

// 正确处理的方式应该为for...of
// async function foo() {
//   let arr = [1,2,3,4];

//   for (var i of arr) {
//     await timeout(i);
//   }
// }
// function timeout(val) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log(val);
//       resolve(val);
//     }, 1000);
//   });
// }
// 如果确实希望多个请求并发执行的话, 可以使用Promise.all方法, 当三个请求都resolve时,下面两种写法相同
// async function foo() {
//   let arr = [1,2,3,4];
//   let promise = arr.map(val => timeout(val));
//   let result = await Promise.all(promise);
// }
// function timeout(val) {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log(val);
//       resolve(val);
//     }, 1000);
//   });
// }

/* aysnc实现原理
 -------------------------- */
// 说白了async就是一个自动执行的Generator

// function fn(args) {
//   return spawn(function* {
//     // ...
//   });
// }

// function spawn(genF) {
//   return new Promise(function(resolve, reject) {
//     const gen = genF();

//     function step(nextF) {
//       let next;
//       try {
//         next = nextF;
//       } catch(e) {
//         return reject(e);
//       }
//       if (next.done) return resolve(next.value);
//       Promise.resolve(next.value).then(
//         function(v) {
//           step(function() {
//             return gen.next(v);
//           });
//         },
//         function(e) {
//           step(function() {
//             return gen.throw(e);
//           });
//         }
//       )
//     }
//     step(function() {
//       return gen.next(undefined);
//     })
//   });
// }


