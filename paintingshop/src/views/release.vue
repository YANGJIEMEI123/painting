<template>
    <div >
        
<div class="all">
<div class="publish">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="作品">
    <el-input v-model="formInline.name"></el-input>
  </el-form-item>
  <el-form-item label="画家">
    <el-input v-model="formInline.drawer"></el-input>
  </el-form-item >
<el-form-item label="类型">
   <el-select v-model="value" placeholder="请选择作品类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-form-item>

   
</el-form>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="国籍">
    <el-input v-model="formInline.nation"></el-input>
  </el-form-item>
 <el-form-item label="价格">
    <el-input v-model="formInline.price"></el-input>
  </el-form-item>

   <el-form-item label="存货">
    <el-input v-model="formInline.stock"></el-input>
  </el-form-item>
   
</el-form>


</div>
<el-form   :model="formLabelAlign" id="des">
    <el-form-item label="作品描述">
    <el-input v-model="formLabelAlign.descripe"></el-input>
  </el-form-item>
</el-form>
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
    </div>
</template>
<style scoped>

.all{
   padding-top:50px;
    width:100%;
    min-height: 600px;
   background: url('../assets/bg2.jpg') no-repeat ;
   background-size: 100% 100%;
   background-position: center;
}
#des{
    max-width:760px;
  
    margin:0 auto;
}
.publish{
     
    display: flex;
    flex-direction: column;
    /* justify-content:space-evenly; */
    position: relative;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
    margin:auto;
}
 
</style>
<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formInline: {
          name: '',
          drawer: '',
          type: '',
          
          nation:'',
          price:'',
          stock:''
        },
        formLabelAlign:{
          descripe:''
        },
      options: [{
          value: '1',
          label: '油画'
        }, {
          value: '2',
          label: '花鸟画'
        }, {
          value: '3',
          label: '素描'
        }, {
          value: '4',
          label: '漆画'
        }],
        value: '',
         dialogImageUrl: '',
        dialogVisible: false
      };
       
    },
   
   methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>