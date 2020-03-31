<template>
<view>
<!--pages/Signature/Signature.wxml-->

<view class="Signature">
  <view class="nav">
    <image class="navlogo" src="../../../static/studySquare/Signaturelogo.png"></image>
      <view class="navinfouser">
        <text class="username">{{userinfo.nickname}}</text>
        <image class="usertoux" :src="userinfo.avatar"></image>
      </view>
  </view>
  <view class="banner">
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
    <block v-for="(item, index) in bannerUrl" :key="index">
      <swiper-item>
        <image :src="item.pic_url" mode="aspectFill" :data-type="item.jump_type" :data-url="item.to_url" @tap="jump" style="width: 100%;height: 300rpx;"></image>
      </swiper-item>
    </block>
  </swiper>
  </view>
  
  <form @submit="submitInfo" report-submit="true">
    <view class="formcont">
      <view class="section">
        <text class="hint">姓名：</text><input class="input" placeholder-class="place-hoder" type="text" placeholder="请输入您的名字" @input="getName" v-model="name"/>
      </view>
      <!-- <view class='section section2'>
        <text class="hint">生日：</text><input class='input' placeholder-class="place-hoder" type="text" placeholder='请输入您的生日'  bindinput="getBirthtime" value="{{birthtime}}" />
      </view> -->
      <view class="section section2">
        <text class="hint">手机号：</text><input class="input" placeholder-class="place-hoder" type="number" placeholder="请输入您的手机号" @input="getMobile" v-model="mobile"/>
      </view>
       <view class="section section2 form-item datedirsday">
          <text class="hint borthday">生日:</text>
          <picker mode="date" value="birthtime" @change="bindDateChange" class="borth-input" v-if="birthtime_select==true">
            <view class="picker">{{birthtime}}<image class="xaiicon" src="/static/img/my/righticon.png"></image>
            </view>
          </picker>
           <picker mode="date" value="birthtime" @change="bindDateChange" class="borth-inputs" v-if="birthtime_select==false">
            <view class="picker">{{birthtime}}<image class="xaiicon" src="/static/img/my/righticon.png"></image>
            </view>
          </picker>
        </view>
      <view class="sectionbtn">
        <button class="submitbtn" type="submit" @tap="signUpload" form-type="submit">提交</button>
      </view>
    </view>
  </form>

</view>

<!-- 右下角固定功能 -->
<view class="rightfiex">
     <!-- <button class='rightfiex_cont rightfiex_first' open-type="contact">
      <image class='icon kefu' src='/img/freeTeaching/kefu.png'></image>
    </button> -->

    <button class="rightfiex_cont rightfiex_first" open-type="share">
      <image class="icon addhao kefu" src="/static/img/freeTeaching/addhao.png"></image>
    </button>

</view>



<template is="toTop"></template>
</view>
</template>

<script>
// pages/Signature/Signature.js
// const app = getApp().globalData;
// var util = require("../../utils/util.js");
import {ajax} from '../../../utils/public.js'
export default {
  data() {
    return {
      name: '',
      mobile: '',
      birthtime: '请选择生日',
      bannerUrl: [],
      birthtime_select: true,
      avatar: "",
      smodel: "",
			userinfo:{},
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.getData();
    this.getbanner();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '开心书写',
      path: 'pages/index/index?myshare=1&tourl=/pages/Signature/Signature' // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId

    };
  },
  methods: {
    // 日期选择
    bindDateChange(e) {
      console.log(e);
      // this.setData({
        this.birthtime = e.detail.value,
        this.birthtime_select= false
      // });
    },
		getData(){
			ajax(
			{
					 url:'index/getProfile', 
					 data:{}, 
					 success:(res) => {
			       this.userinfo=res.data.data
			   }}
				 )
		},
    getbanner: function () {
      var that = this;
     ajax({url:'index/index', data:{}, success:(res) => {
          this.bannerUrl=res.data.data.banner,
          this.smodel=res.data.data.smodel
      }});
    },
    getName: function (e) {
        this.name=e.detail.value
    },
    getMobile: function (e) {
        this.mobile=e.detail.value
    },
    // getBirthtime: function (e) {
    //   this.setData({
    //     birthtime: e.detail.value
    //   });
    // },
    signUpload: function () {
      if (!/^1\d{10}$/.test(this.mobile)) {
        uni.showToast({
          title: '手机号不合法',
          icon: 'none'
        });
        return false;
      }
    ajax({
		url:'signature/signUpload', 
			data:{
				username: this.name,
				birthtime: this.birthtime,
				mobile: this.mobile
			}, success:(res) => {
        uni.showModal({
          title: '',
          content: res.data.msg,
          icon: 'none',
          mask: true
        });
				if(res.data.status==0){
					this.name='',
					this.birthtime='',
					this.mobile=''
				}
      },
			});
    },

    submitInfo(e) {
      setTimeout(() => {
        getApp().globalData.sendFormId(e);
      }, 1000);
    },

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
@import "./personsign.css";
</style>