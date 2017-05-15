<template>
  <main>
    <div class="data-as-service">
      <img src="../../assets/serive.png" alt="data-as-service">
    </div>
    <h4>平台优势</h4>
    <div class="platform-advantage">
      <img src="../../assets/adv.png" alt="">
      <img src="../../assets/adv.png" alt="">
      <img src="../../assets/adv.png" alt="">
    </div>
    <div class="customer-evaluate">
      <h4>客户评价</h4>
    </div>
    <footer>
      <div class="col-md-8">
        <img src="../../assets/map.png" alt="map" style="width: 100%;">
      </div>
      <div class="col-md-4" style="padding-top: 50px">
        <h4 style="text-align: left">联系我们</h4>
        <p>商务合作：025-85315811</p>
        <p>技术支持：18221381443</p>
        <p>邮箱：brian@easestrategy.com</p>
        <p>地址：南京市雨花台区软件大道109号雨花         客厅3栋808</p>
        <p>邮编：210012</p>
      </div>
    </footer>
    <bottom></bottom>
  </main>
</template>

<script>
import Bottom from '../children/bottom';
export default {
  name: 'home',
  components: {
    Bottom
  }
};
</script>

<style scoped>
  .data-as-service img {
    width: 100%;
    height: 100%;
  }

  h4 {
    margin: 30px 0;
    text-align: center;
    font-weight: bolder;
  }

  .platform-advantage {
    display: flex;
    justify-content: space-around;
  }

  .customer-evaluate {
    margin-top: 50px;
    height: 280px;
    background-color: #ccc;
    padding-top: 20px;
  }
</style>
