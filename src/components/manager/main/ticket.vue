<template>
  <el-card class="root">
    <h4>订单信息</h4>
    <hr>
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="order_id"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="invoice_amount"
        label="金额">
      </el-table-column>
      <el-table-column
        align="center"
        prop="invoice_detail"
        label="发票状态">
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
  export default {
    name: 'ticket',
    data() {
      return {
        tableData: [{create_time: 1493901901688}],
        url: '/url-profile/v1/manage/'
      };
    },
    created() {
      this.tableData.map((item) => {
        item.create_time = new Date(item.create_time).toLocaleDateString();
        return item;
      });
      this.$http.get(this.url + 'invoices', {
        params: {
          subject_id: window.sessionStorage.getItem('subject_id')
        }
      })
        .then((res) => {
          if (res.body.code === '100') {
//            this.tableData = res.body.data;
            this.tableData = res.body.map((item) => {
              item.create_time = new Date(item.create_time).toLocaleString();
              return item;
            });
          }
        });
    }
  };
</script>
<style scoped>
  .root {
    height: calc(100% - 40px);
    margin: 10px;
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
</style>
