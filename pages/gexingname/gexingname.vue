<template>
<view>
<!--pages/my/gexingname/gexingname.wxml-->
<view class="section">
  <view class="header-box">
    <image class="header class_first" :src="avatar"></image>

    <view class="body-box class_second" :style="'height:' + second_height + 'px'">
      <view class="section_cont">
        <view>
           <view class="name showinfo">{{userinfo.username}}</view>
           <image v-if="status==1" class="icon wujieguo" src="/static/index/wujieguo.png"></image>
           <view v-if="status==1" class="tip">{{tips}}</view>
           <view class="name showinfos" v-if="status==2"><image :src="userinfo.signature" mode="widthFix"></image></view>
           <view class="time showinfo" v-if="status==2">{{userinfo.createtime}}</view>
        </view>
       
        <!-- 没有个性签名是显示 -->
        <view class="noshow" v-if="status==3">
          <view class="text">{{userinfo.nickname}}</view>
           <image class="icon wujieguo" src="/static/index/wujieguo.png"></image>
           <view class="tip">{{tips}}</view>
        </view>
        <navigator v-if="status==3" class="seedetail" url="/pages/Signature/Signature">申请签名</navigator>
      </view>  
    </view>
  </view>
  
</view>


<template is="toTop"></template>
</view>
</template>

<script>
// pages/my/gexingname/gexingname.js
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      name: '梁雨淇',
      time: '2000-01-01',
      userinfo: '',
      second_height: 0,
      status: '',
      tips: '您还没有自己的个性签名...',
      createtime: '1235',
      avatar: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // uni.getSystemInfo({
    //   success: function (res) {
    //     console.log(res); // 可使用窗口宽度、高度

    //     console.log('height=' + res.windowHeight); // 计算主体部分高度,单位为px

    //     this.second_height= res.windowHeight - res.windowWidth / 750 * 300
    //   }
    // });
    // uni.request({ //1已申请，未设计签名,2:已申请，已设计签名，3未申请
    //     url: 'https://kxsx.kaifadanao.cn/api/index/getProfile',
    //     method: 'post',
    //     header: {
    //       'content-type': 'application/json',
    //       'token': uni.getStorageSync("token")
    //     },
    //     success: function (res) {
    //       this.avatar= res.data.avatar
    //     },
    //     fail: function () {
    //       uni.hideLoading();
    //       uni.showModal({
    //         title: '网络错误',
    //         content: '网络出错，请刷新重试',
    //         showCancel: false,
    //         mask: true
    //       });
    //     }
    //   });
    // uni.request({ //1已申请，未设计签名,2:已申请，已设计签名，3未申请
    //     url: 'https://kxsx.kaifadanao.cn/api/videoPacks/getSignature',
    //     method: 'post',
    //     header: {
    //       'content-type': 'application/json',
    //       'token': uni.getStorageSync("token")
    //     },
    //     success: function (res) {
    //       if (res.data.status == 1) {
    //         this.userinfo= res.data.data,
    //         this.status= res.data.status,
    //         this.tips= '签名正在努力设计中...'
    //       } else if (res.data.status == 2) {
    //         this.userinfo= res.data.data,
    //         this.status= res.data.status,
    //         this.tips= res.msg
    //       } else {
    //         this.userinfo= res.data.data,
    //         this.status= res.data.status
    //       }
    //     },
    //     fail: function () {
    //       uni.hideLoading();
    //       uni.showModal({
    //         title: '网络错误',
    //         content: '网络出错，请刷新重试',
    //         showCancel: false,
    //         mask: true
    //       });
    //     }
    //   });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  methods: {
    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }

  }
};
</script>
<style>
@import "./gexingname.css";
</style>