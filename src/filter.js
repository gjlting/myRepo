import {
  progressMap,
  typeMap,
  statusMap,
  softTypeMap
} from './configfilter.js'

// import configfilter from './configfilter.js'
export function usermobFile(realname, mobile) {
  return realname + '(' + mobile + ')'
}
export function datefilter(val) {
  if (val && val.length > 0) {
    if (val[1] <= 9) {
      val[1] = '0' + val[1]
    }
    if (val[2] <= 9) {
      val[2] = '0' + val[2]
    }
    return val.join('-')
  } else {
    return ''
  }
}
export function dateFormatfilter(val) {
  if(val){
    return val.slice(0,3).join('-')

  }else{
    return ''
  }
}

export function progressfilter(val) {
    return progressMap.get(val)
}
export function typefilter(val) {
  return typeMap.get(val)
}
export function statusfilter(val) {
  return statusMap.get(val)
}
export function softTypefilter(val) {
  return softTypeMap.get(val)
}


