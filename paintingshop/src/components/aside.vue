<template>
    <div class="fa">
        <div class="cd">
            <span class="iconfont icon-shouji" id="logo1"></span>
            <div class="box"><img src="../assets/two.png" alt=""></div>
        </div>
        <div class="cd">
            <span class="iconfont icon-gongju" id="logo2"></span>
            <div class="box">个人中心</div>
        </div>
        <div class="cd"><span class="iconfont icon-service" id="logo3"></span>
            <div class="box">售后服务</div>
        </div>
        <div><a href="#top"><span class="iconfont icon-tubiao102" id="logo4"></span></a></div>
    </div>
</template>
<style scoped>
    a {
        text-decoration: none;
    }

    .fa {
        width: 50px;
        height: 245px;
        background-color: #bbb;
        position: fixed;
        right: 15px;
        bottom: 10px;
        z-index: 9;
        border-radius:7px;
    }

    .cd{
        width: 100%;
        height: 50px;
        margin-top: 12px;
        position: relative;
    }


    #logo1,
    #logo2,
    #logo3,
    #logo4 {
        width: 100%;
        height: 50px;
        display: block;
        color: #444;
        font-size: 30px;
    }

    .box {
        width: 100px;
        height: 30px;
        position: absolute;
        right: 63px;
        top: 2px;
        display: none;
        background-color: #eee;
        border-radius: 2px;
        line-height: 30px;
    }
    img{
        width: 105px;
    }

    .cd:hover .box {
        display: block;

    }
</style>