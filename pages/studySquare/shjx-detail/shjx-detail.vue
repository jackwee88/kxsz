<template>
  <!--pages/shjsDetail/shjs_detail.wxml-->
  <view class="wrap">
    <view class="top" v-if="info.nickname">
      <image :src="info.avatar" class="header clear" />
      <view class="info" v-if="info.nickname">
        <view>
          <text class="nickname">{{info.nickname}}</text>
        </view>

        <view class="time">
          <text>发布时间：</text>
          <text>{{info.createtime}}</text>
        </view>
      </view>
    </view>
    <view class="content-image">
      <swiper
        class="swiper"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
        style="height:331px;"
      >
        <block v-for="(item, index) in bannerUrl" :key="index">
          <swiper-item>
            <image class="img-item" :src="item" />
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view class="content">{{info.content}}</view>
  </view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      bannerUrl: [],
      info: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    util.ajaxs(
      "works/worksDetails",
      {
        id: options.id
      },
      res => {
        (this.bannerUrl = res.data.picture_arr), (this.info = res.data);
      }
    );
  },
  methods: {}
};
</script>
<style>
@import "./shjs_detail.css";
</style>