<template>
  <div class="register">
    <input
      type="text"
      placeholder="手机号"
      v-model="username"
      @input="usernameVerf"
    />
    <p v-show="!verf[0]">请使用手机号注册</p>
    <input
      type="password"
      placeholder="密码"
      v-model="password"
      @input="psdVerf"
    />
    <p v-show="!verf[1]">6-15位字母、数字、下划线</p>
    <input
      type="password"
      placeholder="确认密码"
      v-model="confirmPsd"
      @input="confirmPsdVerf"
    />
    <p v-show="!verf[2]">校验密码错误</p>
    <button @click="verification">注册</button>
  </div>
</template>

<script>
import { register } from "../../../network/recommend";
import { mapMutations } from "vuex";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      confirmPsd: "",
      verf: [true, true, true],
    };
  },
  methods: {
    ...mapMutations(["chageLoad"]),
    usernameVerf() {
      // 手机号验证
      let usernameReg =
        /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
      this.verf[0] = usernameReg.test(this.username);
    },
    psdVerf() {
      // 密码验证
      let psdReg = /^(\w){6,15}$/;
      this.verf[1] = psdReg.test(this.password);
    },
    confirmPsdVerf() {
      // 校验密码
      this.verf[2] = this.password === this.confirmPsd;
    },
    verification() {
      for (const item of this.verf) {
        // 校验失败，不予注册
        if (!item) {
          // 提示信息
          this.$message({
            message: "请填写正确信息",
            type: "warning",
          });
          return false;
        }
      }

      // 校验成功，进行用户注册
      this.user_register();
    },
    //   用户注册
    user_register() {
      // 开启loading
      this.chageLoad();
      register(this.username, this.password, this.confirmPsd).then((res) => {
        console.log(res);
        // 取消loading
        this.chageLoad();
        if (res.code == 200) {
          // 提示信息
          this.$message({
            message: "注册成功",
            type: "success",
          });
          // 清空输入框
          this.username = "";
          this.password = "";
          this.confirmPsd = "";
          // 前往登录
          this.$router.push({ name: "Login" });
          //
        } else if (res.code == 500) {
          // 提示信息
          this.$message({
            message: "用户已经存在",
            type: "warning",
          });
          // 清空输入框
          this.username = "";
          this.password = "";
          this.confirmPsd = "";
        } else {
          // 提示信息
          this.$message.error("其他错误情况");
          // 清空输入框
          this.username = "";
          this.password = "";
          this.confirmPsd = "";
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.register {
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
  p {
    text-align: center;
    color: red;
    font-size: 0.75rem;
    margin: 0.25rem 0;
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