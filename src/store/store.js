import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	strict:true,
	state:{
		products:[
	        {name:"马云",price:200},
	        {name:"马化腾",price:140},
	        {name:"马冬梅",price:20},
	        {name:"马蓉",price:10}
	      ]
	},
	getters:{
		saleProducts: (state) =>{
			let saleProducts = state.products.map(product =>{
		        return {
		          name: "**" + product.name + "**",
		          price: product.price / 2
		        };
		    });
		    return saleProducts;
		},
    checkPermissionList(state) {
      if (state.permissionList === '') {
        state.permissionList = sessionStorage.getItem('permissionList');
      }
      return state.permissionList;
    },
    checkPermissionTemplate(state) {
      if (state.permissionTemplate.length === 0) {
        state.permissionTemplate = JSON.parse(sessionStorage.getItem('permissionTemplate'));
      }
      return state.permissionTemplate;
    },
    checkPermission(state) {
      if (state.permission === '') {
        const right = JSON.parse(sessionStorage.getItem('permission'));
        if (right === true) {
          state.permission = true;
        }
        else {
          state.permission = false;
        }
      }
      return state.permission;
    },
    checkNavInformation(state) {
      if (!state.navInformation) {
        state.navInformation = JSON.parse(sessionStorage.getItem('navInformation'));
      }
      return state.navInformation;
    },
    checkTheme(state) {
      if (!state.theme) {
        state.theme = sessionStorage.getItem('theme');
      }
      return state.theme;
    },
    checkLanguage(state) {
      if (!state.language) {
        sessionStorage.getItem('language');
        state.language=sessionStorage.getItem('language');
      }
      return state.language;
    }
	},
	mutations:{
    upDatePermission (state, data) {
      state.permission = data;
      sessionStorage.setItem('permission', data);
    },
    upDatePermissionList (state, data) {
      state.permissionList = data;
      sessionStorage.setItem('permissionList', data);
    },
    upDatePermissionTemplate (state, data) {
      state.permissionTemplate = data;
      sessionStorage.setItem('permissionTemplate', JSON.stringify(data));
    },
    upDateNavInformation (state, data) {
      state.navInformation = data;
      sessionStorage.setItem('navInformation', JSON.stringify(data));
    },
    upDateTheme(state, data) {
      state.theme = data;
      sessionStorage.setItem('theme', data);
    },
    upDateLanguage(state, data) {
      state.language = data;
      sessionStorage.setItem('language', data);
    },
		reducePrice: (state,payload) =>{
			// setTimeout(function(){
				state.products.forEach(product =>{
			        product.price -= payload;
			    })
		    // },3000);
		}
	},
	actions:{
		reducePrice:(context,payload) =>{
      setTimeout(function(){
				context.commit("reducePrice",payload);
			},2000);
		}
	}
});

export default store;



