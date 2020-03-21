<template>
  <view>
    <!--pages/onlinestore/discountcenter/discountcenter.wxml-->
    <view class="mydiscount">
      <view
        class="mydiscount_list"
        v-for="(item, index) in mydiscount"
        :key="index"
        :data-cp_id="item.cp_id"
        @tap="click"
      >
        <view class="mydiscount_item">
          <view class="left floatcont">{{item.prices}}</view>

          <view class="right floatcont">
            <view class="fullmoney">满{{item.couponcondition}}元可使用</view>
            <view class="perod">有效期:{{item.effectstart}}-{{item.effectend}}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      v-if="mydiscount.length==0"
      style="text-align:center;font-size:32rpx;margin-top:30rpx"
    >暂无优惠券</view>
  </view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      discountNum: "3",
      mydiscount: [],
      page: 1,
      page_size: 7,
      count: 1
    };
  },
  onShow: function() {
    this.setData = [];
    this.page = 1;
    this.getData();
  },
  onReachBottom: function() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      var param = {
        page: that.page,
        page_size: that.page_size
      };

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajaxs("shop/getCouponList", param, res => {
          var mydiscount = that.mydiscount;
          that.page = that.page + 1;
          that.count = res.data.count > 1 ? res.data.count : 1;
          that.mydiscount = mydiscount.concat(res.data.list);
          wx.stopPullDownRefresh();
        });
      }
    },

    //  pi/shop/couponAction
    click(e) {
      var that = this;
      var cp_id = e.currentTarget.dataset.cp_id;
      var param = {
        cp_id: cp_id
      };
      util.ajaxs("shop/couponAction", param, res => {
        wx.showToast({
          title: res.msg,
          icon: "none",
          mask: true,
          duration: 2000,
          success: function() {
            wx.navigateTo({
              url: "/pages/goods/goods"
            });
          }
        });
      });
    }
  }
};
</script>
<style>
@import "./discountcenter.css";
</style>