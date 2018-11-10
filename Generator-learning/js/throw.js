// 第一个i.throw()被Generator函数内部捕获,第二个i.throw()因为函数内部已经catch过了,所以异常被抛出,被外层的catch捕获
// var g = function* () {
//   try {
//     yield
//   } catch(e) {
//     console.log('内部捕获', e);
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a');
//   i.throw('b');
// } catch(e) {
//   // statements
//   console.log('外部捕获', e);
// }

// throw方法可以接受一个参数, 该参数会被catch语句接收, 建议抛出Error对象的实例

// var g = function* () {
//   try {
//     yield;
//   } catch(e) {
//     console.log(e);
//   }
// };

// var i = g();
// i.next();
// i.throw(new Error('出错了!!!'));

// 不要混淆迭代器的throw和全局的throw命令
// var g = function* () {
//   while (true) {
//     try {
//       yield;
//     } catch(e) {
//       if (e != 'a') throw e;
//       console.log('内部捕获', e);
//     }
//   }
// };

// var i = g();
// i.next();

// try {
//   throw new Error('a');
//   throw new Error('b');
// } catch(e) {
//   console.log('外部捕获', e);
// }

// 如果Generator函数内部没有部署try_catch代码块, 那么throw方法抛出的错误将被外部的catch捕获
// var g = function* () {
//   while (true) {
//     yield;
//     console.log('内部捕获', e);
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a');
//   i.throw('b');
// } catch(e) {
//   console.log('外部捕获', e);
// }

// 如果Generator和外部都没有try_catch代码块的块,那么程序将终止
// var gen = function* () {
//   yield console.log('hello');
//   yield console.log('world');
// }

// var g = gen();
// g.next();
// g.throw();

// 如果一次next都没有被调用, 那么throw抛出的异常将被外部捕获
// var gen = function* () {
//   yield console.log('hello');
//   yield console.log('world');
// }

// var g = gen();
// g.throw();


// throw方法被捕获之后会自动执行一次next方法

// var gen = function* gen() {
//   try {
//     yield console.log('a');
//   } catch(e) {
//   }
//   yield console.log('b');
//   yield console.log('c');
// }

// var g = gen();
// g.next();
// g.throw(); // 也就是说Generator内部只要进行好异常的捕获,将不影响下次的遍历
// g.next();

// var gen = function* gen() {
//   yield console.log('hello');
//   yield console.log('world');
// }

// var g = gen();
// g.next();

// try {
//   throw new Error();
// } catch(e) {
//   g.next();
// }

// Generator函数体外抛出的错误,可以在函数内部处理
// Generator函数体内抛出的错误,可以在函数外部处理
// 如果在执行过程中抛出错误,且没有被内部捕获,就不会执行下去了,并且下次调用next时会返回{ value: undefined, done: true }

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch(err) {
    console.log('捕捉错误1', v);
  }

  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch(err) {
    console.log('捕捉错误2', v);
  }

  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch(err) {
    console.log('捕捉错误3', v);
  }
  console.log('caller done');
}

function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}


log(g());