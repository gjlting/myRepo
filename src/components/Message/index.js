import Vue from 'vue'
import Index from './Message.vue'

let messageInstance = null
let MessageConstructor = Vue.extend(Index)

let init = () => {
  messageInstance = new MessageConstructor()
  messageInstance.$mount()
  document.body.appendChild(messageInstance.$el)
}

let caller = (options) => {
  if(!messageInstance) {
    init(options)
  }
  // console.log(options)
  messageInstance.add(options)
}

export default {
  // 返回install函数，用于Vue.use()注册
  install(vue){
    vue.prototype.$message = caller
  }
}