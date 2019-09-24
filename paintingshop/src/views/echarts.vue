<template>
<div>
    <tops></tops>
   <div class="indexs">
         <div id="main" style="width:50%;height:300px;"></div>
         <div id="stock" style="width:50%;height:300px;"></div>
   </div>
   <bottoms></bottoms>
</div>
</template>
<style scoped>
.indexs{
    padding:150px 50px;
    display:flex;
    justify-content:space-between;
    background-color: #333333;
    height:300px;
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
        var barChart = echarts.init(document.getElementById('main'),'dark');
        barChart.setOption({
            tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['库存', '销量', '总量']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['油画','花鸟画','国画','漆画']
        }
    ],
    series : [
        {
            name:'库存',
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[200, 170, 240, 244]
        },
        {
            name:'总量',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true
                }
            },
            data:[320, 302, 341, 374]
        },
        {
            name:'销量',
            type:'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'left'
                }
            },
            data:[-120, -132, -101, -134]
        }
    ]
});

      },
      mystock(){
 var pieChart = echarts.init(document.getElementById('stock'),'dark');
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
        data: ['油画', '花鸟画','国画','漆画']
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
                {value:234, name:'国画'},
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