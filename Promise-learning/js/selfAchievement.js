  function Promise(fn) {
    var value = null;
    var status = 'pending';

    this.then = function(callback) {
      if (status === 'fulfilled') {
        value = callback(value);
        return new Promise(function(resolve, reject) {
          resolve(value);
        })
      }
    }

    this.resolve = function(newValue) {
      status = 'fulfilled'
      if (value !== newValue) value = newValue;
      // setTimeout(() => {
      // }, 0);
    }

    fn(this.resolve);
  }

  let promise = new Promise(function(resolve, reject) {
    resolve(123);
  })

    promise.then(function(resolve) {
      console.log(resolve);
      return resolve + 1;
    })
    .then(function(resolve) {
      console.log(resolve);
      return resolve + 1;
    })
    .then(function(resolve) {
      console.log(resolve);
      return resolve + 1;
    }) 

    setTimeout(function() {
      promise.then(function(resolve) {
        console.log(resolve);
        return resolve + 1;
      })
    }, 1000)