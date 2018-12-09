// 如果在一个模块中,先输入后输出同一个模块,可以使用复合写法
export { area, circumference } from './circle.js';
// 实际上这里的模块没有被真正的导入,只是被转发了而已
// console.log(area(1)); // area is not defined;