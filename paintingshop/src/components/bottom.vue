<template>
    <div>
        <div class="f">
            <div class="up">
                <ul>
                    <li><span class="iconfont icon-security"></span><span>消费者保障</span></li>
                    <li><span class="iconfont icon-xinshouyindao"></span><span>新手上路</span></li>
                    <li><span class="iconfont icon-sweep"></span><span>付款方式</span></li>
                    <li><span class="iconfont icon-tesezhuanti"></span><span>我们的特色</span></li>
                </ul>
            </div>
            <div class="down">
                <div class="son">
                    <ul>
                        <li>保障范围</li>
                        <li>退货退款流程</li>
                        <li>服务中心</li>
                        <li>更多特色</li>
                    </ul>
                </div>
                <div class="son">
                    <ul>
                        <li>新手专区</li>
                        <li>消费警示</li>
                        <li>交易安全</li>
                        <li>免费开店</li>
                        <li>24小时在线帮助</li>
                    </ul>
                </div>
                <div class="son">
                    <ul>
                        <li>保障范围</li>
                        <li>退货退款流程</li>
                        <li>服务中心</li>
                        <li>更多特色</li>
                    </ul>
                </div>
                <div class="son">
                    <ul>
                        <li>快捷支付</li>
                        <li>信用卡</li>
                        <li>余额宝</li>
                        <li>蚂蚁花呗</li>
                        <li>货到付款</li>
                    </ul>
                </div>
                <div class="son">
                    <ul>
                        <li>特色商品</li>
                        <li>大众审评</li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style slot="">
    * {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .f {
        width: 100%;
        height: 380px;
        background-color: #f4f4f4;
        opacity: 0.8;
        margin: 0 auto;
        margin-top: 20px;
    }

    .up {
        width: 100%;
        height: 150px;
        margin-bottom: 10px;
        margin-top: 10px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .down {
        width: 90%;
        height: 200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .up>ul {
        display: flex;
        justify-content: space-evenly;
    }

    .up>ul>li {
        width: 200px;
        height: 100px;
        display: block;
        padding-top: 20px;
    }

    .up>ul>li>span {
        transform: scale(1.4);
        transition: all 0.7s;
        cursor: pointer;
    }

    .up li>span:first-child {
        font-size: 64px;
    }

    .up li>span:last-child {
        font-size: 12px;
        width: 100px;
        height: 30px;
        display: block;
        margin-top: 20px;
        margin-left: 51px;
    }

    .son {
        width: 234px;
        height: 209px;
        font-size: 16px;
        border-right: 4px solid #999999;
    }

    .son>ul>li {
        margin-top: 20px;
        color: rgb(63, 50, 23);
    }

    .son>ul>li:hover {
        cursor: pointer;
        transform: scale(1.4);
        transition: all 0.6s;

    }

    .son:last-child {
        border-right: 0;
    }
</style>