<template>
<div>
    <tops></tops>
   <div class="indexs">
         <div id="main" style="width:50%;height:300px;"></div>
         <div id="stock" style="width:50%;height:300px;"></div>
   </div>
</div>
</template>
<style scoped>
.indexs{
    display:flex;
    justify-content:space-between;
}
</style>
<script >
var echarts = require("echarts/lib/echarts");//// 引入 ECharts 主模块
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");//提示框
require("echarts/lib/component/title");//标题组件
require("echarts/lib/component/legend");//
require('echarts/lib/chart/bar');//引入柱状图





export default {
  name: "indexss",
  data() {
    return {
    };
  },
  created() {
    this.$nextTick(function() {
    //   this.montheahcrt();
      this.goodschart();
      this.mystock();
    });
  },
  methods: {
      goodschart(){
        var barChart = echarts.init(document.getElementById('main'));
        barChart.setOption({
             title: {
        text: '一周销量图',
        x:'center'
       
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['油画', '花鸟画','素描','漆画'],
        orient: 'vertical',
        left: 'left',
    },
    grid: {
        left: '15%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    series: [
        {
            name: '油画',
            type: 'bar',
            stack: '总量',
            center: ['50%', '60%'],
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '花鸟画',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '素描',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '漆画',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
      
    ]
});

      },
      mystock(){
 var pieChart = echarts.init(document.getElementById('stock'));
 pieChart.setOption({
 title : {
        text: '收益占比',
        subtext: `总金额`,
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['油画', '花鸟画','素描','漆画']
    },
    series : [
        {
            name: '收益金额',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'油画'},
                {value:310, name:'花鸟画'},
                {value:234, name:'素描'},
                {value:135, name:'漆画'},
               
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]



 })
      }
  
  }
};




</script>