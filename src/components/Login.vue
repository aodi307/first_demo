<template>

  <div class="login">
    <div class="login-content">
      <h2>登录</h2>
      <el-input v-model="input" placeholder="请输入账户"></el-input>
      <el-input v-model="input2" placeholder="请输入密码"></el-input>
      <el-button type="primary" style="width:100%;" @click="login"> 登录</el-button>
    </div>
  </div>

</template>

<script>
    import firstChild from "../router/firstChild";
    export default {
        name: "Login",
        data() {
            return {
                obj: {},
                nav:[],
                input:'',
                input2:''
            }
        },
        methods: {
            permissionTemplate(arr, obj) {
                arr.forEach(item => {
                    if (item.children && item.children.length) {
                        this.permissionTemplate(item.children, obj)
                    }
                    obj[item.name] = item.meta.permission;
                });
                return obj;
            },
            permissionList(role, permiss) {
                let obj = {};
                switch (role) {
                    case 1:
                        obj = {
                            permissionList: permiss,
                            roleName: 'admin'
                        };
                        break;
                    case 2:
                        obj = {
                            permissionList: permiss,
                            roleName: 'teacher'
                        };
                        break;
                    case 3:
                        obj = {
                            permissionList: permiss,
                            roleName: 'student'
                        };
                        break;
                }
                return obj;
            },
            navInformation(navArr,arr,arrTemp){
                for(let i=navArr.length-1;i>=0;i--){
                      if (navArr[i].children && navArr[i].children.length) {
                          this.navInformation(navArr[i].children,arr,arrTemp)
                      }
                      else if(navArr[i].meta.show&&arr.indexOf(`${arrTemp[navArr[i].name]}`)===-1){
                          navArr.splice(i,1);
                      }
                }
                return navArr;
            },
            login() {
                let routes = this.$router.options.routes;
                let navList = routes.filter((item => {
                    return item.name === 'index';
                }))[0].children;
                let permission=false;//默认开启权限
                let permissionTemplate = this.permissionTemplate(navList,{});//所有权限列表
                let publicPermissionList = ['1', '2', '2-2', '3', '4']; //公共权限列表
                let permissionList = [];//角色权限列表
                let navInformation;//权限后的菜单列表
                let role = 1;//角色:1->admin，2->teacher,3->student

                permissionList = this.permissionList(role,[]).permissionList;//admin
                // permissionList=this.permissionList(role,['2-1']).permissionList;//teacher
                // permissionList=this.permissionList(role,['2-1']).permissionList;//student

                permissionList = [...permissionList, ...publicPermissionList];//合并权限

                if(permission){
                    navInformation=this.navInformation(JSON.parse(JSON.stringify(navList)), permissionList, permissionTemplate);
                }else{
                    navInformation=navList;
                }
                const theme = 'default';//默认主题
                const language = 'zh'; //默认语言
                // 填充数据
                this.$store.commit('upDatePermissionList', permissionList);
                this.$store.commit('upDatePermissionTemplate', permissionTemplate);
                this.$store.commit('upDateNavInformation', navInformation);
                this.$store.commit('upDatePermission', permission);
                this.$store.commit('upDateTheme', theme);
                this.$store.commit('upDateLanguage', language);
                sessionStorage.setItem('isLogin', 'true');
                this.$router.push({
                    name: 'index'
                });
            }
        }
    }
</script>

<style>
  .login .login-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 300px;
    background: rgba(0,0,0,0.1);
    padding: 10px 20px;
    display: flex;
    flex-direction:column;
    justify-content: space-around;
  }
</style>
