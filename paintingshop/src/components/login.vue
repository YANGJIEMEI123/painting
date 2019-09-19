<template>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</template>

<script>

  export default {
    methods: {
      open() {
        this.$alert('', '登录', {
          dangerouslyUseHTMLString: true
        });
      }
    }
  }
</script>