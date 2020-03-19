<template>
  <view class="page">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="top_title">
      <text>我的</text>
    </view>
    <view class="user_info p_r_l_32">
      <view class="left_side">
        <navigator url="../userInfo/userInfo">
          <image :src="info.avatar" class="avatar" />
        </navigator>
        <view class="info_wrap">
          <view class="name">
            <text>{{info.nickname}}</text>
            <view class="huiyuan" v-show="info.level == 1">
              <image src="/static/my/hytq.png" style="width: 166rpx" mode="widthFix" />
              <navigator url="huiyuantequan/huiyuantequan" class="huiyuan_name">
                会员特权
                <image src="../../static/my/jifenreturn.png" />
              </navigator>
            </view>
          </view>
          <!-- <view class="date">像风一样自由</view> -->
        </view>
      </view>

      <navigator class="signin_btn" url="/pages/my/daySignin/daySignin">
        <image src="../../static/my/dateimg.png" />
        <text>签到</text>
      </navigator>
    </view>

    <view class="base_info">
      <navigator class="item" url="../dakaLog/dakaLog">
        <view>{{info.diary_num}}</view>
        <text>打卡</text>
      </navigator>
      <navigator class="item" url="follow/follow">
        <view>{{info.follow_num}}</view>
        <text>关注</text>
      </navigator>
      <navigator class="item" url="fans/fans">
        <view>{{info.fans_num}}</view>
        <text>粉丝</text>
      </navigator>
    </view>

    <view class="block"></view>

    <view class="panel">
      <navigator url="videoGift/videoGift">
        <view class="left_side">
          <image src="../../static/my/jhm2.png" />
          <text>激活码</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="videolist/videolist">
        <view class="left_side">
          <image src="../../static/my/wdsp.png" />
          <text>我的视频</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="../onlinestore/myOrder/myOrder">
        <view class="left_side">
          <image src="../../static/my/wddd.png" />
          <text>我的订单</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="../onlinestore/myScoreOrder/myScoreOrder">
        <view class="left_side">
          <image src="../../static/my/wddd.png" />
          <text>我的积分订单</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="mydiscount/mydiscount">
        <view class="left_side">
          <image src="../../static/my/wdyhq.png" />
          <text>我的优惠券</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
    </view>

    <view class="block"></view>

    <view class="panel">
      <navigator url="mycollect/mycollect">
        <view class="left_side">
          <image src="../../static/my/wdsc.png" />
          <text>我的收藏</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
    </view>

    <view class="block"></view>

    <view class="panel">
      <navigator url="huiyuanxinxi/huiyuanxinxi">
        <view class="left_side">
          <image src="../../static/my/hyxx.png" />
          <text>会员信息</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="huiyuantequan/huiyuantequan">
        <view class="left_side">
          <image src="../../static/my/hytq2.png" />
          <text>会员特权</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="huiyuanjifen/huiyuanjifen">
        <view class="left_side">
          <image src="../../static/my/wdjf.png" />
          <text>我的积分</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
      <navigator url="jifenguize/jifenguize">
        <view class="left_side">
          <image src="../../static/my/jfgz.png" />
          <text>积分规则</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
    </view>

    <view class="block"></view>
    <view class="panel">
      <navigator url="../feedback/feedback">
        <view class="left_side">
          <image src="../../static/my/gywm.png" />
          <text>意见反馈</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
    </view>
    <view class="panel">
      <navigator url="../about/about">
        <view class="left_side">
          <image src="../../static/my/gywm.png" />
          <text>关于我们</text>
        </view>
        <image src="../../static/index/qj.png" class="icon_more" />
      </navigator>
    </view>
  </view>
</template>

<script>
const util = require("../../utils/util.js");
export default {
  data() {
    return {
      info: {
        diary_num: 0,
        follow_num: 0,
        fans_num: 0,
        nickname: "",
        level: 0,
        avatar: "../../static/index/dnkf.png"
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      util.ajaxs("index/getProfile", {}, res => {
        console.log(res);
        this.info = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
/* @import './my.css'; */
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: #f8f8f8;
}
.page {
}
.top_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx;
  margin-bottom: 26rpx;
  text {
    font-size: 36rpx;
    font-weight: 500;
    color: rgba(50, 50, 50, 1);
    line-height: 50rpx;
  }
}
.block {
  height: 20rpx;
  background-color: #f7f4f8;
}
.p_r_l_32 {
  padding-right: 32rpx;
  padding-left: 32rpx;
}
.user_info {
  display: flex;
  align-items: flex-end;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 28rpx;

  .left_side {
    display: flex;
    align-items: center;

    .avatar {
      width: 100rpx;
      height: 100rpx;
      margin-right: 20rpx;
      border-radius: 50%;
    }

    .info_wrap {
      .name {
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        text {
          margin-right: 22rpx;
          font-size: 48rpx;
          font-weight: 500;
          color: rgba(50, 50, 50, 1);
          line-height: 1;
        }

        .huiyuan {
          position: relative;
          width: 166rpx;
          font-size: 0;

          > image {
            width: 130rpx;
            height: 32rpx;
          }

          .huiyuan_name {
            position: absolute;
            box-sizing: border-box;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 200rpx;
            height: 100%;
            padding-right: 10rpx;
            padding-left: 42rpx;
            font-size: 16rpx;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 16rpx;

            image {
              width: 8rpx;
              height: 14rpx;
            }
          }
        }
      }

      .date {
        font-size: 24rpx;
        color: rgba(153, 153, 153, 1);
        line-height: 1;
      }
    }
  }

  .signin_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 164rpx;
    height: 58rpx;
    background: rgba(63, 174, 42, 1);
    border-radius: 29px;

    image {
      width: 30rpx;
      height: 28rpx;
      margin-right: 10rpx;
    }

    text {
      font-size: 20rpx;
      color: #fff;
      line-height: 28rpx;
    }
  }
}
.username {
  color: #323232;
  font-size: 28rpx;
  padding: 5rpx 0rpx;
}
.base_info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8rpx 0 20rpx;
  border-top: 1rpx solid #ddd;
  border-bottom: 1rpx solid #efefef;

  .item {
    view {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 36rpx;
      color: rgba(51, 51, 51, 1);
      line-height: 50rpx;
    }

    text {
      font-size: 28rpx;
      color: rgba(153, 153, 153, 1);
      line-height: 40rpx;
    }
  }
}

.panel {
  padding: 0 32rpx;

  navigator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #ddd;

    &:last-of-type {
      border-bottom: 0;
    }

    .left_side {
      display: flex;
      align-items: center;

      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }

      text {
        font-size: 24rpx;
        color: rgba(102, 102, 102, 1);
        line-height: 34rpx;
      }
    }

    .icon_more {
      width: 16rpx;
      height: 24rpx;
    }
  }
}
</style>
