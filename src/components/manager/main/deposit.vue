<template>
    <el-card class="root">
      <h3 class="text-left">充值</h3>
      <hr>
      <el-row :gutter="20" style="margin-top: 50px;">
        <el-col :span="6"><div class="grid-content bg-purple" style="padding-top: 35px">10元</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">100元<br>
          9.9折</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">500元<br>
          9.8折</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">1000元<br>
          9.7折</div></el-col>
      </el-row>
      <p class="text-left" style="font-size: 20px;">支付金额：970.00 元</p>
      <p class="text-left" style="font-size: 20px;margin-bottom: 40px" >支付方式</p>
      <el-row gutter="20">
        <el-col :span="6">
          <img src="../../../assets/支付宝.svg" alt="">
        </el-col>
        <el-col :span="6">
          <img src="../../../assets/微信.svg" alt="" width="250" height="60">
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
  export default {
    name: 'deposit'
  };
</script>

<style scoped lang="scss">
  .root {
    margin: 10px;
    padding: 20px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    text-align: center;
    border-radius: 4px;
    min-height: 36px;
    height: 100px;
    padding-top: 25px;
    /*line-height: 100px;*/
    background-color: #20A0FF;
    font-size: 20px;
    font-weight: bolder;
    color: white;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
