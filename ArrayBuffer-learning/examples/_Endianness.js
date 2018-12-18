// const buffer = new ArrayBuffer(16);
// const int32View = new Int32Array(buffer);
// const int16View = new Int16Array(buffer);
// for (let i = 0; i < int32View.length; i++) {
//   int32View[i] = i * 2;
// }
// // int32View: 0 2 4 6
// for (let i = 0; i < int16View.length; i++) {
//   console.log('Entry ' + i + ': ' + int16View[i]);
// }
// // Entry 0: 0
// // Entry 1: 0
// // Entry 2: 2
// // Entry 3: 0
// // Entry 4: 4
// // Entry 5: 0
// // Entry 6: 6
// // Entry 7: 0

// // 由于每个 16位整数占据2个字节，所以整个ArrayBuffer对象现在分成8段
// // 由于x86体系的计算机都采用小端字节序（little endian）
// // 相对重要的字节排在后面的内存地址

// // 下面假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
// const buffer_4 = new ArrayBuffer(4);
// const v1 = new Uint8Array(buffer_4);
// v1[0] = 2;
// v1[1] = 1;
// v1[2] = 3;
// v1[3] = 7;

// const uInt16View = new Uint16Array(buffer_4);

// // 计算机采用小端字节序
// // 所以头两个字节等于258
// console.log(uInt16View[0] === 258); // true
// // 0x0102 0x0703
// uInt16View[0] = 255;

// // 赋值运算
// uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
// uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
// uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]

// // 下面的函数可以用来判断，当前视图是小端字节序，还是大端字节序
// const BIG_ENDIAN = Symbol('BIG_ENDIAN');
// const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

// function getPlatformEndianness() {
//   let arr32 = Uint32Array.of(0x12345678);
//   let arr8 = new Uint8Array(arr32.buffer);
//   switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) +(arr8[3])) {
//     case 0x12345678:
//       return BIG_ENDIAN;
//     case 0x78563412:
//       return LITTLE_ENDIAN;
//     default:
//       throw new Error('Unknow endianness');
//   }
// }

// console.log(getPlatformEndianness());
