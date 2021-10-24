<template>
  <div class="header" :style="{ background: '#1d53d6' }">
    <div class="header-l" @click="goHome">
      <img src="../../assets/images/logo2.png" alt="" />
      <span>信息云服务</span>
    </div>
    <div class="header-r" v-if="isLogin">
      <span>2502845123</span>
      <img src="../../assets/images/user.png" @click="isShow = !isShow" />
      <ul v-show="isShow">
        <li @click="goUser">个人信息</li>
        <li @click="user_logut">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { logout } from "../../network/recommend";

import { mapState,mapMutations } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
    route() {
      return this.$route.name;
    },
  },
  watch: {
    // 路由发生切换隐藏选项
    route() {
      this.isShow = false;
    },
  },
  methods: {
    ...mapMutations([
      'chageLogin'
    ]),
    // 未登录去首页，登录了去功能模块
    goHome() {
      if (this.isLogin) {
        this.$router.push({ name: "Entrance" });
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    // 去往个人中心
    goUser() {
      this.isShow = false;
      this.$router.push({ name: "User" });
    },
    // 退出登录
    user_logut() {
      logout().then(res => {
        if (res.code == 200) {
          // 右侧部分不显示
          this.isShow = false;
          // 改变登录状态
          this.chageLogin();
          // 清空token
          window.sessionStorage.setItem("token", "");
          // 跳转到封面
          this.$router.push({name: "Home"});
        } else {
           // 其他未知情况
          this.$message({
            message: "其他未知情况",
            type: "warning",
          });
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 6%;
  padding: 8px 20px 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  .header-l {
    font-size: 16px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }
  }
  .header-r {
    display: flex;
    align-items: center;
    position: relative;
    span {
      margin-right: 15px;
    }
    img {
      border-radius: 50%;
      margin-left: 10px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.3);
      }
    }
    ul {
      position: absolute;
      top: 40px;
      right: 0;
      z-index: 99;
      background: white;
      border-radius: 5px;
      color: black;
      padding: 5px 10px;
      li {
        font-size: 14px;
        margin: 5px 0;
        cursor: pointer;
        transition: color 0.2s;
        &:hover {
          color: skyblue;
        }
      }
    }
  }
}
</style>