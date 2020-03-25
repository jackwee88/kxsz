<template>
  <view>
    <!--pages/phblist/phblist.wxml-->

    <view class="phblist">
      <view class="navtab">
        <view
          :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')"
          v-for="(item, id) in section"
          :key="id"
          @tap.stop="handleTap(item.typeId)"
        >{{item.name}}</view>
      </view>

      <view v-if="currentId==1" class="cont-item paihangbpage">
        <view class="itemtop">
          <view class="dateblock">
            <text class="nowdate">{{nowdate}}</text>
          </view>
          <view class="headimg">
            <image class="headimg_img" :src="headImg" />
          </view>
        </view>

        <view class="itembottom">
          <view class="itembottom_top">
            <view class="title">积分排行榜</view>
            <view class="selectday">
              <view
                :class="'phb_day ' + (item.typeId == currentIds ? 'active':'')"
                v-for="(item, id) in sections"
                :key="id"
                :data-id="item.typeId"
                @tap="handleTaps(item.typeId)"
              >
                <text class="text">{{item.name}}</text>
              </view>
            </view>

            <!-- <view class='dataupdate'>
          数据更新
          <text class='date'>{{updatedate}}</text>
            </view>-->
          </view>
          <view class="itembottom_bottom">
            <view class="leaderboard">
              <view class="leaderboard_item" v-for="(item, index) in list" :key="index">
                <view class="icon-box">
                  <image class="icon icon1" src="/static/img/phblist/noOne.png" v-if="index==0" />
                  <image class="icon icon1" src="/static/img/phblist/noTwo.png" v-if="index==1" />
                  <image class="icon icon1" src="/static/img/phblist/noThree.png" v-if="index==2" />
                </view>
                <image class="headicon" :src="item.avatar" />
                <text class="username">{{item.name}}</text>
                <text class="grade">{{item.nums}}分</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view v-if="currentId==2" class="cont-item medal">
        <view class="medal_list" v-for="(item, index) in medal_list" :key="index">
          <image :src="item.img" class="medal_item" mode="scaleToFill" />
          <text class="title">{{item.title}}</text>
          <view class="day">
            <view>{{item.day}}</view>
            <view class="day-text">DAY</view>
          </view>
        </view>
      </view>

      <view v-if="currentId==3" class="cont-item signDay">
        <view class="signDaycont">
          <image :src="img" style="width:100%;height:100rpx;" />
        </view>
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
var util = require("../../../utils/util");

export default {
  data() {
    return {
      currentId: "1",
      section: [
        {
          name: "排行榜",
          typeId: "1"
        },
        {
          name: "勋章",
          typeId: "2"
        } // {
        //     name: '日签',
        //     typeId: '3'
        // }
      ],
      nowdate: "本周",
      articletitle: "梁雨琪参加一年级教学",
      addNum: "180",
      updatedate: "2019-05-12",
      username: "小包子",
      grade: "95",
      leaderboardNum: "4",
      medalNUm: "10",
      page: 1,
      page_size: 10,
      count: 1,
      list: [],
      headImg: "",
      sections: [
        {
          name: "昨天",
          typeId: "0"
        },
        {
          name: "本周",
          typeId: "1"
        },
        {
          name: "本月",
          typeId: "2"
        },
        {
          name: "上月",
          typeId: "3"
        }
      ],
      currentIds: "1",
      img: "",
      medal_list: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    //点击切换
    handleTap: function(id) {
      var that = this;
      this.setData({
        currentId: id
      });

      if (id == 1) {
      } else if (id == 2) {
        util.ajaxs("study/medal", {}, res => {
          wx.hideLoading();
          that.setData({
            medal_list: res.data.list
          });
        });
      }
    },
    //点击切换
    handleTaps: function(id) {
      console.log(id);
      let that = this;

      if (id) {
        that.setData({
          currentIds: id,
          page: 1,
          list: [],
          count: 1
        });
        that.getData();
      }
    },

    getSign() {},

    getData() {
      let that = this;
      const param = {
        page: that.page,
        page_size: that.page_size,
        type: ++that.currentIds
      };

      if (that.currentIds == 1) {
        that.setData({
          nowdate: "昨天"
        });
      } else if (that.currentIds == 2) {
        that.setData({
          nowdate: "本周"
        });
      } else if (that.currentIds == 3) {
        that.setData({
          nowdate: "本月"
        });
      } else if (that.currentIds == 4) {
        that.setData({
          nowdate: "上月"
        });
      }

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajaxs("integral/integral", param, res => {
          var tabcontitem = that.tabcontitem;
          that.setData({
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            list: res.data.list,
            headImg: res.data.list[0].avatar
          });
          wx.stopPullDownRefresh();
        });
      }
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
@import "./phblist.css";
</style>