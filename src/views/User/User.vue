<template>
  <div class="user">
    <p>
        <em @click="back">返回上一页</em>
    </p>
    <p>
      <span class="p_l">用户账号：</span>
      <span class="p_r">{{ username }}</span>
    </p>
    <div>
      <p v-for="item in deviceId" :key="item.deviceId">
        <span class="p_l">定位芯片：</span>
        <span class="p_r">{{ item.deviceId }}</span>
      </p>
      <p>
        <input v-model="device" placeholder="请输入设备ID"  type="number"/>
        <a href="#" @click.prevent="binding">新增设备</a>
      </p>
    </div>
  </div>
</template>

<script>
import { bindDevice, getDevices } from "../../network/recommend";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      device: "",
    };
  },
  computed: {
    ...mapState(["deviceId", "username"]),
  },
  methods: {
    ...mapMutations(["addDeviceId"]),
    back() {
        this.$router.back();
    },
    binding() {
        // 新增设备
      bindDevice(this.device).then((res) => {
        if (res.code == 200) {
            // 获取已绑定的所有设备
          getDevices().then((res) => {
            if ((res.code = 200)) {
              this.addDeviceId(res.data.list);
              this.device = "";
            }
          }); 
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  margin: 2% auto;
  width: 70%;
  min-height: 300px;
  background: #f7f7f7;
  box-shadow: 1px 1px 3px 1px rgb(131, 129, 129);
  padding: 20px 25px;
  p {
    line-height: 30px;
    margin-bottom: 10px;
    em {
        font-size: 14px;
        cursor: pointer;
    }
    .p_l {
      font-weight: bold;
      margin-right: 10px;
    }
    a {
      color: blue;
      font-size: 12px;
    }
    input {
      border-radius: 5px;
      border: 1px black solid;
      padding-left: 10px;
      margin-right: 15px;
      font-size: 12px;
      padding: 5px 10px;
    }
  }
}
</style>