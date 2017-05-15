<template>
  <div class="header">
    <img src="../../assets/user-grant.png" alt="user-grant">
    <img src="../../assets/api.png" alt="api-service">
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from '../children/bottom';
export default {
  name: 'product',
  components: {
    Bottom
  }
};
</script>

<style scoped>
    .header > img {
      width: 100%;
    }
</style>
