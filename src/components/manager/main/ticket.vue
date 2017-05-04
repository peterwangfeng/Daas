<template>
	<div class="root">
		<h3>订单信息</h3>
		<hr>
		<el-table
			 border
		     :data="tableData"
		     style="width: 100%">
		     <el-table-column
		       align="center"
		       prop="date"
		       label="订单编号"
		       width="180">
		     </el-table-column>
		     <el-table-column
		       align="center"
		       prop="name"
		       label="日期"
		       width="180">
		     </el-table-column>
		     <el-table-column
		       align="center"
		       prop="address"
		       label="金额">
		     </el-table-column>
		     <el-table-column
		       align="center"
		       prop="address"
		       label="金额">
		     </el-table-column>
		   </el-table>
	</div>
</template>
<script>
	export default {
		name: 'ticket',
		data() {
		        return {
		          tableData: []
		        }
			}
		}
</script>
<style scoped>
	.root {
		padding: 20px;
	}
</style>