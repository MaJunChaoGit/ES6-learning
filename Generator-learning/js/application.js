  // 异步函数的处理方法
  
  /* 回调函数
  -------------------------- */

  // 这里重点是Node的回调默认第一个参数是Error
  // 是因为第一段任务完成后，执行的上下文就找不到了
  // 原来的上下文环境没有办法继续捕捉，只能传入第二段了
 
  // fs.readFile('/ete/passwd', 'utf-8', function(err, data) {
  //   if (err) throw err;
  //   console.log(data);
  // });

  /* Promise
  -------------------------- */
  // 回调函数的代码不是纵向发展，而是横向发展，一旦多了就会乱成一团
  // Promise不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套
  // 改成链式的调用

  // Promise的写法比较冗余，一眼看上去全是then的调用，语义化不明显
  // var readFile = function (filename) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       resolve(request(filename));
  //     } catch(err) {
  //       reject(err);
  //     }
  //   });
  // };
  // readFile('file.txt')
  //   .then(function(data) {
  //     console.log(data.toString());
  //   })
  //   .then(function() {
  //     return readFile('img.jpg');
  //   })
  //   .then(function(img) {
  //     load(img);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })

  /* Generator
  -------------------------- */
  // 传统的编程语言其中有一种异步编程的解决方案，叫做"协程"
  // 异步操作中需要暂停的地方，都可以用yield语句注明
  // function* readFile(filename) {
  //   // ...其他代码
  //   var f = yield readFile(filename);
  //   // ...其他代码
  // }

  // var read = readFile('test.txt');

  // read.next(); // 加载第一部分的其他代码

  // read.next(); // 加载文件
  
  // Generator通过yield表达式向外输出数据
  // 通过next()传入参数可以向Generator函数传入数据
  // function* gen(x) {
  //   var y = yield x + 2;
  //   return y;
  // }

  // var g = gen(2);

  // g.next();  // 3  计算(yield x + 2)
  // g.next(2); // 2  将上次yield表达式赋值为2, return 2
  
  // Generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误
  // function* gen(x) {
  //   try {
  //     var y = yield x + 2;
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return y;
  // }

  // var g = gen(2);
  // g.next();
  // g.throw('出差错了');
  
  // 异步任务的封装
  // 可以看见异步函数表示的很简洁，但是流程管理却不方便
  // var fetch = require('node-fetch');

  // function* gen() {
  //   var url = 'https://api.baidu.com/users';
  //   var result = yield fetch(url);
  //   console.log(result.bio);
  // }
  // var g = gen();
  // var result = g.next();

  // result.value.then(function(data) {
  //   return data.json();
  // }).then(function(data) {
  //   g.next(data);
  // });

