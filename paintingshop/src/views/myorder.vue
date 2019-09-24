<template>
<div>
  <tops></tops>
<div class="mydiv">
    <el-breadcrumb separator="/" class="bread">
  <el-breadcrumb-item ><a href="/">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a href="/mycar">购物车</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单中心</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb><hr>
  <el-table :data="blo" style="width: 100%" >
    <el-table-column prop="userid" label="用户" width="180"></el-table-column>
    <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
     <el-table-column prop="paynumber" label="数量" width="180"></el-table-column>
    <el-table-column prop="totalprice" label="金额" width="180"></el-table-column>
    <el-table-column prop="state" label="状态"></el-table-column>
  </el-table>
  </div>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      blo: []
    };
  },
  created: function() {
   console.log(this.blo);
    this.axios
      .post("/getmyorder",{a:12})
      .then((response)=>{
        this.blo = response.data;
        this.blo.forEach(element => {
          element.state='已支付';
        });
        console.log(this.blo);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style>
.bread{
   margin: 20px 0;
}
.mydiv{
    width: 95%;
    margin: 0 auto;
}
</style>