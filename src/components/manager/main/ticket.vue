<template>
  <el-card class="root" v-loading.body.lock="loading" element-loading-text="拼命加载中">
    <h4>订单信息</h4>
    <hr>
    <el-table @cell-click="dialogFormVisible=true" element-loading-text="拼命加载中" border :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="code" label="订单编号" width="180">
      </el-table-column>
      <el-table-column align="center" prop="deposit_time" label="日期" width="180">
      </el-table-column>
      <el-table-column align="center" prop="amount" label="金额">
      </el-table-column>
      <el-table-column @click.native="showDialog" align="center" prop="is_invoice" label="发票状态" :class="{color:show}" style="color: red">
      </el-table-column>
    </el-table>
    <el-dialog title="发票充值" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="发票类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择发票类型">
            <el-option label="0 普通发票" value="0"></el-option>
            <el-option label="1 增值税发票" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发票标题" :label-width="formLabelWidth">
          <el-input v-model="form.invoice_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票详细" :label-width="formLabelWidth">
          <el-input v-model="form.invoice_detail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="form.order_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.invoice_amount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInvonice">确 定</el-button>
      </div>
    </el-dialog>
    <el-row>
      <el-col :span="6" :offset="10">
        <el-pagination layout="prev, pager, next" :page-size="1" :total="10">
        </el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'ticket',
  data() {
    return {
      tableData: [],
      show: true,
      dialogFormVisible: false,
      form: {
        type: '',
        invoice_title: '',
        invoice_detail: '',
        order_id: '',
        invoice_amount: ''
      },
      formLabelWidth: '120px',
      loading: true
    };
  },
  created() {
    // let url = 'http://192.168.0.118:5000/user-profile/v1/manage/subjects/2/deposits/';
    // this.$http.get(url, {
    //   params: {
    //     cur_page: 1,
    //     page_size: 20
    //   }
    // })
    //   .then((res) => {
    //     if (res.body.code === 100) {
    //       this.tableData = res.body.data.deposits_list.map((item) => {
    //         item.is_invoice = item.is_invoice === 0 ? '申请开票' : '已开票';
    //         return item;
    //       });
    //     }
    //   });
    this.getDeposit();
  },
  methods: {
    getDeposit() {
      let url = 'http://192.168.0.118:5000/user-profile/v1/manage/subjects/2/deposits/';
      this.$http.get(url, {
        params: {
          cur_page: 1,
          page_size: 10
        }
      })
        .then((res) => {
          this.loading = false;
          if (res.body.code === 100) {
            // this.form = null;
            this.tableData = res.body.data.deposits_list.map((item) => {
              item.is_invoice = item.is_invoice === 0 ? '申请开票' : '已开票';
              return item;
            });
          }
        });
    },
    postInvonice() {
      if (!this.form) {
        return;
      }
      this.dialogFormVisible = false;
      let url = 'http://192.168.0.118:5000/user-profile/v1/manage/subjects/2/invoices/';
      this.$http.post(url, this.form).then((res) => {
        // window.console.log(res);
        if (res.body.code === 100) {
          this.getDeposit();
        }
      }).catch((err) => {
        this.loading = false;
        window.console.log(err);
      });
    },
    showDialog() {
      // this.dialogFormVisible = true;
      // this.form = null;
    }
  }
};
</script>
<style scoped>
.el-card__body {
  min-height: 100%;
}

.root {
  min-height: 100%;
  margin: 10px;
  padding: 20px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.color {
  color: blue;
}

.el-row {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
