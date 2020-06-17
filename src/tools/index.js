import axios from './request.js';
import i18n from '../i18n/i18n'
import Vue from 'vue'
var vue = new Vue({i18n});
// Vue Router
import './storage.js';
export default {
  // api访问封装 
  // paramType 0表示 Query String Parameters 参数在url中 
  // paramType 1表示Request Payload, {usernamf:'18970308097'} 参数不在url中
  // paramType 2表示Form Data 参数不在url中
  // paramType 3表示参数在url中 /k/window.encodeURIComponent(params[k])
  ajax(uri, type, params, paramType = 0,header) {
    let formatParam
    if (params) {
      if (paramType === 0) {
        if (uri.indexOf('?') === -1) {
          uri = uri + '?'
        }
        for (let k in params) {
          if(params[k] instanceof Array){
            params[k].forEach(items => {
              for (let ks in items) {
                uri = uri + ks + '=' + window.encodeURIComponent(items[ks]) + '&';
              }
            });
          }else{
            uri = uri + k + '=' + window.encodeURIComponent(params[k]) + '&';
          }
        }
        uri = uri.substring(0, uri.length - 1);
      } else if (paramType === 1) {
        formatParam = params
      } else if (paramType === 2) {
        formatParam = new FormData();
        for (let k in params) {
          formatParam.append(k, window.encodeURIComponent(params[k]));
        }
      } else if (paramType === 3) {
        if (uri.substr(uri.length - 1, 1) == '/') uri = uri.substr(0, uri.length - 1);
        for (let k in params) {
          uri = uri + '/' + k + '/' + window.encodeURIComponent(params[k]);
        }
      }
    }
    if(header){
      let headers={'catch':header}
      if(type==='delete'||type==='get'){
        return axios[type](uri, {params:formatParam,headers:headers})
      }else{
        return axios[type](uri, formatParam,headers)
      }
    }else{
      return axios[type](uri, formatParam)
    }
  },
  //数据深度复制
  deepCopy(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = this.deepCopy(obj[key]); //递归复制
        } else {
          result[key] = obj[key];
        }
      }
    }
    return result;
  },
  // 比较两个对象 是否相等
  isObjEqual(obj1,obj2){
    var props1 = Object.getOwnPropertyNames(obj1);
      var props2 = Object.getOwnPropertyNames(obj2);
      if (props1.length != props2.length) {
          return false;
      }
      for (var i = 0,max = props1.length; i < max; i++) {
          var propName = props1[i];
          if (obj1[propName] !== obj2[propName]) {
              return false;
          }
      }
      return true;
  },
  // 日期比较
  compareDate(curTimes,endTimes, length) {
    //把字符串格式转化为日期类
    curTimes = new Date(Date.parse(curTimes));
    endTimes = new Date(Date.parse(endTimes));
    if (length) {
      return length*24*60*60*1000 < endTimes.getTime()-curTimes.getTime();
    } else {
      return curTimes < endTimes;
    }
  },
  selected(val){
    if(val===''||val.length<=0){
      console.log(vue)
      vue.$vs.notify({
        position: 'top-center',
        time: 3000,
        color: 'warning',
        text: vue.$t('operPlgin')
      })

      return false
    }else{
      return true
    }
  },
  IsDate(d){
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
    var result = d.match(reg);
    if(result == null){return false}
    var dt = new Date(result[1],result[3]-1,result[4]);
    if(Number(dt.getFullYear())!=Number(result[1])){return false;}
    if(Number(dt.getMonth())+1!=Number(result[3])){return false;}
    if(Number(dt.getDate())!=Number(result[4])){return false;}
    return true;
  },
//   dateFormat(fmt, date) {
//     let ret;
//     const opt = {
//         "Y+": date.getFullYear().toString(),        // 年
//         "m+": (date.getMonth() + 1).toString(),     // 月
//         "d+": date.getDate().toString(),            // 日
//         "H+": date.getHours().toString(),           // 时
//         "M+": date.getMinutes().toString(),         // 分
//         "S+": date.getSeconds().toString()          // 秒
//         // 有其他格式化字符需求可以继续添加，必须转化成字符串
//     };
//     for (let k in opt) {
//         ret = new RegExp("(" + k + ")").exec(fmt);
//         if (ret) {
//             fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
//         };
//     };
//     return fmt;
// },
  // generateTimeList(type){
  //   let currentDate=new Date()
  //   let arr=[]
  //   if(type===0){
  //     for(let i=1;i<=5;i++){
  //       let t=currentDate.getTime() - 1 * 12*i * 60 * 1000
  //       arr.push(this.dateFormat("HH:MM:SS",new Date(t)))
  //     }
  //   }else if(type===1){
  //     for(let i=1;i<=6;i++){
  //       let t=currentDate.getTime() - 1 * 60 * 60*i*4 * 1000
  //       arr.push(this.dateFormat("mm-dd HH:MM:SS",new Date(t)))
  //     }
  //   }else if(type===2){
  //     for(let i=1;i<=7;i++){
  //       let t=currentDate.getTime() -  60 * 60*24 * 1000*i
  //       arr.push(this.dateFormat("mm-dd HH:MM:SS",new Date(t)))
  //     }
  //   }else if(type===3){
  //     for(let i=1;i<=5;i++){
  //       let t=currentDate.getTime() -  60 * 60*24 * 1000*i*6
  //       arr.push(this.dateFormat("mm-dd HH:MM:SS",new Date(t)))
  //     }
  //   }
  //   return arr
  // }
}
