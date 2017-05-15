<template>
  <div class="container">
    <el-button type="primary" @click="show">button</el-button>
  </div>
</template>

<script>
  import {MessageBox} from 'element-ui';

  export default {
    name: 'test',
    methods: {
      show() {
        MessageBox({
          title: 'title',
          message: '这是一段标题内容',
          type: 'info',
          callback: function () {
            window.alert(1);
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
