<template>
    <div>
        <input type="text" placeholder="      请输入商品名称" v-model="kw">
    </div>
</template>
<script>
    export default {
        name: 'search',
        data: function () {
            return {
                kw: ""
            }
        },
        props:["msg"],
        watch: {
            kw: function (val) {
                this.$emit("myevent", val);
               
            },
            // 父向子传值
            msg:function(val){
                console.log("子组件input"+val);
                this.kw=val
            }
        }
       
    }
</script>
<style>
    input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        background-color: #eee;
        border-color: #ddd;
        box-sizing: border-box;
        margin-top: 0px;
        border-block-start-color: #444;
        border: 0;
        text-indent: 20px;
    }

    input:focus {
        outline: none;
    }

   
</style>