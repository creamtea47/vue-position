<template>
  <div class="map">
    <baidu-map
      class="map"
      :center="position"
      :zoom="15"
      ak="orpQMGagMybFaVY2ch4BF2AiT6mwi0ZV"
      :scroll-wheel-zoom="true"
      @ready="handler"
    >
      <bm-scale
        :offset="{ width: 110, height: 20 }"
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
      />
      <bm-marker
        :position="pos"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      />
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :offset="{ width: 10, height: 90 }"
      ></bm-navigation>
    </baidu-map>
    <Operation />
  </div>
</template>

<script>
import { location } from "../../network/recommend";
import { mapMutations } from "vuex";

import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmScale from "vue-baidu-map/components/controls/Scale.vue";
import BmOverviewMap from "vue-baidu-map/components/controls/OverviewMap.vue";
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue";

import Operation from "./cpn/operation.vue";

export default {
  name: "Map",
  components: {
    BaiduMap,
    BmScale,
    BmOverviewMap,
    BmMarker,
    BmNavigation,
    Operation,
  },
  data() {
    /**
     * 地图用的是 pos,经过转换后的坐标
     * position 是我们从后天获取的位置信息
     * 特意区分开来就是为了避免点闪烁的位置
     * 要地图一直展示正确位置
     */
    return {
      pos: {},
      position: {
        lng: null,
        lat: null,
      },
      Convertor: null,
      timer: null
    };
  },
  created() {
    this.getPos();
  },
  destroyed () {
    // 销毁定时器
    clearInterval(this.timer);
    console.log("已成功销毁");
  },
  methods: {
    ...mapMutations(["chageLoad"]),
    //   地图加载完毕时回调
    async handler({ BMap, map }) {
      // 开启loading
      this.chageLoad();
      // 保存坐标转换对象
      this.Convertor = new BMap.Convertor();
      await this.posTranslate();
      // 关闭loading
      this.chageLoad();
      this.timer = setInterval(async () => {
        await this.getPos();
        await this.posTranslate();
      }, 3000);
    },
    //获取坐标
    getPos() {
      location().then((res) => {
        if ((res.code = 200)) {
          this.position.lng = 119.306923;
          this.position.lat = 26.032347;
        }
      });
    },
    // 坐标转换
    posTranslate() {
      this.Convertor.translate([this.position], 1, 5, (data) => {
        if (data.status === 0) {
          this.pos = data.points[0];
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 93vh;
  position: relative;
}
</style>