<template>
  <div id="app">
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from './components/children/bottom';
export default {
  name: 'app',
  components: {
    Bottom
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  /*font-family: '微软雅黑',serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
