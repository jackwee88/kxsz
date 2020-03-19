<template>
  <view>
    <!--pages/freeTeaching/freeTeaching.wxml-->

    <view class="freeTeaching">
      <view class="banner">
        <!-- <swiper class="swiper" indicator-dots="true"  interval="5000" duration="1000">
     <block wx:for="{{videolists}}" wx:for-index="index" wx:key="key">
        <swiper-item>-->

        <video class="video" :src="videolists[0].video_url" autoplay></video>
        <!-- <video class='video' src='{{item.video_url}}'  wx:if="index>0"></video> -->
        <!-- </swiper-item>
         </block>
        </swiper>-->
      </view>
      <view class="module">
        <view class="module_item" v-for="(item, index) in datalist" :key="index">
          <!-- <navigator url='{{item.to_url}}?type={{item.type}}'> -->
          <view
            class="itemcont"
            @tap="bindViewTab"
            :data-md_id="item.md_id"
            :data-content="item.content"
            :data-type="item.type"
            :data-to_url="item.to_url"
          >
            <image class="icon" :src="item.pic_url" style="width:100%;height:100%" />
          </view>
          <text style="width:60%">{{item.content}}</text>
        </view>
      </view>

      <view class="rightfiex">
        <!-- <button class='rightfiex_cont rightfiex_first' open-type="contact">
      <image class='icon kefu' src='/img/freeTeaching/kefu.png'>
        </button>-->
        <!-- <view class='rightfiex_cont'>
      <image class='icon zhiding' src='/img/freeTeaching/zhiding.png'>
        </view>-->
        <!-- <button class="rightfiex_cont rightfiex_first" open-type="share">
          <image class="icon addhao kefu" src="/static/img/freeTeaching/addhao.png" />
        </button>-->
      </view>

      <view class="dakaciclecont" v-if="is_share==1">
        <view class="dakatext" @tap="goindex">首页</view>
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      datalist: [],
      videolists: [
        {
          video_url:
            "https://video.kaifadanao.cn/20200213/b723f15bf8f6884a24647f76cc3244ea.mp4"
        }
      ],
      is_share: "",
      is_wait: "",
      wait: "",
      daka: "",
      page: "",
      count: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    if (prevPage) {
      prevPage.is_wait = "";
      prevPage.wait = "";
    }

    that.videoList();

    if (options.is_share) {
      this.setData({
        is_share: 1
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var mydata = {
      type: 2
    };
    util.ajaxs("cate/smodelList", mydata, res => {
      let mydata = res.data.list;
      that.setData({
        datalist: mydata
      });
    });
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    getuserdata: function() {
      var that = this;

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajaxs("index/myDaily", "", res => {
          let list = res.data.list;

          for (var i = 0; i < list.length; i++) {
            list[i].if_input = false;
            list[i].poster = list[i].picture_idss[0];
            list[i].name = list[i].nickname + "的音频";
          }

          that.setData({
            daka: that.daka.concat(list),
            page: that.page + 1,
            count: res.data.count
          });
          wx.stopPullDownRefresh();
        });
      }

      util.ajaxs("index/myDaily", "", res => {
        let list = res.data.list;
        var action = {
          method: "pause"
        };

        for (var i = 0; i < list.length; i++) {
          list[i].if_input = false;
          list[i].fullScreen = false;
          list[i].action = action;
          list[i].poster = list[i].picture_idss[0];
          list[i].name = list[i].nickname + "的音频";
        }

        that.setData({
          daka: list
        });
      });
    },
    bindViewTab: function(e) {
      util.ajaxs("index/getProfile", "", res => {
        const content = e.currentTarget.dataset.content;
        const to_url = e.currentTarget.dataset.to_url;
        const type = e.currentTarget.dataset.type;

        if (e.currentTarget.dataset.md_id == 10) {
          getApp().globalData.shopModel();
        } else {
          if (e.currentTarget.dataset.md_id == 7) {
            if (to_url == "/pages/reg/reg") {
              wx.redirectTo({
                url: to_url
              });
            } else {
              wx.switchTab({
                url:
                  to_url +
                  "?type=" +
                  type +
                  "&title=" +
                  content +
                  "&md_id=" +
                  e.currentTarget.dataset.md_id
              });
            }
          } else {
            wx.navigateTo({
              url:
                to_url +
                "?type=" +
                type +
                "&title=" +
                content +
                "&md_id=" +
                e.currentTarget.dataset.md_id
            });
          }
        }
      });
    },
    videoList: function() {
      let that = this;
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      util.ajaxs("works/VideoBanner", {}, () => {
        this.setData({
          videolists: res.data.list
        });
      });
    },
    goindex: function() {
      var that = this;
      getApp().globalData.infoModel();
      that.onShow();
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
@import "./freeTeaching.css";
</style>