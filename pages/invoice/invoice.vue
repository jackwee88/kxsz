<template>
<!--pages/invoice/invoice.wxml-->
<view class="wrapper">
  <!-- <view class="item" style="justify-content:space-between;">
    <text class="type" style="padding-left:55rpx">发票类型</text>
    <text class="need">须知</text>
  </view> -->

  <view class="item common" style="align-items:flex-start;">
    <!-- <view class="rodio" style="padding-bottom:0">
      <icon wx:if="{{common_invoice}}" type="success" color="#48DB8D" size='20' bindtap="commonInvoice" data-index="{{index}}" class="icon"/>
      <icon wx:else type="circle" size='20' bindtap="commonInvoice" data-index="{{index}}" class="icon"/>
      <text class="title">普通发票</text>
    </view> -->
    <text class="grey" style="padding-bottom:14rpx;">为响应环保，开心书写全面启动电子普通发票</text>
    <view class="rodio">
      <icon v-if="no_invoice" type="success" color="#48DB8D" size="20" @tap="noInvoice" :data-index="index" class="icon"></icon>
      <icon v-else type="circle" size="20" @tap="noInvoice" :data-index="index" class="icon"></icon>
      <text class="title">不开发票</text>
    </view>
  </view>

  <view class="item type" style="margin-top:10rpx">发票抬头</view>

  <view class="item">
    <view class="rodio">
      <icon class="icon" v-if="person" type="success" color="#48DB8D" size="20" @tap="personInvoice" :data-index="index"></icon>
      <icon class="icon" v-else type="circle" size="20" @tap="personInvoice" :data-index="index"></icon>
      <text class="title">个人</text>
    </view>
  </view>
  <!-- <view class="item">
  <view class="rodio">
    <icon wx:if="{{company}}" type="success" color="#48DB8D" size='20' bindtap="companyInvoice" data-index="{{index}}" class="icon"/>
    <icon wx:else type="circle" size='20' bindtap="companyInvoice" data-index="{{index}}" class="icon"/>
    <text class="title">公司</text>
    <input placeholder='请填写公司名称' style="float:right;margin-top:8rpx" placeholder-style='font-size:24rpx;padding-left:10rpx' bindinput='companyName' value='{{company_name}}'></input>
  </view>
</view> -->

  <!-- <view class="item" style="padding-left:68rpx">
    <text>纳税人识别号</text>
    <input placeholder='请填写纳税人识别号' placeholder-style='font-size:28rpx;padding-left:10rpx' bindinput='identifyNumber' value='{{identify_number}}'></input>
  </view> -->
  <!-- <view class="item" style="padding-left:74rpx">
    <text>联系人电话</text>
    <input placeholder='请填写联系人手机号' placeholder-style='font-size:28rpx;padding-left:10rpx' bindinput='phoneNumber'></input>
  </view> -->
  <!-- <view class="item type" style="margin-top:10rpx">普通商品发票内容</view> -->

  <!-- <view class="item">
    <view class="rodio">
      <icon wx:if="{{no_invoice}}" type="success" color="#48DB8D" size='20' bindtap="noInvoice" data-index="{{index}}" class="icon"/>
      <icon wx:else type="circle" size='20' bindtap="noInvoice" data-index="{{index}}" class="icon"/>
      <text class="title">不开发票</text>
    </view>
  </view> -->
  <!-- 
  <view class="item">
    <view class="rodio">
      <icon wx:if="{{goods_tips}}" type="success" color="#48DB8D" size='20' bindtap="goodsTips" data-index="{{index}}" class="icon"/>
      <icon wx:else type="circle" size='20' bindtap="goodsTips" data-index="{{index}}" class="icon"/>
      <text class="title">商品明细</text>
      <view class="grey">发票内容显示详细商品名称与价格信息</view>
    </view>
  </view> -->


  <view style="position:relative">
   
    <picker @change="bindPickerChange" :value="index" :range="array" class="section">
     
      <view class="picker" style="width:500rpx;text-align:right;">
      <text class="section__title" style="position:absolute;left:20rpx">请选择接收方式</text>{{array[index]}}<image src="/static/img/freeTeaching/arrow-rt.png" style="width:20rpx;height:28rpx;margin-right:40rpx;"></image>
      </view>
    </picker>
  </view>
  <view class="item" style="padding-left:74rpx" v-if="way==1">
    <text>邮箱</text>
    <input placeholder="请填写邮箱地址" placeholder-style="font-size:28rpx;padding-left:10rpx" @input="phoneNumber" :value="content"></input>
  </view>
  <view class="item" style="padding-left:74rpx" v-if="way==0">
    <text>微信号码</text>
    <input placeholder="请填写微信号码" placeholder-style="font-size:28rpx;padding-left:10rpx" @input="phoneNumber" :value="content"></input>
  </view>
  <view class="btn" @tap="sure">确认</view>
