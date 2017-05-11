<template>
  <el-card class="root">
    <h4 class="text-left">充值</h4>
    <hr>
    <el-row :gutter="20" style="margin-top: 50px;">
      <el-col :span="6">
        <div class="grid-content bg-purple" style="padding-top: 35px" @click="first">10元</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="second">100元
          <br> 9.9折
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="third">500元
          <br> 9.8折
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="fourth">1000元
          <br> 9.7折
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input v-model="price" placeholder="请输入金额"></el-input>
      </el-col>
    </el-row>
    <h4 class="text-left price">支付金额：{{ Number(price) }} 元</h4>
    <h4 class="text-left payment">支付方式</h4>
    <el-row>
      <el-col :span="6">
        <img src="../../../assets/支付宝.svg" alt="" @click="pay">
      </el-col>
      <el-col :span="6">
        <img src="../../../assets/微信.svg" alt="" width="250" height="60" @click="show">
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'deposit',
  data() {
    return {
      price: ''
    };
  },
  methods: {
    first() {
      this.price = 10;
    },
    second() {
      this.price = 99;
    },
    third() {
      this.price = 490;
    },
    fourth() {
      this.price = 970;
    },
    show() {
      this.$alert('此功能尚未开通', '温馨提示', {
        confirmButtonText: '确定'
      });
    },
    pay() {
      this.$alert('正在开发...' + this.price, '温馨提示', {
        confirmButtonText: '确定'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.root {
  margin: 10px;
  padding: 20px;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
  border-radius: 5px;
  min-height: 36px;
  height: 100px;
  padding-top: 25px;
  background-color: #20A0FF;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  cursor: pointer;
}

.grid-content:hover {
  box-shadow: 0 0 50px silver;
  opacity: .6;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.price {
  margin-top: 20px;
}

.payment {
  margin-top: 50px;
}

img:hover {
  cursor: pointer;
  opacity: .7;
}

hr {
  background-color: black;
}
</style>
