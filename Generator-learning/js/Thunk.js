  /* Thunk
  -------------------------- */
  // 下面代码中,f的第一个参数是一个复杂的表达式，而函数体内根本没有用到
  // 对这个参数求值实际上是没有必要的，这个叫做"传名调用"
  function f(a, b){
    return b;
  }

  f(3 * x * x - 2 * x - 1, x);
  
  // 编译器的"传名调用"实现，往往是将参数放到一个临时函数中。
  function f(m) {
    return m * 2;
  }
  f(x + 2);

  // // 等同于
  var thunk = function() {
    return x + 5;
  };

  function f(thunk) {
    return thunk() * 2;
  }
   
  // JavasCript中的Thunk函数有所不同，他是将多参数函数，
  // 替换成一个只接受回调函数作为参数的单参数函数
  
  // 正常版本的readFile (多参数版本)
  fs.readFile(fileName, callback);

  // Thunk版本的readFile (单参数版本)
  var Thunk = function (fileName) {
    return function (callback) {
      return fs.readFile(fileName, callback);
    }
  }

  // ES5版本
  var Thunk = function(fn) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      return function(callback) {
        args.fush(callback);
        return fn.apply(this, args);
      }
    }
  }

  // ES6版本
  var Thunk = function(fn) {
    return function(...args) {
      return function(callback) {
        return fn.call(this, ...args, callback);
      }
    }
  }

  var readFileThunk = Thunk(fs.readFile);
  readFileThunk(fileA)(callback);
  
  // Thunkify模块
  var thunkify = require('thunkify');
  var fs = require('fs');

  var read = thunkify(fs.readFile);
  read('../package.json')(function(err, str){
    console.log(str);
  });

  // // 源码
  function thunkify(fn) {
    return function() {
      var args = new Array(arguments.length);
      var ctx = this;

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      return function (done) {
        var called;

        args.push(function() {
          if (called) return;
          called = true;
          done.apply(null, arguments);
        });

        try {
          fn.apply(ctx, args);
        } catch (err) {
          done(err);
        }
      }
    }
  }
  
  function f(a, b, callback) {
    var sum = a + b;
    callback(sum);
    callback(sum);
  }

  var ft = thunkify(f);
  var print = console.log.bind(console);

  ft(1, 2)(print); // 3
  
  // 那么如何让Generator函数自动执行呢
  // 下面代码会自动执行完所有的步骤，但是这不适合异步
  function* gen() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }

  var g = gen();
  var res = g.next();

  while(!res.done) {
    console.log(res.value);
    res = g.next();
  }
  
  var fs = require('fs');
  var readFileThunk = thunkify(fs.readFile);
  var gen = function* () {
    var r1 = yield readFileThunk('./application.js');
    console.log(r1.toString());
    var r2 = yield readFileThunk('./index.js');
    console.log(r2.toString());
  }

  // 通过不停的传入同一个回调函数给next方法的value属性
  // 达到手动执行Generator函数
  var g = gen();
  var r1 = g.next();
  r1.value(function(err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data) {
      if (err) throw err;
      g.next(data);
    });
  })
  
  // Thunk函数的自动流程管理
  var printThunk = thunkify(console.log);

  function run(fn) {
    var gen = fn();

    function next(err, data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value(next);
    }

    next();
  }

  function* g() {
    yield printThunk(1);
    yield printThunk(2);
    yield printThunk(3);
  }

  run(g)
  
