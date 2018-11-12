  // 异步函数的处理方法
  
  /* 回调函数
  -------------------------- */

  // 这里重点是Node的回调默认第一个参数是Error
  // 是因为第一段任务完成后，执行的上下文就找不到了
  // 原来的上下文环境没有办法继续捕捉，只能传入第二段了
 
  // fs.readFile('/ete/passwd', 'utf-8', function(err, data) {
  //   if (err) throw err;
  //   console.log(data);
  // });

  /* Promise
  -------------------------- */
  // 回调函数的代码不是纵向发展，而是横向发展，一旦多了就会乱成一团
  // Promise不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套
  // 改成链式的调用

  // Promise的写法比较冗余，一眼看上去全是then的调用，语义化不明显
  // var readFile = function (filename) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       resolve(request(filename));
  //     } catch(err) {
  //       reject(err);
  //     }
  //   });
  // };
  // readFile('file.txt')
  //   .then(function(data) {
  //     console.log(data.toString());
  //   })
  //   .then(function() {
  //     return readFile('img.jpg');
  //   })
  //   .then(function(img) {
  //     load(img);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })

  /* Generator
  -------------------------- */
  // 传统的编程语言其中有一种异步编程的解决方案，叫做"协程"
  // 异步操作中需要暂停的地方，都可以用yield语句注明
  // function* readFile(filename) {
  //   // ...其他代码
  //   var f = yield readFile(filename);
  //   // ...其他代码
  // }

  // var read = readFile('test.txt');

  // read.next(); // 加载第一部分的其他代码

  // read.next(); // 加载文件
  
  // Generator通过yield表达式向外输出数据
  // 通过next()传入参数可以向Generator函数传入数据
  // function* gen(x) {
  //   var y = yield x + 2;
  //   return y;
  // }

  // var g = gen(2);

  // g.next();  // 3  计算(yield x + 2)
  // g.next(2); // 2  将上次yield表达式赋值为2, return 2
  
  // Generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误
  // function* gen(x) {
  //   try {
  //     var y = yield x + 2;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return y;
  // }

  // var g = gen(2);
  // g.next();
  // g.throw('出差错了');
  
  // 异步任务的封装
  // 可以看见异步函数表示的很简洁，但是流程管理却不方便
  // var fetch = require('node-fetch');

  // function* gen() {
  //   var url = 'https://api.baidu.com/users';
  //   var result = yield fetch(url);
  //   console.log(result.bio);
  // }
  // var g = gen();
  // var result = g.next();

  // result.value.then(function(data) {
  //   return data.json();
  // }).then(function(data) {
  //   g.next(data);
  // });

  /* Thunk
  -------------------------- */
  // 下面代码中,f的第一个参数是一个复杂的表达式，而函数体内根本没有用到
  // 对这个参数求值实际上是没有必要的，这个叫做"传名调用"
  // function f(a, b){
  //   return b;
  // }

  // f(3 * x * x - 2 * x - 1, x);
  
  // 编译器的"传名调用"实现，往往是将参数放到一个临时函数中。
  // function f(m) {
  //   return m * 2;
  // }
  // f(x + 2);

  // // 等同于
  // var thunk = function() {
  //   return x + 5;
  // };

  // function f(thunk) {
  //   return thunk() * 2;
  // }
   
  // JavasCript中的Thunk函数有所不同，他是将多参数函数，
  // 替换成一个只接受回调函数作为参数的单参数函数
  
  // 正常版本的readFile (多参数版本)
  // fs.readFile(fileName, callback);

  // // Thunk版本的readFile (单参数版本)
  // var Thunk = function (fileName) {
  //   return function (callback) {
  //     return fs.readFile(fileName, callback);
  //   }
  // }

  // // ES5版本
  // var Thunk = function(fn) {
  //   return function() {
  //     var args = Array.prototype.slice.call(arguments);
  //     return function(callback) {
  //       args.fush(callback);
  //       return fn.apply(this, args);
  //     }
  //   }
  // }

  // // ES6版本
  // var Thunk = function(fn) {
  //   return function(...args) {
  //     return function(callback) {
  //       return fn.call(this, ...args, callback);
  //     }
  //   }
  // }

  // var readFileThunk = Thunk(fs.readFile);
  // readFileThunk(fileA)(callback);
  
  // Thunkify模块
  var thunkify = require('thunkify');
  // var fs = require('fs');

  // var read = thunkify(fs.readFile);
  // read('../package.json')(function(err, str){
  //   console.log(str);
  // });

  // // 源码
  // function thunkify(fn) {
  //   return function() {
  //     var args = new Array(arguments.length);
  //     var ctx = this;

  //     for (var i = 0; i < args.length; i++) {
  //       args[i] = arguments[i];
  //     }

  //     return function (done) {
  //       var called;

  //       args.push(function() {
  //         if (called) return;
  //         called = true;
  //         done.apply(null, arguments);
  //       });

  //       try {
  //         fn.apply(ctx, args);
  //       } catch (err) {
  //         done(err);
  //       }
  //     }
  //   }
  // }
  
  // function f(a, b, callback) {
  //   var sum = a + b;
  //   callback(sum);
  //   callback(sum);
  // }

  // var ft = thunkify(f);
  // var print = console.log.bind(console);

  // ft(1, 2)(print); // 3
  
  // 那么如何让Generator函数自动执行呢
  // 下面代码会自动执行完所有的步骤，但是这不适合异步
  // function* gen() {
  //   yield 1;
  //   yield 2;
  //   yield 3;
  //   yield 4;
  // }

  // var g = gen();
  // var res = g.next();

  // while(!res.done) {
  //   console.log(res.value);
  //   res = g.next();
  // }
  
  // var fs = require('fs');
  // var readFileThunk = thunkify(fs.readFile);
  // var gen = function* () {
  //   var r1 = yield readFileThunk('./application.js');
  //   console.log(r1.toString());
  //   var r2 = yield readFileThunk('./index.js');
  //   console.log(r2.toString());
  // }

  // // 通过不停的传入同一个回调函数给next方法的value属性
  // // 达到手动执行Generator函数
  // var g = gen();
  // var r1 = g.next();
  // r1.value(function(err, data) {
  //   if (err) throw err;
  //   var r2 = g.next(data);
  //   r2.value(function(err, data) {
  //     if (err) throw err;
  //     g.next(data);
  //   });
  // })
  
  // Thunk函数的自动流程管理
  // var printThunk = thunkify(console.log);

  // function run(fn) {
  //   var gen = fn();

  //   function next(err, data) {
  //     var result = gen.next(data);
  //     if (result.done) return;
  //     result.value(next);
  //   }

  //   next();
  // }

  // function* g() {
  //   yield printThunk(1);
  //   yield printThunk(2);
  //   yield printThunk(3);
  // }

  // run(g)
  
  /* co模块
  -------------------------- */
  var gen = function* () {
    var f1 = yield fs.readFile('./application.js');
    var f2 = yield fs.readFile('./index.js');
    console.log(f1.toString());
    console.log(f2.toString());
  }

  var co = require('co');
  
  co(gen).then(function (){
    console.log('Generator 函数执行完成');
  });