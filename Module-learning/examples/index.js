import * as profile from './profile.js';
// import './main.js';
import './import-export.js';
// CommonJS 和 AMD 模块都是在运行时确定模块的依赖关系
// 前者服务于服务器,后者用于浏览器
// let { all, any, concat } = require('async');
// console.log(all);
// console.log(any);
// console.log(concat);

// ES6模块化设计思想是尽量的静态化,使得编译时就能确定模块的依赖关系
// import { all, any, concat } from 'async';
// console.log(all);
// console.log(any);
// console.log(concat);

// 总结一下就是CommonJS和AMD实际上是以对象的形式进行加载的,它实际上加载了一些不需要的方法
// ES6模块本身不是对象,在编译时就完成模块加载,效率要比CommonJS加载方式高

// export 参见 profile.js
console.log(profile);
var a = './main.js';
if (true) {
  import(a)
}