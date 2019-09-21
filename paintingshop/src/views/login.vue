<template>
  <div>
    <tops></tops>
    <div class="login">
      <div class="lo">
        <h3>登录</h3>
      </div>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="account"
    label="账号"
    :rules="[
      { required: true, message: '请输入账号', trigger: 'blur' }
    ]"
  >
    <el-input v-model="dynamicValidateForm.account"></el-input>
  </el-form-item>
  <el-form-item
    prop="passwd"
    label="密码"
    :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]"
  >
    <el-input v-model="dynamicValidateForm.passwd"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
       passwd :"",
        account: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/login", this.formName)
            .then(response => {
                console.log(response.data.msg)
              if (response.data.msg == "登录成功") {
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

<style>
.login {
  width: 40%;
  margin: 100px auto;
}
.lo {
  margin-bottom: 30px;
}
</style>