//加一个Promise练习的网址 https://www.cnblogs.com/XieJunBao/p/6367393.html
// const READY = "0";
// const SLEEPING = "1";
// const SLEEPINGFIRST = "2";
// var targets = [];
// var status = READY;
// var sleepTime = 0;

// function LazyMan(name) {
//   targets = [];
//   status = READY;
//   sleepTime = 0;
//   return new _lazyMan(name);
// }



// function _lazyMan(name) {
  
//   this.sleep = function(time) {
//     status = SLEEPING;
//     targets.push(function() {
//       console.log('Wake up after' + time);
//     });
//     sleepTime = time * 1000;
//     return this;
//   }
//   this.eat = function(food) {
//     if (status === SLEEPING || status === SLEEPINGFIRST) {
//       targets.push(function() {
//         console.log("Eat" + food + "~");
//       })
//     } else if (status === READY){
//       var et = setTimeout(function() {
//         console.log("Eat" + food + "~");
//       }, 0);
//     }
//     return this;
//   }

//   this.sleepFirst = function(time) {
//     status = SLEEPINGFIRST;
//     targets.push(function() {
//       console.log('Wake up after' + time)
//     });
//     sleepTime = time * 1000;
//     return this;
//   }

//   doResolve(name);
// }

// function doResolve(name) {
//   var t = setTimeout(function() {
//     if (status === SLEEPING) {
//       console.log(name);
//       var ct = setTimeout(function() {
//         targets.forEach(val => {
//           val();
//         })
//       }, sleepTime);
//     } else if (status === SLEEPINGFIRST) {
//       var oct = setTimeout(function() {
//         console.log(name);
//         targets.forEach(val => {
//           val();
//         })
//       }, sleepTime);
//     } else {
//       console.log(name);
//     }
//   }, 0);
// // }
// var tasks = [];

// function LazyMan(name) {
//   return new _lazyMan(name);
// }

// function _lazyMan(name) {
//   var that = this;

//   this.next = function() {
//     var fn = tasks.shift();
//     fn && fn();
//   }
//   this.sleep = function(time) {
//     var that = this;
//     tasks.push(function() {
//       setTimeout(function() {
//         console.log('Wake up after' + time)
//         that.next();
//       }, time * 1000)
//     });
//     return this;
//   }

//   this.eat = function(food) {
//     var that = this;
//     tasks.push(function() {
//       console.log("Eat" + food + "~");
//       that.next();
//     })
//     return this;
//   }

//   this.sleepFirst = function(time) {
//     tasks.unshift(function() {
//       setTimeout(function() {
//         console.log('Wake up after' + time)
//         that.next();
//       }, time * 1000);
//     })
//     return this;
//   }
//   tasks.push(function() {
//     console.log(name);
//     that.next();
//   });

//   setTimeout(function() {
//     that.next();
//   }, 0);
// }

// var tasks = [];

// function LazyMan(name) {
//   return new _lazyMan(name);
// }

// function _lazyMan(name) {
//   var that = this;
//   this.next = function() {
//     var fn = tasks.shift();
//     fn && fn();
//   }

//   this.eat = function(food) {
//     tasks.push(() => {
//       console.log(food);
//       this.next();
//     });
//     return this;
//   }

//   this.sleep = function(time) {
//     tasks.push(() => {
//       setTimeout(function() {
//         console.log('wait' + time + '秒');
//         that.next();
//       }, time * 1000)
//     })
//     return this;
//   }

//   this.sleepFirst = function(time) {
//     tasks.unshift(() => {
//       setTimeout(function() {
//         console.log('wait' + time + '秒');
//         that.next();
//       }, time * 1000)
//     });
//     return this;
//   }

//   tasks.push(function() {
//     console.log(name);
//     that.next();
//   })

//   setTimeout(function() {
//     that.next();
//   }, 0);
// }
// (function() {
//   return function() {
//     return function(x) {
//       console.log(x);
//     };
//   }
// })()()(1);
// 
// 
// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//     console.log(i)
//   }, 0);


// function LazyMan(name) {
//   return new _lazyMan(name);
// }

// function _lazyMan(name) {
//   let tasks = [];
//   let self = this;
//   this.eat = function(food) {
//     tasks.push(function() {
//       console.log(`吃${food}`);
//       self.next();
//     })
//     return this;
//   }

//   this.sleep = function(time) {
//     tasks.push(function() {
//       setTimeout(function() {
//         console.log(`休息了${time * 1000}毫秒`);
//         self.next();
//       }, time * 1000);
//     });
//     return this;
//   }

//   this.sleepFirst = function(time) {
//     tasks.unshift(function() {
//       setTimeout(function() {
//         console.log(`插队休息了${time * 1000}毫秒`);
//         self.next();
//       }, time * 1000)
//     })
//     return this;
//   }
//   this.next = function() {
//     if (tasks.length > 0) {
//       let fn = tasks.shift();
//       fn & fn();
//     }
//   }
//   tasks.push(function() {
//     console.log(`我叫${name}`);
//     self.next();
//   });

//   setTimeout(function() {
//     self.next();
//   })
// }

// function LazyMan(name) {
//   return new _lazyMan(name);
// }

// function _lazyMan(name) {
//   var tasks = [];
//   var ctx = this;

//   this.next = function() {
//     if (tasks.length === 0) return;
//     var fn = tasks.shift();
//     fn && fn();
//   }

//   this.eat = function(food) {
//     tasks.push(function() {
//       console.log(`吃了${food}`);
//       ctx.next();
//     });
//     return this;
//   }
//   this.sleep = function(time) {
//     tasks.push(function() {
//       setTimeout(function() {
//         console.log(`睡了${time * 1000} 秒`);
//         ctx.next();
//       }, time * 1000);
//     });
//     return this;
//   }
//   this.sleepFirst = function(time) {
//     tasks.unshift(function() {
//       setTimeout(function() {
//         console.log(`先睡了${time * 1000} 秒`);
//         ctx.next();
//       });
//     });
//     return this;
//   }

//   tasks.push(function() {
//     console.log(name);
//     ctx.next();
//   });

//   setTimeout(function() {
//     ctx.next();
//   }, 0)
// }