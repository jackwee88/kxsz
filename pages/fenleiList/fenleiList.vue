<template>
  <view>
    <!-- 搜索框 -->
    <view class="searchcont">
      <view class="search">
        <image class="searchicon" src="../../static/jctbxzjx/search.png" mode />
        <input
          type="text"
          class="searchinput"
          value
          placeholder="请输入搜索的产品"
          placeholder-class="inputPlace"
        />
      </view>
    </view>
    <!-- 主内容 -->
    <view class="jctbxzjx">
      <!-- 左侧 -->
      <view class="catalogueleft">
        <view
          :class="data.id == catalogue.checkId ? 'navtab_item  nav-active' : 'navtab_item'  "
          v-for="data in catalogue.catalogueData"
          :key="data.id"
          :id="data.id"
          v-on:click="checkData"
        >
          <text>{{data.text}}</text>
        </view>
      </view>
      <!-- 右侧 -->
      <view class="catalogueright">
        <view class="tabcont">
          <view class="tabcontitem">
            <view class="tableftimg tabfloct">
              <navigator url>
                <image
                  class="productimg"
                  src="https://pic.kaifadanao.cn/20190729/0031f95703e378620256cebb5bfe8cce.jpg"
                  mode="widthFix"
                />
              </navigator>
            </view>
            <view class="tabright tabfloct">
              <view class="title">识字第二课《金木水火土》</view>
              <view class="renqi">473人气</view>
              <view class v-on:click="collect">
                <image class="collectimg" :src="collectClick.img" mode="widthFix" />
                <text class="collecttext">{{collectClick.text}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class>
          <uni-load-more :status="status" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// pages/catalogue/catalogue.js
const app = getApp().globalData;
var util = require("../../utils/util.js");
import { ajax } from "../../utils/public.js";
export default {
  data() {
    return {
      catalogueList: [],
      nameOne: "",
      nameTow: "",
      urlOne: "",
      urlTow: "",
      chec: 0,
      proFixView: false,
      navToUrl: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    if (decodeURIComponent(options.scene)) {
      var qrId = decodeURIComponent(options.scene);
    } else {
      var qrId = 0;
    }

    wx.setStorageSync("scene", qrId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.setData({
      nameOne: "",
      nameTow: "",
      urlOne: "",
      urlTow: "",
      chec: 0,
      proFixView: false,
      navToUrl: ""
    });
    wx.request({
      url: getApp().globalData.requestUrl + "/api/cate/cateList",
      method: "post",
      data: "",
      header: {
        "content-type": "application/json",
        token: wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res.data.data);

        if (res.data.status == 1) {
          that.setData({
            catalogueList: res.data.data
          });
        }
      },
      fail: function() {}
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
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

      if (e.currentTarget.dataset.url_tow == "") {
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
        nameOne: "",
        nameTow: "",
        urlOne: "",
        urlTow: "",
        chec: 0,
        proFixView: false,
        navToUrl: ""
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
<style lang="less" scoped>
@import "./catalogue.css";
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: #f8f8f8;
}
</style>