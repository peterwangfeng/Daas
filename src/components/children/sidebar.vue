<template>
  <el-row class="tac">
    <el-col :span="8">
      <el-menu :default-active="index" class="el-menu-vertical-demo" theme="dark" unique-opened router>
        <el-menu-item index="/index">
          <span class="icon">
            <span>首页</span>
          </span>
        </el-menu-item>
        <el-menu-item index="/notice">
          <span class="icon">
            <span>通知中心</span>
          </span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <span class="icon">
              <span>云监控查询</span>
            </span>
          </template>
          <el-menu-item-group v-for="product in subjectProductMonitor" :key="product">
            <el-menu-item :index="product.router" v-text="product.name"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span class="icon">
              <span>配置管理</span>
            </span>
          </template>
          <el-menu-item-group v-for="product in subjectProductConfig" :key="product">
            <el-menu-item :index="product.router" v-text="product.name"></el-menu-item>
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
import URL from '../../api/url';
import bus from '../../api/bus';
export default {
  name: 'sidebar',
  data() {
    return {
      index: '/index',
      subjectId: 0,
      subjectProductMonitor: [],
      subjectProductConfig: []
    };
  },
  mounted() {
    let self = this;
    let subjectString = window.sessionStorage.getItem('subject');
    if (subjectString) {
      let subjectObject = JSON.parse(subjectString);
      self.subjectId = subjectObject.id;
      self.init();
      self.handlerEvents(self);
    }
  },
  methods: {
    urlPartReplace(url, origin, dest) {
      return String(url).replace(origin, dest);
    },
    init() {
      let self = this;
      let subjectProductConfig = [];
      let subjectProductMonitor = [];
      let subjectId = self.subjectId;
      let url = self.urlPartReplace(URL.GET_PRODUCTS_URL, '{subject_id}', subjectId);
      self.$http.get(url).then(function (response) {
        let target = response.data;
        if (target.code === 100) {
          let data = target.data;
          if (data) {
            let product_list = data.product_list;
            product_list.map((product) => {
              let id = product.id;
              let name = product.remark;
              let uri = encodeURI(name + '-' + id);
              let monitor_temp = { router: '/monitor/' + uri, name: name };
              let config_temp = { router: '/configuration/' + uri, name: name };
              subjectProductMonitor.push(monitor_temp);
              subjectProductConfig.push(config_temp);
              self.subjectProductConfig = subjectProductConfig;
              self.subjectProductMonitor = subjectProductMonitor;
            });
          }
        }
      }, function (response) {
      });
    },
    handlerEvents(self) {
      bus.$on('deposit', function (router) {
        if (router) {
          self.index = router;
        }
      });
      bus.$on('notice', function (router) {
        if (router) {
          self.index = router;
        }
      });
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
  z-index: 9998;
  .el-menu {
    >.el-menu-item {
      border-top: 1px solid #475669;
    }
    .el-submenu {
      border-top: 1px solid #475669;
      .el-menu-item {
        height: 40px !important;
        line-height: 40px !important;
        margin-top: -15px;
      }
    }
    .el-submenu:last-child {
      border-bottom: 1px solid #475669;
    }
  }
}
</style>
