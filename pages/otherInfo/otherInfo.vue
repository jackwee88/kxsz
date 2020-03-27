<template>
  <view>
    <!--pages/otherInfo/otherInfo.wxml-->
    <view class="title">{{detail.name}}</view>
    <rich-text :nodes="detail.content"></rich-text>
  </view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      id: 0,
      detail: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.id = options.id;
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      util.ajaxs(
        "partner/partner",
        {
          id: this.id
        },
        res => {
          that.detail = res.data;
        }
      );
    }
  }
};
</script>
<style>
@import "./otherInfo.css";
</style>