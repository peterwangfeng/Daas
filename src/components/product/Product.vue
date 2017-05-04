<template>
  <div class="header">
  <nav-bar></nav-bar>
    <img src="../../assets/user-grant.png" alt="user-grant">
    <img src="../../assets/api.png" alt="api-service">
  </div>
</template>

<script>
import NavBar from '../children/navbar';
export default {
  name: 'product',
  components: {
    NavBar
  }
};
</script>

<style scoped>
    .header > img {
      width: 100%;
    }
</style>
