<template>
  <article class="es-consume">
    <section class="container-fluid">
      <el-card class="root" v-loading.body.lock="loading" element-loading-text="拼命加载中">
        <div class="title">
          <h4>消费查询</h4>
        </div>
        <el-row>
          <el-col :span="6">
            <div class="block">
              <el-date-picker v-model="value1" type="date" format="yyyy-MM-dd" placeholder="选择日期">
              </el-date-picker>
              <span style="position:relative;left:25px;">至</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="block">
              <el-date-picker ref v-model="value2" format type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="week">近一周</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="month">近一个月</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search" size="large" style="width: 60%;position: relative;top: -3px;">查询
            </el-button>
          </el-col>
        </el-row>
        <table class="table table-striped table-bordered table-hover">
          <tr>
            <th>日期</th>
            <th>饿了么</th>
            <th>百度外卖</th>
            <th>美团外卖</th>
            <th>高校位置定位</th>
            <th>合计</th>
          </tr>
          <tr v-for="(value, key) in tableData">
            <td>{{key}}</td>
            <td>{{value.ELEME || 0}}</td>
            <td>{{value.BAIDU || 0}}</td>
            <td>{{value.MEITUAN || 0}}</td>
            <td>{{value.SCHOOL || 0}}</td>
            <td>{{(value.ELEME || 0) + (value.BAIDU || 0) + (value.MEITUAN || 0) + (value.SCHOOL || 0)}}</td>
          </tr>
        </table>
        <es-pagination :total="total" v-on:currentPage="next"></es-pagination>
      </el-card>
    </section>
  </article>
</template>
<script>
  import URL from '../../../api/url';
  import EsPagination from '../../children/pagination';

  export default {
    name: 'consume',
    components: {
      EsPagination
    },
    data() {
      return {
        loading: false,
        value1: '',
        value2: '',
        input: '',
        tableData: null,
        subjectId: 0,
        total: 1
      };
    },
    created() {
      let self = this;
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        self.subjectId = subjectObject.id;
      }
    },
    methods: {
      next(currentPage) {
        this.init(currentPage);
      },
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      init(currentPage = 1) {
        let self = this;
        let subjectId = self.subjectId;
        let startTime = self.formatDate(self.value1);
        let endTime = self.formatDate(self.value2);
        let url = self.urlPartReplace(URL.GET_CONSUME_INFO_URL, '{subject_id}', subjectId);
        let params = {start_date: startTime, end_date: endTime, cur_page: currentPage, page_size: 10};
        self.loading = true;
        self.$http.get(url, {params}).then((res) => {
          self.loading = false;
          let target = res.data;
          let status = target.code;
          if (status === 100) {
            let data = target.data;
            if (data) {
              self.tableData = data.consume_list[0];
            } else {
              self.tableData = null;
            }
          } else {
            self.$message({type: 'info', message: '暂无数据'});
          }
        }).catch((error) => {
          self.loading = false;
          window.console.log(error);
        });
      },
      month() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let last = date.getMonth();
        m = m < 10 ? '0' + m : m;
        last = last < 10 ? '0' + last : last;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        this.value2 = y + '-' + m + '-' + d;
        this.value1 = y + '-' + last + '-' + d;
      },
      formatDate(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
      },
      week() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let last = date.getMonth();
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        let d1 = d;
        if (d <= 7) {
          let temp = 7 - d;
          d1 = 30 - temp;
        } else {
          d1 = d - 7;
          last = last + 1;
          last = last < 10 ? '0' + last : last;
        }
        d = d < 10 ? '0' + d : d;
        d1 = d1 < 10 ? '0' + d1 : d1;
        this.value1 = y + '-' + last + '-' + d1;
        this.value2 = y + '-' + m + '-' + d;
      },
      search() {
        this.tableData = null;
        if (this.value1 === '' || this.value2 === '') {
          this.$message.error('请选择日期');
          return;
        }
        this.init();
      }
    }
  };
</script>
<style scoped lang="scss">
  .es-consume {
    padding: 20px;
    .container-fluid {
      .root {
        .title {
          border-bottom: 1px solid #ddd;
        }
        .el-row {
          margin: 15px 0;
        }
        table {
          margin-top: 20px;
          font-size: 14px;
          tr {
            height: 40px;
            th {
              color: #000;
            }
            th,
            td {
              text-align: center;
            }
          }
          tr:first-child {
            background-color: #eef1f6;
          }
        }
      }
    }
  }
</style>
