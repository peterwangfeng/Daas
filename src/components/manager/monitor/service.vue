<template>
  <div class="es-service">
    <div class="container-fluid">
      <el-card class="root">
        <div class="title">
          <h4>业务查询</h4>
        </div>
        <el-row class="search-content">
          <el-col :span="6">
            <el-input v-model="input" :placeholder="valueComputed"></el-input>
          </el-col>
          <el-col :span="6" style="padding-left:20px;">
            <el-button type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
        <el-table border :data="tableData" v-loading="loading"
                  element-loading-text="拼命加载中">
          <el-table-column
            align="center"
            prop="user_id"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="id"
            label="task id"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="create_time"
            label="请求时间">
          </el-table-column>
          <el-table-column
            prop="phase_status"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="finished"
            align="center"
            label="请求结果">
          </el-table-column>
        </el-table>
        <es-pagination
          :total="total"
          v-on:currentPage="next"
        ></es-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
  import URL from '../../../api/url';
  import EsPagination from '../../children/pagination';

  export default {
    components: {
      EsPagination
    },
    data() {
      return {
        input: '',
        total: 20,
        loading: false,
        tableData: [],
        subjectId: 0,
        product: {
          id: 0,
          name: ''
        }
      };
    },
    computed: {
      valueComputed() {
        return this.product.name + '账号';
      }
    },
    created() {
      let self = this;
      let subjectString = window.sessionStorage.getItem('subject');
      if (subjectString) {
        let subjectObject = JSON.parse(subjectString);
        self.subjectId = subjectObject.id;
        self.getProduct();
      }
    },
    watch: {
      '$route': {
        handler() {
          this.getProduct();
        },
        deep: true
      }
    },
    methods: {
      next(currentPage) {
        this.search(currentPage);
      },
      urlPartReplace(url, origin, dest) {
        return String(url).replace(origin, dest);
      },
      getProduct() {
        let self = this;
        let productInfo = self.$route.params.product;
        let productInfoes = String(productInfo).split('-');
        self.product.id = Number(productInfoes[1]);
        self.product.name = productInfoes[0];
      },
      search(currentPage) {
        let self = this;
        let subjectId = self.subjectId;
        if (subjectId > 0) {
          self.tableData = [];
          let searchCondition = self.input;
          let productId = self.product.id;
          let url = self.urlPartReplace(URL.GET_SUBJECT_TASKS_URL, '{subject_id}', subjectId);
          if (productId > 0) {
            let regex = /\s/g;
            let scTestResult = regex.test(searchCondition);
            if (searchCondition && !scTestResult) {
              if (typeof currentPage === 'object') {
                currentPage = 1;
              }
              let params = {product_id: productId, user_id: searchCondition, cur_page: currentPage, page_size: 10};
              self.loading = true;
              self.$http.get(url, {params: params}).then((res) => {
                self.loading = false;
                let target = res.data;
                let status = target.code;
                if (status === 100) {
                  self.tableData = res.body.data.task_list.map((item) => {
                    item.user_id = self.input;
                    item.finished = item.finished === 0 ? '失败' : '成功';
                    return item;
                  });
                } else if (status === 911) {
                  self.$message({type: 'info', message: '无相关任务信息'});
                }
              }).catch((error) => {
                self.loading = false;
                window.console.log(error);
              });
            }
          }
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  .es-service {
    padding: 20px;
    .container-fluid {
      padding: 10px;
      .root {
        .title {
          border-bottom: 1px solid #ddd;
        }
        .search-content {
          margin: 15px 0;
        }
      }
    }
  }
</style>
