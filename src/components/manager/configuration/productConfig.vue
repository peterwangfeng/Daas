<template>
  <section class="es-configuration">
    <div class="container-fluid">
      <article class="configuration-content">
         <section>
          <div class="title">
            <h4>账号信息</h4>
          </div>
          <div class="main">
            <div class="es-url">
              <span>登录通知URL:</span>
              <el-input size="mini" v-model="product.login_notification_url"></el-input>
              <el-button type="text">重置</el-button>
            </div>
            <div class="es-url">
              <span>数据通知URL:</span>
              <el-input size="mini" v-model="product.data_notification_url"></el-input>
              <el-button type="text">重置</el-button>
            </div>
          </div>
        </section>
        <section>
          <div class="title">
            <h4>API测试</h4>
          </div>
          <div class="main">
            <div class="api-content" v-for="item in api">
              <h5>{{item.title}}</h5>
              <table class="table" border>
                <tr>
                  <td>接口类型</td>
                  <td>{{item.method}}</td>
                </tr>
                <tr>
                  <td>URL</td>
                  <td>{{item.url}}</td>
                </tr>
                <tr>
                  <td>备注</td>
                  <td>{{item.note}}</td>
                </tr>
              </table>
              <el-table :data="item.params" border>
                <el-table-column align="center" label="参数" prop="name">
                </el-table-column>
                <el-table-column align="center" label="值" prop="value">
                  <template scope="scope">
                    <el-input v-model="scope.row.value.value" :disabled="scope.row.value.isDisabled" :placeholder="scope.row.value.placeholder"></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="备注" prop="note">
                </el-table-column>
              </el-table>
              <div class="button-bars">
                <el-button type="primary"  @click="run(item)">调用接口</el-button>
                <el-button type="primary" v-show="item.isExpanded"  @click="close(item)">清空</el-button>
                <transition name="el-zoom-in-top">
                  <div v-show="item.isExpanded" class="result-content transition-box">
                    <div class="url">
                      <span>{{item.interface_url}}</span>
                    </div>
                    <div class="pre">
                      <div class="jsontree_value">
                        <pre class="jsonData">{{item.data}}</pre>
                        <!-- <ul class="jsontree_child-nodes">
                          <li v-for="child in item.data">{{child}}</li>
                        </ul> -->
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>     
  </section>
</template>

