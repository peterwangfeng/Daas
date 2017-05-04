<template>
	<div class="root">
		<h3>消费查询</h3>
		<hr>
		<el-row>
			<el-col :span="6">
				<div class="block">
				    <el-date-picker
				      v-model="value1"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions0">
				    </el-date-picker>
				    <span style="position:relative;left:25px;">至</span>
				  </div>
			</el-col>
			<el-col :span="6">
				<div class="block">
				    <el-date-picker
				      v-model="value2"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
				  </div>
			</el-col>
			<el-col :span="2">
				<el-button type="text">近一周</el-button>
			</el-col>
			<el-col :span="2">
				<el-button type="text">近一个月</el-button>
			</el-col>
			<el-col :span="6" sizw="large">
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
		name:'consume',
		data() {
			return {
				value1: '',
			    value2: '',
				input: '',
				tableData:[],
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
			search() {
				// this.$http.get('url')
				// .then((res)=>{
				// 	if(res.body.target ==='') {

				// 	}
				// }).catch((error)=>{

				// })
				this.$alert(this.value1,'title',{
					confirmButtonText: true
				})
			}
		}
	}
</script>
<style scoped>
	.root {
		padding: 20px;
	}
</style>