  function Promise(fn) {
    var value = null;
    var status = 'pending';
    var callbacks = [];

    this.then = function(callback) {
      if (status === 'fulfilled') {
        value = callback(value);
      }
      callbacks.push(callback);
      return this;
    }

    this.resolve = function(newValue) {
      
      if (value !== newValue) value = newValue;
      setTimeout(() => {
        callbacks.forEach(func => {
          value = func(value);
        })
        status = 'fulfilled'
      }, 0);
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


    setTimeout(function() {
      promise.then(function(resolve) {
        console.log(resolve);
        return resolve + 1;
      })
    }, 2000)