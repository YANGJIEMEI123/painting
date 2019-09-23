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
        watch: {
            kw: function () {
                this.axios.get('/goods', {
                        params: {
                            kw: this.kw
                        }
                    })
                    .then((response) => {
                        // console.log(response.data)
                        // this.goods = response.data;
                        this.$emit("myevent", response.data);
                        this.$emit("click", response.data)

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
       
    }
</script>
<style>
    input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        background-color: #444;
        border-color: #444;
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