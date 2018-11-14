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