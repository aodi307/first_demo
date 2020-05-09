// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import router from './router';
import './assets/common.css'
// import 'element-ui/lib/theme-chalk/index.css';
import store from './store/store';
import i18n from './lang';
import ElementLocale from 'element-ui/lib/locale';
import {post, get, patch, put} from "@/http/http"
import mixin from '@/method/mixin';
import REG from '@/method/reg';
import filter from '@/method/filter';
import uploader from 'vue-simple-uploader'
import {
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Radio,
  Input,
  InputNumber,
  RadioGroup,
  RadioButton,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  MessageBox,
  Message,
  Notification
}
from 'element-ui';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(InputNumber);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

ElementLocale.i18n((key, value) => i18n.t(key, value));//按需加载国际化
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// });

Vue.config.productionTip = false;
Vue.prototype.REG = REG;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

Vue.use(uploader);
Vue.mixin(mixin);
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
});

Vue.config.productionTip = false;
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};
const ignoreList = ['login', 'error'].join(','); // 不需要登陆

router.beforeEach((to, from, next) => {
  const permissionList = sessionStorage.getItem('permissionList');
  const permissionTemplate = sessionStorage.getItem('permissionTemplate')?JSON.parse(sessionStorage.getItem('permissionTemplate')):sessionStorage.getItem('permissionTemplate');
  const permission = sessionStorage.getItem('permission')?JSON.parse(sessionStorage.getItem('permission')):sessionStorage.getItem('permission');
  const isLogin = sessionStorage.getItem('isLogin')?JSON.parse(sessionStorage.getItem('isLogin')):sessionStorage.getItem('isLogin');
  if (ignoreList.indexOf(to.name) !== -1) { // 进入的是任何人都可以进入的页面
    next();
  }
  else {
    next();
    if (isLogin) { // 已登陆
      if (!permission) {
        next();
      }
      else {
        // console.log(permissionList);
        // console.log(`${permissionTemplate[to.name]}`);
        // console.log(permissionList.indexOf(`${permissionTemplate[to.name]}`));
        if (permissionList.indexOf(`${permissionTemplate[to.name]}`)!== -1) {
          next();
        }
        else {
          next( {name: 'home'});
        }
      }
    }
    else { // 未登录
      next( {name: 'login'});
    }
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});
