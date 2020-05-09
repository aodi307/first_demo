/*
* @Author: hoho
* @Date: 2018-09-04 11:49:48
*/
/*
* @LastEditors: hoho
* @LastEditTime: 2018-09-10 09:52:17
*/
export default {
  name: 'firstChild',
  path: 'firstChild',
  component: page => require(['@/components/Order'], page),
  redirect: {name: 'firstChildHome'},
  meta: {
    title: 'views.nav.firstChild'
  },
  children: [
    {
      name: 'firstChildHome',
      path: '/',
      component: page => require(['@/components/Order'], page),
      meta: {
        show: false,
        markName: 'firstChild',
        replaceIndex: true
      }
    }
  ]
}
