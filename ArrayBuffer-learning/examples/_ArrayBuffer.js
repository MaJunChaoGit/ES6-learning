// // ArrayBuffer对象代表存储二进制数据的一段内存，它不能直接读写，只能通过视图
// // TypedArray视图和DataView视图来读写，
// // 视图的作用是以指定格式解读二进制数据

// // ArrayBuffer额是一个构造函数，可以分段一段可以存放数据的连续内存区域
// const buf = new ArrayBuffer(32);
// // 为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供
// // ArrayBuffer对象实例作为参数
// const dataView = new DataView(buf);
// dataView.getUint8(); // 0

// // 另外一种TypedArray视图,与DataView视图的一个区别是
// // 它不是一个构造函数，而是一组构造函数，代表不同的数据格式
// const buff = new ArrayBuffer(12);
// const x1 = new Int32Array(buff);
// x1[0] = 1;
// const x2 = new Uint8Array(buff);
// x2[0] = 2;

// // 由于两个视图对应的同一段内存，一个视图修改底层内存，会影响到另一个视图
// console.log(x1[0]); // 2

// // TypedArray视图的构造函数，除了接受ArrayBuffer实例做为参数
// // 还可以接受普通数组作为参数直接分配内存生成底层的ArrayBuffer实例
// // 并同时完成对这段内存的赋值
// const typedArray = new Uint8Array([0, 1, 2]);
// typedArray.length; // 3
// typedArray[0] = 5;
// typedArray; // [5, 1, 2]

// // ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度
// const buffer = new ArrayBuffer(32);
// console.log(buffer.byteLength);
// // 如果要分配内存很大，有可能分配失败，所以有必要检查是否分配成功
// // if (buffer.byteLength === 32) {
// //   // success
// // } else {
// //   // failed
// // }

// // ArrayBuffer实例有一个slice方法
// // 允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象
// const slice_buffer = new ArrayBuffer(8);
// // 1.首先slice会先分配内存
// // 2.其次会拷贝数据
// // 除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法
// // 只允许在其上方建立视图，然后通过视图读写
// const newBuffer = slice_buffer.slice(0, 3);

// // ArrayBuffer有一个静态方法isView,返回一个布尔值，表示参数是否为
// // ArrayBuffer的视图实例

// console.log(ArrayBuffer.isView(slice_buffer)); // false
// const v = new Int32Array(slice_buffer);
// console.log(ArrayBuffer.isView(v)); // true

// ArrayBuffer与字符串互相转换
// function ab2str(buf) {
//   if (buf && buf.byteLength < 1024) {
//     return String.fromCharCode.apply(null, new Uint16Array(buf));
//   }
//   const bufView = new Uint16Array(buf);
//   const len = bufView.length;
//   const bstr = new Array(len);

//   for (let i = 0; i < len; i++) {
//     bstr[i] = String.fromCharCode.call(null, bufView[i]);
//   }
//   return bstr.join('');
// }

// function str2ab(str) {
//   const buf = new ArrayBuffer(str.length * 2);
//   const bufView = new Uint16Array(buf);
//   for (let i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }
