// Generator总是范湖一个迭代器Iterator, 它也继承了Generator函数的prototype对象上所有的方法
// function* g() {

// }

// g.prototype.hello = () => {console.log('hello')};

// var obj = g();

// obj instanceof g === true // true;
// obj.hello() // hello;


// 如果把g 当做普通的构造函数并不会生效,因为g总是返回迭代器对象Iterator

function* g() {
  this.a = 11;
  yield 1;
}

var obj = g();
// obj.next();
obj.a; // undefined

// Generator也不能跟new 命令一起使用
function* F() {
  yield 1;
  yield 2;
}

// new F() // F is not a constructor

// 将Generator函数返回一个正常的实例, 但是如果使用call的话, obj和f对象两个对象呗分离了
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

var obj = {};
var f = F.call(obj);

// 如何将两个对象进行统一
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

// 利用Generator实现状态机
// ES5写法
var ticking = true;
var clock = function() {
  if (ticking) {
    console.log('tick');
  } else {
    console.log('tock');
  }
  ticking = !ticking;
}

var clock = function* () {
  while(true) {
    console.log('tick');
    yield;
    console.log('tock');
    yield;
  }
}