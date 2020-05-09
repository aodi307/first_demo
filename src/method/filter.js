/*
* @Author: aFei
* @Date: 2018-09-12 10:44:58
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-09-12 11:57:14
*/
import REG from './reg'
// 时间格式化
const timeFormat = (data, mode) => {
  if (REG.isNumber(data)) {
    const time = new Date(data);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let day = time.getDate();
    day = day > 9 ? day : '0' + day;
    let hour = time.getHours();
    hour = hour > 9 ? hour : '0' + hour;
    let minute = time.getMinutes();
    minute = minute > 9 ? minute : '0' + minute;
    let second = time.getSeconds();
    second = second > 9 ? second : '0' + second;
    switch (mode) {
      case 'full-easy':
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      case 'full-before-easy':
        return month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      case 'full-after-easy':
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      case 'before':
        return year + '-' + month + '-' + day;
      case 'before-easy':
        return month + '-' + day;
      case 'after':
        return hour + ':' + minute + ':' + second;
      case 'after-easy':
        return hour + ':' + minute;
      default:
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
  }
  else {
    return data;
  }
};

export default {
  timeFormat
}
