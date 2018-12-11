// // const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 100000);
// // const ia = new Int32Array(sab);
// // ia[42] = 191;
// // ia[37] = 163;
// // // 由于多线程环境下，共同操作共享内存时。执行语句的顺序可能被打乱
// // // Atomics的出现就是将操作转为原子性操作，避免线程的竞争
// // // store方法接受三个参数，SharedBuffer视图，位置索引，和值
// // // 返回sharedArray[idnex]的值
// // // load方法只接受两个参数，SharedBuffer视图，位置索引
// // // 也返回sharedArray[idnex]的值
// // // 主线程
// // ia[42] = 314159;
// // Atomics.store(ia, 37, 123456);

// // // worker线程
// // while (Atomics.load(ia, 37) == 163);
// // console.log(ia[37]); // 123456
// // console.log(ia[42]); // 314159
// 使用主线程写入数据，子线程读取数据
import Worker from './atomics.worker.js';

// const length = 10;
// const size = Int32Array.BYTES_PER_ELEMENT * length;
// const sharedBuffer = new SharedArrayBuffer(size);
// const sharedArray = new Int32Array(sharedBuffer);
// for (let i = 0; i < 10; i++) {
//   Atomics.store(sharedArray, i, 0);
// }
// let worker = new Worker();
// worker.postMessage(sharedBuffer);

const length = 10;
const size = Int32Array.BYTES_PER_ELEMENT * length;
const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);
for (let i = 0; i < 10; i++) {
  Atomics.store(sharedArray, i, 0);
}

const newArrayValue = 100;
Atomics.store(sharedArray, 0, newArrayValue);
const arrayIndex = 0;
const queuePos = 1;
Atomics.wake(sharedArray, arrayIndex, queuePos);
let worker = new Worker();
worker.postMessage(sharedBuffer);
