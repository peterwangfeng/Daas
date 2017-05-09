<template>
  <div class="root">
    <nav-bar></nav-bar>
    <div class="left col-md-2">
      <div class="search">
        <el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <ol>
        <li>数据产品介绍</li>
        <li>产品接入指南</li>
        <li>云管理平台使用说明</li>
        <li>常见问题</li>
      </ol>
      <p>文档修改历史</p>
      <p>版本更新说明</p>
    </div>
    <div class="right col-md-10">
      <h3>标题</h3>
      <hr/>
      <h3>目录</h3>
      <p>
        <span class="subtext">1.子标题1</span>
      </p>
      <p>
        <span class="subtext">2.子标题2</span>
      </p>
      <hr/>
      <h3>子标题1</h3>
      <hr/>
      <img src="../../assets/doc1.png" alt="">
      <h3>子标题2</h3>
      <hr/>
      <img src="../../assets/doc2.png" alt="">
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import NavBar from '../children/navbar';
import Bottom from '@/components/children/bottom';
export default {
  name: 'doc',
  components: {
    NavBar,
    Bottom
  },
  data() {
    return {
      input: ''
    };
  }
};
</script>

<style scoped>
body {
  overflow: auto !important;
  color: red;
}

.root {
  background-color: #fff;
  padding-top: 60px;
}

input {
  border-radius: 10px;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  padding: 5px 10px;
}

.left {
  height: 590px;
  padding: 0;
  color: #ccc;
  border-right: 1px solid gray;
  background-color: #324157;
  margin-top: -20px;
}

.right {
  background-color: #fff;
  border: none;
  margin-top: -20px;
}

.search {
  background-color: #fff;
}

ol {
  padding: 0 10px;
  margin: 0 0 0 15px;
  margin-top: 20px;
}

ol li {
  padding: 10px 0;
}

p {
  padding: 0 10px
}

.subtext {
  color: deepskyblue;
  padding: 0 5px;
}

img {
  width: 90%;
}
</style>
