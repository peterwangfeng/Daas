<template>
  <div class="root">
    <nav-bar></nav-bar>
    <img src="../../assets/user-grant.png" alt="user-grant">
    <img src="../../assets/api.png" alt="api-service">
    <bottom></bottom>
  </div>
</template>

<script>
import NavBar from '../children/navbar';
import Bottom from '../children/bottom';
export default {
  name: 'product',
  components: {
    NavBar,
    Bottom
  }
};
</script>

<style scoped>
.root {
  margin-top: 60px;
}

img {
  width: 100%;
}
</style>
