<template>
  <div class="myMenu" role="menuitem">
    <template v-for="item in menu">
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!item.children&&item.meta.show"
        :key="item.path"
        :index="item.path"
      >
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span  slot="title">{{$t(item.meta.name)}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="item.children&&item.meta.show"
        :key="item.meta.permission"
        :index="'/' + item.path"
      >
<!--        <router-link :to="item.path" :class="item.meta.active===true?'is-actives':''" >-->
          <template slot="title">
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              {{$t(item.meta.name)}}
          </template>
<!--        </router-link>-->
        <!-- 递归 -->
          <sidebar-item
            :menu="item.children"
          />
      </el-submenu>
    </template>
  </div>
</template>

<script>
    export default {
        name: "SidebarItem",
        props:{
            menu:{
                type:Array
            }
        },
        data(){
          return{
              array:[]
          }
        },
        watch:{
            menu:{
                handler(newValue, oldValue) {
                    console.log(this.menu);
                    console.log('menu');
                },
                immediate:true//关键
            }
        },
        mounted() {
            // this.array=this.menu
        }
    }
</script>

<style scoped>

</style>
