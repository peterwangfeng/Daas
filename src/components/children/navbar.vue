<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="col-md-6">
        <span>EaseStrategy DaaS | 数据服务平台</span>
      </div>
      <div class="col-md-5">
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" theme="light"
                 style="background-color:#fff;" unique-opened router @select="showNavBar">
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/product">产品</el-menu-item>
          <el-menu-item index="/doc">文档</el-menu-item>
          <el-menu-item index="/platform">云管理平台</el-menu-item>
        </el-menu>
      </div>
      <div class="col-md-1">
        <el-button type="text" @click="showDialog">申请试用</el-button>
      </div>
    </div>
  </nav>
</template>

<script>
  import bus from '../../api/bus';

  export default {
    name: 'navBar',
    data() {
      return {};
    },
    methods: {
      showDialog() {
        bus.$emit('apply-use', true);
      },
      showNavBar(index) {
        let isShow = true;
        if (String(index).indexOf('/platform') >= 0) {
          isShow = false;
        }
        bus.$emit('showNavBar', isShow);
      }
    }
  };
</script>

<style scoped lang="scss">
  .navbar {
    height: 60px;
    border: none;
    border-radius: 0;
    background-color: #fff !important;
    .container {
      height: 60px;
      line-height: 60px;
      border: none;
      color: #000;
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
</style>
