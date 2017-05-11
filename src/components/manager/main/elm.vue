<template>
  <el-card class="root" v-loading.body.lock="loading" element-loading-text="拼命加载中">
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
    <el-table border :data="tableData" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" prop="user_id" label="用户ID" width="180">
      </el-table-column>
      <el-table-column align="center" prop="id" label="task id" width="180">
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="请求时间">
      </el-table-column>
      <el-table-column prop="phase_status" align="center" label="状态">
      </el-table-column>
      <el-table-column prop="finished" align="center" label="请求结果">
      </el-table-column>
    </el-table>
    <div>{{a}}</div>
  </el-card>
</template>
<script>
export default {
  name: 'elm',
  data() {
    return {
      input: '',
      tableData: [],
      loading: false
    };
  },
  methods: {
    search() {
      this.loading = true;
      this.tableData = [];
      let url = 'http://192.168.0.103:5000/user-profile/v1/manage/subjects/2/tasks/';
      this.$http.get(url, {
        params: {
          product_id: this.$route.params.id,
          user_id: this.input,
          cur_page: 1,
          page_size: 20
        }
      })
        .then((res) => {
          this.loading = false;
          if (res.body.code === 100) {
            console.log(res);
            console.log(res.data);
            // this.tableData.push(res.body.data);
            this.tableData = res.body.data.task_list.map((item) => {
              item.user_id = this.input;
              item.finished = item.finished === 0 ? '失败' : '成功';
              return item;
            });
          }
        }).catch((error) => {
          this.loading = false;
          window.console.log(error);
        });
      // this.$alert(this.input, 'title', {
      //   confirmButtonText: true
      // });
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to);
      console.log(from);
      this.tableData = [];
      this.input = '';
      this.loading = false;
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
