// Generator返回的迭代器对象还有一个return方法,可以给定返回值,并且终结Generator函数
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();
g.next();
g.return('foo');
g.next();

// 如果没有给定返回值的话,返回 {value : undefined: done : true}
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();
g.next();
g.return();

// 如果Generator函数内部有try...finally,那么return方法会推迟到finally代码块执行完再执行

function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;    
  } finally {
    yield 4;
    yield 5;
  }

  yield 6;

}

var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }