<template>
    <div >
      <tops></tops>
<div class="all">


<el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" >
  <el-form-item label="作品" prop="name"  :rules="[
      { required: true, message: '请输入作品名'}
    ]">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="画家" prop="drawer" :rules="[
      { required: true, message: '请输入画家名'}
    ]">
    <el-input v-model="ruleForm.drawer"></el-input>
  </el-form-item >

  <el-form-item  label="国籍" prop="nation" :rules="[
      { required: true, message: '请选择国籍'}
    ]">
   <el-select v-model="ruleForm.nation" placeholder="请选择国籍">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-form-item>
<el-form-item label="类型" prop="type" :rules="[
      { required: true, message: '请选择类型'}
    ]">
   <el-select v-model="ruleForm.type" placeholder="请选择作品类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-form-item>


 <el-form-item label="价格" prop="price"  :rules="[
      { required: true, message: '请输入价格'}
    ]">
    <el-input v-model="ruleForm.price"></el-input>
  </el-form-item>

   <el-form-item label="存货" prop="stock"    :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]">
    <el-input v-model.number="ruleForm.stock"  ></el-input>
  </el-form-item>
   
    <el-form-item label="作品描述"  prop="descripe" :rules="[
      { required: true, message: '请输入作品描述'}
    ]">
    <el-input v-model="ruleForm.descripe" ></el-input>
  </el-form-item>
   

<el-upload  
  class="upload-demo" prop="filelist"
  action="/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="handleSuccess"
  multiple
  :limit="1"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<el-button type="success" plain style="margin-top:30px;margin-bottom:30px"  @click="submitForm('ruleForm')">发布商品</el-button>
   <el-button @click="resetForm('ruleForm')">重置</el-button>
</el-form>

</div>
<bottoms></bottoms>
    </div>
</template>
<style scoped>
.all{
  width:500px;
    position: relative;
    top:0;
    right: 0;
    bottom: 0;
    left:0;
    margin:auto;
}
.el-form-item{
    min-width:500px;
   
}
.el-select{
  width:450px;
}
el-form-item_content{
    min-width:500px;
}


 
</style>
<script>

  export default {
    data() {
 var checkprice = (rule, value, callback) => {
        if (value=="") {
          return callback(new Error('请输入价格'));
        }
         else {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/gim.test(value)) {
          if (this.ruleForm.price !== "") {
            this.$refs.ruleForm.validateField("price");
          }
          callback();
        } else {
          callback(new Error("价格必须是大于0的数"));
        }
      }
      };

      return {
        labelPosition: 'right',
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
           options1: [{
          value: '中国',
          label: '中国'
        }, {
          value: '美国',
          label: '美国'
        }, {
          value: '法国',
          label: '法国'
        }, {
          value: '英国',
          label: '英国'
        }],
        ruleForm: {
          name: '',
          drawer: '',
          type: '',
        //   nation:'',
          price:'',
          stock:'',
         nation:'',
         type: '',
        descripe:'',
        fileList:''
   
        },
         rules: {
           price: [
            { validator: checkprice, trigger: 'blur' }
          ],
    
        },
         
        fileList: []
      };
       
    },
   
   methods: {
     handleSuccess(response, file, fileList){
      console.log(response.data.src, file, fileList);
       this.ruleForm.fileList=response.data.src;
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.axios.post("/publish",this.ruleForm)
            .then(response => {
              console.log(response.data);
              if (response.data.msg == "existed") {
                this.$alert("商品已存在", "发布失败", {
                  confirmButtonText: "确定",
                  callback: action => {
                    // this.$message({
                    //   type: "info",
                    //   message: `action: ${action}`
                    // });
                  }
                });
              }else{
                  this.$message('发布成功');
              }
             
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          // this.$refs.upload.submit();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  
    }
  }
</script>