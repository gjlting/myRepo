/* eslint-disable no-console */
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);

var lives = 7
var dog = {
  lives: 9,
  jumps: () => {
    console.log(this.lives)
    this.lives--
  }
}
function test () {
  console.log(this.lives)
  dog.jumps()
}
test()
console.log(dog.lives)
console.log(lives)
var cat = {
  lives: 9,
  jumps: function(){  
    this.lives--;
  }
}
cat.jumps()
console.log(cat.lives)