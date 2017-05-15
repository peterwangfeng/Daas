<template>
  <article class="es-ticket">
    <section class="container-fluid">
      <el-card class="root">
        <div class="title">
          <h4>订单信息</h4>
        </div>
        <el-table border
                  :data="tableData" empty-text v-loading="loading"
                  element-loading-text="拼命加载中">
          <el-table-column align="center" prop="code"
                           label="订单编号" width="180">
          </el-table-column>
          <el-table-column align="center" prop="deposit_time"
                           label="日期" width="180">
          </el-table-column>
          <el-table-column align="center" prop="amount"
                           label="金额">
          </el-table-column>
          <el-table-column align="center" prop="is_invoice"
                           label="发票状态">
            <template scope="scope">
              <el-button type="text"
                         :disabled="scope.row.is_invoice === 0 ? false : true" @click="showDialog(scope.row)">
                {{scope.row.invoice_status}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <es-pagination
          :total="total" v-on:currentPage="next">
        </es-pagination>
        <el-dialog title="发票充值" v-model="dialog.dialogFormVisible">
          <el-form :model="dialog.form">
            <el-form-item label="发票类型" :label-width="dialog.formLabelWidth">
              <el-select v-model="dialog.form.type" placeholder="请选择发票类型">
                <el-option label="0 普通发票" value="0"></el-option>
                <el-option label="1 增值税发票" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发票抬头" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.invoice_title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="发票详细" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.invoice_detail" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="订单编号" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.order_id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额" :label-width="dialog.formLabelWidth">
              <el-input v-model="dialog.form.invoice_amount" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="postInvonice">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </section>
  </article>
</template>
<script>
  import URL from '../../../api/url';
  import EsPagination from '../../children/pagination';

  export default {
    name: 'ticket',
    components: {
      EsPagination
    },
    data() {
      return {
        total: 1,
        tableData: [],
        loading: true,
        subjectId: 0,
        dialog: {
          formLabelWidth: '120px',
          dialogFormVisible: false,
          form: {
            type: '',
            invoice_title: '',
            invoice_detail: '',
            order_id: '',
            invoice_amount: ''
          }
        }
      };
    },
    created() {
      let self = this;
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        self.subjectId = subjectObject.id;
        self.getDeposits();
      }
    },
    methods: {
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      getDeposits(currentPage = 1) {
        let self = this;
        let subjectId = self.subjectId;
        let url = self.urlPartReplace(URL.GET_DEPOSITS_URL, '{subject_id}', subjectId);
        let params = {cur_page: currentPage, page_size: 10};
        self.$http.get(url, {params: params}).then((res) => {
          self.loading = false;
          let target = res.data;
          let status = target.code;
          if (status === 100) {
            let data = target.data;
            if (data) {
              self.tableData = data.deposits_list.map((item) => {
                item.invoice_status = item.is_invoice === 0 ? '申请开票' : '已开票';
                return item;
              });
            }
          }
        }, (err) => {
          self.loading = false;
        });
      },
      postInvonice() {
        let self = this;
        let form = self.dialog.form;
        let subjectId = self.subjectId;
        if (!form) {
          return;
        }
        self.dialog.dialogFormVisible = false;
        let url = self.urlPartReplace(URL.POST_INVOICES_URL, '{subject_id}', subjectId);
        let data = JSON.stringify(form);
        this.$http.post(url, data, {
          emulateJSON: true
        }).then((res) => {
          if (res.body.code === 100) {
            this.getDeposit();
          }
        }).catch((err) => {
          window.console.log(err);
        });
      },
      showDialog(row) {
        console.log(row);
        let dialog = this.dialog;
        dialog.dialogFormVisible = true;
      },
      next(currentPage) {
        this.getDeposits(currentPage);
      }
    }
  };
</script>
<style scoped lang="scss">
  .es-ticket {
    padding: 20px;
    .container-fluid {
      padding: 10px;
      .root {
        height: calc(100% - 40px);
        border:  1px solid  #d1dbe5;
        border-radius:  4px;
        background-color:   #fff;
        overflow:  hidden;
        box-shadow:  0 2px 4px 0  rgba(0, 0, 0, .12),  0 0 6px 0  rgba(0, 0, 0, .04);
        .title {
          border-bottom: 1px solid #ddd;
        }
        .el-table {
          margin: 15px 0 0 0;
          .el-button {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
