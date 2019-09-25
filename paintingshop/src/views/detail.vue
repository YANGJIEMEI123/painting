<template>
	<div>
		<tops></tops>
		<div class="all">
		<div class="div1" v-on:mouseenter="enter" :style="{backgroundImage:'url('+da.img+')'}" v-on:mousemove="move" v-on:mouseleave="leave" v-on:load="onload">
			<div class="mask"></div>
		</div>
		<div class="rightdiv">
			<div class="bigimg" :style="{backgroundImage:'url('+da.img+')'}"></div>
		</div>
		<div class="right">
			<div class="one">画作名称:{{da.name}}<span class="aa">评分</span><el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}" style="display: inline-block;"></el-rate></div>
			<div class="one">作者:{{da.drawer}}</div>
			<div class="one">国籍：{{da.nationality}}</div>
			<div class="one">画作描述：{{da.description}}</div>
			<div class="one">价格:￥{{da.price}}</div>
			<div class="block">
				<span class="bb">数量:</span><el-slider v-model="value1" show-input class="number"></el-slider>
			</div>
			<div><button class="btn1">立即购买</button><button class="btn2" @click="addcar">加入购物车</button></div>
		</div>
		</div>
	</div>
</template>
<style>
	.all{
		margin-top:50px; 
	}
	.div1 {
		width: 350px;
		height: 350px;
		background-size: 100% 100%;
		position: absolute;
		left: 150px;
		top: 100px;
	}

	.mask {
		width: 100px;
		height: 100px;
		background-color: rgba(255, 255, 180, 0.4);
		position: absolute;
		display: none;
	}

	.rightdiv {
		width: 410px;
		height: 410px;
		position: absolute;
		left: 550px;
		top: 100px;
		overflow: hidden;
		display: none;
		z-index: 2000;
	}

	.bigimg {
		width: 2100px;
		height: 2100px;
		background-size: 100% 100%;
		position: absolute;
	}
	.right {
		width: 400px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 50px;
		position: absolute;
		left: 500px;
		top:100px;
		padding: 10px;
		/* background-color: #C2E7B0; */
	}
	
	.one {
		display: flex;
		justify-content: space-between;
	}
	.aa{
		margin-right: -135px;
	}
	.bb{
		margin-right: 60px;
		display:inline-block;
	}
	.three {
		display: flex;
	}
	.size {
		margin-left: 85px;
		border: 1px solid gray;
		padding: 3px;
	}
	.size2 {
		margin-left: 0px;
		border: 1px solid gray;
		padding: 3px;
	}
	.number{
		width:300px;
		display: inline-block;
	}
	.block{
		display: flex;
		align-items: center;
	}
	.btn1{
		width: 134px;
		height: 38px;
		text-align: center;
		background-color: #F0CAB6;
		color: #E5511D;
		border: #FFE4D0;
		font-family: "Hiragino Sans GB","microsoft yahei",sans-serif;
	    font-size: 16px;
		line-height: 38px;
		border-width: 1px;
		border-style: solid;
	}
	.btn2{
		    width: 150px;
		    color: #FFF;
		    border-color: #F40;
		    background: #F40;
			margin: 5px;
			cursor: pointer;
		    height: 38px;
		    text-align: center;
		    font-family: "Hiragino Sans GB","microsoft yahei",sans-serif;
		    font-size: 16px;
		    line-height: 38px;
		    border-width: 1px;
		    border-style: solid;
	}
</style>
<script>
	export default {
		data(){
			return{
				mask:"",
				rightdiv:"",
				bigimg:"",
				value: 4.5,
				value1: 0,
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [
					'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				],
				da:{}
			}
		},
		methods: {
			onload: function() {
				this.mask = document.querySelector(".mask")
				this.rightdiv = document.querySelector(".rightdiv")
				this.bigimg = document.querySelector(".bigimg")
				console.log(this.mask,this.rightdiv,this.bigimg)
			},
			enter: function() {
				this.mask = document.querySelector(".mask")
				this.rightdiv = document.querySelector(".rightdiv")
				this.bigimg = document.querySelector(".bigimg")
				console.log(this.mask,this.rightdiv,this.bigimg)
				this.mask.style.display = "block"
				this.rightdiv.style.display = "block"
			},
			leave: function() {
				this.mask.style.display = "none"
				this.rightdiv.style.display = "none"
			},
			move: function(e) {
				var mx = e.clientX - 200;
				var my = e.clientY - 100;
				var x = mx - 25;
				var y = my - 25;
				if (mx > 251) {
					x = 226
				} else if (mx < 25) {
					x = 0
				}
				if (my > 295) {
					y = 270
				} else if (mx < 25) {
					y = 0
				}
				this.mask.style.left = x + "px";
				this.mask.style.top = y + "px";
				this.bigimg.style.left = -x * 6 + "px";
				this.bigimg.style.top = -y * 6 + "px";
			},
			addcar:function(){
                if(this.$store.getters.userType==2){
                    alert("您没有该权限");
				}
				else if(this.$store.getters.userType==1){
					alert("加入成功");
				}else{
					alert("请先登录");
				}
				console.log(this.value1);
			
				this.axios
      .post("/addcar",{gid:sessionStorage['gid'],number:this.value1})
      .then((response)=>{
		// this.da = response.data;
		// alert("加入成功");
		console.log(this.da);
		
      })
      .catch(function(error) {
        console.log(error);
	  });

			}
        },
        created:function(){
			console.log(sessionStorage['gid']);
            this.axios
      .post("/getdetail",{gid:sessionStorage['gid']})
      .then((response)=>{
        this.da = response.data;
        console.log(this.da);
      })
      .catch(function(error) {
        console.log(error);
      });
        }
	}
</script>