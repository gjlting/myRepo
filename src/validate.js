
import {Validator} from 'vee-validate';

Validator.extend('phone', {
  getMessage: field => field + ' 格式不正确',
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  },
})
//手机号码
Validator.extend('password', {
  getMessage: field => field,
  validate: value =>  {
    if(value.length>=6 && value.length<=20){
      return (value.match(/\d/g).length && value.match(/[a-z]/ig).length)
    }else{
      return false
    }
  }
});
Validator.extend('idNumber', {
  getMessage: field => field,
  validate: value => {
  let res=/[0-9]{6}[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[0-9]{3}[0-9a-z]{1}/i.test(value)
  if(res){
    let year=value.substr(6,4)
    if(year>new Date().getFullYear()){
      return false;
    }
    return true
  }else{
    return false
  }
}
});
// 自定义手机号码规则
Validator.extend('mobile', {
  getMessage: field => field,
  validate: value => value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
});

Validator.extend('compareNum', {
  getMessage: field => field,
  validate: (value,args)=> {
    let res = false
    res = value > args[0] ? true : false
    return res
  }
})
