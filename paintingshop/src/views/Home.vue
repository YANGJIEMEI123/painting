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
      <div class="menu">
        <span @click="oil">油画</span> &nbsp;&nbsp;&nbsp; |
        <span @click="sketch">素描画</span>&nbsp;&nbsp;&nbsp;  |
        <span @click="qi">漆画</span>&nbsp;&nbsp;&nbsp;  |
        <span @click="china">国画</span>
      </div>
      <div class="list">
         
        <!-- 图片列表 -->
        <div class="demo-image">
          <div class="i" v-for="url in dataShow">
            <el-image style="width: 240px; height: 240px" :src="url.img"></el-image>
            <div>{{url.name}}</div>
          </div>
        </div>
      </div>
      <div class="page">
        <ul>
          <li>
            <a href="#" v-on:click="prePage">
              <</a> </li> <li v-for="(item, index) in totalPage">
                <a href="#" v-on:click="toPage(index)" :class="{active: currentPage==index}">{{ index+1 }}</a>
          </li>
          <li>
            <a href="#" v-on:click="nextPage">></a>
          </li>
        </ul>
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
        imgs: [],
        lunbos: [],
        lengths: 0,
        // 总页数
        pageNum: 2,
        // 每页显示的个数
        pageSize: 12,
        // 当前页
        currentPage: 0,
        // 总数据
        totalPage: [],
        // 当前显示的数据
        dataShow: [],
        type: 1
      }
    },
    created: function () {
      this.getIMG();
    },
    methods: {
      oil: function () {
        this.type = 1;
        this.getIMG();
      },
      sketch: function () {
        this.type = 2;
        this.getIMG();
        console.log(6666)

      },
      qi: function () {
        this.type = 3;
        this.getIMG();
        console.log(6666)

      },
      china: function () {
        this.type = 4;
        this.getIMG();
        console.log(6666)
      },
      getIMG: function () {
        this.axios.post('/getImgs', {
            params: {
              type: this.type
            }
          }) //发起请求
          .then((response) => {
            console.log(response.data)
            response.data.forEach(element => {
              this.imgs = response.data;
            });
            // 总页数
            this.pageNum = Math.ceil(this.imgs.length / this.pageSize);
            // 分组
            console.log(this.pageNum);
            for (var i = 0; i < this.pageNum; i++) {
              this.totalPage[i] = this.imgs.slice(this.pageSize * i, this.pageSize * (i + 1))
            }
            // 取值
            this.dataShow = this.totalPage[this.currentPage];
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      nextPage: function () {
        if (this.currentPage == this.pageNum - 1) return;
        this.dataShow = this.totalPage[++this.currentPage]
      },
      prePage: function () {
        if (this.currentPage == 0) return;
        this.dataShow = this.totalPage[--this.currentPage]
      },
      toPage: function (page) {
        this.currentPage = page
        this.dataShow = this.totalPage[this.currentPage];
      }
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
  .menu{
    display: flex;
    justify-content: start;
    font-size: 18px;
  }
  .menu span:hover {
    cursor: pointer;
  }
  .menu span{
    font-weight: 400;
    color: #606266;
    cursor: text;
    font-size: 16px;
    margin-left: 12px;
  }
  
  .page>ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }

  .page>ul>li {
    float: left;
    color: #606266;
    background: #f4f4f5;
    padding: 2px 8px;
    cursor: pointer;
    border-radius: 2px;
    margin: 0 5px;
  }

  ul>li.active {
    background: #409eff;
    color: #fff;
  }
</style>