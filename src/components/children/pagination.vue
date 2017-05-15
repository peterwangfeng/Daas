<template>
  <div class="pagination">
    <el-pagination @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" layout="total, prev, pager, next, jumper" :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 1,
      validator: function (value) {
        return value >= 0;
      }
    }
  },
  data() {
    return {
      pagination: {
        total: 2,
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.pagination.total = this.total;
  },
  methods: {
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getCurrentChange(val);
    },
    getCurrentChange(currentPage) {
      this.$emit('currentPage', currentPage);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  display: table;
  vertical-align: middle;
  margin: 20px auto 0;
}
</style>