<script>
// import bus from '../../../api/bus';
import URL from '../../../api/url';
export default {
  data() {
    return {
      subject: {
        id: 0,
        apiKey: 0,
        token: 0
      },
      product: {
        id: 0,
        name: '',
        login_notification_url: '',
        data_notification_url: ''
      },
      api: [
      {title: '获取手机验证码', method: 'HTTP POST', data: '', note: '调用易启策API发起一个获取手机短信验证码任务', url: 'http://118.190.132.110:5000/user-profile/v1/waimai/tasks/', interface_url: '', isExpanded: false, params: [{param: 'app_id', name: '商户ID', value: {value: '', isDisabled: true, placeholder: ''}, note: '分配的商户ID'}, {param: 'platform_id', name: '产品ID', value: {value: '', isDisabled: true, placeholder: ''}, note: '产品ID'}, {param: 'user_id', name: '用户ID', value: {value: '', isDisabled: false, placeholder: '请填写用户ID'}, note: '客户能通过此id关联到自己的用户或者业务'}, {param: 'phone', name: '手机号码', value: {value: '', isDisabled: false, placeholder: '请填写手机号码'}, note: '用户的手机号码'}, {param: 'origin', name: '认证方式', value: {value: '', isDisabled: false, placeholder: '请填写认证方式'}, note: '认证方式(2)'}, {param: 'ip', name: 'IP', value: {value: '', isDisabled: false, placeholder: '请填写IP地址'}, note: 'IP地址'}]},
        {title: '发送手机验证码', method: 'HTTP POST', data: '', note: '调用易启策API发起一个外卖地址采集任务', url: 'http://118.190.132.110:5000/user-profile/v1/waimai/{request_key}/validate_code', interface_url: '', isExpanded: false, params: [{param: 'request_key', name: '请求key', value: {value: '', isDisabled: false, placeholder: '请填写唯一的key'}, note: '标识请求的唯一性的key'}, {param: 'validate_code', name: '验证码', value: {value: '', isDisabled: false, placeholder: '请填写验证码'}, note: '验证码'}]},
        {title: '查询任务状态', method: 'HTTP GET', data: '', note: '任务创建成功后，根据task_id来查询任务状态', url: 'http://118.190.132.110:5000/user-profile/v1/waimai/tasks/{task_id}/status/', interface_url: '', isExpanded: false, params: [{param: 'task_id', name: '任务ID', value: {value: '', isDisabled: false, placeholder: '请填写任务ID'}, note: '创建的任务的ID'}]},
        {title: '获取任务数据', method: 'HTTP GET', data: '', note: '根据task_id获取上一次任务爬取的用户数据', url: 'http://118.190.132.110:5000/user-profile/v1/waimai/tasks/{task_id}/orders/', interface_url: '', isExpanded: false, params: [{param: 'task_id', name: '任务ID', value: {value: '', isDisabled: false, placeholder: '请填写任务ID'}, note: '创建的任务的ID'}]}
      ]
    };
  },
  created() {
    let subjectString = window.sessionStorage.getItem('subject');
    if (subjectString) {
      let subjectObject = JSON.parse(subjectString);
      this.subject.id = subjectObject.id;
      // this.handlerEvents();
      this.getProduct();
      this.init();
    }
  },
  watch: {
    '$route': {
      handler() {
        this.getProduct();
        this.init();
      },
      deep: true
    }
  },
  methods: {
    urlPartReplace(url, origin, dest) {
      return String(url).replace(origin, dest);
    },
    run(data) {
      let self = this;
      let originUrl = data.url;
      let paramObject = {};
      let params = data.params;
      let method = data.method;
      params.map((item) => {
        let param = item.param;
        let value = item.value.value;
        paramObject[param] = value;
      });
      if (String(method).indexOf('HTTP POST') >= 0) {
        let url = '';
        let jsonData = '';
        if (String(originUrl).indexOf('{request_key}') > 0) {
          let request_key = paramObject['request_key'];
          request_key = !request_key ? '你的request_key' : request_key;
          url = self.urlPartReplace(originUrl, '{request_key}', request_key);
          let code = paramObject['validate_code'];
          jsonData = JSON.stringify({validate_code: code});
        } else {
          url = originUrl;
          jsonData = JSON.stringify(paramObject);
        }
        data.interface_url = url;
        self.$http.post(url, jsonData, {
          emulateJSON: true
        }).then(function (response) {
          let target = response.data;
          data.data = target;
        }, function (response) {
        });
      } else if (String(method).indexOf('HTTP GET') >= 0) {
        let url = self.urlPartReplace(originUrl, '{task_id}', paramObject['task_id']);
        data.interface_url = url;
        self.$http.post(url, {
          emulateJSON: true
        }).then(function (response) {
        }, function (response) {
        });
      }
      let isExpanded = data.isExpanded;
      if (!isExpanded) {
        data.isExpanded = true;
      }
    },
    close(data) {
      data.isExpanded = false;
    },
    // handlerEvents() {
    //   let self = this;
    //   let subject = self.subject;
    //   bus.$on('ApiKey_Token', function (data) {
    //     subject.apiKey = data.api_key;
    //     subject.token = data.token;
    //   });
    //   console.log(subject);
    // },
    getProduct() {
      let product = this.product;
      let productInfo = this.$route.params.product;
      let productInfoes = String(productInfo).split('-');
      product.id = window.parseInt(productInfoes[1]);
      product.name = productInfoes[0];
    },
    init() {
      let self = this;
      let subjectId = self.subject.id;
      let product = self.product;
      if (product.id > 0) {
        let params = self.api[0].params;
        let subjectValue = params[0];
        let productValue = params[1];
        subjectValue.value.value = subjectId;
        productValue.value.value = product.id;
        let url = self.urlPartReplace(URL.GET_PRODUCT_CONFIG_URL, '{subject_id}', subjectId);
        url = self.urlPartReplace(url, '{product_id}', product.id);
        self.$http.get(url).then(function (response) {
          let target = response.data;
          if (target.code === 100) {
            let data = target.data;
            if (data) {
              let productConfig = data.product_config;
              product.login_notification_url = productConfig.login_notification_url;
              product.data_notification_url = productConfig.data_notification_url;
            }
          } else if (target.code === 906) {
            self.$message({type: 'info', message: '产品配置信息不存在'});
          }
        }, function (response) {
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.es-configuration {
  padding: 20px;
  section {
    margin: 0 0 20px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    .title {
      border-bottom: 1px solid gray;
      h4 {
        display: inline-block;
      }
      .el-button {
        float: right;
      }
    }
    .main {
      padding: 20px;
      > div {
        margin: 0 0 50px 0;
      }
      .es-url {
        margin: 0 0 10px 0;
        text-align: center;
        .el-input {
          width: 60%;
        }
        .el-button {
          margin: 0 0 0 10px;
        }
      }
      .api-content {
        h5 {
          color: #20a0ff;
        }
        table.table {
          border: 1px solid #dfe6ec;
          tr {
            td {
              text-align: center;
              white-space: normal;
              word-break: break-all;
              line-height: 24px;
            }
          }
        }
        .button-bars {
          .el-button {
            margin: 10px 0;
          }
          .result-content {
            max-height: 200px;
            border: 1px solid #d1dbe5;
            .url {
              color: #0A8021;
              height: 40px;
              line-height: 40px;
              text-align: left;
              border-bottom: 1px solid #d1dbe5;
              font-family: consolas,'courier new',monospace;
              word-break: break-all;
              span {
                padding-left: 2em;
              }
            }
            .pre {
              padding: 0 0 0 40px;
              .jsontree_value {
                overflow-y: auto;
                pre.jsondata {
                  border: none;
                  background-color: #fff !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
