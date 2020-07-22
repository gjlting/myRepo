// es6常用方法
// 1.数组去重
  let arr = [1,2,3,4,3,5,6,2,6]
  let newArr = [...new Set(arr)]
  console.log(newArr)

// 2.使用箭头函数代替回调函数
  // ES5的写法
  let a1 = [1,2,3].map(function (x) {
            return x * x;
  });
  // ES6 箭头函数写法
  let a2 = [1,2,3].map(x => x * x);
  console.log(a1,a2);

// 3.合并数组
  console.log('合并数组')
  var arr1 = ['a', 'b'];
  var arr2 = ['c'];
  var arr3 = ['d', 'e'];

  // ES5的合并数组
  arr1.concat(arr2, arr3);
  // [ 'a', 'b', 'c', 'd', 'e' ]
  // ES6的合并数组
  var myArr = [...arr1, ...arr2, ...arr3]
  console.log(myArr)
  let myArr1 = myArr.filter(x => x!='a')
  console.log(myArr1)
  // [ 'a', 'b', 'c', 'd', 'e' ]

// 4.字符串反转
console.log('字符串反转')
  let str = "1234567890";
  //原始写法：
  str.split('').reverse().join('')
  // 展开写法：
  // let str1 = [...str]
  let str1 = [...str].reverse().join('')
  console.log(str1)

// 5.过滤需要的数值 和 获得计算后的数值
  //过滤：
  let array = ['a', '', 'b']
  let arr9 = array.filter(x => x!='')     // ['a','b']  
  console.log(arr9)  
  //计算：
  let arr4 = [1,2,3,4].map(x=>x+1);
  console.log(arr4);

// 6.数组降维 使用generator迭代器
console.log('数组降维 使用generator迭代器')
  var arr5 = [1, [[2, 3], 4], [5, 6]];
  var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
      var item = a[i];
      if (typeof item !== 'number') {
        yield* flat(item);
      } else {
        yield item;
      }
    }
  };

  for (var f of flat(arr5)) {
    console.log(f);
  }

  var arr6 = arr5.flat(Infinity)
  console.log(arr6)