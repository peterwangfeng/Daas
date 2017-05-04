<template>
  <div class="root">
    <h3>业务查询</h3>
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
        prop="date"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="task id"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="请求时间">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
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
        tableData: []
      };
    },
    methods: {
      search() {
        // this.$http.get('url')
        // .then((res)=>{
        // 	if(res.body.target ==='') {

        // 	}
        // }).catch((error)=>{

        // })
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
