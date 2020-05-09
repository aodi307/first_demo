<template>
    <div class="index">
      <header class="header">
         <div class="header-left-logo"></div>
         <div class="header-right-content">
           <!--切换语言-->
           <el-dropdown id="language" trigger="click" @command="changeLanguage">
             <el-button type="primary">
               {{$t('public.btn.language')}}
               <i class="el-icon-arrow-down el-icon--right"></i>
             </el-button>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item command="zh" :disabled="language==='zh'" >中文</el-dropdown-item>
               <el-dropdown-item command="en" :disabled="language==='en'" >English</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
           <!--        <div>{{time | timeFormat}}</div>-->
           <!--切换主题-->
           <el-dropdown  id="theme"
                         trigger="click"
                         @visible-change="mixinDropDown($event,'theme')"
                         @command="changeTheme">
             <el-button type="primary">
               {{$t('public.btn.theme')}}
               <i class="el-icon-arrow-down el-icon--right"></i>
             </el-button>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item :disabled="theme==='default'">{{$t('public.theme.default')}}</el-dropdown-item>
               <el-dropdown-item command="purple" :disabled="theme==='purple'">{{$t('public.theme.purple')}}
               </el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
           <el-button type="primary" @click="logOut ">退出</el-button>
         </div>
      </header>
<!--      <div id="scss">-->
<!--        sass-->
<!--        <ul>-->
<!--          <li>1</li>-->
<!--          <li>2</li>-->
<!--        </ul>-->
<!--      </div>-->
      <section class="content">
        <div class="menu-left">
          <el-menu :default-active="$route.path"
                   :collapse="isCollapse"
                   background-color="#1e2836"
                   text-color="#fff"
                   :unique-opened="true"
                   router
                   class="el-menu-vertical-demo"
                   @select="handleSelect"
          >
            <sidebar-item :menu="navInformation"></sidebar-item>
          </el-menu>
        </div>
        <div class="content-right">
          <div class="content-right-top">
              <div>我的位置：</div>
              <el-breadcrumb style="" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item
                  v-for="(item,index) in breadList"
                  :key="index"
                  :to="{ path: item.path }"
                >{{$t(item.meta.name)}}</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <keep-alive>
            <transition style="padding:20px 0" name="fade" mode="out-in" >
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </transition>
          </keep-alive>
          <transition style="padding:20px 0" name="fade" mode="out-in" >
            <router-view  v-if="!$route.meta.keepAlive"></router-view>
          </transition>
          <!-- <router-view style="padding:20px 0"/>-->
        </div>
      </section>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'
import  SidebarItem from '../customModule/SidebarItem'
export default {
  name: 'Index',
  data () {
    return {
        eleNavClass: 'views-nav',
        time:1573783933000,
        isCollapse:false,
        breadList:[],
        language:'',
        theme:'',
        navInformation:[],
        nav:[]
    }
  },
  created() {
      this.mixinConfirm("222", "333", "55");
      this.routerChange(this.$route.matched);
      this.navInformation=this.checkNavInformation();
      this.language = this.checkLanguage();
      this.changeLanguage(this.language);
      this.theme = this.checkTheme();
      this.changeTheme(this.theme);
  },
  methods: {
      ...mapGetters([
          "checkLanguage",
          "checkTheme",
          "checkNavInformation"
      ]),
      ...mapMutations([
          "upDateLanguage",
          "upDateTheme"
      ]),
      changeTheme(theme) {
          theme = !theme ? 'default' : theme;
          let it = this;
          //接口回调中
          document.getElementById('element-theme').href = `./static/theme/${theme}/main.css`;
          it.theme = theme;
          it.$store.commit('upDateTheme', theme);
      },
      changeLanguage(language) {
          language = !language ? 'zh' : language;
          this.language = language;
          //接口回调中
          this.$i18n.locale = language;
          this.upDateLanguage(language);
      },
      logOut(){
          this.$router.push({
              name: 'login'
          });
      },
      handleSelect(key, keyPath) {
          // console.log(key, keyPath);
      },
      isHome(route) {
          return route.name === "home";
      },
      fillterActive(arr,arr2) {
          function findChildren(arrA,arrB){
              arrA.forEach(item => {
                  if (item.children && item.children.length) {
                      findChildren(item.children, arrB)
                  }
                  arrB.forEach(subItem => {
                      if(subItem.name===item.name) {
                          item.meta.active=true;
                      }else{
                          if(item.meta.active==undefined){
                              item.meta.active=false;
                          }
                      }
                  });
              });
          }
          findChildren(arr,arr2);
          return arr;
      },
      // empty(array){
      //     function findChildren(arrC){
      //         arrC.forEach(item => {
      //             item.meta.active=undefined;
      //             if (item.children && item.children.length) {
      //                findChildren(item.children)
      //             }
      //         });
      //     }
      //     findChildren(array);
      //     return array;
      // },
      routerChange(match=[]){
          this.breadList=match.filter((item)=>{
              return item.name!=='index'
          });
          // let navInformation=this.empty(this.$store.getters.checkNavInformation);
          // this.navInformation=this.fillterActive(navInformation, matched);
          // console.log(this.navInformation);
          // this.$store.commit('upDateNavInformation',  this.navInformation);
      }
    },
    // watch: {
    //     $route() {
    //         this.routerChange(this.$route.matched);
    //     }
    // },
    beforeRouteUpdate(to, from, next){
        next();
        this.routerChange(to.matched);
    },
    components: {
      SidebarItem
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $color:red;
  #scss{
    color: $color
  }
  #scss{
    ul{
      li{
        list-style: none;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color:#888;
      }
    }
  }
  .index{
   height: 100%;
  }
  .content{
    display: flex;
    height: calc(100% - 80px);
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 201px;
    min-height: 400px;
  }
  .header{
    height: 80px;
    background: #1e2836;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .header-left-logo{
    width: 200px;
    height: 100%;
    background: #36353E url("../assets/logo.png") no-repeat center center;
    background-size:35%;
    padding:5px 0 0 0;
  }
  .header-right-content{
    height: 100%;
    width: calc(100% - 201px);
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .el-menu{
    height: 100%;
  }
  .el-dropdown{
    margin-right: 10px;
  }
  .content-right{
    height: 100%;
    width: 100%;
    padding: 20px 40px;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .content-right-top{
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
