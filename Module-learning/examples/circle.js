export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}

// 如果要一次整体import的可以使用以下写法
// import * as circle from './circle';