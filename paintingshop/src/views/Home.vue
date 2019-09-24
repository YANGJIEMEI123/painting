<template>
<div>
  <div class="home">
    
 <div>

    


      <tops></tops>
      <div class="nav">
        <div>
        </div>
        <div class="search">
          <search @myevent="show"></search>
          <ul>
            <li v-for="p in products" @click="reget" :key=p.gid >
              {{p.name}}
            </li>
          </ul>
        </div>
        <div class="word" @click="select">搜索</div>
      </div>
      <div class="body">
    
    
        <!-- <div v-show="$store.getters.userType"><a>欢迎{{$store.getters.userAccount}}</a></div> -->
    
      </div>
      <div class="body">
        <!-- 轮播图 -->
        <el-carousel indicator-position="outside" class="lun">
          <el-carousel-item v-for="item in lunbos" :key="item.typeid" id="lun1">
            <img :src="item.img" class="image">
          </el-carousel-item>
          <div class="search">
              <input type="text" placeholder="      请输入商品名称">
        
              <div class="word">搜索</div>
            </div>
        </el-carousel>
        
        <!-- 分类列表 -->
        <div class="menu">
          <span @click="oil">油画</span> &nbsp;&nbsp;&nbsp; |
          <span @click="sketch">素描画</span>&nbsp;&nbsp;&nbsp; |
          <span @click="qi">漆画</span>&nbsp;&nbsp;&nbsp; |
          <span @click="china">国画</span>
        </div>


 <div class="list">

        <!-- 图片列表 -->
        <div class="demo-image">
          <div class="i" v-for="(url,index) in dataShow" :key="index">
            <router-link to="/detail"><el-image style="width: 240px; height: 240px" :src="url.img"  @click="usegid(url)"></el-image></router-link>
            <div class="price">￥{{url.price}}<span class="iconfont icon-99yuanbaoyou logo
              "></span></div>
            <div class="name">{{url.name}}</div>
            <ul>
              <li>{{url.drawer}}</li>
              <li>{{url.nationality}}</li>
            </ul>
            <span class="iconfont icon-logo-reddit logo1"></span>
            
          </div>
        </div>
      </div>
      <div class="page">
        <ul>
          <li>
            <a href="#" v-on:click="prePage">
              </a> </li> <li v-for="(item, index) in totalPage" :key="index">
                <a href="#" v-on: click="toPage(index) change" :key="index" :class="{active: currentPage==index}">{{ index+1 }}</a>
          </li>
          <li>
            <a href="#" v-on:click="nextPage">></a>
          </li>
        </ul>
      </div>



       
        <bottoms></bottoms>
        <asides></asides>
      </div>
 </div>
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
        pageNum: 2,
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
        products: []
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
      chang:function(){

      },
      getIMG: function () {
        this.axios.post('/getImgs', {
            params: {
              type: this.type
            }
          }) //发起请求
          .then((response) => {
            // console.log(response.data)
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
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      show: function (val) {
        console.log(val)
        this.products = val;
      },
      select: function () {
        this.getNew();
      },
      reget: function () {
        this.getNew();
      },
      getNew: function () {
        console.log(this.products);
        this.axios.post('/select', {
            params: {
              goods: this.products
            }
          }) //发起请求
          .then((response) => {
            response.data.forEach(element => {
              this.imgs = [];
              this.imgs.push(element.img);
              console.log(this.imgs);
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
      },
      usegid:function(url) {
        console.log(url.gid);
        this.$store.commit("getid",url.gid)
      }
    }
  }
</script>
<style>
  .nav {
    width: 100%;
    height: 70px;
    background-color: rgb(231, 220, 220);
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
  }

  .search ul {
    width: 50%;
    /* border: 1px solid red; */
    margin-left: 300px;
    background-color: #fff;
    /* position: fixed; */
    position: relative;
    z-index: 7;

  }
  .search ul>li:hover{
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
    margin-left: 5px;
    width: 290px;
    height: 392px;
    background-color: #f4f4f4;
    margin-top: 10px;
  }

  .menu {
    display: flex;
    justify-content: start;
    font-size: 18px;
    margin-top: 36px;
  }

  .menu span:hover {
    cursor: pointer;
  }

  .menu span {
    font-weight: 400;
    color: #606266;
    cursor: text;
    font-size: 16px;
    margin-left: 12px;
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
    background: #f4f4f5;
    padding: 2px 8px;
    cursor: pointer;
    border-radius: 2px;
    margin: 0 5px;


    text-decoration: none;
  }
  .demo-image ul>li:last-child{
    margin-left: 100px;
  }

  ul>li.active {
    background: #409eff;
    color: #fff;
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
    margin-top:15px;
    margin-bottom:12px;
  }

  .demo-image ul>li {
    width: 60px;
    margin-left: 7px;
    columns: #4f4f4f;
    margin-top: 10px;
  }

  .demo-image .name{
    width: 200px;
    height: 20px;
    margin-left: 24px;
    font-size: 14px;
    margin-top: 7px;
    font-family: arial,'Hiragino Sans GB',"\5b8b\4f53",sans-serif;
  }

  .demo-image .price {
    color: #f40;
    font-size: 22px;
    margin-left:-152px;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: rgba(red, green, blue, 0 );
}
.demo-image .logo{
  font-size:24px;
  color: #606266;
  margin-left: 10px;
}
.demo-image .logo1{
  font-size:24px;
  color: #606266;
  margin-left: -200px;
 
}

   

  .demo-image .logo {
    font-size: 24px;
    color: #606266;
    margin-left: 10px;
  }

  .demo-image .logo1 {
    font-size: 24px;
    color: #606266;
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
    width: 10%;
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

  .search>div {
    width: 500px;
    margin-left: 300px;
    display: flex;
  }
</style>