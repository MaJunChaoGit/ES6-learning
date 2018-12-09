// 从之前的例子可以看出,使用import命令时候,用户需要知道加载的变量名或函数名
// 为了给用户提供方便,就要用到export default
export default function() {
  console.log('foo');
}
// 可以使用任意名字
// import customName from './export-default.js';

// export default命令用于指定模块的默认输出,一个模块只能有一个默认输出
// 本质上,export default 就是输出一个叫做default的变量或方法

// function add(x, y) {
//   return x + y;
// }
// export {add as default}
// import {default as foo} from './export-default';

// 如果想要同时输入默认方法和其他接口
// import _, { each, forEach } from 'lodash';

