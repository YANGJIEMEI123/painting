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
        props: ["msg"],
        watch: {
            kw: function (val) {
                this.$emit("myevent", val);

            },
            // 父向子传值
            msg: function (val) {
                console.log("子组件input" + val);
                this.kw = val
            }
        }

    }
</script>
<style>
    
</style>