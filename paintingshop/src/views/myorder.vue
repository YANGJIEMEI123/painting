<template>
<div class="mydiv">
    <el-breadcrumb separator="/" class="bread">
  <el-breadcrumb-item ><a href="/">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a href="/mycar">购物车</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单中心</el-breadcrumb-item>
  <el-breadcrumb-item></el-breadcrumb-item>
</el-breadcrumb><hr>
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="date" label="订单编号" width="180"></el-table-column>
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
     <el-table-column prop="date" label="金额" width="180"></el-table-column>
    <el-table-column prop="name" label="订单状态" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
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