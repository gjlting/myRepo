import vue from 'vue'
import toastComponent from './toast/Toast'

// 创建一个构造器
const ToastConstructor = vue.extend(toastComponent)

// 定义函数，接收两个参数，要显示的文本和时间
function showToast(text, duration = 3000) {
  // 实例化一个toast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data(){
      return {
        text: text,
        showWrap: true, // 是否显示组件
        showContent: true // 作用：在隐藏组件之前，显示隐藏动画
      }
    }
  })

  // 把实例化的toast.vue添加到body里
  document.body.appendChild(toastDom.$el)
    // 提前250ms执行淡出动画(因为在css里面设置的隐藏动画持续是250ms)
    setTimeout(() => {
      toastDom.showContent = false
    },duration - 250)
    // 过了duration时间后隐藏整个组件
    setTimeout(() => {
      toastDom.showWrap = false
    },duration)
}

// 注册为全局的函数
function registryToast() {
  // 将组件注册到vue的原型链里去，在所有vue组件里使用this.$toast()
  vue.prototype.$toast = showToast
}

export default registryToast