// 基础写法
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

// Generator可以不用yiled表达式,这时就变成了一个暂缓执行函数
function* f() {
  console.log('done');
}

var generator = f();

setTimeout(function() {
  generator.next();
}, 2000);

// 使用yiled表达式必须是一个Generator函数
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];

    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
}

// yield表达式如果用在另一个表达式中, 必须放在圆括号里面

function* demo() {
    // console.log('Hello' + yield); // Error
    // console.log('Hello' + yield 123); // Error

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
}

// 如果yield表达式用作函数参数或者是表达式的右边,可以不加括号

function* demo() {
  foo(yield 'a', yield 'b');
  let input = yield;
}

// 由于Generator函数就是迭代器生成函数,因此可以把Generator赋值给对象的Symbol.iterator
var obj = {};

obj[Symbol.iterator] = function* (){
  yield 1;
  yield 2;
  yield 3;
}

console.log([...obj]);


// 由于Generator函数就是迭代器生成函数, 运行完后该对象本身也具有Symbol.iterator

function* gen() {

}

var g = gen();

console.log(g[Symbol.iterator]() === g);

// 重点!!!!!!!!!!!!!!
// next方法的参数
// yield表达式总是返回undefined, next方法可以带一个参数,该参数就会被当做上一个yield表达式的返回值

function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i;
    if (reset) i = -1;
  }
}

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }

// 也就是说,通过next的参数的改变我们可以改变Generator函数中的运行状态
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


// 将Generator函数封装下,让其第一次调用next也可以传入参数(默认从第二个next开启传入参数)
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  }
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
})
;

wrapped().next('hello!');

// for..of循环可以自动遍历Generator函数生成的Iterator对象

function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
    console.log(v);
}

// 利用Generator和for...of 实现肥不拉几数列
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for(;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// 利用Generator和for...of实现对象属性的遍历
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
      yield [propKey, obj[propKey]];
  }
}

let jane = {first: 'Jane', last: 'Doe'};

for (let [key, value] of objectEntries(jane)) { // 或者是 jane[Symbol.iterator] = objectEntries for(let [key, value] of jane)
  console.log(`${key}: ${value}`);
}

// 使用...拓展运算符、解构赋值、Array.from调用的都是Iterator接口
function* numbers() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}

[...numbers()];

Array.from(numbers());

let [x, y] = numbers();

for (let i of numbers()) {
  console.log(i)
}

// next() throw() return() 本质上就是把yield的值替换掉
const gene = function* (x, y) {
  let result = yield x + y;
  return result;
}

const genT = gene(1, 2);
// genT.next();
// genT.next(1);
// 相当于把let result = yield x + y替换成 let result = 1;

// genT.throw(new Error('出错了'));
// 相当于把let result = yield x + y替换成 let result = new Error('出错了');
// genT.return(3);
// 相当于把let result = yield x + y替换成 let result = 3;
// 

// 作为对象属性的Generator可以简写成这样
var obj = {
  * func() {
    yield 1;
  }
}
