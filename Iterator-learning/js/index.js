// 原生就具有迭代器接口的数据结构
// Array
// Set
// Map
// String
// NodeList
// arguments
// TypedArray

// 实现一个模拟Iterator的接口
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        { value: array[nextIndex++] } : 
        { done: true };
    }
  }
}

// 没有数据结构的迭代器
function idMaker() {
  var index = 0;
  return {
    next: function() {
      return {value: index++, done: false};
    }
  }
}

// 默认Iterator接口
const obj = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: 1,
          done: true
        }
      }
    }
  }
}

// 数组的迭代器写法
var arr = ['a', 'b', 'c'];
var iter = arr[Symbol.iterator]();

iter.next();
iter.next();
iter.next();

// 在一个类中部署迭代器接口
class RangeInterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value <= this.stop) {
      this.value++;
      return {value: value, done: false};
    }
    return {value: undefined, done: true};
  }
}


// 通过迭代器实现指针结构
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  var iterator = { next: next };

  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
  console.log(i)
}


// 为对象添加迭代器接口

var ObjIterator = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    const self = this;
    var index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          }
        } else {
          return { value: undefined, done: true };
        }
      }
    }
  }
}

// 类似于数组的对象部署迭代器接口的话就是直接引用数组的迭代器
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

// 执行
[...document.querySelectorAll('div')]


// 类似数组的对象部署迭代器接口
var iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (var i of iterable) {
  console.log(i);
}

// 普通对象部署数组的迭代器是没有效果的
// var notIterable = {
//   a: 'a',
//   b: 'b',
//   c: 'c',
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };

// for (var i of notIterable) {
//   console.log(i);
// }

// 如果Symbol.iterator不是迭代器生成函数,那么会报错
// var obj1 = {};
// obj1[Symbol.iterator] = () => 1;

// [...obj1];


//有一些场合会默认调用迭代器接口


// 1.解构赋值
var set = new Set().add('a').add('b').add('c');

var [x, y] = set;
// x='a' y='b'

var [first, ...rest] = set;
// first='a' rest=['b', 'c'];

// 2.扩展运算符
var str = 'hello';
[...str] // ['h', 'e', 'l', 'l', 'o']

var args = ['b', 'c'];
['a', ...args, 'd'];

// 字符串的迭代器接口

var someString = 'hi';

typeof someString[Symbol.iterator] === 'function'

var iters = someString[Symbol.iterator]();

iters.next();
iters.next();

// 覆盖原来的字符串迭代器接口
// 
var str = new String('hi');

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return {value: 'bye', done: false};
      } else {
        return {done: true};
      }
    },
    _first: true
  };
};

console.log(str);
console.log(...str)

// 数组原生具备了iterator接口, 也就是说一个对象只要引用了数组的迭代器接口,那么也可以使用for of
var arr = ['red', 'green', 'blue'];

var arrObj = {};

arrObj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for (var i of arr) {
  console.log(i);
}


// 迭代器接口只返回数字的索引的属性
var arr = [1, 2, 3];
arr.foo = 'bar';
for (var i of arr) {
  console.log(i) // 1,2,3
}

// Set和Map具有iterator接口 可以直接使用for of
// Set直接返回的是值
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}

// Map返回的是一个数组, [key, value]
var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");

for (var i of es6) {
  console.log(i);
}

// 总结一下各种循环的写法的优缺点


 /* 1.传统for(var i = 0; i < length; i++)
  -------------------------- */
 传统的for循环写法上比较复杂

 /* forEach写法
  -------------------------- */
 传统for循环的语法糖,无法break和return

 /* for...in
  -------------------------- */
 for...in 循环会将数组的索引的类型改为字符串类型
 for...in 会遍历所有的键,还包括原型上的键
 for...in 遍历的顺序不确定
 
 /* for...of
  -------------------------- */
 for...of 有简洁的语法,但是没有for...in的缺点
 for...of 可以中途break和return
 for...of 统一了所有数据结构的操作接口
 