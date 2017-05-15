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
  import bus from '../../api/bus';
  import heads from '../children/head';
  import sidebar from '../children/sidebar';

  export default {
    data () {
      return {};
    },
    components: {
      heads,
      sidebar
    },
    created() {
      bus.$emit('showNavBar', false);
    }
  };
</script>

<style lang="scss" scoped>
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
    margin: 0;
    padding-left: 220px;
    background: #f5f5f5;
  }
</style>
