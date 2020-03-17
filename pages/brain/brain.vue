<template>
<view class="page" :style="'background-image: url(' + backgroundImg + ')'">
<view>
  <!-- <view class="bg">
   

  </view> -->
  <!-- <view class="text"></view>
  <view class="children"></view> -->
  <image src="/static/index/backs1.png" style="width:84rpx;height:84rpx;position:fixed;top:64rpx;left:4rpx;" @tap.stop="goBack"></image>
<view class="aud" @tap.stop="playorpause" v-if="is_p==false"></view>
  <view class="audio" @tap.stop="playorpause" v-if="is_p==true"></view>
  <audio controls loop :src="audio" id="audioID" :action="action"></audio>
  <view>

    <navigator url="poetry/poetry" style="position:relative" @tap="to">
      <image src="https://kxsx.kaifadanao.cn/assets/pig.png" class="pig"></image>
      <view class="btn btn-f" hover-class="wsui-btn__hover_btn" hover-stay-time="3000"></view>
    </navigator> 
    <navigator url="./choice/choice" @tap="to">
      <view class="btn btn-c" hover-class="wsui-btn__hover_btn1" hover-stay-time="3000"></view>
    </navigator>
    <navigator url="./fillBlanks/fillBlanks" @tap="to">
      <view class="btn btn-p" hover-class="wsui-btn__hover_btn2" hover-stay-time="3000"></view>
    </navigator>


  </view>
</view>
</view>
</template>

<script>
var utils = require("../../utils/util.js");
export default {
  data() {
    return {
      backgroundImg: 'https://kxsx.kaifadanao.cn/assets/img/gamebackground.png',
      imgList: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 2, 2, 2,, 2, 2, 2, 3, 2, 2, 2, 2],
      action: {
        method: 'pause'
      },
      audio: '',
      is_p: false
    };
  },
  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.backGroundImg();

    var _this = this;

    uni.getSystemInfo({
      success: function (res) {
        let nav_top = res.statusBarHeight;

        if (res.platform.toLowerCase() == 'android') {
          nav_top += 4;
        }
      }
    });
    this.getAudio();
    this.playorpause();
  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    
  },
  methods: {
    getData: function () {
      let pramp = {
        answer: _this.answer
      };
    },
    playorpause: function (e) {
      var that = this;
      var actionPlay = {
        method: "play"
      }; //定义播放

      var actionPause = {
        method: "pause"
      }; //定义暂停

      if (that.action.method == "pause") {
        //若当前是暂停，则点击后播放
        that.action = actionPlay
        that.is_p = true
      } else {
        //若当前是播放，则点击后暂停
        that.action = actionPause
        that.is_p = false
      }
    },

    getAudio() {
      let that = this;
      utils.ajax({
        url: 'index/getSystem',
        data: {
          type: 8
        },
        success: function (res) {
          uni.hideLoading();
          that.audio = res.data.data
        }
      });
    },

    goBack() {
      var that = this;
      var actionPause = {
        method: "pause"
      }; //定义暂停

      this.action= actionPause,
        this.is_p=false
      uni.navigateBack({
          delta: 1
      });
    },

    to(e) {
      util.ajax({
        url:'index/getProfile', 
        data:{}, 
        success:res => {
          var that = this;
          var actionPause = {
            method: "pause"
          }; //定义暂停

          this.action= actionPause,
          this.is_p= false
          let url = e.currentTarget.dataset.url;
          wx.navigateTo({
            url: url
          });
        }
      });
    },

    backGroundImg: function () {
      var that = this;
      utils.ajax({
        url: 'index/getSystem',
        data: {
          type: 8
        },
        success: function (res) {
          this.backgroundImg = res.data
        }
      });
    },
    setStorageSync: function (k, v, time) {
      uni.setStorageSync(k, v);
      var t = time ? time : 24;
      var seconds = parseInt(t * 3600);

      if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        uni.setStorageSync(k + postfix, timestamp + "");
      } else {
        uni.removeStorageSync(k + postfix);
      }
    },
    getStorageSync: function (k, def) {
      var deadtime = parseInt(uni.getStorageSync(k + postfix));

      if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
          uni.removeStorageSync(k);
          uni.removeStorageSync(k + postfix);

          if (def) {
            return def;
          } else {
            return;
          }
        }
      }

      var res = uni.getStorageSync(k);

      if (res) {
        return res;
      } else if (def) {
        return def;
      } else {
        return;
      }
    }
  }
};
</script>
<style>
@import "./brain.css";
</style>