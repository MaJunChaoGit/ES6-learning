// 模块之间也可以继承
export * from './circle.js';
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
};
// 加载上面模块的写法如下
// import * as math from './circleplus.js';
// import exp from 'circleplus.js';
// console.log(exp(math.e));