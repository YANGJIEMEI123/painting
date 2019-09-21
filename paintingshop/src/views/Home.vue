<template>
  <div class="home">
    <tops></tops>
    <div class="nav">
      <div></div>
      <div class="search">
        <input type="text" placeholder="      请输入商品名称">

        <div class="word">搜索</div>
      </div>
    </div>
    <div class="body">
      <!-- 轮播图 -->
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in lunbos" :key="item">
         <img src="item" alt="">{{item}}
        </el-carousel-item>
      </el-carousel>
      <!-- 分类列表 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">油画</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">素描画</a></el-breadcrumb-item>
        <el-breadcrumb-item>漆画</el-breadcrumb-item>
        <el-breadcrumb-item>国画</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 图片列表 --> 
      <div class="demo-image">
        <div class="i" v-for="url in urls">
          <el-image style="width: 240px; height: 240px" :src="url"></el-image>
        </div>
        <div class="w" v-for="name in names">{{name}}</div>
      </div>

    </div>
    <bottoms></bottoms>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data() {
      return {
        urls: [],
        names: [],
        lunbos:[]
      }
    },
    created: function () {
      this.axios.get('/getOli') //发起请求
        .then((response) => {
          console.log(response.data)
          response.data.forEach(element => {
            if (element.typeid == 1) {
              console.log(element)
              this.urls.push(element.img);
              this.names.push(element.name)
            }
          });
          console.log(this.urls);
        })
        .catch(function (error) {
          console.log(error);
        });

        this.axios.get('/lunbo') //发起请求
        .then((response) => {
          console.log(response.data);
          response.data.forEach(element => {
            this.lunbos.push(element.img)
          });
         
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
</script>
<style>
  .nav {
    width: 100%;
    height: 80px;
    background-color: rgb(231, 220, 220);
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
  }

  input {
    width: 400px;
    height: 40px;
    box-sizing: border-box;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #444;
    border-color: #444;
    box-sizing: border-box;
    margin-top: 0px;
    border-block-start-color: #444;
    border: 0;
  }

  .word {
    width: 96px;
    height: 41px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #ccdce9;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 33px;
    padding-top: 4px;
    box-sizing: border-box;
  }

  .search {
    width: 500px;
    margin-left: 300px;
    display: flex;
  }

  .body {
    width: 90%;
    background-color: rgb(234, 245, 230);
    margin: 0 auto;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .demo-image {
    width: 100%;
    display: flex;
    justify-content: start;
    margin-top: 30px;
    flex-wrap: wrap;

  }

  img {
    width: 90%;
    background-size: 100% 100%;
  }

  .i {
    margin-left: 5px;
    width: 290px;
    height: 450px;
    /* background-color: rgb(240, 172, 172); */
    margin-top: 10px;
  }
  
</style>