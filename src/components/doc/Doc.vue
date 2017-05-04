<template>
  <div class="root">
    <nav-bar></nav-bar>
    <div class="left col-md-2">
      <div class="search">
        <input type="text" placeholder="搜索">
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
      <p><span class="subtext">1.子标题1</span></p>
      <p><span class="subtext">2.子标题2</span></p>
      <hr/>
      <h3>子标题1</h3>
      <hr/>
      <img src="../../assets/doc1.png" alt="">
      <h3>子标题2</h3>
      <hr/>
      <img src="../../assets/doc2.png" alt="">
    </div>
  </div>
</template>

<script>
import NavBar from '../children/navbar';
export default {
  name: 'doc',
  components: {
    NavBar
  }
};
</script>

<style scoped>
  input {
    border-radius: 10px;
    outline: none;
    margin-bottom: 10px;
    width: 100%;
    padding: 5px 10px;
  }

  .left {
    height: 500px;
    padding: 0;
    border-right: 1px solid gray;
    background-color: #f2f2f2;
  }
  .right {
    border: none;
  }
  .search {
    background-color: #fff;
  }

  ol {
    padding: 0 10px;
    margin: 0 0 0 15px;
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
    width: 100%;
  }
</style>
