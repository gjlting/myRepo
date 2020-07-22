
// 时间格式化
formatNumber = n => {
  n = n.toString()
  return n[1] ? n : n.padStart(2,'0')
}

formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

console.log(formatTime(new Date('2014-09-09 2:0:0')))

// 时间戳转换成Date类型
var date = new Date(1403058804*1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
console.log(formatTime(date))

// 将日期转换成时间戳
console.log(new Date().getTime())
console.log(new Date().valueOf())
console.log(Date.parse(date)) // 只能精确到秒，毫秒用000替代




//函数名：CheckDateTime
//功能介绍：检查是否为日期时间
function CheckDateTime(str){
  var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = str.match(reg);
  if(r==null)return false;
  r[2]=r[2]-1;
  var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
  if(d.getFullYear()!=r[1])return false;
  if(d.getMonth()!=r[2])return false;
  if(d.getDate()!=r[3])return false;
  if(d.getHours()!=r[4])return false;
  if(d.getMinutes()!=r[5])return false;
  if(d.getSeconds()!=r[6])return false;
  return true;
  }

  console.log(CheckDateTime('2019-02-02 2:0:0')) // true
   
   
  /**
  判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期
  */
  function IsDate(sm,mystring) {
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
  var str = mystring;
  var arr = reg.exec(str);
  if (str=="") return true;
  if (!reg.test(str)&&RegExp.$2<=12&&RegExp.$3<=31){
  console.log("请保证"+sm+"中输入的日期格式为yyyy-mm-dd或正确的日期!");
  return false;
  }
  return true;
  }

  console.log(IsDate('2019-02-02 2:0:0')) // false
  console.log(IsDate('表格','2019-02-02')) // true
   
   
  // yymmdd格式
  function toDateFromString( strDate )
  {
  if (strDate.length != 8) {
  return null ;
  }
  var dtDate = null ;
  var nYear = parseInt( strDate.substring( 0, 4 ), 10 ) ;
  var nMonth = parseInt( strDate.substring( 4, 6 ), 10 ) ;
  var nDay = parseInt( strDate.substring( 6, 8 ), 10 ) ;
  if( isNaN( nYear ) == true || isNaN( nMonth ) == true || isNaN( nDay ) == true )
  {
  return null ;
  }
  dtDate = new Date( nYear, nMonth - 1, nDay ) ;
  if( nYear != dtDate.getFullYear() || ( nMonth - 1 ) != dtDate.getMonth() || nDay != dtDate.getDate() )
  {
  return null ;
  }
  return dtDate ;
  }
  console.log(toDateFromString('20190202')) // 2019-02-01T16:00:00.000Z
  


