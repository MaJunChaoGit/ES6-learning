const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

// 1.语法
asyncIterator
.next()
.then(iterResult1 => {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
})
.then(iterResult2 => {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
})
.then(iterResult3 => {
  console.log(iterResult3); // { value: undefined, done: true }
});

// 2.使用async调用asyncIterator
async function f() {
  console.log(await asyncIterator.next()); // { value: 'a', done: false }
  console.log(await asyncIterator.next()); // { value: 'b', done: false }
  console.log(await asyncIterator.next()); // { value: undefined, done: true }
}

// 3.异步遍历器无需等待继发，next方法会累积起来，自动按照顺序运行
async function f() {
  const [{value: v1}, {value: v2}] = Promise.all([syncIterator.next(), syncIterator.next()]);  
}

// 4.for await...of循环
async function f() {
  for await (const x of asyncIterable) {
    console.log(x);
  }
}

async function f() {
  for await (const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log('got', parsed);
}

// 5.如果next返回的Promise对象被reject, for await...of就会报错
async function f() {
  try {
    for await (const x of createRejectingIterable()) {
      console.log(x);
    }
  } catch(e) {
    console.log(e);
  }
}

// 6.for await...of也可以用作同步
// for await (const x of [1,2,3]) {
//   console.log(x);
// }

/* async Generator函数
-------------------------- */
async function* gen() {
  yield 'hello';
}
const genObj = gen();
genObj.next().then(x => console.log(x));

// 1.设计异步遍历器目的值，就是Generator函数处理同步擦啊哦做和异步操作时，能够使用同一接口
// 同步Generator
function* map(iterable, func) {
  const iter = iterable[Symbol.iterator]();
  while (true) {
    const {value, done} = iter.next();
    if (done) break;
    yield func(value);
  }
}

async function* map(iterable, func) {
  const iter = iterable[Symbol.asyncIterator]();
  while (true) {
    const {value, done} = await iter.next();
    if (done) break;
    yield func(value);
  }
}

// 2.异步Generator函数执行器
async function takeAsync(asyncIterable, count = Infinity) {
  debugger
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (result.length < count) {
    const {value, done} = await iterator.next();
    if (done) break;
    result.push(value);
  }
  return result;
}

async function f() {
  async function* gen() {
    yield 'a'
    yield 'b'
    yield 'c'
  }

  return await takeAsync(gen());
}

f().then(function(result) {
  console.log(result);
}) 