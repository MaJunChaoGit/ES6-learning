// 数据类型     字节长度
// Int8        1
// Uint8       1
// Uint8C      1
// Int16       2
// Uint16      2
// Int32       4
// Uint32      4
// Float32     4
// Float64     8

// TypedArray 数组提供9种构造函数，用来生成相应类型的数组实例。
// 1.TypedArray(buffer, byteOffer=0, length?)

// 创建一个8字节的ArrayBuffer
const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);
console.log(v1.length); // 2

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);
console.log(v2.length); // 6

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);
console.log(v3.length); // 2

// TypedArray(length)
// 视图还可以不通过ArrayBuffer对象，直接分配内存而生成
const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];
console.log(f64a);

// TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数
const typedArray = new Int8Array(new Uint8Array(4));

// 此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的
// 新数组会开辟一段新的内存存储数据，不会再原来数组的内存上建立视图
// const x = new Int8Array([1, 1]);
// const y = new Int8Array(x);
// x[0]; // 1
// y[0]; // 1
// x[0] = 2;
// y[0]; // 1

// 如果想要基于同一段内存的话，可以采用以下写法
// const x = new Int8Array([1, 1]);
// const y = new Int8Array(x.buffer);
// console.log(x[0]); // 1
// console.log(y[0]); // 1
// x[0] = 2;
// console.log(y[0]); // 2

// TypedArray数组和普通数组转换
// var normalArray1 = [...typedArray];
// console.log(normalArray1);

// var normalArray2 = Array.from(typedArray);
// console.log(normalArray2);

// var normalArray3 = Array.prototype.slice.call(typedArray);
// console.log(normalArray3);

// TypedArray数组没有concat方法，如果想要合并多个TypedArray数组
// 可以用下面的函数
function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

var result = concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4));
console.log(result)