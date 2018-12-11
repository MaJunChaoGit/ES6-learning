// 使用load方法读取数据
// self.addEventListener('message', (event) => {
//   const sharedArray = new Int32Array(event.data);
//   for (let i = 0; i < 10; i++) {
//     const arrayValue = Atomics.load(sharedArray, i);
//     console.log(`The item at array index ${i} is ${arrayValue}`);
//   }
// }, false);

// 将共享内存的偶数位置的值改成1，奇数位置的值改成2。
// self.addEventListener('message', (event) => {
//   const sharedArray = new Int32Array(event.data);
//   for (let i = 0;i < 10; i++) {
//     if (i % 2 === 0) {
//       const storedValue = Atomics.store(sharedArray, i, 1);
//       console.log(`The item at array index ${i} is now ${storedValue}`);
//     } else {
//       const exchangedValue = Atomics.exchange(sharedArray, i, 2);
//       console.log(`The item at array index ${i} was ${exchangedValue}, now 2`);
//     }
//   }
// }, false);

self.addEventListener('message', (event) => {
  const sharedArray = new Int32Array(event.data);
  const arrayIndex = 0;
  const expectedStoredValue = 50;
  Atomics.wait(sharedArray, arrayIndex, expectedStoredValue);
  console.log(Atomics.load(sharedArray, arrayIndex));
}, false);
