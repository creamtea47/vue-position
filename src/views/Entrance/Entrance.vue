<template>
  <div class="entrance">
    <div class="content">
      <div class="item" @click="goMap">
        <div>
          <img src="../../assets/images/logo1.png" alt="" srcset="" />
        </div>
        <p>查找设备</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getDevices } from "../../network/recommend";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Entrance",
  computed: {
    ...mapState(["deviceId"]),
  },
  created() {
    // 获取用户已绑定的设备
    getDevices().then((res) => {
      if ((res.code = 200)) {
        this.addDeviceId(res.data.list);
      }
    });
  },
  methods: {
    ...mapMutations(["addDeviceId"]),
    goMap() {
      // 用户已经绑定设备
      if (this.deviceId.length != 0) {
        this.$router.push({
          name: "Map",
        });
      } else {
        // 用户没有绑定设备
        this.$router.push({
          name: "User",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.entrance {
  width: 100%;
  height: 93vh;
  position: relative;
  background: #1d53d6;
}

.content {
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  .item {
    width: 108px;
    cursor: pointer;
    &:hover img {
      width: 108px;
      height: 108px;
    }
    div {
      width: 108px;
      height: 108px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 88px;
        height: 88px;
        transition: all 0.2s;
      }
    }
    p {
      font-size: 14px;
      color: white;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>