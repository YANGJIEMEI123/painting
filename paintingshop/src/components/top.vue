<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="3">画丹手商城</el-menu-item>
      <el-menu-item index="4">资质团购</el-menu-item>
      <el-menu-item index="5">协议规则</a></el-menu-item>
      <el-menu-item index="6">下载app</a></el-menu-item>
      <el-menu-item index="7" id="blank"></a></el-menu-item>
      <el-menu-item index="5">
        <router-link to="/reg">注册</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/login">登陆</router-link>
      </el-menu-item>
      <el-menu-item index="6">消息通知</a></el-menu-item>
      <el-menu-item index="6">购物车</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'app',
    data: function () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    components: {

    },
    created: function () {
      if (this.$router.path == "reg") {
        this.activeIndex2 = "6"
      }

    }
  }
</script>
<style slot="">
  * {
    padding: 0;
    margin: 0;
  }

  #nav {
    padding: 0px;
  }
 
  el-menu-item{
    background-color: rgb(168, 114, 114);
  }
  #blank {
    width: 45%;
  }
  element.style{
    background-color: rgb(168, 114, 114);
  }
</style>