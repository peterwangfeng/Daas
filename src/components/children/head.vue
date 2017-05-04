<template>
  <div class="header">
    <nav>
      <div class="nav-left">
        <img src="../../assets/logo.png">
      </div>
      <div class="nav-right">
        <span>用户：</span>
        <span class="es-user">{{loginUser.name}}</span>|  &nbsp;退出
        <span class="glyphicon glyphicon-off es-logout" aria-hidden="true" @click="logout" title="退出"></span>
      </div>
    </nav>
  </div>
</template>

<script>
import router from '../../router/index';
export default {
  name: 'heads',
  data () {
    return {
      loginUser: {
        id: 0,
        name: ''
      }
    };
  },
  created () {
    let self = this;
    let loginUser = self.loginUser;
    let appInfo = window.sessionStorage.getItem('userInfo');
    if (appInfo) {
      let infoes = String(appInfo).split('_');
      loginUser.id = infoes[0];
      loginUser.name = infoes[1];
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear();
      router.push({path: '/'});
    }
  }
};
</script>

<style lang="scss" scope>
  .header {
    width: 100%;
    position: fixed;
    z-index: 200;
    .nav-left {
      float: left;
      span{
        color: #C5C7CA;
        font-size: 12px !important;
        font-weight: 100;
        margin-top: 2px;
        display: inline-block;
      }
    }
    .nav-right {
      display: table;
      height: 50px;
      float: right;
      color: #C5C7CA;
      font-weight: 100;
      line-height: 50px;
      margin: 0 30px 0 0;
      .es-user {
        text-align: left;
        cursor: pointer;
        margin: 0 10px 0 0;
      }
      .es-user:hover,  .es-logout:hover {
        color: #37A2FE;
      }
      .es-logout {
        cursor: pointer;
        vertical-align: middle;
        margin: 0 0 0 5px;
      }
    }
  }
</style>

