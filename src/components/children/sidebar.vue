<template>
  <el-row class="tac">
    <el-col :span="8">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" unique-opened router>
        <el-submenu index="/index" @click.native="to">
          <template slot="title">
            <span>首页</span>
          </template>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span class="icon">
              <span>云监控查询</span>
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/elm/饿了么用户ID/1">饿了么</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/baidu/百度外卖用户ID/2">百度外卖</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/meituan/美团外卖用户ID/3">美团外卖</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/schoolgeo/高校地理定位用户ID/4">高校地理定位</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span class="icon">
              <span>配置管理</span>
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="">饿了么</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="">百度外卖</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="">美团外卖</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="">高校地理定位</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span class="icon">
              <span>财务管理</span>
            </span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/deposit">充值</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/consume">消费查询</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/ticket">发票管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import router from '../../router/index';
export default {
  name: 'sidebar',
  data() {
    return {
      index: '/index'
    };
  },
  methods: {
    to() {
      router.push({ path: '/index' });
    }
  }
};
</script>

<style scoped lang="scss">
.el-col-8 {
  width: 220px !important;
  position: fixed !important;
  bottom: 0 !important;
  top: 50px !important;
  height: calc(100% - 50px) !important;
  background: #324157 !important;
  overflow-y: auto;
}

.el-submenu {
  border: 1px solid #475669;
}

.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  margin-top: -15px;
}
</style>
