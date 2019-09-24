<template>

  <div>
    <tops></tops>
    <div class="body">
      <!-- 轮播图 -->

      <el-carousel indicator-position="outside" class="lun">
        <el-carousel-item v-for="item in lunbos" :key="item.typeid" id="lun1">
          <img :src="item.img" class="image">
        </el-carousel-item>

      </el-carousel>
      <!-- 搜索栏 -->
      <div class="nav">
        <div class="search">
          <search @myevent="show" :msg="keyW"></search>
          <ul>
            <li v-for="p in products" @click="select(p.name)" :key=p.gid>
              <span>{{p.name}}</span>
            </li>
          </ul>
        </div>
        <div class="word" @click="select">搜索</div>
      </div>


      <!-- 分类列表 -->
      <div class="menu">
        <span @click="oil">油画</span>
        <span @click="sketch">素描画</span>
        <span @click="qi">漆画</span>
        <span @click="china">国画</span>
      </div>
      <div class="list">
        <!-- 图片列表 -->
        <div class="demo-image">
          <div class="i" v-for="url in dataShow" :key="url.gid">
              <router-link to="/detail"><el-image style="width: 240px; height: 240px" :src="url.img"  @click="usegid(url)"></el-image></router-link>
            <div class="price">￥{{url.price}}<span class="iconfont icon-99yuanbaoyou logo "></span></div>
            <div class="name">{{url.name}}</div>
            <ul>
              <li>{{url.drawer}}</li>
              <li>{{url.nationality}}</li>
            </ul>
            <span class="iconfont icon-logo-reddit logo1"></span>

          </div>
        </div>
        <div class="page">
          <ul>
            <li><a v-on:click="prePage">&lt;
              </a>
            </li>
            <li v-for="(item, index) in totalPage" :key=index :class="{active: currentPage==index}">
              <a href="#" v-on: click="toPage(index) chang">{{ index+1 }}</a>
            </li>
            <li>
              <a v-on:click="nextPage">&gt;</a>
            </li>
          </ul>
        </div>
      </div>
      <bottoms></bottoms>
      <asides></asides>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import search from '@/components/search.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld,
      search
    },
    data() {
      return {
        imgs: [],
        lunbos: [],
        lengths: 0,
        // 总页数
        pageNum: 1,
        // 每页显示的个数
        pageSize: 12,
        // 当前页
        currentPage: 0,
        // 总数据
        totalPage: [],
        // 当前显示的数据
        dataShow: [],

        type: 1,

        index: -1,
        products: [],
        keyW: ""
      }
    },
    created: function () {
      this.getIMG();
      this.axios.get('/getLunbo') //发起请求
        .then((response) => {
          response.data.forEach(element => {
            this.lunbos = response.data;
          });
          // console.log(this.lunbos[0].img)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {

      oil: function () {
        this.type = 1;
        this.getIMG();
      },
      sketch: function () {
        this.type = 2;
        this.getIMG();
        console.log("stetch")

      },
      qi: function () {
        this.type = 3;
        this.getIMG();
        console.log("qi")

      },
      china: function () {
        this.type = 4;
        this.getIMG();
        console.log("china")
      },
      getIMG: function (type) {
        this.axios.post('/getImgs', {
            params: {
              type: type === false ? undefined : this.type,
              kw: this.keyW
            }
          }) //发起请求
          .then((response) => {
            console.log(response.data)
            response.data.forEach(element => {
              this.imgs = response.data;
            });
            // 总页数
            // console.log(this.imgs)
            this.pageNum = Math.ceil(this.imgs.length / this.pageSize);
            // console.log(this.pageNum)
            // 分组

            for (var i = 0; i < this.pageNum; i++) {
              this.totalPage[i] = this.imgs.slice(this.pageSize * i, this.pageSize * (i + 1))
            }
            // 取值
            this.dataShow = this.totalPage[this.currentPage];
            console.log(this.dataShow)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      show: function (val) {
        console.log(val)
        this.keyW = val;
        this.axios.get('/goods', {
            params: {
              kw: val
            }
          })
          .then((response) => {
            // console.log(response.data)
            // this.goods = response.data;
            this.products = response.data;
            console.log(this.products);

          })
          .catch(function (error) {
            console.log(error);
          });


      },
      select: function (val) {
        console.log(val);
        console.log(this.keyW)
        this.keyW = typeof (val) == "string" ? val : this.keyW;
        console.log(this.keyW)

        this.getIMG(false);

        this.products = [];

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
      },
      usegid: function (url) {
        console.log(url.gid);
        this.$store.commit("getid", url.gid)
      },
      usegid: function (url) {
        console.log(url.gid);
        this.$store.commit("getid", url.gid)
      }
    }
  }
</script>
<style>
  body {
    background-image: url("../assets/bgc.gif")
  }

  .el-carousel__container {
    position: relative;
    height: 345px;
  }

  .nav {
    width: 100%;
    height: 70px;
    background-color: rgba(200, 200, 210, 0.6);
    margin: 0 auto;
    padding-top: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .search ul {
    width: 105.1%;
    position: relative;
    z-index: 7;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .search ul>li:hover {
    cursor: pointer;
  }

  .body {
    width: 90%;
    /* background-color: rgb(234, 245, 230); */
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
    margin-left: 12px;
    width: 290px;
    height: 392px;
    background-color: rgba(200, 200, 210, 0.6);
    margin-top: 10px;
  }

  .menu {
    width: 23%;
    /* height: 28px; */
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
    font-size: 18px;
    margin-top: 15px;
    background-color: #eee;
    opacity: 0.9;
  }

  .menu span:hover {
    cursor: pointer;
    background-color: rgb(216, 215, 175);
  }

  .menu span {
    display: block;
    width: 70px;
    border-right: 2px solid #777;
    font-weight: 400;
    color: #606266;
    cursor: text;
    font-size: 16px;
  }

  .menu span:last-child {
    border-right: 0;
  }

  .page {
    margin-top: 20px;
  }

  .page>ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }

  .page>ul>li {
    float: left;
    color: #606266;
    background: #60626690;
    padding: 2px 8px;
    cursor: pointer;
    border-radius: 1px;
    margin: 0 5px;


    text-decoration: none;
  }

  .demo-image ul>li:last-child {
    margin-left: 100px;
  }

  ul>li.active {
    background: #98bee4;
    color: #fff;
    width: 13px;
  }

  .demo-image ul {
    width: 225px;
    height: 30px;
    /* background-color: rgb(108, 176, 182); */
    margin-top: 10px;
    display: flex;
    justify-content: start;
    padding-left: 15px;
    box-sizing: border-box;
    color: #888;
    font-family: MicrosoftYaHei;
    margin-top: 15px;
    margin-bottom: 12px;
  }

  .demo-image ul>li {
    width: 60px;
    margin-left: 7px;
    columns: #4f4f4f;
    margin-top: 10px;
    color: rgba(30, 30, 30, 0.7);

  }

  .demo-image .name {
    width: 200px;
    height: 20px;
    margin-left: 26px;
    font-size: 14px;
    margin-top: 7px;
    display: flex;
    justify-content: start;
    font-family: arial, 'Hiragino Sans GB', "\5b8b\4f53", sans-serif;
  }

  .demo-image .price {
    color: #f40;
    font-size: 22px;
    margin-left: -152px;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: rgba(red, green, blue, 0);
  }

  .demo-image .logo {
    font-size: 24px;
    margin-left: 10px;
    color: rgba(30, 30, 30, 0.7);
  }

  .demo-image .logo1 {
    font-size: 24px;
    color: rgba(30, 30, 30, 0.7);
    margin-left: -200px;

  }




  .active {
    display: block;
    width: 20px;
    height: 20px;
    background-color: rgb(117, 172, 209);
    border-radius: 2px;
  }

  .image {
    width: 1215px;
    height: 330px;
  }

  #lun1 {
    width: 1215px;
    height: 330px;

  }

  .lun {
    margin-bottom: 10px;
  }

  .word {
    width: 75px;
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

  .word:hover {
    cursor: pointer;
  }

  .search {
    width: 460px;
  }

  .search>div {
    width: 500px;
    /* margin-left: 300px; */
  }

  .search>ul>li {
    height: 33px;
    width: 95%;
    text-align: start;
    background-color: rgb(250, 245, 245);
  }

  input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    background-color: #eee;
    border-color: #ddd;
    box-sizing: border-box;
    margin-top: 0px;
    border-block-start-color: #444;
    border: 0;
    text-indent: 20px;
  }

  input:focus {
    outline: none;
  }
</style>