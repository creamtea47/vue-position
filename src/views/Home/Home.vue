<template>
  <div class="home">
    <div class="main">
      <div class="main-l">
        <h3>信息云服务</h3>
        <p>随时随地，管理你的所有设备和数据</p>
        <button @click="login">使用信息账号进行登录</button>
      </div>
      <img src="../../assets/images/homebg.png" class="main-r" />
    </div>
    <div class="footer">
      <p>
        <a href="#">手机申诉解锁</a>
        <a href="#">隐私政策</a>
        <a href="#">用户协议</a>
      </p>
      <p>
        ©2021 MIUI . All rights reserved 京ICP备10046444号
        京公网安备1101080212535
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({name: "Login"})
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  background: #1d53d6;
  height: 100%;
  position: relative;
}
.main {
  display: flex;
  align-items: center;
  padding-left: 18%;

  .main-l {
    color: white;
    margin: 0 10%;
    h3 {
      font-size: 58px;
    }
    p {
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 52px;
      color: #d2ddf6;
      line-height: 1.2;
      word-break: break-word;
    }
    button {
      display: inline-block;
      min-width: 320px;
      max-width: 450px;
      border-radius: 100px;
      padding: 16px 39px 16px 41px;
      border: none;
      -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
      background-color: #fff;
      outline: 0;
      cursor: pointer;
      text-decoration: none;
      color: #1851d7;
      text-align: center;
      transition: all 0.2s;
      &:hover {
        color: #5888f8;
      }
    }
  }
  img {
    margin-left: 30px;
    width: 50%;
  }
}
.footer {
  position: absolute;
  bottom: 40px;
  color: #9ab3ea;
  font-size: 12px;
  width: 100%;
  p {
    text-align: center;
  }
  a {
    margin: 10px 15px;
    color: #9ab3ea;
    transition: all 0.2s;
    &:hover {
      color: white;
    }
  }
}
</style>