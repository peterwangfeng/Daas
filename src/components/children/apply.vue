<template>
  <div class="es-dialog">
    <el-dialog title="申请试用" size="tiny" v-model="dialog.dialogFormVisible" @close="showDialog(false)">
      <el-form :label-position="dialog.labelPosition" :model="dialog.form">
        <el-form-item label="用户名" :label-width="dialog.formLabelWidth">
          <el-input v-model="dialog.form.name" auto-complete="off" placeholder="请填写用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="dialog.formLabelWidth">
          <el-input v-model="dialog.form.phone" auto-complete="off" placeholder="请填写手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="dialog.formLabelWidth">
          <el-input type="password" v-model="dialog.form.password" auto-complete="off" placeholder="请填写密码" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="dialog.formLabelWidth">
          <el-input v-model="dialog.form.mail" auto-complete="off" placeholder="请填写邮箱"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="dialog.formLabelWidth">
          <el-input v-model="dialog.form.company" auto-complete="off" placeholder="请填写公司名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog(false)">取 消</el-button>
        <el-button type="primary" @click="apply">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../../api/bus';
import URL from '../../api/url';
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      dialog: {
        labelPosition: 'left',
        formLabelWidth: '70px',
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
  watch: {
    show: function () {
      this.dialog.dialogFormVisible = this.show;
    }
  },
  methods: {
    clear() {
      let form = this.dialog.form;
      form.name = form.phone = form.mail = form.password = form.company = '';
    },
    showDialog(on) {
      this.dialog.dialogFormVisible = on || false;
      bus.$emit('showDialog', false);
    },
    apply () {
      let self = this;
      let form = self.dialog.form;
      let name = form.name;
      let phone = form.phone;
      let password = form.password;
      let mail = form.mail;
      let company = form.company;
      let vaildCharRegex = /\s/g;
      let phoneRegex = /^1(3|4|5|7|8)\d{9}$/g;
      let mailRegex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      let phoneTestResult = phoneRegex.test(phone);
      let mailTestResult = mailRegex.test(mail);
      let nameTestResult = vaildCharRegex.test(name);
      let pwdTestResult = vaildCharRegex.test(password);
      let comTestResult = vaildCharRegex.test(company);
      if (phoneTestResult && mailTestResult && name && !nameTestResult && password &&
        !pwdTestResult && company && !comTestResult) {
        let data = JSON.stringify(form);
        self.$http.post(URL.APPLY_USER_URL, data, {
          emulateJSON: true
        }).then(function (response) {
          let target = response.data;
          let status = target.code;
          if (status === 100) {
            self.message('success', '申请提交成功');
            self.showDialog(false);
            self.clear();
          } else if (status === 901) {
            self.message('info', '该手机号已注册, 可登录');
          }
        }, function (response) {
        });
      } else if (!name || nameTestResult) {
        self.message('warning', '用户名不可为空或空字符');
      } else if (!phoneTestResult) {
        self.message('warning', '非法的手机号码');
      } else if (!password || pwdTestResult) {
        self.message('warning', '密码不可为空或空字符');
      } else if (!mailTestResult) {
        self.message('warning', '非法的邮箱格式');
      } else if (!company || comTestResult) {
        self.message('warning', '公司名称不可为空');
      }
    }
  }
};
</script>
<style>
    
</style>
