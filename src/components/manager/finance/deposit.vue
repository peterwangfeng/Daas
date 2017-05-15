<template>
  <article class="es-deposit">
    <section class="container-fluid">
      <el-card class="root">
        <div class="title">
          <h4 class="text-left">充值</h4>
        </div>
        <el-row style="margin-top: 50px;" type="flex" justify="space-around">
          <el-col :span="6">
            <div class="grid-content bg-purple" style="padding-top: 35px" @click="first">10元</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" @click="second">100元<br>9.9折</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" @click="third">500元<br>9.8折</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple" @click="fourth">1000元<br>9.7折</div>
          </el-col>
        </el-row>
        <h4 class="text-left price">支付金额：{{ price }} 元</h4>
        <h4 class="text-left payment">支付方式</h4>
        <el-row>
          <el-col :span="6">
            <img src="../../../assets/支付宝.svg" alt="">
          </el-col>
          <el-col :span="6">
            <img src="../../../assets/微信.svg" alt="" width="250" height="60">
          </el-col>
        </el-row>
      </el-card>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'deposit',
    data() {
      return {
        price: 0
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
      }
    }
  };
</script>

<style scoped lang="scss">
  .es-deposit {
    padding: 20px;
    .container-fluid {
      .root {
        border:  1px solid  #d1dbe5;
        border-radius:  4px;
        background-color:   #fff;
        overflow:  hidden;
        box-shadow:  0 2px 4px 0  rgba(0, 0, 0, .12),  0 0 6px 0  rgba(0, 0, 0, .04);
        .title {
          border-bottom: 1px solid #ddd;
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
      }
    }
  }
</style>