</view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      common_invoice: true,
      person: true,
      company: false,
      company_name: '',
      identify_number: '',
      no_invoice: false,
      goods_tips: false,
      phone_number: '',
      array: ['微信', '邮箱'],
      // index:0,
      way: -1,
      content: '',
      index: "",
      invoiceArr: "",
      is_fp: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('a')) {
      var ary = wx.getStorageSync('a');

      if (ary.type == 1) {
        this.person= true,
        this.way= ary.acc_type - 1,
        this.content= ary.content
      } else if (ary.type == 2) {
        this.company= true,
        this.company_name= ary.company_name,
        this.identify_number= ary.identify_number
      }
    }
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
  onShareAppMessage: function () {},
  methods: {
    getData() {},

    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      this.index= e.detail.value,
      this.way= e.detail.value,
      this.content= ''
    },
    commonInvoice: function (e) {
      this.common_invoice= !this.common_invoice
    },
    personInvoice: function () {
      if (this.person == false) {
        this.company= this.person,
        company_name= '',
        identify_number= ''
      }

      this.person= !this.person,
      this.no_invoice= false
    },
    companyInvoice: function () {
      if (this.company == false) {
        this.person= this.company
      }

      this.company= !this.company,
      this.no_invoice= false
    },
    noInvoice: function () {
      if (this.no_invoice == false) {
        this.person= false,
        this.company= false,
        this.company_name= '',
        this.phone_number= '',
        this.identify_number= ''
        var pages = getCurrentPages(); //页面指针数组 

        var prepage = pages[pages.length - 2]; //上一页面指针 
        // prepage.setData({
        //   is_fp: '不开发票'
        // })

        this.no_invoice= !this.no_invoice
      }
    },
    goodsTips: function () {
      this.goods_tips= !this.goods_tips
    },

    companyName(e) {
      var val = e.detail.value;
      this.company_name= val
    },

    identifyNumber(e) {
      var val = e.detail.value;
      this.identify_number= val
    },

    phoneNumber(e) {
      var val = e.detail.value;
      this.phone_number= val
    },

    sure() {
      // var arr = []
      if (!this.company && !this.person && this.no_invoice == false) {
        wx.showToast({
          title: '请选择发票类型',
          icon: 'none'
        });
        return false;
      }

      var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"); //正则表达式

      if (this.company) {// if (this.data.company_name == ""){
        //   wx.showToast({
        //     title: '请输入公司名称',
        //     icon:'none'
        //   })
        //   return false;
        // } else if ((this.data.company_name).replace(/(^\s*)|(\s*$)/g, "")==''){
        //   wx.showToast({
        //     title: '请输入公司名称',
        //     icon: 'none'
        //   })
        //   return false;
        // }
        // if (this.data.identify_number == "") {
        //   wx.showToast({
        //     title: '请输入纳税人识别号',
        //     icon: 'none'
        //   })
        //   return false;
        // } else if ((this.data.identify_number).replace(/(^\s*)|(\s*$)/g, "")==''){
        //   wx.showToast({
        //     title: '请输入纳税人识别号',
        //     icon: 'none'
        //   })
        //   return false;
        // }
        // if (this.data.phone_number == "") {
        //   wx.showToast({
        //     title: '请输入联系人手机号',
        //     icon: 'none'
        //   })
        //   return false; 
        // } else if ((this.data.phone_number).replace(/(^\s*)|(\s*$)/g, "")==''){
        //   wx.showToast({
        //     title: '请输入联系人手机号',
        //     icon: 'none'
        //   })
        //   return false;
        // }
        // if (!(/^1[3456789]\d{9}$/.test(this.data.phone_number))) {
        //   wx.showToast({
        //     title: '请输入正确的手机号',
        //     icon: 'none'
        //   })
        //   return false;
        // } 
        // arr.push({type : 2})
        // arr.push({company_name : this.data.company_name})
        // // arr.push({phone_number:this.data.phone_number})
        // arr.push({identify_number : this.data.identify_number})
        // var arr = { type: 2, company_name: this.data.company_name, identify_number: this.data.identify_number };
        // arr.push(obj)
      } else if (this.person) {
        if (this.phone_number === "") {
          //输入不能为空
          wx.showToast({
            title: '填写接收方式',
            icon: 'none'
          });
          return false;
        } else if (!reg.test(this.phone_number) && this.way == 1) {
          //正则验证不通过，格式不对
          wx.showToast({
            title: '邮箱格式错误',
            icon: 'none'
          });
          return false;
        }

        var arr = {
          type: 1,
          acc_type: parseInt(this.way) + 1,
          content: this.phone_number
        };
      }

      if (this.no_invoice == true) {
        var arr = {};
      }

      var pages = getCurrentPages(); //页面指针数组 

      var prepage = pages[pages.length - 2]; //上一页面指针 
		  console.log(prepage)
      wx.setStorageSync('a', arr);

      if (this.no_invoice == false) {
				console.log('nihao'+arr)
        prepage.invoiceArr= arr,
        prepage.is_fp= '电子发票' //操作上一页面 
      } else {
        prepage.invoiceArr= {},
        prepage.is_fp= '不开发票' //操作上一页面 
      }

      wx.navigateBack({
        delta: 1
      }); //返回上一页面
    }

  }
};
</script>
<style>
@import "./invoice.css";
</style>