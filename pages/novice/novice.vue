<template>
    <view>
        <view class="green">
            <view class="white">
                <image class="adv" src="/static/novice/12@2x.png" />
                <view class="glay">
                    说明：仅限新用户参与一次，任务奖励不可转赠
                </view>
            </view>
        </view>
        <view class="glay-bg">
            <view class="white">
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">绑定手机号码</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">完善个人资料</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">签到</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">学习广场打卡</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">购买学习礼包</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5">观看学习视频</view>
                            <view class="red18">+10</view>
                        </view>
                        <view class="flex">
                            <view class="glay-back"></view>
                            <view class="red14 m-l-9">0/1</view>
                        </view>
                    </view>
                    <view class="right-button flex flex-center">
                        去完成
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
</script>

<style lang="less" scoped>
    .green{
        width: 100%;
        height:350rpx;
        padding: 24rpx 22rpx 0;
        box-sizing: border-box;
        background:linear-gradient(356deg,rgba(4,137,0,1) 50%,rgba(0,136,0,1) 100%);
        .white{
            width:100%;
            height:100%;
            background:rgba(255,255,255,1);
            border-radius:8rpx 8rpx 0 0;
            padding: 16rpx 26rpx;
            box-sizing: border-box;
            .adv{
                box-sizing: border-box;
                width: 100%;
                height: 244rpx;
            }
            .glay{
                font-size:24rpx;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:34rpx;
            }
        }
    }
    .glay-bg{
        background-color: #f5f5f5;
        padding: 0 16rpx;
        box-sizing: border-box;
        .white{
            background-color: white;
            padding: 16rpx 30rpx;
            box-sizing: border-box;
        }
        .glay-item{
            margin-bottom: 48rpx;
        }
        .glay-back{
            width:80rpx;
            height:10rpx;
            background:rgba(230,230,230,1);
            border-radius:6rpx;
        }
        .right-button{
            width:120rpx;
            height:48rpx;
            border-radius:24rpx;
            border:1px solid rgba(235,85,95,1);
            font-size:28rpx;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(235,82,92,1);
        }
    }
</style>
