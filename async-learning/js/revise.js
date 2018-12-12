/* Iterator
-------------------------- */
// 1.统一了数据结构的遍历接口
// 2.可以修改数据遍历的次序以及方式
// 3.为for..of循环所消费

/* Generator
-------------------------- */
// 1.异步的同步化表达
// 2.控制流管理
// 3.做为数据结构使用

/* async
-------------------------- */
// ！就是Generator的语法糖
// 1.async内置执行器，不需要像Generator函数使用co模块,直接调用即可
// 2.更好的语义，async就是表示函数中有异步操作，await表示紧跟后面的表达式需要等待结果
// 3.更广的适用性，yield后面只能是Thunk函数或者Promise对象,而await命令后面可以是Promise和原生类型
// 4.返回值是Promise,比Generator函数返回的Iterator方便多了

// 使用注意点！！！
// 1.async函数中await命令可以会出现异常，需要用try...catch处理
// async function f() {
//   await Promise.reject('出错了')
//   .catch(e => console.log(e));
//   return await Promise.resolve('hello');
// }

// f()
// .then(
//   function(v) {
//     console.log(v);
//   },
//   function(e) {
//     console.log(e);
//   }
// )

// 2.多个await命令后面的异步操作，如果不存在继发关系，最好让其同时触发
function timeout(value) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(value);
    }, 1000);
  });
}

// ---a. 同时并发调用timeout方法

async function f() {
  let [foo, bar] = await Promise.all([timeout('a'), timeout('b')]);
  await console.log(foo);
  await console.log(bar);
}

// ---b. 继发调用timeout方法

async function f() {
  let a = await timeout('a');
  console.log(a);
  let b = await timeout('b');
  console.log(b);
}

// 3.async实现原理
function fn(args) {
  return spawn(function* () {

  });
}

spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      },function (e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}

// 4.实现假定某个DOM元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。
// 如果其中有一个动画出错，就不在往下执行，返回上一个成功执行的动画的返回值
// ---a.Promise
function chainAnimationsPromise(elem, animations) {
  let ret = null;
  let p = Promise.resolve();

  for(let anim of animations) {
    p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  return p.catch(e => {

  }).then(function() {
    return ret;
  })
}

// ---b.Generator
function chainAnimationsPromise(elem, animations) {

  return spawn(function* () {
    let ret = null;

    try {
      for(let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {

    }
    return ret;
  })
}

// ---c.async
async function chainAnimationsPromise(elem, animations) {
  let ret = null;

  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {

  }
  return ret;
}