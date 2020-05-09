/*
* @Author: aFei
* @Date: 2018-09-06 16:37:54
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-09-06 17:53:13
*/
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from './zh'
import enLocale from './en'


Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: {
      ...zhLocale,
      ...elementZhLocale
    },
    en: {
      ...enLocale,
      ...elementEnLocale
    }
  }
});
export default i18n
