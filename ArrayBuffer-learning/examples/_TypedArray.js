// // 数据类型     字节长度
// // Int8        1
// // Uint8       1
// // Uint8C      1
// // Int16       2
// // Uint16      2
// // Int32       4
// // Uint32      4
// // Float32     4
// // Float64     8

// // TypedArray 数组提供9种构造函数，用来生成相应类型的数组实例。
// // 1.TypedArray(buffer, byteOffer=0, length?)

// // 创建一个8字节的ArrayBuffer
// const b = new ArrayBuffer(8);

// // 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
// const v1 = new Int32Array(b);
// console.log(v1.length); // 2

// // 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
// const v2 = new Uint8Array(b, 2);
// console.log(v2.length); // 6

// // 创建一个指向b的Int16视图，开始于字节2，长度为2
// const v3 = new Int16Array(b, 2, 2);
// console.log(v3.length); // 2

// // TypedArray(length)
// // 视图还可以不通过ArrayBuffer对象，直接分配内存而生成
// const f64a = new Float64Array(8);
// f64a[0] = 10;
// f64a[1] = 20;
// f64a[2] = f64a[0] + f64a[1];
// console.log(f64a);

// // TypedArray数组的构造函数，可以接受另一个TypedArray实例作为参数
// const typedArray = new Int8Array(new Uint8Array(4));

// // 此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的
// // 新数组会开辟一段新的内存存储数据，不会再原来数组的内存上建立视图
// // const x = new Int8Array([1, 1]);
// // const y = new Int8Array(x);
// // x[0]; // 1
// // y[0]; // 1
// // x[0] = 2;
// // y[0]; // 1

// // 如果想要基于同一段内存的话，可以采用以下写法
// // const x = new Int8Array([1, 1]);
// // const y = new Int8Array(x.buffer);
// // console.log(x[0]); // 1
// // console.log(y[0]); // 1
// // x[0] = 2;
// // console.log(y[0]); // 2

// // TypedArray数组和普通数组转换
// // var normalArray1 = [...typedArray];
// // console.log(normalArray1);

// // var normalArray2 = Array.from(typedArray);
// // console.log(normalArray2);

// // var normalArray3 = Array.prototype.slice.call(typedArray);
// // console.log(normalArray3);

// // TypedArray数组没有concat方法，如果想要合并多个TypedArray数组
// // 可以用下面的函数
// function concatenate(resultConstructor, ...arrays) {
//   let totalLength = 0;
//   for (let arr of arrays) {
//     totalLength += arr.length;
//   }
//   let result = new resultConstructor(totalLength);
//   let offset = 0;
//   for (let arr of arrays) {
//     result.set(arr, offset);
//     offset += arr.length;
//   }
//   return result;
// }

// var result = concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4));
// console.log(result)

// 每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性
// 表示这种数据类型占据的字节数
// Int8Array.BYTES_PER_ELEMENT; 1
// Uint8Array.BYTES_PER_ELEMENT; 1
// Uint8ClampedArray.BYTES_PER_ELEMENT; 1
// Int16Array.BYTES_PER_ELEMENT; 2
// Uint16Array.BYTES_PER_ELEMENT; 2
// Int32Array.BYTES_PER_ELEMENT; 4
// Uint32Array.BYTES_PER_ELEMENT; 4
// Float32Array.BYTES_PER_ELEMENT; 4
// Float64Array.BYTES_PER_ELEMENT; 8

// unit8是一个8位视图，而256的二进制是9位的值，这样就会发生溢出
// 根据视图的规则，只会保留后8位，即最终为0
// const uint8 = new Uint8Array(1);
// uint8[0] = 256;
// console.log(uint8[0]); // 0

// // -1的补码为8个1，根据无符号的8位整数解释就是255
// uint8[0] = -1;
// console.log(uint8[0]); // 255

// const int8 = new Int8Array(1);

// int8[0] = 128;
// console.log(int8[0]); // -128

// int8[0] = -129;
// console.log(int8[0]); // 127

// // Uint8ClampedArray视图溢出与上面的规则不同，它规定
// // 凡是发生正向溢出，该值一律等于当前数据类型的最大值，255
// // 如果发生负溢出，该值一律等于当前数据类型的最小值，0
// const uint8c = new Uint8ClampedArray(1);
// uint8c[0] = 256;
// console.log(uint8c[0]); // 255

// uint8c[0] = -1;
// console.log(uint8c[0]); // 0

// set方法表示整段内存的复制
// const a = new Uint8Array(8);
// const b = new Uint8Array(8);
// b.set(a);

// // set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象
// const a16 = new Uint16Array(8);
// const b16 = new Uint16Array(10);
// b16.set(a16, 2);

// subarray方法是对于TypedArray数组的一部分，再建立一个新的视图
// const a = new Uint16Array(8);
// const b = a.subarray(2, 3);
// a.byteLength; // 16
// b.byteLength; // 2

// TypedArray 数组的所有的构造函数
// 都有一个静态方法of,用于将参数转为一个TypedArray实例
// Float32Array.of(0.151, -8, 3.7); // [0.151, -8, 3.7]

// 静态方法TypedArray.from接受一个可遍历的数据结构作为参数
// Int8Array.of(127, 126, 125).map(x => 2 * x); // -2 -4 -6

// from方法没有发生溢出，说明遍历不是针对原来的8位整数数组
// Int16Array.from(Int8Array.of(127, 126, 125), x => 2 * x); // 254 252 250
