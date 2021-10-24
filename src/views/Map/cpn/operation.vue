<template>
  <div class="operation">
    <span @click="isShow = !isShow">设备</span>
    <div v-show="isShow" class="shebei">
      <div class="chip_header">
        <i class="el-icon-arrow-left" @click="isShow = !isShow"></i>
      </div>
      <div class="chip_body">
        <img src="../../../assets/images/00.png" alt="" srcset=""/>
        <em>定位芯片</em>
      </div>
      <div class="chip_footer">
        <div class="item" v-if="!isSock" @click="sock">
          <i class="el-icon-unlock"></i>
          <em>上锁</em>
        </div>
        <div class="item" v-else @click="unSock">
          <i class="el-icon-lock"></i>
          <em>解锁</em>
        </div>
        <div class="item" v-if="!isBell" @click="police">
          <i class="el-icon-bell"></i>
          <em>报警</em>
        </div>
        <div class="item" v-else @click="unPolice">
          <i class="el-icon-message-solid"></i>
          <em>已报警</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {
  vehiclSock,
  vehiclUnSock,
  vehiclpolice,
  vehiclUnPolice,
  stateInfo,
} from "../../../network/recommend";

export default {
  name: "Operation",
  data() {
    return {
      isShow: false,
      isSock: null,
      isBell: null,
    };
  },
  created() {
    // 获取设备状态
    stateInfo().then((res) => {
      if ((res.code = 200)) {
        this.isSock = false;
        this.isBell = false;
      }
    });
  },
  methods: {
    ...mapMutations(["chageLoad"]),
    // 上锁
    sock() {
      this.chageLoad();
      vehiclSock().then((res) => {
        this.chageLoad();
        if (res.code == 200) {
          this.$message({
            message: `上锁成功`,
            type: "success",
          });
          this.isSock = !this.isSock;
        }
      });
    },
    // 解锁
    unSock() {
      this.chageLoad();
      vehiclUnSock().then((res) => {
        this.chageLoad();
        if (res.code == 200) {
          this.$message({
            message: `解锁成功`,
            type: "success",
          });
          this.isSock = !this.isSock;
        }
      });
    },
    // 报警
    police() {
      this.chageLoad();
      vehiclpolice().then((res) => {
        if (res.code == 200) {
          this.chageLoad();
          this.$message({
            message: `报警成功`,
            type: "success",
          });
          this.isBell = !this.isBell;
        }
      });
    },
    // 取消报警
    unPolice() {
      this.$confirm("确认取消警戒状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.chageLoad();
            vehiclUnPolice().then((res) => {
              if (res.code == 200) {
                this.chageLoad();
                this.$message({
                  message: `解除警戒`,
                  type: "success",
                });
                this.isBell = !this.isBell;
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
    },
  },
};
</script>

<style lang="less" scoped>
.operation {
  position: absolute;
  top: 5%;
  right: 20px;

  span {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    color: black;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    box-shadow: 0px 0px 3px #808080;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: skyblue;
    }
  }

  .shebei {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
    width: 315px;
    height: 320px;
    padding: 20px 20px 40px 20px;
    background: white;
    box-shadow: 0px 0px 3px #808080;
    border-radius: 15px;

    .chip_header {
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: flex-start;

      i {
        padding: 10px;
        border-radius: 5px;
        border: solid 1px rgb(143, 143, 143);
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          background: rgb(228, 228, 228);
        }
      }
    }

    .chip_body {
      margin: 15px;
      padding: 15px;
      border-bottom: solid 1px #808080;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 150px;
      }

      em {
        margin-top: 15px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .chip_footer {
      display: flex;
      justify-content: center;

      .item {
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: color 0.2s;
        margin: 0 20px;

        i {
          height: 40px;
          font-size: 28px;
          line-height: 40px;
        }

        em {
          font-weight: 500;
        }

        &:hover {
          color: skyblue;
        }
      }
    }
  }
}
</style>