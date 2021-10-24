<template>
  <div id="app" v-loading="loading">
    <Header />
    <div class="view">
       <router-view />
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

import Header from "./components/Header/Header.vue";

export default {
  components: {
    Header,
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
}
</script>


<style lang="less">
@import url("./assets/init.css");
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .view {
    flex-grow: 1;
  }

}
</style>
