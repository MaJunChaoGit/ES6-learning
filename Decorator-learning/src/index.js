// // 修改类的注解
// import {mixins} from './mixins.js';

// // 注解如何对类进行修饰
// @testable
// class MyTestableClass {
//   // ...
// }
// function testable(target) {
//   target.isTestable = true;
// }
// MyTestableClass.isTestable // true

// // 转为正常写法就是
// MyTestableClass = testable(MyTestableClass) || MyTestableClass;

// // 如果注解一个参数不够用可以再次封装一层

// function enclosure(isDecorator) {
//   return function(target) {
//     target.isDecorator = isDecorator;
//   }
// }

// @enclosure(true)
// class Test {

// }

// // 使用注解调用外部文件
// const Foo = {
//   foo() { console.log('foo') }
// };
// @mixins(Foo)
// class myClass {}
// var myclass = new myClass();
// myclass.foo();

// // 修改函数的注解
// class Person {
//   constructor() {
//     this.first = 'ma';
//     this.last = 'junchao';
//   }

//   @readonly
//   name() { return `${this.first} ${this.last}` }
// }

// function readonly(target, name, descriptor) {
//   descriptor.writable = false;
//   return descriptor;
// }

// var a = new Person();
// a.name = 123; //Cannot assign to read only property 'name' of object '#<Person>'

class Person {
  @nonenumerable
  get kidCount() { return this.children.length }
}