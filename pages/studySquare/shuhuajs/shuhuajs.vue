<template>
<view>
<!--pages/shuhuajs/shuhuajs.wxml-->

<view class="shuhuajs">
  <view class="navtab">
    <view :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')" v-for="(item, id) in section" :key="id" @tap.stop="handleTap" :idAttr="item.typeId">{{item.name}}</view>
  </view>

  <view class="cont-item">
    <view class="search">
      <image class="searchicon" src="/static/img/shuhuajs/search.png"></image>
      <input class="searchinput" placeholder-class="place-hoder" placeholder="请输入搜索的作品" :value="keyword" @input="keywordFun"></input>
    </view>
     <!-- <view class='swiperlist'> -->
        <view class="swiperitem swiperitem_left" v-for="(item, index) in tabcontitem" :key="index" @tap="details" :data-wk_id="item.wk_id">
          <image class="swiperitemimg" :src="item.picture_arr[0]"></image>
          <view class="texts">
            <text class="workuserinfo">{{item.title}}</text>
          </view>
        </view>
    <!-- </view> -->
  </view>
</view>



<template is="toTop"></template>
</view>
</template>

<script>
// pages/shjs/shjs.js
const app = getApp().globalData;
// var util = require("../../utils/util.js");

export default {
  data() {
    return {
      page: 1,
      count: 1,
      pagesize: 10,
      section: [{
        name: '书画鉴赏',
        typeId: '1'
      }, {
        name: '学生作品展',
        typeId: '2'
      }],
      type: 1,
      workuserinfo: '王高升中国画',
      tabcontitem: [],
      currentId: 1,
      keyword: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {
      type: this.currentId
    };
    this.setData({
      type: this.type,
      tabcontitem: [],
      page: 1,
      count: 1
    });
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  onReachBottom() {
    this.getData();
  },

  methods: {
    //点击切换
    handleTap: function (e) {
      let id = e.currentTarget.id;

      if (id) {
        this.setData({
          type: id,
          page: 1,
          tabcontitem: [],
          currentId: id
        });
        this.getData();
      }
    },
    keywordFun: function (e) {
      var that = this;
      that.setData({
        type: that.type,
        page: 1,
        tabcontitem: [],
        keyword: e.detail.value
      });
      var timer = null;
      clearTimeout(timer);
      timer = setTimeout(function () {
        that.getData();
      }, 1000);
    },

    getData(e) {
      var that = this;
      var param = {
        type: that.type,
        keyword: that.keyword,
        page: that.page,
        page_size: that.page_size
      };

      if (that.count < that.page) {// wx.showToast({
        //   title: '暂无更多信息',
        //   icon:'none'
        // })
      } else {
        util.ajax('/api/works/worksList', param, res => {
          var tabcontitem = that.tabcontitem;
          that.setData({
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            tabcontitem: tabcontitem.concat(res.data.list)
          });
          wx.stopPullDownRefresh();
        });
      }
    },

    details: function (e) {
      let wk_id = e.currentTarget.dataset.wk_id;
      wx.navigateTo({
        url: '../shjsDetail/shjs_detail?id=' + wk_id
      });
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
@import "./shuhuajs.css";
</style>