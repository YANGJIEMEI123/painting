<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1">资质团购</el-menu-item>
      <el-submenu index="2">
        <template slot="title">协议规则</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">用户须知</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">下载app</el-menu-item>
      <el-menu-item index="4" id="blank"></el-menu-item>
      <el-menu-item index="5">
        <router-link to="/regist">注册</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/login">登陆</router-link>
      </el-menu-item>
      <el-menu-item index="7">消息通知</a></el-menu-item>
      <el-menu-item index="8">购物车</a></el-menu-item>
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

  el-menu-item {
    background-color: rgb(168, 114, 114);
  }

  #blank {
    width: 45%;
  }

  element.style {
    background-color: rgb(168, 114, 114);
  }
</style>