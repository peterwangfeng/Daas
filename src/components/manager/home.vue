<template>
  <div class="container-fluid">
    <div class="header">
      <heads></heads>
    </div>
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import heads from '../children/head';
  import sidebar from '../children/sidebar';
  export default {
    data() {
      return {
      };
    },
    components: {
      heads,
      sidebar
    }
  };

</script>

<style lang="scss">
  body {
    background-color: #f5f5f5 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  }

  .container-fluid {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .header {
    background: #2e384a;
    height: 50px;
  }

  .sidebar {
    width: 80px;
  }

  .content {
    padding-left: 220px;
    margin-top: 50px;
    background: #f5f5f5;
  }
</style>
