// 写一个数组扁平化处理

function* flat(arr) {
  let length = arr.length;

  for (var i = 0; i < length; i++) {
    let item = arr[i];
    if (Array.isArray(item)) {
      yield* flat(item);
    } else {
      yield item;
    }
  }
}

// 使用Genertor部署对象的Iterator
var obj = {};
obj[Symbol.iterator] = function* (){
  yield 1;
  yield 2;
  yield 3;
}

// 让Generator函数第一次运行next就可以传参
function wrapper(genF) {
  return function(...args) {
    let genObject = genF(args);
    genObject.next();
    return genObject;
  }
}

var wrapped = wrapper(function* () {
  console.log(`First input ${yield}`)
});

// 使用Generator函数实现斐波拉契数列

function* fibonacci() {
  let [prev ,curr] = [0, 1];
  for(;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// 通过Generator函数为对象添加支持for...of的接口

function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let key of propKeys) {
    yield [key, obj[key]];
  }
}

// 通过Genertor函数遍历完全二叉树

function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

function makeTree(arr) {
  if (arr.length === 1) return new Tree(null, arr[0], null);
  return new Tree(makeTree(arr[0]), arr[1], makeTree(arr[2]));
}
let tree = makeTree([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 使Generator函数可以支持new命令,以及可以在实例上挂载属性

function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

// 使用Generator函数改写ajax请求

function* ajax(url) {
  let response = yield request(url);
  console.log(response);
}

function request(url) {
  let response = fetch(url).text();
  it.next(reponse);
}

// var it = ajax('aaa');
// it.next();

// 编写一个JavaScript的Thunk函数转换器
var Thunk = function(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return function(callback) {
      args.push(callback);
      fn.apply(this, args);
    }
  }
}

// Thunkify源码
var Thunkify = function(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;
    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }
    return function(done) {
      var called;
      args.push(function() {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch(e) {
        // statements
        console.log(e);
      }
    }
  }
}

// 写一个同步自动执行流程的Generator
function* gen() {}

var g = gen();
var res = g.next();

while(!res.done) {
  console.log(res.value);
  res = g.next();
}

// 写一个基于Thunkify模块的自动执行的异步Generator流程加载器
function run(gen) {
  var g = gen();

  function next(err, data) {
    var result = g.next();
    if (result.done) return;
    result.value(next);
  }

  next();
}

// 写一个基于Promise的自动执行的Generator(co源码)
function co(gen) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen.value);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch(e) {
        // statements
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new Error()
      );
    }
  })
}