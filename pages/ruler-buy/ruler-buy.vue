<template>
<!--pages/catalogue/catalogue.wxml-->
<view>
    <view class="catalogue">
      <view class="catalogueList" v-for="(item, index) in catalogueList" :key="index">
        <view class="catalogueListTitle">
          <image src="/static/img/catalogue/yuan.png" class="catalogueImg"></image>
          <text>{{catalogueList[index][0].cateName}}</text>
        </view>
        <view class="catalogueContent">
          <view class="catalogueContentList" v-for="(item, indexs) in catalogueList[index]" :key="indexs">
              <view class="catalogueListPro">
                <image :src="catalogueList[index][indexs].pic_url" class="catalogueListImg" mode="aspectFit" @tap="toImage" :data-name_one="catalogueList[index][indexs].to_url_name" :data-name_tow="catalogueList[index][indexs].to_url2_name" :data-url_one="catalogueList[index][indexs].to_url" :data-url_tow="catalogueList[index][indexs].to_url2"></image>
                <!-- <view class='catalogueContentListTitle'>{{catalogueList[index][indexs].name}}</view> -->
              </view>
          </view>
        </view>
      </view>
    </view>
  <!-- 客服 -->
  <view class="kefuFix">
    <button open-type="contact" session-from class>
       <view> 
         <image src="/static/img/catalogue/kefu.png"></image> 
       </view> 
    </button>
    <view>
      <image src="/static/img/catalogue/top.png" @tap="toTop"></image>
    </view>
  </view>
  <!-- 点击选择产品目录 style='display:none'-->
  <view class="proFix" v-if="proFixView">
    <view class="inputActivation">
      <view class="inputActivationTop">
        <view class="inputActivationQuxiao" @tap="activationQuxiao">x</view>
				<text class="inputActivationTopTitle">温馨提示</text>
      </view>
      <view class="inputActivationContent">
        <view class="checkText">请选择您想要购买产品的类目</view>
        <!-- <text class='checkNameOne'>{{nameOne}}</text> -->
        <text :class="'checkNameOne ' + (chec==1 ? 'checkNameOneYes' : 'checkNameOneNo' ) + ' checkNameOneNo'" style="margin-right:25rpx" @tap="navTo" data-id="1" :data-url="urlOne">{{nameOne}}</text>
        <text :class="'checkNameOne ' + (chec==2 ? 'checkNameOneYes' : 'checkNameOneNo' ) + ' checkNameOneNo'" @tap="navTo" data-id="2" :data-url="urlTow">{{nameTow}}</text>
        <button @tap="yesBtn" :class="'checkYes ' + (chec==0 ? 'inputActivationBtnNo' : 'inputActivationBtnYes')" :disabled="chec==0 ? true : false" :data-url="chec!=0 && chec==1 ? urlOne : chec!=0 && chec==2 ? urlTow :''">确定</button>
      </view>
    </view>
  </view>
</view>
</template>

<script>


export default {
  data() {
    return {
      catalogueList: [],
      nameOne: '',
      nameTow: '',
      urlOne: '',
      urlTow: '',
      chec: 0,
      proFixView: false,
      navToUrl: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (decodeURIComponent(options.scene)) {
      var qrId = decodeURIComponent(options.scene);
    } else {
      var qrId = 0;
    }

    wx.setStorageSync('scene', qrId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      nameOne: '',
      nameTow: '',
      urlOne: '',
      urlTow: '',
      chec: 0,
      proFixView: false,
      navToUrl: ''
    });
    wx.request({
      url: getApp().globalData.requestUrl + '/api/cate/cateList',
      method: 'post',
      data: '',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token")
      },
      success: function (res) {
        console.log(res.data.data);

        if (res.data.status == 1) {
          that.setData({
            catalogueList: res.data.data
          });
        }
      },
      fail: function () {}
    });
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
  onShareAppMessage: function () {},
  methods: {
    //返回顶部
    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },

    //点击选择项目
    toImage(e) {
      let that = this;
      that.setData({
        nameOne: e.currentTarget.dataset.name_one,
        nameTow: e.currentTarget.dataset.name_tow,
        urlOne: e.currentTarget.dataset.url_one,
        urlTow: e.currentTarget.dataset.url_tow
      });

      if (e.currentTarget.dataset.url_tow == '') {
        wx.navigateTo({
          url: e.currentTarget.dataset.url_one
        });
      } else {
        that.setData({
          proFixView: true
        });
      }
    },

    //取消
    activationQuxiao() {
      let that = this;
      that.setData({
        nameOne: '',
        nameTow: '',
        urlOne: '',
        urlTow: '',
        chec: 0,
        proFixView: false,
        navToUrl: ''
      });
    },

    //选择上下册
    navTo(e) {
      let that = this;
      that.setData({
        chec: e.currentTarget.dataset.id
      });
    },

    //选择上下册完毕后，点击确定
    yesBtn(e) {
      console.log(e);
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
    }

  }
};
</script>
<style>
@import "./ruler-buy.css";
</style>
