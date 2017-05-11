<template>
  <div class="main">
    <div class="subject-info">
      <span @click="to">111111111111111</span>
    </div>
  </div>
</template>
<script>
import router from '../../../router/index';
export default {
  name: 'index',
  methods: {
    to() {
      router.push({ path: '/deposit' });
    }
  }
};
</script>
<style>

</style>

