/* 结构 样式 行为 */

//模板区域
<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
      <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区 -->
      <!-- model属性的数据绑定，绑定到loginForm数据对象上 -->
      <!-- 为表单添加ref引用，这个引用值是loginFormRef组件的实例对象 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <!-- 这个是elementui里面的图标-->
          <!-- 双向数据绑定 -->
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <!-- 这个是阿里的一个素材图标，记得先加iconfont基础类，再把图标名称引入  -->
          <!-- type="password" 这是一个密码类型的文本框，可以隐藏 -->
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login()" >登录</el-button>
            <!-- 不要把这个() 忘记了 -->
            <el-button type="info" @click="resetLoginForm()" >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

//行为
<script>
export default {
  data() {
    return {
    //这是登录表单绑定的数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
    // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          //"blur" 失去焦点后触发
          { required:true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度为3到6个字符", trigger: "blur"}
        ],
        //验证密码是否合法
        password: [
          //"blur" 失去焦点后触发
          { required:true, message: "请输入登录名称", trigger: "blur" },
          { min: 6, max: 12, message: "长度为6到15个字符", trigger: "blur"}
        ],
      },
      
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields();
      },

      login() {
        this.$refs.loginFormRef.validate(async valid=> {
          if(!valid) return;
          // data解构
          const {data:res} = await this.$http.post('login',this.loginForm);
          // console.log(res);
          if(res.meta.status !== 200) return this.$message.error('登录失败');
          
          this.$message.success('登录成功');
          // 1.将登录成功之后的 token 保存在客户端的sessionStirage中
          //    1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
          //    1.2 token只应在当前网站打开期间生效，所以 token 保存在 sessionStorage中
          window.sessionStorage.setItem("token",res.data.token)
          // 2.通过编程式导航跳转到后台主页，路由地址是 /home
          // 编程式导航页面发生跳转
          this.$router.push("/home");
        });
      }
    };
  }
}
</script>

//样式

<style lang="less" scoped>
.login_container {
  background-color:darkcyan;
  height:100%;
}

.login_box {
  width: 450px;
  height:300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  //上下是0 左右20px
  padding: 0 20px;
  //这样表单就不会超出了
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>

