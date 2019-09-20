<template>
	<el-table :data="tableData" stripe style="width: 95%;margin-left: 100px;">
	            <el-table-column label="复选框" width="100" style="color:red"><template slot-scope="scope">
				<el-form type="checkbox"></el-form>
			 </template></el-table-column> 
		<el-table-column prop="img" label="" width="50" >
			<template slot-scope="scope">
				<img :src="scope.row.img" style="background-size: 100% 100%;width: 30px;height: 30px;">
			 </template>
		</el-table-column>
		<el-table-column prop="name" label="商品名称" width="150"></el-table-column>
		<el-table-column prop="price" label="单价" width="150"></el-table-column>
		<el-table-column prop="orderprice" label="订金" width="150"></el-table-column>
		<el-table-column prop="youhui" label="优惠金额" width="150"></el-table-column>
		<el-table-column prop="number" label="购买数量" width="150"></el-table-column>
		<el-table-column prop="prices" label="商品总价" width="150"></el-table-column>
		<el-table-column prop="do" label="操作"width="180"><template slot-scope="scope">
				<el-button @click="handleClick(scope.row)" type="text" size="small">收藏</el-button>
				        <el-button type="text" size="small">删除</el-button>
			 </template></el-table-column>
	</el-table>
</template>
<script>
	export default {
		data() {
			return {
				tableData: [{
					    img:'https://f10.baidu.com/it/u=4202700975,231287935&fm=72',
						name: '油画',
						price: '100',
						orderprice: '20',
						youhui: '5',
						number: '10',
						prices: '1000',
						do: ''
					}, {
						img:'https://f10.baidu.com/it/u=4202700975,231287935&fm=72',
						name: '油画',
						price: '100',
						orderprice: '20',
						youhui: '5',
						number: '10',
						prices: '1000',
						do: ''
					}, {
						img:'https://f10.baidu.com/it/u=4202700975,231287935&fm=72',
						name: '油画',
						price: '100',
						orderprice: '20',
						youhui: '5',
						number: '10',
						prices: '1000',
						do: ''
					},
					{
						img:'https://f10.baidu.com/it/u=4202700975,231287935&fm=72',
						name: '油画',
						price: '100',
						orderprice: '20',
						youhui: '5',
						number: '10',
						prices: '1000',
						do: ''
					}
				]
			}
		},
		methods:{
			handleClick:function(a){
				console.log(a)
			}
		}
	
	}
</script>
