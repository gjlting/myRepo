import test from './HelloWorld'
const myTest = {
  install(Vue){
    Vue.component('test', test)
  }
}
export default myTest