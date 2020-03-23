<!-- 首页弹出窗口 -->

<template name='indexModal'>
  <view class="overlayer">
    <view class="bg"></view>
    <view class="containerModal">
      <view class="modalTitle">恭喜您获得新人礼包</view>
      <view class="youhuiquan">
        <view class="youhuiNum">
          <text style="font-size:36rpx ;">
            ¥
            <text style="font-size: 54rpx;">10</text>
          </text>
        </view>
        <view class="youhuiDetail">
          <view class="detail">每满99减10元</view>
          <view class="date">2019.03.20-2019.05.20</view>
          <image
            class="image"
            src="../../static/index/newPerpson.png"
            style="width: 84rpx;height: 78rpx;"
          />
        </view>
      </view>

      <view class="btn" @click="gotoNovice">快去完成新人任务吧！</view>
    </view>
  </view>
</template>

<script>
export default {
  // name:'indexModal',
  data() {
    return {};
  },
  props: {
    isVisible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    gotoNovice: function() {
      uni.navigateTo({
        url: "../novice/novice"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.overlayer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .containerModal {
    width: 602rpx;
    height: 660rpx;
    background-color: #2f881e;
    padding: 30rpx 20rpx 15rpx 20rpx;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
  }
  .btn {
    color: #2f881e;
    background-color: white;
    height: 82rpx;
    font-size: 30rpx;
    line-height: 82rpx;
    width: 372rpx;
    border-radius: 41rpx;
    margin: 22rpx auto;
  }
  .modalTitle {
    color: #ffffff;
    font-weight: 600;
    font-size: 52rpx;
  }

  .detail {
    color: #4f4f4f;
    font-size: 28rpx;
  }
  .date {
    coloe: #aaaaaa;
    font-size: 22rpx;
  }
  .youhuiquan {
    display: flex;
    flex-direction: row;
    height: 130rpx;
    margin-top: 10rpx;
    position: relative;
    width: 100%;
    .youhuiNum {
      background-image: linear-gradient(#e38735, #eb6930);
      width: 28%;
      height: 130rpx;
      line-height: 130rpx;
      border-radius: 10rpx 0 0 10rpx;
      color: white;
      text-align: center;
    }
    .youhuiDetail {
      background-color: #ffffff;
      width: 72%;
      height: 130rpx;
      box-sizing: border-box;
      text-align: left;
      padding-left: 22rpx;
      padding-top: 22rpx;
      border-radius: 0rpx 10rpx 10rpx 0rpx;
    }
  }
  .image {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .youhuiDetail {
    background-color: #ffffff;
  }
}
</style>