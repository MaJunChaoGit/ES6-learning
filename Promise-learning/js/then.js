const getJson = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.readyState === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  });
  return promise;
}

// 1.then方法是定义在原型对象Promise.prototype上的
// getJson("../json/test.json").then(function(json) {
//   return json.testl
// }).then(test => {
//   console.log(test);
// });
// 2.如果前一个then中返回还是Promise对象,这时后面一个then中等待Promise
// 的状态变化后将会调动分别的方法
// getJson("../json/test.json").then(
//   post => getJson(post.commentURL)
// ).then(
//   comments => console.log('resolve'),
//   err => console.log('reject')
// );