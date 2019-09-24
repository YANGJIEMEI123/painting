<template>
  <div>
    <tops></tops>
    <div class="bbb">
      <el-table
        ref="multipleTable"
        :data="goods"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称" width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="price" label="商品单价" width="120"></el-table-column>
        <el-table-column prop="number" label="商品数量" show-overflow-tooltip>
          <template scope="scope">
            <el-input
              v-model="scope.row.number"
              :value="scope.row.number"
              @change="changeCount(scope.row)"
              :min="1"
              :max="scope.row.num"
            >
              <el-button slot="prepend" @click="changeQuantity(scope.row,-1)">
                <i class="el-icon-minus"></i>
              </el-button>
              <el-button slot="append" @click="changeQuantity(scope.row,1)">
                <i class="el-icon-plus"></i>
              </el-button>
            </el-input>
            <br />
            <span style="color:#999;display: block; text-align: center;">库存{{scope.row.num}}件</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="总价" width="150" v-model="totalPrice"></el-table-column>
      </el-table>
      <div style="margin-top:40px;margin-left:450px;text-align:left">
        <span style="margin-right:20px;display:inline-block">总价：{{allPrice}}元</span>
        <el-button
          type="primary"
          size="small"
          @click="submitBtn"
          style="background-color: orangered;border: none;font: 18px bolder;"
        >去结算</el-button>
      </div>
     
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [],
      checkAll: false,
      isIndeterminate: true,
      checkedGoods: [],
      allPrice: 0,
      totalPrice: 0,
      a: []
    };
  },
  methods: {
    changeQuantity(row, type) {
      if (type > 0) {
        row.number++;
      } else {
        row.number > 1 ? row.number-- : (row.number = 1);
      }
      this.changeCount(row);
    },
    changeCount(row) {
      if (null == row.number || row.number == "") {
        row.number = 1;
      }
      row.totalPrice = (row.number * row.price).toFixed(2); //保留两位小数
      console.log(row.totalPrice + " = " + row.number + " * " + row.price);
      console.log(this.goods);
      //增加商品数量也需要重新计算商品总价
    },

   
    handleSelectionChange(val) {
      console.log(val);
      this.allPrice = 0;
      for (let i = 0; i < val.length; i++) {
        this.allPrice += parseInt(val[i].totalPrice);
      }
      console.log(this.allPrice);
      this.a = val;
      //   this.multipleSelection = val;
    },

    
    getAllPrice() {
      //获取总价
      let money = 0;
      this.goods.filter((it, id) => {
        if (it.Oneprice) {
          money += it.Oneprice;
        }
      });
      this.allPrice = money;
    },
    submitBtn() {
      console.log(this.a);
      this.a.forEach((element, index) => {
        this.axios
          .post("/insertorder",element)
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      });

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
  created() {
    this.goods.filter(it => (it.checked = false));
    this.axios
      .post("/getmycar")
      .then(response => {
        this.goods = response.data;
        console.log(this.goods);
        // this.cartNum;
        this.goods.forEach(function(data, index) {
          //   data.count = 1; //默认一个商品

          data.totalPrice = (data.price * parseInt(data.number)).toFixed(2);
          //商品总价
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //数量文本框值改变
};
</script>
<style lang="postcss" scoped>
.bbb {
  margin: 50px 300px;
}

.aaa > label {
  display: block;
  text-align: left;
  margin-top: 20px;
}

.el-checkbox {
  display: block;
  text-align: left;
}
</style>

