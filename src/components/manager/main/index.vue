<template>
  <div class="es-main-page">
    <div class="container-fluid">
      <article class="main-content">
        <section>
          <div class="title">
            <h4>账号信息</h4>
            <el-button type="text" @click="openDialog(true)">修改密码</el-button>
          </div>
          <div class="main" v-loading.body.lock="subject_area_loading" element-loading-text="拼命加载中">
            <ol>
              <li>
                <span>用户名 : </span>
                <span>{{subject.name}}</span>
              </li>
              <li>
                <span>手机号码 : </span>
                <span>{{subject.phone | phoneFormat}}</span>
              </li>
              <li>
                <span>ApiKey : </span>
                <span>{{subject.ApiKey}}</span>
              </li>
              <li>
                <span>Token : </span>
                <span>{{subject.Token}}</span>
              </li>
              <li><strong>(Apikey和Token是调用EaseStrategy DaaS API必要的参数，Apikey和token用于保证第三方和EaseStrategy DaaS数据通信时的安全性，请谨慎保管，不要泄露给任何其他第三方知道.)</strong>
              </li>
            </ol>
          </div>
        </section>
        <section>
          <div class="title">
            <h4>使用信息</h4>
          </div>
          <div class="main">
            <p>
              <span>剩余费用(元) : {{subject.balance | floatFormat}}</span>
              <el-button type="text" @click="depositAmount">充值</el-button>
            </p>
            <el-table :data="productConsume" v-loading="loading" element-loading-text="拼命加载中">
              <el-table-column prop="name" align="center" label="平台"></el-table-column>
              <el-table-column prop="totalTimes" align="center" label="调用次数"></el-table-column>
              <el-table-column prop="successTimes" align="center" label="成功次数"></el-table-column>
              <el-table-column prop="totalAmount" align="center" label="累计消费(元)"
                               :formatter="numberFormat"></el-table-column>
            </el-table>
          </div>
        </section>
        <el-dialog title="修改密码" size="tiny" v-model="dialog.dialogFormVisible">
          <el-form :model="dialog.form">
            <el-form-item label="新密码" :label-width="dialog.formLabelWidth">
              <el-input type="password" v-model="dialog.form.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="dialog.formLabelWidth">
              <el-input type="password" v-model="dialog.form.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="openDialog(false)">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </article>
    </div>
  </div>
</template>

<script>
  import URL from '../../../api/url';
  import bus from '../../../api/bus';
  import router from '../../../router/index';
  import {MessageBox} from 'element-ui';

  export default {
    data () {
      return {
        loading: true,
        subject_area_loading: true,
        subject: {
          id: 0,
          name: '',
          phone: '',
          ApiKey: '',
          Token: '',
          balance: 0
        },
        dialog: {
          formLabelWidth: '70px',
          dialogFormVisible: false,
          form: {
            newPassword: '',
            confirmPassword: ''
          }
        },
        productConsume: []
      };
    },
    filters: {
      phoneFormat(phone) {
        let value = phone;
        if (value) {
          value = String(value).substring(0, 3) + '-' + String(value).substring(3, 7) + '-' +
            String(value).substring(7);
        }
        return value;
      },
      floatFormat(value) {
        return window.parseFloat(value).toFixed(2);
      }
    },
    created () {
      let self = this;
      let subject = self.subject;
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        subject.id = subjectObject.id;
        self.init();
      } else {
        MessageBox({title: '', message: '当前为未登录状态，请登录'});
      }
    },
    methods: {
      numberFormat(consume) {
        let result = '';
        if (consume.totalAmount) {
          result = window.parseFloat(consume.totalAmount).toFixed(2);
        }
        return result;
      },
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      openDialog(on) {
        this.dialog.dialogFormVisible = on || false;
      },
      depositAmount() {
        bus.$emit('deposit', '/deposit');
        router.push({path: '/deposit'});
      },
      submit() {
        let self = this;
        let regex = /\s/g;
        let subjectId = self.subject.id;
        let form = self.dialog.form;
        let password = form.newPassword;
        let confirmPassword = form.confirmPassword;
        let pwdTestResult = regex.test(password);
        if (password && !pwdTestResult && password === confirmPassword) {
          let url = self.urlPartReplace(URL.MODIFY_PASSWORD_URL, '{subject_id}', subjectId);
          let data = JSON.stringify({password: password});
          self.$http.post(url, data, {
            emulateJSON: true
          }).then(function (response) {
            let target = response.data;
            if (target.code === 100) {
              self.$message({type: 'success', message: '密码已修改'});
              self.openDialog(false);
            }
          }, function (response) {
          });
        } else if (!pwdTestResult) {
          self.$message({type: 'warning', message: '密码不可为空'});
        } else if (pwdTestResult) {
          self.$message({type: 'error', message: '非法的密码格式'});
        }
      },
      init() {
        let self = this;
        let productConsume = [];
        let subjectId = self.subject.id;
        if (subjectId > 0) {
          let subject_info_url = self.urlPartReplace(URL.GET_SUBJECT_INFO_URL, '{subject_id}', subjectId);
          let product_info_url = self.urlPartReplace(URL.GET_PRODUCT_CONSUME_INFO_URL, '{subject_id}', subjectId);
          self.$http.get(subject_info_url).then(function (response) {
            self.subject_area_loading = false;
            let target = response.data;
            if (target.code === 100) {
              let data = target.data;
              if (data) {
                let subject = data.Subject;
                window.sessionStorage.setItem('api', subject.api_key + '_api_' + subject.token);
                // bus.$emit('ApiKey_Token', {api_key: subject.api_key, token: subject.token});
                self.subject = {
                  id: subject.id,
                  name: subject.name,
                  phone: subject.phone,
                  ApiKey: subject.api_key,
                  Token: subject.token,
                  balance: subject.balance
                };
              }
            }
          }, function (response) {
            self.subject_area_loading = false;
          });
          self.$http.get(product_info_url).then(function (response) {
            self.loading = false;
            let target = response.data;
            if (target.code === 100) {
              let data = target.data;
              if (data) {
                let summary = {summaryTimes: 0, summarySuccTimes: 0, total: 0};
                let productConsumeInfoList = data.use_list;
                productConsumeInfoList.map((product) => {
                  let totalTimes = product.call_times;
                  let succTimes = product.succ_times;
                  let totalAmount = product.total_price;
                  let name = product.platform;
                  summary.summaryTimes += totalTimes;
                  summary.summarySuccTimes += succTimes;
                  summary.total += totalAmount;
                  let temp = {name: name, totalTimes: totalTimes, successTimes: succTimes, totalAmount: totalAmount};
                  productConsume.push(temp);
                });
                let temp = {
                  name: '合计',
                  totalTimes: summary.summaryTimes,
                  successTimes: summary.summarySuccTimes,
                  totalAmount: summary.total
                };
                productConsume.push(temp);
                self.productConsume = productConsume;
              }
            }
          }, function (err) {
            self.loading = false;
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .es-main-page {
    padding: 20px;
    .main-content {
      section {
        margin: 0 0 20px 0;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        .title {
          border-bottom: 1px solid #ddd;
          h4 {
            display: inline-block;
          }
          .el-button {
            float: right;
          }
        }
        .main {
          ol {
            padding: 0;
            li {
              height: 40px;
              line-height: 30px;
              margin: 10px 0px;
              list-style: none;
            }
            li:first-child {
              margin: 20px 0 0 0;
            }
            li:last-child {
              color: red;
            }
          }
          p {
            margin: 0;
            height: 50px;
            line-height: 50px;
            span {
              margin: 0 40px 0 0;
            }
          }
        }
      }
    }
  }
</style>
