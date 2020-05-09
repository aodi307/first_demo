import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: page => require(['@/components/Login'], page),
      beforeEnter(to, from, next) {
        sessionStorage.clear();
        next();
      }
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/home',
      component: page => require(['@/components/Index'], page),
      children: [
        {
          path: '/home',
          name: 'home',
          component: page => require(['@/components/Home'], page),
          meta: {
            name: 'views.nav.home',
            icon: "icon el-icon-folder",
            show: true,
            permission: '1',
            keepAlive: true
          }
        },
        {
          path: '/product',
          name: 'product',
          redirect: '/productOne',
          component: page => require(['@/components/Product'], page),
          meta: {
            name: 'views.nav.product',
            icon: "icon el-icon-folder",
            show: true,
            permission: '2',
            keepAlive: true
          },
          children: [
            {
              path: '/productOne',
              name: 'productOne',
              component: page => require(['@/components/ProductOne'], page),
              meta: {
                name: 'views.nav.productOne',
                show: true,
                permission: '2-1',
                keepAlive: true
              },
            },
            {
              path: '/productTwo',
              name: 'productTwo',
              component: page => require(['@/components/ProductTwo'], page),
              meta: {
                name: 'views.nav.productTwo',
                show: true,
                permission: '2-2',
                keepAlive: true
              },
            },

          ]
        },
        {
          path: '/message',
          name: 'message',
          redirect: '/message2',
          component: page => require(['@/components/Message'], page),
          meta: {
            name: 'views.nav.message',
            icon: "icon el-icon-chat-dot-round",
            show: true,
            permission: '3',
            keepAlive: true
          },
          children:[
            {
              path:'/message2',
              name:'message2',
              component: page => require(['@/components/Message2'], page),
              meta: {
                name: 'views.nav.message2',
                show: true,
                permission: '3-1',
                keepAlive: true
              },
            },
            {
              path: '/message3',
              name: 'message3',
              component: page => require(['@/components/Message3'], page),
              meta: {
                name: 'views.nav.message3',
                show: true,
                permission: '3-2',
                keepAlive: true
              },
            }
          ]
        },
        {
          path: '/order',
          name: 'order',
          component: page => require(['@/components/Order'], page),
          meta: {
            name: 'views.nav.order',
            icon: "icon el-icon-folder",
            show: true,
            permission: '4',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: page => require(['@/error/Error'], page)
    },
    {
      path: '*',
      redirect: '/error'
    }
  ]
})
