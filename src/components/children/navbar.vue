<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="col-md-6">
          <span>EaseStrategy DaaS | 数据服务平台</span>
        </div>
        <div class="col-md-5">
          <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" theme="dark" style="background-color:#fff;" unique-opened router>
            <el-menu-item index="/">主页</el-menu-item>
            <el-menu-item index="/product">产品</el-menu-item>
            <el-menu-item index="/doc">文档</el-menu-item>
            <el-menu-item index="/platform">云管理平台</el-menu-item>
          </el-menu>
        </div>
        <div class="col-md-1">
          <el-button type="text">申请试用</el-button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navBar'
};
</script>

<style scoped>
.navbar {
  border: none;
  background-color: #fff !important;
}

.container {
  height: 60px;
  line-height: 60px;
  border: none;
  color: #000;
  margin-bottom: -10px;
}

span {
  font-size: 20px;
  font-weight: bold;
}
</style>
