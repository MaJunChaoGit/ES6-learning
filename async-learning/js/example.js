// 按顺序完成异步操作
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(url => {
    const response = timeout(url);
    return response;
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

// 同步运行
// async function logInOrder(urls) {
//   for (const url of urls) {
//     const response = await timeout(url);
//     console.log(await response);
//   }
// }

function timeout(val) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(val);
    }, 1000);
  });
}