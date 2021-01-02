<template>
  <div>
    <tops></tops>
    <div class="login">
     <div class="overstyle"></div>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  
   <el-form-item  label="账号类型" prop="flag"  :rules="[
      { required: true, message: '请选择账号类型', trigger: 'blur' }
    ]">
     <el-select v-model="dynamicValidateForm.flag" placeholder="请选择类型">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-form-item>
  <el-form-item
    prop="account"
    label="账号"
    :rules="[
      { required: true, message: '请输入账号', trigger: 'blur' }
    ]"
  >
    <el-input v-model="dynamicValidateForm.account"></el-input>
  </el-form-item >
  
  <el-form-item
    prop="passwd"
    label="密码"
    :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]"
  >
    <el-input v-model="dynamicValidateForm.passwd" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
  
</el-form>
    </div>
    <bottoms></bottoms>
  </div>
</template>
<script>
export default {
  data() {
    return {
          options: [{
          value: '1',
          label: '普通用户'
        }, {
          value: '2',
          label: '管理者'
        }],
      dynamicValidateForm: {
       passwd :"",
        account: "",
        flag:""
      }
    
    };
  },
  methods: {
   beforeCreate:function(){
    this.$store.commit("OnLogin",false)
    },
    submitForm(formName) {
      console.log("测试数据");

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/login", this.formName)
            .then(response => {
                console.log(response.data.msg)
              if (response.data.msg == "登录成功") {
              this.$store.commit("OnLogin",true)
                  this.$store.commit("handleUserAccount",this.dynamicValidateForm.account);
                 this.$store.commit("handleFlag",this.dynamicValidateForm.flag);
                console.log(response.data);
                this.$alert("登录成功", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
               
                this.$router.push({ path: "/" });
              } else {
                this.$alert("登录失败", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // removeDomain(item) {
    //   var index = this.dynamicValidateForm.domains.indexOf(item);
    //   if (index !== -1) {
    //     this.dynamicValidateForm.domains.splice(index, 1);
    //   }
    // }
  }
};
</script>

<style scoped>
.login{
  width:100%;
  height: 500px;
  display: flex;
  justify-content: center;
  margin: 0px auto;
  background: url("../assets/back1.jpg") no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
}
.el-form{
	z-index: 10;
	position: absolute;
	top:160px;
	margin:0 auto;
}
.el-form-item{
	width:460px;
}
.el-select{
  width:360px;
}
.el-form-item__label{
	color:#fff !important;
}
.el-input__inner{
	background-color: transparent !important;
		color:#fff !important;
}
.el-input{
	color:#fff !important;
}
input:focus{border-color:#12c6d3 !important;}
.overstyle {
  width: 100%;
  height:500px;
  /* height: auto; */
  background: #00000030;
  opacity: 0.5;
  position: relative;
  z-index: 10;
  /* top: -500px; */
}
.el-button--primary {
    color: #FFF;
   
	background-color:transparent !important;
    border-color: #12c6d3 !important;
}
.el-button--primary:hover{
 background-color: #12c6d3 !important;

}
.el-button--default{
		background-color:transparent !important;
		color:#fff !important;
}
.el-button--default:hover{
	background-color:#fff !important;
	color: #12c6d3 !important;
}
</style>