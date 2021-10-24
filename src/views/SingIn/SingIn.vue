<template>
  <div class="sing_in">
    <img src="../../assets/images/loginbanner.jpg" alt="" srcset="" />
    <div class="main">
      <div class="m-center">
        <p>
          <span
            :class="{ active: currentRoute == 'Login' }"
            @click="go('Login')"
            >登录</span
          >
          <span
            :class="{ active: currentRoute == 'Register' }"
            @click="go('Register')"
            >注册</span
          >
        </p>
        <router-view />
      </div>
      <div class="m-footer">
        <div class="link">
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
          <a href="#">帮助中心</a>
        </div>
        信息公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingIn",
  computed: {
    //   当前路由
    currentRoute() {
      return this.$route.name;
    },
  },
  methods: {
    //   前往指定路由
    go(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style lang="less" scoped>
.sing_in {
  display: flex;
  width: 100%;
  height: 93vh;
  .main {
    position: relative;
    flex-grow: 1;
    background: white;
    .m-center {
      text-align: left;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 4px;
      padding: 2rem 2.25rem;
      position: relative;
      margin: 7% auto;
      max-width: 450px;
      box-shadow: 0px 3px 10px 2px #ccc;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 99;
      p {
        height: 41px;
        line-height: 41px;
        margin-bottom: 10px;
        span {
          cursor: pointer;
          color: #bbb;
          margin-right: 15px;
          font-size: 1.25rem;
        }
        .active {
          color: black;
          padding-bottom: 5px;
          border-bottom: 4px solid #ff5c00;
        }
      }
    }
    .m-footer {
      padding: 0 20px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      left: 0;
      right: 0;
      position: absolute;
      bottom: 5%;
      color: #999;
      font-size: 12px;
      z-index: 9;
      .link {
        a {
          margin-left: 10px;
          margin-right: 10px;
          display: inline-block;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          color: #838383;
          line-height: 40px;
          transition: color 0.2s;
          &:hover {
            color: #ff5c00;
          }
        }
      }
    }
  }
}
</style>