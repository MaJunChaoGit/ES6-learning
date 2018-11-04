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
// }
var tasks = [];

function LazyMan(name) {
  return new _lazyMan(name);
}

function _lazyMan(name) {
  var that = this;

  this.next = function() {
    var fn = tasks.shift();
    fn && fn();
  }
  this.sleep = function(time) {
    var that = this;
    tasks.push(function() {
      setTimeout(function() {
        console.log('Wake up after' + time)
        that.next();
      }, time * 1000)
    });
    return this;
  }

  this.eat = function(food) {
    var that = this;
    tasks.push(function() {
      console.log("Eat" + food + "~");
      that.next();
    })
    return this;
  }

  this.sleepFirst = function(time) {
    tasks.unshift(function() {
      setTimeout(function() {
        console.log('Wake up after' + time)
        that.next();
      }, time * 1000);
    })
    return this;
  }
  tasks.push(function() {
    console.log(name);
    that.next();
  });

  setTimeout(function() {
    that.next();
  }, 0);
}