<template>
	<div>
		<tops></tops>
		<div class="bbb">
			<div></div>
			<div>
				<span style="width:150px;display:inline-block;margin:0 45px 0 0">商品名称</span>
				<span style="width:150px;display:inline-block;margin:0 45px;">商品单价</span>
				<span style="width:150px;display:inline-block;margin:0 45px 0 95px;">商品数量</span>
				<span style="width:150px;display:inline-block;margin:0 10px;">商品总价</span>
			</div>
			<el-checkbox-group v-model="checkedGoods" class="aaa">
				
				<el-checkbox v-for="good in goods" :checked="good.checked" :indeterminate="good.checked" :label="good.name"  :key="good.id" >
					<span style="width:150px;display:inline-block">{{good.name}}</span>
					<span style="width:150px;display:inline-block;margin-left:100px;margin-right:100px">{{good.price}}元</span>
					<span>
						<el-input-number v-model="good.number" @change="handleChangeNum(good.id)" label="描述文字" size="small">{{goods.number}}</el-input-number>
					</span>
					<span style="width:150px;display:inline-block;margin-left:100px;margin-right:100px">小计： {{good.OnePrice}}元</span>
				</el-checkbox>
			</el-checkbox-group>
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllChange">全选</el-checkbox>
			<div style="margin-top:40px;margin-left:450px;text-align:left">
				<span style="margin-right:20px;display:inline-block">总价：{{allPrice}}元</span>
				<el-button type="primary" size="small" @click="submitBtn" style="background-color: orangered;border: none;font: 18px bolder;">去结算
					<!-- <i class="el-icon-upload el-icon--right"></i> -->
				</el-button>
			</div>

		</div>
	</div>
</template>
<script>
	const goodOptions = ["油画", "花鸟画", "素描（彩铅）", "漆画"];
	export default {
		data() {
			return {
				goods: [],
				checkAll: false,
				isIndeterminate: true,
				checkedGoods: [],
				allPrice: 0
			};
		},
		methods: {
			handleAllChange(val) {
				console.log(val, "555");
				this.checkedGoods = val ? this.goods : [];
				this.isIndeterminate = false;
				if (val) {
					this.getAllPrice();
				} else {
					this.allPrice = 0;
				}
			},
			handleOneChange(value) {
				let a = 0;
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.checkedGoods.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedGoods.length;
				value.filter((it, id) => {
					if (it == this.goods[id].name) {
						if (this.goods[id].OnePrice) {
							a += this.goods[id].OnePrice;
						}
					}
				});
				this.allPrice = a;
			},
			handleChangeNum(val) {
				console.log(val)
				this.goods.filter((it, id) => {
					// this.isIndeterminate = false;
					console.log(it.num)
					if (it.num>1 && it.id == val) {
							if(it.num>=0){
								it.checked=true;
							}
						it.OnePrice = it.num * it.price;
					} if(it.num<=1){
						it.num=1;
					}
				});
				this.getAllPrice();
			},
			getAllPrice() {
				//获取总价
				let money = 0;
				this.goods.filter((it, id) => {
					if (it.OnePrice) {
						money += it.OnePrice;
					}
				});
				this.allPrice = money;
			},
			submitBtn() {
				this.$alert(this.allPrice + "元", "所有商品总计", {
					confirmButtonText: "确定",
					callback: action => {
						this.$message({
							type: "info",
							message: "购买成功"
						});
					}
				});
			}
		},
		created(){
			this.goods.filter(it=>it.checked=false)
			this.axios
      .post("/getmycar")
      .then((response)=>{
        this.goods= response.data;
        console.log(this.goods);
      })
      .catch(function(error) {
        console.log(error);
      });
		},	
	};
</script>
<style lang="postcss" scoped>
	.bbb {
		margin: 50px 300px;
	}

	.aaa>label {
		display: block;
		text-align: left;
		margin-top: 20px;
	}

	.el-checkbox {
		display: block;
		text-align: left;
	}
</style>

