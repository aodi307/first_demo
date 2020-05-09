/*
* @Author: aFei
* @Date: 2018-09-10 15:21:49
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-09-12 12:00:35
*/
//存放公共验证方法
let reg = {
  isNumber: (data) => { // 是否是数字
    return typeof data === 'number' && !isNaN(data);
  }
};

export default reg
