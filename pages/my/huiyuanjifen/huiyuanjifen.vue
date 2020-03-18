<template>
  <view>
    <view class="card">
      <text class="card_title">积分</text>
      <text class="jifen">{{userdata[0].after}}</text>
    </view>
    <!-- <view class="line">
      <text class="txt">积分规则</text>
    </view>-->
    <view class="mokuai"></view>
  </view>
</template>

<script>
var util = require("../../../utils/util.js");
export default {
  data() {
    return {
      userdata: [
        {
          after: 0
        }
      ]
    };
  },
  onLoad: function(options) {
    var that = this;
    util.ajaxs("index/getScore", {}, res => {
      console.log(res);
      that.userdata = res.data.list;
    });
  }
};
</script>

<style>
@import "./huiyuanjifen.css";
</style>
