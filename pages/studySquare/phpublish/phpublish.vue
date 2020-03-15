<template>
<view>
<!--pages/phblist/phblist.wxml-->

<view class="phblist">

  <view class="navtab">
    <view :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')" v-for="(item, id) in section" :key="id" @tap.stop="handleTap" :idAttr="item.typeId">{{item.name}}</view>
  </view>

  <view v-if="currentId==1" class="cont-item paihangbpage">
    <view class="itemtop">
      <view class="dateblock">
        <text class="nowdate">{{nowdate}}</text>
      </view>
      <view class="headimg">
        <image class="headimg_img" :src="headImg"></image>
      </view>
      <!-- <view class='article'>
        <view class='article_flex'>
          <image class='lefttouxiang' src='/img/phblist/ftouxiang.png'></image>
        </view>
        <view class='article_flex'>
          <view class='articletitle'>{{articletitle}}</view>
          <view class='articleaddNum'>
            <image class='addicon' src='/img/phblist/myicon.png'></image>
            <text>{{addNum}}人加入</text>
          </view>
        </view>
      </view> -->
    </view>

    <view class="itembottom">
      <view class="itembottom_top">
        <view class="title">积分排行榜</view>
        <view class="selectday">
         
             <view :class="'phb_day ' + (item.typeId == currentIds ? 'active':'')" v-for="(item, id) in sections" :key="id" :data-id="item.typeId" @tap="handleTaps">
      <text class="text">{{item.name}}</text>
    </view>
        </view>
        
        <!-- <view class='dataupdate'>
          数据更新
          <text class='date'>{{updatedate}}</text>
        </view> -->
      </view>
      <view class="itembottom_bottom">
        <view class="leaderboard">
          <view class="leaderboard_item" v-for="(item, index) in list" :key="index">
            <view class="icon-box">
              <image class="icon icon1" src="/static/img/phblist/noOne.png" v-if="index==0"></image>
              <image class="icon icon1" src="/static/img/phblist/noTwo.png" v-if="index==1"></image>
              <image class="icon icon1" src="/static/img/phblist/noThree.png" v-if="index==2"></image>
            </view>
            <image class="headicon" :src="item.avatar"></image>
            <text class="username">{{item.name}}</text>
            <text class="grade">{{item.nums}}分</text>
          </view>
        
        </view>
      </view>
    </view>
  </view>

  <view v-if="currentId==2" class="cont-item medal">
    <view class="medal_list" v-for="(item, index) in medal_list" :key="index">
      <image :src="item.img" class="medal_item" mode="scaleToFill"></image>
      <text class="title">{{item.title}}</text>
      <view class="day"><view>{{item.day}}</view><view class="day-text">DAY</view></view>
    </view>
  </view>

  <view v-if="currentId==3" class="cont-item signDay">
    <view class="signDaycont">
      <image :src="img" style="width:100%;height:100rpx;"></image>
    </view>
  
  
  </view>



</view>




<template is="toTop"></template>
</view>
</template>

<script>


export default {
  data() {
    return {
      currentId: '1',
      section: [{
        name: '排行榜',
        typeId: '1'
      }, {
        name: '勋章',
        typeId: '2'
      } // {
      //     name: '日签',
      //     typeId: '3'
      // }
      ],
      nowdate: '本周',
      articletitle: '梁雨琪参加一年级教学',
      addNum: '180',
      updatedate: '2019-05-12',
      username: '小包子',
      grade: '95',
      leaderboardNum: '4',
      medalNUm: '10',
      page: 1,
      page_size: 10,
      count: 1,
      list: [],
      headImg: '',
      sections: [{
        name: '昨天',
        typeId: '0'
      }, {
        name: '本周',
        typeId: '1'
      }, {
        name: '本月',
        typeId: '2'
      }, {
        name: '上月',
        typeId: '3'
      }],
      currentIds: '1',
      img: '',
      medal_list: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    //点击切换
    handleTap: function (e) {
      let id = e.currentTarget.id;
      var that = this;
      this.setData({
        currentId: id
      });

      if (id == 1) {} else if (id == 2) {
        wx.request({
          url: getApp().globalData.requestUrl + '/api/study/medal',
          method: 'post',
          data: '',
          header: {
            'content-type': 'application/json',
            'token': wx.getStorageSync("token")
          },
          success: function (res) {
            wx.hideLoading();
            that.setData({
              medal_list: res.data.data.list
            });
          },
          fail: function () {
            wx.hideLoading();
            wx.showModal({
              title: '网络错误',
              content: '网络出错，请刷新重试',
              showCancel: false
            });
          }
        });
      } //  else if (id == 3) {
      //   wx.request({
      //     url: getApp().globalData.requestUrl + '/api/study/getDiaryImg',
      //     method: 'post',
      //     data: '',
      //     header: {
      //       'content-type': 'application/json',
      //       'token': wx.getStorageSync("token")
      //     },
      //     success: function (res) {
      //       wx.hideLoading();
      //       if (res.data.data) {
      //         that.setData({
      //           img: res.data.data
      //         })
      //       } else {
      //         wx.showToast({
      //           title: '您还未签到,快去签到吧',
      //           icon: 'none'
      //         })
      //       }
      //     },
      //     fail: function () {
      //       wx.hideLoading();
      //       wx.showModal({
      //         title: '网络错误',
      //         content: '网络出错，请刷新重试',
      //         showCancel: false
      //       })
      //       return typeof cb == "function" && cb(false)
      //     }
      //   })
      // }

    },
    //点击切换
    handleTaps: function (e) {
      let id = e.currentTarget.dataset.id;
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
          nowdate: '昨天'
        });
      } else if (that.currentIds == 2) {
        that.setData({
          nowdate: '本周'
        });
      } else if (that.currentIds == 3) {
        that.setData({
          nowdate: '本月'
        });
      } else if (that.currentIds == 4) {
        that.setData({
          nowdate: '上月'
        });
      }

      if (that.count < that.page) {
        wx.showToast({
          title: '暂无更多信息'
        });
      } else {
        util.ajax('/api/integral/integral', param, res => {
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
