<template>
  <div class="root">
    <h4>业务查询</h4>
    <hr>
    <el-row>
      <el-col :span="6">
        <el-input v-model="input" :placeholder="$route.params.account"></el-input>
      </el-col>
      <el-col :span="6" style="padding-left:20px;">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      border
      :data="tableData"
      style="width: 100%;margin-top:20px;">
      <el-table-column
        align="center"
        prop="phone"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="task_id"
        label="task id"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="request_time"
        label="请求时间">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="request_result"
        align="center"
        label="请求结果">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: 'elm',
    data() {
      return {
        input: '',
        tableData: [{
          phone: '18021790026',
          task_id: '123',
          request_time: '17-2-12',
          status: 'ok',
          request_result: '成功'
        }, {
          phone: '18021790026',
          task_id: '123',
          request_time: '17-2-12',
          status: 'ok',
          request_result: '成功'
        }],
        url: '/url-profile/v1/manage/'
      };
    },
    methods: {
      search() {
        this.$http.get('/user-profile/v1/manage' + window.sessionStorage.getItem('subject_id'), {
          params: this.input
        })
          .then((res) => {
            if (res.body.code === '100') {
              this.tableData.push(res.body.data);
            }
          }).catch((error) => {
            window.console.log(error);
          });
        this.$alert(this.input, 'title', {
          confirmButtonText: true
        });
      }
    }
  };
</script>
<style scoped>
  .root {
    padding: 20px;
  }
</style>
