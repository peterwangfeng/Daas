<template>
  <el-card class="root">
    <h4>消费查询</h4>
    <hr>
    <el-row>
      <el-col :span="6">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="date"
            format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <span style="position:relative;left:25px;">至</span>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <el-date-picker
            ref
            v-model="value2"
            format
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1">
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
    <el-table
      border
      :data="tableData"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        align="center"
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="饿了么"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="百度外卖">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="美团外卖">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="高校位置定位">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="合计">
      </el-table-column>
    </el-table>
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
        tableData: [],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
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
      week() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let last = date.getMonth();
        m = m < 10 ? '0' + m : m;
        last = last < 10 ? '0' + last : last;
        let d = date.getDate();
        let d1 = d;
        if (d <= 7) {
          let temp = 7 - d;
          d1 = 30 - temp;
        }
        d = d < 10 ? '0' + d : d;
        d1 = d1 < 10 ? '0' + d1 : d1;
        this.value1 = y + '-' + last + '-' + d1;
        this.value2 = y + '-' + m + '-' + d;
      },
      search() {
        let startTime = new Date(this.value1).toISOString().split('T')[0];
        let endTime = new Date(this.value2).toISOString().split('T')[0];
        this.$alert(startTime + '-' + endTime);
        let url = '/user-profile/v1/manage/subjects/' + window.sessionStorage.getItem('subject_id') + '/consume';
        this.$http.get(url, {
          params: {
            start_date: startTime,
            end_date: endTime
          }
        }).then((res) => {
          if (res.body.code === '100') {
            this.tableData = res.body.data;
          }
        }).catch((error) => {
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
</style>
