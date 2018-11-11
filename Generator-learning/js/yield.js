// 如果在 Generator函数内部调用一个Generator函数,默认情况下是没有效果的
function* foo() {
  yield 1;
  yield 2;
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

// for(let v of bar()) {
//   console.log(v); // x y
// }

// 这个时候就需要用到yield*

function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 等同于

function* bar() {
  yield 'x';
  for (let v of foo()) {
    console.log(v); // x 1 2 y;
  }  
  yield 'y';
}


function* inner() {
  yield 'hello';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}
var gen = outer1();
gen.next();
gen.next(); // inner Iterator对象
gen.next();

function* outer2() {
  yield 'open';
  yield* inner();
  yield 'close';
}
var g = outer2();

g.next(); 
g.next(); // hello
g.next();

// yield* 后面的Generator等同于在Generator函数内部部署了一个for...of循环
let delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
})();

let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
})();


function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}
// 等同于
function* concat(iter1, iter2) {
  for (let v of iter1) {
    console.log(v);
  }

  for (let v of iter2) {
    console.log(v);
  }
}


// 如果yield* 后面跟着一个支持原生迭代器的数据结构,那么g.next()就会遍历结构

function* gene() {
  yield* ['a', 'b', 'c'];
}

gene().next(); // a;

let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();

read.next().value; // hello
read.next().value; // h

// 如果被代理的Generator函数有return语句, 那么就可以向代理它的Generator函数返回数据
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log('v: ' + v);
  yield 4;
}


function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}

function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

var a = [...logReturned(genFuncWithReturn())]; 
// a = [a, b]

// yield* 命令可以很方便的取出嵌套数组的所有成员
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}
const data = ['a', ['b', 'c'], ['d', 'e']];

for (let x of iterTree(data)) {
  console.log(x);
}

// 使用yield* 遍历完全二叉树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

function* inorder(t) {
  if (t) {
    yield* inorder(t.right);
    yield t.label;
    yield* inorder(t.left);
  }
}

function make(array) {
  if (array.length === 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}

let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

var result = [];
for (let v of inorder(tree)) {
  result.push(v);
}

console.log(result);