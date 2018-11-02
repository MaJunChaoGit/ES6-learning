const PENDNG = 0;
const FULFILLED = 1;
const REJECTED = 2;;

function Promise(fn) {
  debugger
  // 存储该 Promise 的状态信息
  let state = PENDNG;
  // 存储 FULFILLED 或 REJECTER 时带来的数据
  let value = null;
  // 存储 then 或 done 时调用的成功或失败回调
  let handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }

  function resolve(result) {
    try {
      let then = getThen(result)
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      }
      fulfill(result)
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    if (state === PENDNG) {
      handlers.push(handler);
    } else {
      if ((state === FULFILLED) && (typeof handler.onFulfilled === 'function')) {
        handler.onFulfilled(value);
      }

      if ((state === REJECTED) && (typeof handler.onRejected === 'function')) {
        handler.onRejected(value);
      }
    }
  }

  this.done = function(onFulfilled, onRejected) {
    setTimeout(function() {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0)
  }

  this.then = function(onFulfilled, onRejected) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      return _this.done(function(result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result));
          } catch (ex) {
            return reject(error);
          }
        } else return resolve(result);
      }, function(error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error));
          } catch (ex) {
            return reject(ex);
          }
        } else return reject(error);
      })
    })
  }
  doResolve(fn, resolve, reject);
}

/**
 * 检查一个值是否为 Promise
 * @Author   MJC
 * @DateTime 2018-11-02
 */
function getThen(value) {
  let t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    const then = value.then;
    if (typeof then === 'function') return then;
  }
  return null;
}

function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  try {
    fn(function (value) {
      if (done) return;
      done = true;
      onFulfilled(value);
    }, function(reason) {
      if (done) return;
      done = true;
      onRejected(reason);
    })
  } catch (ex) {
    if (done) return;
    done = true;
    onRejected(ex);
  }
}
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
// let defer = () => {
//   let pending = [];
//   let value;

//   return {
//     resolve(_value) {
//       if (pending) {
//         value = _value;
//         for (let i = 0; i < pending.length; i++) {
//           pending[i](value)
//         }
//         pending = undefined;
//       } else {
//         throw new Error("A promise can only be resolved once.");
//       }
//     },
//     promise: {
//       then(_callback) {
//         if (pending) {
//           pending.push(_callback)
//         } else {
//           _callback();
//         }
//       }
//     }
//   }
// }

// let ref = (value) => {
//   if (value && typeof value.then === 'function') return value;

//   return {
//     then(callback) {
//       return ref(callback(value));
//     }
//   }
// }


// let oneOneSecondLater = () => {
//   let result = defer();
//   setTimeout(() => {
//     result.resolve(1);
//   }, 1000);
//   return result;
// }

// oneOneSecondLater().then(console.log);
// 


