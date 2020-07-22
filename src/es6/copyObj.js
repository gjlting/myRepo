// 浅拷贝
// 1.赋值
const obj = { a: {a: "hello"}, b: 33 };
const obj1 = obj
obj1.b = 22
console.log(obj, obj1)

// 2.Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
const obj2 = {
  a: 1,
  b: 2,
  c: 3
};
 
const obj3 = Object.assign({c: 4, d: 5}, obj2);
obj3.a = 2
//这是浅拷贝，返回的不是一个新对象，而是把一个或多个源对象添加到目标对象
console.log(obj3, obj2);

// 3.解构赋值
const obj4 = {
  a: 1,
  b: 2,
  // c: {a:1,b:2}
};
const obj5 = {...obj4}
obj5.a = 2
// 仿佛好像深拷贝，但是如果object1嵌套了一层对象，就发现会互相影响了。
console.log(obj5, obj4)

const obj6 = {
  a: 1,
  b: 2,
  c: {a:1,b:2}
};
const obj7 = {...obj6}
obj6.a = 2
obj6.c.a = 2
console.log(obj7, obj6)

// 深拷贝
// 1.JSON.parse(JSON.stringify(obj))是最简单粗暴的深拷贝，能够处理JSON格式的所有数据类型，但是对于正则表达式类型、函数类型等无法进行深拷贝.
const obj8 = {
  a: 1,
  b: 2,
  c: {a:1,b:2}
}
const obj9 = JSON.parse(JSON.stringify(obj8))
obj9.c.a = 9
console.log(obj9, obj8)

// 2.使用loadash
var _  = require('lodash')
const obj10 = {
  a: 1,
  b: 2,
  c: {a:1,b:2}
}
const obj11 = _.cloneDeep(obj10) // clone是浅拷贝
obj11.c.a = 10
console.log(obj11,obj10)



