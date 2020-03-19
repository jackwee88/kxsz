<template>
  <view class="wrap">
    <view class="title">点击下方激活码即可复制，发送给好友，共享视频吧</view>
    <view class="item-box">
      <text
        v-for="(item,index) in dataList"
        :key="index"
        class="item item.status==0?'':'dis'"
        selectable="true"
        @click="copy(item.code)"
      >{{item.code}}</text>
    </view>
  </view>
</template>

<script>
const util = require("../../../utils/util");
export default {
  data() {
    return {
      count: 1,
      contents: "",
      page: 1,
      page_size: 10,
      cl_id: "",
      dataList: []
    };
  },
  onLoad: function(options) {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      const dataList = that.dataList;
      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息",
          icon: "none"
        });
      } else {
        util.ajaxs("videopacks/codelist", { cl_id: that.cl_id }, res => {
          var dataList = that.dataList;
          let list = res.list;
        });
      }
    },
    copy(code) {
      uni.setClipboardData({
        data: code,
        success: () => {
          uni.showToast({
            title: "复制成功"
          });
        }
      });
    }
  }
};
</script>

<style>
.item-box {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  justify-content: space-around;
}

.item {
  flex: 0 0 30%;
  background-color: #080;
  font-size: 26rpx;
  color: white;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  margin-bottom: 30rpx;
  justify-content: space-around;
  border-radius: 10rpx;
}

.title {
  height: 90rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  text-align: center;
  color: #999;
  margin-bottom: 20rpx;
}
.dis {
  background-color: #f5f5f5;
  color: #999;
  border: 1rpx solid #ccc;
}
</style>
