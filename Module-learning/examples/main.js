// 大括号内的变量名,必须与被导入模块对外接口名称相同
import {firstName, lastName, year} from './profile.js';
// 如果想为输入的变量重新取一个名字,import 命令要使用as关键字
import {lastName as surname} from './profile.js';

import {year as age} from './profile.js';

// import 命令输入的变量都是只读的,对其重新赋值就会报错,因为year是一个只读的接口,
// 但是如果year是一个对象,那么改写其属性是可以的
// 但是尽管可以改写其属性,但是其他模块也可以读到改写后的值,这种写法不容易查询错误
// age = 1111; //  "age" is read-only

// import 命令具有提升效果,会提升到整个模块的头部
console.log(multiply(1, 2));
import {multiply} from './profile.js';

// 由于import 是静态执行,所以不能使用表达式和变量,这些只有在运行时才能得到结果的语法结构
// import {'f' + 'oo'} from 'my_module';