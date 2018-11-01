// 最简单的promise雏形
// function Promise(fn) {
//   var state = 'pending';
//   var value = null;
//   var callback = [];

//   this.then = function(onFulfilled) {
//     if (state === 'pending') {
//       callback.push(onFulfilled);
//       return this;
//     }

//     onFulfilled(value);
//     return this;
//   }

//   function resolve(newValue) {
//     value = newValue;
//     state = 'fulfilled';
//     setTimeout(function () {
//       callback.forEach(function (callback) {
//         callback(value);
//       })
//     }, 0);
//   }

//   fn(resolve);
// }



// // 链式Promise版本
// function Promise(fn) {
//   var state = 'pending',
//       value = null,
//       callbacks = [];

//   this.then = function (onFulfilled) {
//       return new Promise(function (resolve) {
//           handle({
//               onFulfilled: onFulfilled || null,
//               resolve: resolve
//           });
//       });
//   };

//   function handle(callback) {
//       if (state === 'pending') {
//           callbacks.push(callback);
//           return;
//       }
//       //如果then中没有传递任何东西
//       if(!callback.onFulfilled) {
//           callback.resolve(value);
//           return;
//       }

//       var ret = callback.onFulfilled(value);
//       callback.resolve(ret);
//   }

  
//   function resolve(newValue) {
//       if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
//           var then = newValue.then;
//           if (typeof then === 'function') {
//               then.call(newValue, resolve);
//               return;
//           }
//       }
//       state = 'fulfilled';
//       value = newValue;
//       setTimeout(function () {
//           callbacks.forEach(function (callback) {
//               handle(callback);
//           });
//       }, 0);
//   }

//   fn(resolve);
// }

// let promise = new Promise(function(resolve) {
//   resolve(123);
// })
//   .then(function(resolve) {
//     console.log(resolve + 1);
//   })

// setTimeout(function() {
//   promise.then(function (resolve) {
//     console.log('aa');
//   })
// }, 2000)

// var maybeOneOneSecondLater = function() {
//   var callback;
//   setTimeout(function() {
//     callback(1);
//   }, 1000);

//   return {
//     then: function(_callback) {
//       callback = _callback;
//     }
//   }
// }

// maybeOneOneSecondLater().then(console.log);
// 
let defer = () => {
  let pending = [];
  let value;

  return {
    resolve(_value) {
      if (pending) {
        value = _value;
        for (let i = 0; i < pending.length; i++) {
          pending[i](value)
        }
        pending = undefined;
      } else {
        throw new Error("A promise can only be resolved once.");
      }
    },
    promise: {
      then(_callback) {
        if (pending) {
          pending.push(_callback)
        } else {
          _callback();
        }
      }
    }
  }
}

let ref = (value) => {
  if (value && typeof value.then === 'function') return value;

  return {
    then(callback) {
      return ref(callback(value));
    }
  }
}


let oneOneSecondLater = () => {
  let result = defer();
  setTimeout(() => {
    result.resolve(1);
  }, 1000);
  return result;
}

oneOneSecondLater().then(console.log);