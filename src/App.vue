<template>
  <div id="app">
    <nav-bar v-show="isShow"></nav-bar>
    <router-view></router-view>
    <div class="apply-use">
      <apply-use :show="dialogFormVisible"></apply-use>
    </div>
  </div>
</template>

<script>
  import bus from './api/bus';
  import NavBar from './components/children/navbar';
  import applyUse from './components/children/apply';

  export default {
    components: {
      NavBar,
      applyUse
    },
    data () {
      return {
        isShow: true,
        dialogFormVisible: false
      };
    },
    created() {
      this.handlerEvents();
    },
    methods: {
      handlerEvents() {
        let self = this;
        bus.$on('apply-use', function (isShow) {
          self.dialogFormVisible = isShow;
        });
        bus.$on('showDialog', function (isShow) {
          self.dialogFormVisible = isShow;
        });
        bus.$on('showNavBar', function (isShow) {
          self.isShow = isShow;
        });
      }
    }
  };
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    min-width: 1024px !important;
    font-size: 14px !important;
    background-color: #f5f5f5 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  }

  #app {
    height: 100%;
  }

  .loading {
    background-color: transparent !important;
  }
</style>
