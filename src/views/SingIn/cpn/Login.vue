<template>
  <div class="login">
    <input type="text" placeholder="邮箱/手机号/XX号" v-model="username" />
    <input type="password" placeholder="密码" v-model="password" />
    <button @click="user_login">登录</button>
  </div>
</template>

<script>
import { login } from "../../../network/recommend";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["chageLoad", "chageUserName","chageLogin"]),
    //   用户登录
    user_login() {
      // 记录this
      let that = this;
      // 开启loading
      that.chageLoad();
      login(this.username, this.password).then((res) => {
        // 取消loading
        that.chageLoad();
        console.log(res);
        if (res.code == 200) {
          // 存取用户账户
          that.chageUserName({ username: that.username });
          // 获取token
          let token = res.data.tokenHead + res.data.token;
          window.sessionStorage.setItem("token", token);
          // 清空输入框
          this.username = "";
          this.password = "";
           // 改变登录状态
          this.chageLogin();
          // 跳转路由
          this.$router.push({ name: "Entrance" });
        } else if (res.code == 500) {
          // 提示错误信息
          this.$message.error(res.message);
          // 清空输入框
          this.username = "";
          this.password = "";
        } else {
          // 其他未知情况
          this.$message({
            message: "其他未知情况",
            type: "warning",
          });
           // 清空输入框
          this.username = "";
          this.password = "";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  input {
    padding: 1rem 1.25rem;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0);
    background: #f9f9f9;
    margin-bottom: 0.75rem;
  }
  button {
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0);
    margin-top: 0.75rem;
    margin-bottom: 10px;
    color: #fff;
    background-color: #ff5c00;
    transition: all 0.2s;
    padding: 1rem 1.25rem;
    opacity: 0.4;
    &:hover {
      opacity: 0.3;
    }
  }
}
</style>