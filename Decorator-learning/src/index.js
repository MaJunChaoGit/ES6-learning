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

// // 类的方法的注解
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

// class Person {
//   constructor() {
//     this.children = ["1"];
//     this.kidCount = 1;
//   }
//   @nonenumerable
//   get kidCount() { return this.children.length }
//   set kidCount(value) {
//     return value;
//   }
// }
// function nonenumerable(target, name, descriptor) {
//   descriptor.enumerable = true;
//   return descriptor;
// }

// var a = new Person();
// for(let i in a) {
//   console.log(i);
// }

// 注解也有日志的作用
// class Math {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }

// function log(target, name, descriptor) {
//   var oldValue = descriptor.value;

//   descriptor.value = function() {
//     console.log(`Calling ${name} with`, arguments);
//     return oldValue.apply(this, arguments);
//   }

//   return descriptor;
// }

// const math = new Math();

// math.add(1,2);

// 如果同一个方法有多个注解,回像剥洋葱一样,先从外到内进入,然后由内向外执行
// function dec(id) {
//   console.log('evaluated', id);
//   return (target, property, descriptor) => console.log('executed', id);
// }

// class Example {
//   @dec(1)
//   @dec(2)
//   @dec(3)
//   method() {}
// }

// 如果注解作用于函数上的话,由于存在函数提升,实际执行顺序会出现错误
// var counter = 0;
// var add = function() {
//   counter++;
// }

// @add
// function foo() {

// }

import {autobind} from 'core-decorators';
import {readonly} from 'core-decorators';
import {override} from 'core-decorators';
import {deprecate} from 'core-decorators';
import {suppressWarnings} from 'core-decorators';

// autobind使用方法中的this对象,绑定原始对象
// class Person {
//   @autobind
//   getPerson() {
//     return this;
//   }
// }

// let person = new Person();
// let getPerson = person.getPerson;

// console.log(getPerson() === person);

// readonly使属性或方法不可写
// class Meal {
//   constructor() {
//     this.entree = '';
//   }
//   @readonly
//   get entree() {
//     return '1';
//   }
//   set entree(val) {
//     return val;
//   }
// }

// var dinner = new Meal();
// dinner.entree = 'salmon'; // : Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object

// override注解检查子类的方法,是否正确覆盖了父类的同名方法,如果不正确会报错
// class Parent {
//   speak(first, second) {}
// }

// class Child extends Parent {
//   @override
//   speak() {} // Child#speak() {} does not properly override Parent#speak(first, second) {}
// }

// deprecate会在控制台显示一条警告,表示该方法已经废除
// class Person {
//   @deprecate
//   facepalm() {}

//   @deprecate('We stopper facepalming')
//   facepalmHard() {}
// }

// let person = new Person();

// person.facepalm();

// person.facepalmHard();

//suppressWarnings会让deprecated修饰器导致的console.warn()

class Person {
  @deprecate
  facepalm() {}

  @suppressWarnings
  facepalmWithoutWarning() {
    this.facepalm()
  }
}

let person = new Person();
person.facepalmWithoutWarning();