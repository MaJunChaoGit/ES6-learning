// 比较 async,Promise,Generator三种的区别
// 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
/* Promise
 -------------------------- */
function chainAnimationPromise(elem, animations) {
  let ret = null;
  let p = Promise.resolve();

  for (let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    })
  }
  return p.catch(function(e) {

  }).then(function() {
    return ret;
  })
}

// 代码中全是Promise的API,反而代码的语义不太容易看的出来

/* Generator
 -------------------------- */
function chainAnimationPromise(elem, animations) {
  return spawn(function* {
    let ret = null;
    try {
          for (let anim of animations) {
            ret = yield anim(elem);
          }
        } catch(e) {
          // statements
          console.log(e);
        }    
        return ret;
  });
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();

    function step(nextF) {
      let next;
      try {
        next = nextF;
      } catch(e) {
        return reject(e);
      }
      if (next.done) return resolve(next.value);
      Promise.resolve(next.value).then(
        function(v) {
          step(function() {
            return gen.next(v);
          });
        },
        function(e) {
          step(function() {
            return gen.throw(e);
          });
        }
      )
    }
    step(function() {
      return gen.next(undefined);
    })
  });
}

// 这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就是自动执行器，它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个 Promise。

/* async
 -------------------------- */
async function chainAnimationPromise(elem, animations) {
  let ret = null;
  try {
    for (let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    // statements
    console.log(e);
  }
  return ret;
}