// 一个模块就是一个独立的文件,该文件内部所有变量,外部无法获取。
// 如果你希望给外部使用的话，需要是export关键字输出该变量
// export var firstName = 'Michael';
// export var lastName = 'Jackson';
// export var year = 1958;

// 以下写法和上面写法是等价的,但是推荐下面写法,因为可以在文件结尾一眼看出导出了哪些变量
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year};

// export除了导出变量,还可以输出函数和类
export function multiply(x, y) {
  return x * y;
};

// export 输出的变量就是本来的名字, 但是我们可以使用as关键字来重命名
function v1() {}
function v2() {}

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};

// export 导出的必须是一个接口,不能是一个值,以下写法都是错误
// export 1;
// var m = 1;
// export m;
// function ex() {}
// export ex

// 重点! export语句输出的接口,与其对应的值是动态绑定关系,即通过该接口,可以取到模块内部实时的值
export var foo = 'bar';
setTimeout(() => {
  foo = 'baz';
  return foo;
}, 5000);

// CommonJS模块输出的值的缓存,不存在动态更新,并且export不可以处在块级作用域内,这违背了当初设计的初衷