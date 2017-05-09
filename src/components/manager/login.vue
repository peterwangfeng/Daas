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
            <div class="col-sm-offset-2 col-sm-10">
              <el-button type="text">没有账号，申请试用</el-button>
              <el-button type="primary" @click="login">登录</el-button>
            </div>
          </div>
        </div>
        <div class="es-dialog">
          <el-dialog title="收货地址" :visible.sync="dialog.dialogFormVisible">
            <el-form :model="dialog.form">
              <el-form-item label="用户名" :label-width="dialog.formLabelWidth">
                <el-input v-model="dialog.form.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="dialog.formLabelWidth">
                <el-input v-model="dialog.form.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="dialog.formLabelWidth">
                <el-input v-model="dialog.form.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="dialog.formLabelWidth">
                <el-input v-model="dialog.form.mail" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" :label-width="dialog.formLabelWidth">
                <el-input v-model="dialog.form.company" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showDialog(false)">取 消</el-button>
              <el-button type="primary" @click="showDialog(true)">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../router/index';
  export default {
    data() {
      return {
        user: {
          phone: '',
          password: ''
        },
        dialog: {
          formLabelWidth: 180,
          dialogFormVisible: false,
          form: {
            name: '',
            phone: '',
            password: '',
            mail: '',
            company: ''
          }
        }
      };
    },
    methods: {
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
          // self.$http.post().then(function (response) {
          //   let target = response.data;
          //   let status = target.code;
          //   if (status === '100') {
          //   } else if (status === '') {
          //   } else if (status === '') {
          //   }
          // }, fucntion (response) {
          // });
          router.push({path: '/index'});
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
  body {
    min-height: 100%;
    position: relative;
  }

  .container-fluid {
    background: #1D8CE0;
    position: absolute;
    width: 100%;
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
        el-button {
          float: right;
          margin-top: 20px;
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
