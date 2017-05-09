<template>
  <el-card class="root" v-loading.body.lock="loading" element-loading-text="拼命加载中">
    <h4>消费查询</h4>
    <hr>
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
        <el-button type="primary" @click="search" size="large" style="width: 60%;position: relative;top: -3px;">查询</el-button>
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
        <td>{{value.ELEME || 0}}元</td>
        <td>{{value.BAIDU || 0}}元</td>
        <td>{{value.MEITUAN || 0}}元</td>
        <td>{{value.SCHOOL || 0}}元</td>
        <td>{{(value.ELEME || 0) + (value.BAIDU || 0) + (value.MEITUAN || 0) + (value.SCHOOL || 0)}}元</td>
      </tr>
    </table>
  </el-card>
</template>
<script>
export default {
  name: 'consume',
  data() {
    return {
      value1: '',
      value2: '',
      input: '',
      tableData: null,
      loading: false
    };
  },
  methods: {
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
      this.loading = true;
      if (this.value1 === '' || this.value2 === '') {
        this.loading = false;
        this.$message.error('请选择日期');
        return;
      }
      let startTime = this.formatDate(this.value1);
      let endTime = this.formatDate(this.value2);
      let url = 'http://192.168.0.103:5000/user-profile/v1/manage/subjects/' + 2 + '/consume/';
      this.$http.get(url, {
        params: {
          start_date: startTime,
          end_date: endTime,
          cur_page: 1,
          page_size: 20
        }
      }).then((res) => {
        this.loading = false;
        if (res.body.code === 100) {
          if (res.body.data !== null) {
            this.tableData = res.body.data.consume_list[0];
          } else {
            this.tableData = null;;
          }
          // console.log(this.tableData);
        }
      }).catch((error) => {
        this.loading = false;
        window.console.log(error);
      });
    }
  }
};
</script>
<style scoped>
.root {
  padding: 20px;
  margin: 10px;
}

table {
  margin-top: 20px;
  font-size: 14px;
}

tr {
  height: 40px;
}

table tr:nth-child(1) {
  background-color: #eef1f6;
}

th {
  color: #000;
}

th,
td {
  text-align: center;
}

hr {
  background-color: #000;
}
</style>
