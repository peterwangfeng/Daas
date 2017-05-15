<template>
  <div class="container-fluid">
    <h3>EaseStrategy DaaS 云管理平台</h3>
    <div class="es-login">
      <p>登录<span><el-button type="text" @click="forgetPassword">忘记密码</el-button></span></p>
      <div class="es-login-content">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="phone" class="col-sm-3 control-label">手机号</label>
            <div class="col-sm-9">
              <input v-model="user.phone" type="text" class="form-control" id="phone" placeholder="请输入手机号">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-sm-3 control-label"> 密 &nbsp;&nbsp;码</label>
            <div class="col-sm-9">
              <input v-model="user.password" type="password" class="form-control" id="inputPassword"
                     placeholder="请输入密码">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-12">
              <el-button type="text" @click="showDialog(true)">没有账号，申请试用</el-button>
              <el-button type="primary" @click="login">登录</el-button>
            </div>
          </div>
        </div>
        <apply-use :show="dialog.dialogFormVisible"></apply-use>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../../api/bus';
  import URL from '../../api/url';
  import router from '../../router/index';
  import ApplyUse from '../children/apply';

  export default {
    components: {
      ApplyUse
    },
    data() {
      return {
        user: {
          phone: '15062225456',
          password: 'es1234'
        },
        dialog: {
          dialogFormVisible: false
        }
      };
    },
    created() {
      let self = this;
      bus.$on('showDialog', function (on) {
        self.dialog.dialogFormVisible = on;
      });
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过vm访问组件实例
        bus.$emit('showNavBar', false);
      });
    },
    beforeRouteLeave (to, from, next) {
      // 离开该组件的对应路由时调用
      this.emit(to);
      next(true);
    },
    methods: {
      emit(to) {
        let toName = to.name;
        if (toName) {
          bus.$emit('showNavBar', true);
        } else {
          bus.$emit('showNavBar', false);
        }
      },
      message(type, message) {
        this.$message({type: type, message: message});
      },
      showDialog(on) {
        this.dialog.dialogFormVisible = on || false;
      },
      forgetPassword() {
        let self = this;
        self.$alert('请联系管理员18317910981', ' ', {
          confirmButtonText: '确定'
        });
      },
      login() {
        let self = this;
        let regex = /\s/g;
        let phoneRegex = /^1(3|4|5|7|8)\d{9}$/g;
        let user = self.user;
        let phone = user.phone;
        let password = user.password;
        let phoneTestResult = phoneRegex.test(phone);
        let pdTestResult = regex.test(password);
        if (phoneTestResult && password && !pdTestResult) {
          let data = JSON.stringify({phone: phone, password: password});
          self.$http.post(URL.LOGIN_URL, data, {
            emulateJSON: true
          }).then(function (response) {
            let target = response.data;
            let status = target.code;
            if (status === 100) {
              let data = target.data;
              if (data) {
                let subject = data.Subject;
                let token = data.Token;
                let info = JSON.stringify({id: subject.id, name: subject.name});
                window.sessionStorage.setItem('subject', info);
                window.sessionStorage.setItem('token', token);
                router.push({path: '/index'});
              }
            } else if (status === 903) {
              self.message('error', '手机号未注册, 注册后才可登录');
            } else if (status === 904) {
              self.message('error', '密码错误');
            }
          }, function (response) {
          });
        } else if (!phone) {
          self.message('warning', '手机号码不可为空');
        } else if (!phoneTestResult) {
          self.message('error', '非法的手机号码');
        } else if (!password) {
          self.message('warning', '密码不可为空');
        } else if (pdTestResult) {
          self.message('error', '非法的密码字符');
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container-fluid {
    background: #003C96;
    min-width: 100%;
    min-height: 100%;
    h3 {
      text-align: center;
      color: #fff;
      margin-top: 150px;
    }
    .es-login {
      width: 400px;
      height: 270px;
      margin: 100px auto;
      margin-top: 40px;
      background: #ffffff;
      border-radius: 5px;
      .el-button--text:last-child {
        color: #ffffff;
      }
      button {
        font-size: 12px !important;
      }
      .form-horizontal .control-label {
        color: #666666 !important;
      }
      p {
        background: #32A0FF;
        height: 40px;
        line-height: 40px;
        color: #ffffff;
        padding: 0 20px;
        border-radius: 5px 5px 0 0;
        font-size: 16px;
        span {
          float: right;
          font-size: 12px;
        }
      }
      .es-login-content {
        background: #ffffff;
        width: 100%;
        padding: 20px;
        .form-horizontal {
          button.el-button {
            margin-top: 20px;
          }
          button.el-button:first-child {
            float: left;
          }
          button.el-button:last-child {
            float: right;
          }
        }
        .btn-link {
          float: right;
          background: none;
          border: none;
          outline: none;
          margin: -8px -10px 0 0;
        }
        .form-group {
          border-bottom: 1px solid #dddddd;
        }
        .form-group:last-child {
          border-bottom: none;
        }
        .form-control {
          border: none;
          box-shadow: none !important;
        }
      }
    }
  }

  .el-dialog__body p {
    text-align: center;
  }
</style>
