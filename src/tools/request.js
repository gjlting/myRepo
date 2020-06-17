import axios from 'axios';
import router from '../router.js';
// Vuex Store
import store from '../store'
// i18n
import i18n from '../i18n/i18n'
import Vue from 'vue';
var vue = new Vue({i18n});

// console.log(s);
// 请求头，设置公共参
// const comm_req = {
//   id: '123',
//   phonno: '123'
// }
// 创建axios实例
const axiosServer = axios.create({
  timeout: 180000 // 请求超时时间
})
// 拦截请求

axiosServer.interceptors.request.use(config => {
  // if(store.getters['getLoading']){
  //   vue.$loading.open();
  // }
  if (localStorage.getItem('token')) {
    config.headers.common['X-Authorization'] = localStorage.getItem('token')
  }
  return config;
}, error => {
  return Promise.reject(error)
})
// 拦截响应
axiosServer.interceptors.response.use(response => {
  // vue.$loading.close();
  // store.commit('UPDATE_LOADING', true)
  if (response.headers['x-authorization']) {
    if(store.state.AppUser.token!=response.headers['x-authorization']){
      store.commit('UPDATE_USER_INFO', {token:response.headers['x-authorization']});
      localStorage.token = response.headers['x-authorization'];
    }
  }
  if(response.config.catch===1&&response.status!==200){
    return Promise.reject(response.status)
  }
  return response.data
}, error => {
  // vue.$loading.close();
  // 自行处理错误
  if(error.response.config.catch===1||error.response.config.headers.catch===1){
    return Promise.reject(error)
  }
  if (error.response) {
    let errorMsg='';
    switch (error.response.status) {
      case 401:
        errorMsg=vue.$t('invalidAuth');
        if(localStorage.reset=='true'){
          localStorage.removeItem('reset');
        }else{
          router.replace({
            path: '/pages/login'
          });
        }
        // this.$storage.remove('token', true);
        // this.$storage.remove('loginInfo', true);
        break;
      case 403:
        errorMsg='Forbidden';
        break;
      case 404:
        errorMsg='Resource not found';
        break;
      case 406:
        errorMsg='Not Acceptable';
        break;
      case 407:
        break;
      case 409:
        errorMsg='Data already exist';
        break;
      case 500:
        errorMsg='Internal Server Error';
        break;
    }
    vue.$vs.notify({
      position: 'top-center',
      time: 3000,
      color: 'warning',
      text: errorMsg
    })
  }
  return Promise.reject(error)
})
export default axiosServer
