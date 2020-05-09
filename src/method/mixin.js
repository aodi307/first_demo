/*
* @Author: aFei
* @Date: 2018-09-10 15:17:17
*/
/*
* @LastEditors: aFei
* @LastEditTime: 2018-09-12 15:32:37
*/
//组件混合
export default {
  methods: {
    mixinGoBack() { // 返回上一级路由
      this.$router.go(-1);
    },
    mixinDropDown(type, id) { // click方式下拉菜单展开动画,参数：$event,对应下拉的ID
      let node = document.getElementById(id).firstChild;
      console.log(node,type, id);
      if (type) {
        node.classList.add('active');
      }
      else {
        node.classList.remove('active');
      }
    },
    mixinConfirm(url, params, message) { // 公共删除提示（带删除请求），参数：url（必填）-->请求地址，params-->post请求参数，message-->自定义提示信息
      console.log(url, params, message);
      let msg = message || '确认要删除吗？';
      return this.$confirm(msg, '提示').then(() => {
        return this.$post(url, params).then(data => {
          return new Promise((resolve) => {
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              resolve(true);
            }
          });
        });
      }).catch(() => {
        return new Promise((resolve, reject) => {
          resolve(false);
        });
      })
    }
  }
}
