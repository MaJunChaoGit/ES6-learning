// 模拟迭代器方法
function makeIterator(array) {
  var index = 0;
  return {
    next: function() {
      var isOutof = index >= array.length;
      return {
        value: !isOutof ? array[index++] : undefined,
        done: isOutof
      };
    }
  }
}

// 默认的迭代器接口

var obj = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: 1,
          done: true
        }
      }
    }
  }
}
// 在一个类中部署迭代器
class RangeInterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() {
    return this;
  }

  next() {
    let value = this.value;
    if (value <= this.stop) {
      this.value++;
      return {
        value: value,
        done: false
      }
    }
    return {
      value: undefined,
      done: true
    }
  }
}

// 让一个类中所有的对象具备迭代器接口
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  let current = this;
  let iterator = {
    next: next
  };

  function next() {
    if (current) {
      let value = current.value;
      current = current.next;
      return {
        value: value,
        done: false
      }
    }
    return {
      value: undefined,
      done: true
    }
  }

  return iterator;
}

// 覆盖字符串原生的Symbol.iterator

var str = new String('abc');

str[Symbol.iterator] = function() {
  return {
    next: function() {
        if (this._first) {
          this._first = false;
          return {value: 'hi',done: false}
        } else {
           return {done: true}
        }
      },
    _first: true
  }
}

// 使用迭代器接口汇总的return()方法控制
function returnFunc() {
  let index = 0;
  return {
    [Symbol.iterator]: function() {
      return {
        next: function() {
          if (index < 1000) {
            return {value: index++, done: false}
          }
          return {done: true}
        },
        return: function() {
          console.log('结束了') // 当迭代break时,或者抛出错误时,将会进入return方法
          return {
            done: true
          }
        }
      }
    }
  }
}