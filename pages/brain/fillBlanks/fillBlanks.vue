<template>
<view>
<view class="page" :style="'background-image: url(' + backgroundImg + ')'">
  <image src="/static/index/backs1.png" style="width:84rpx;height:84rpx;position:fixed;top:64rpx;left:0rpx;" @tap.stop="goBack"></image>
  <view class="aud" @tap.stop="playorpause" v-if="is_p==false"></view>
  <view class="audio" @tap.stop="playorpause" v-if="is_p==true"></view>
  <audio controls loop :src="audio" id="audioID" :action="action"></audio>
  <text v-if="id" class="where">第{{ids}}关</text>
  <text v-else class="where">第1关</text>
  <view class="topic">
    <image src="/../kxsx_xcx/pages/brain/fillBlanks/https:/kxsx.kaifadanao.cn/assets/img/pig.png" class="pig"></image>
    <!-- <text style="position:absolute;top:-140rpx;right:46rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:if="{{id}}">{{id}}</text>
  <text style="position:absolute;top:-120rpx;right:64rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:else>1</text> -->
    <view class="topic-box">
      <view v-for="(item, index) in topic" :key="index">
        <view class="item item-has" v-if="item != ' '">{{item}}</view>
        <input class="item item-none" v-if="item == ' '" type="text" maxlength="1" @input="answerFun" :value="answer"></input>
      </view>

    </view>
 <view class="ans-box">
      <view class="answer">
        <!-- <view class="grid"> -->
        <view v-for="(items, index) in answerList" :key="index" :data-index="index" @tap.stop="selected" :data-answer="items" :class="index == currentId ? 'red':''">{{items}}</view>

        <!-- </view> -->

      </view>
    </view>
  </view>
  <image src="/static/img/index/ts.png" style="width:153px;height:65px;position:absolute;top:25%;left:5%;" v-if="sequence"></image>
  <view class="btn-boxs">
    <button class="btn share" open-type="share" id="share" style="background-color:transparent;border:none;"></button>
    <view class="btn level" @tap.stop="showLevel"></view>
    <view class="btn next nexts" @tap="next" v-if="next_id!=0"></view>
  </view>

</view>
<block data-type="template" data-is="failItem" data-attr="id:id,failImg:failImg" v-if="is_wrong">
  <view class="popup">
    <view class="popupcont"></view>
    <view class="bg-img bg-fail" :style="'background-image: url(' + failImg + ')'">


      <view class="btn-box1 clear">
        <!-- <view class="exit reset-fail" data-id="{{id}}" bindtap=''></view> -->
        <button class="exit reset-fail" open-type="share" id="share"></button>
        <view class="exit reset" :data-id="id" @tap="reset"></view>
      </view>
    </view>
  </view>

</block>
<block data-type="template" data-is="succItem" data-attr="id:id,succImg:succImg" v-if="is_succ">
  <view class="popup">
    <view class="popupcont"></view>
    <view class="bg-img bg-succ" :style="'background-image: url(' + succImg + ')'">


      <view class="btn-box1 clear" style="justify-content:space-around;">
        <view class="exit reset" :data-id="id" @tap="reset"></view>
        <view class="exit next" :data-id="id" @tap="next"></view>
      </view>
    </view>
  </view>

</block>
<block data-type="template" data-is="levelItem" data-attr="levelList:levelList,counts:counts,pageId:pageId" v-if="isLevel">
  <view class="popup">
    <view class="popupcont"></view>
    <view>
      <image class="prevPage" @tap.stop="prevPage" src="/static/img/index/Arrow_inactive.png" v-if="pageId==0"></image>
      <image class="prevPage" @tap.stop="prevPage" src="/static/img/index/Arrowicon2.png" v-if="pageId!=0"></image>
      <image class="nextPage" @tap.stop="nextPage" src="/static/img/index/Arrow_inactives.png" v-if="pageId==counts.length-1"></image>
      <image class="nextPage" @tap.stop="nextPage" src="/static/img/index/Arrowicon.png" v-if="pageId!=counts.length-1"></image>
      <view class="bg-img bg-level" @touchstart="touchstart" @touchend="touchend">
        <!-- <view class="level-item {{item.pass==false?'level-false':''}}" wx:for="{{levelList}}" bindtap='{{item.pass==true&&"toDetail"}}' data-id="{{item.id}}">{{item.id}}</view> -->
        <view :class="'level-item ' + (item.pass==false?'level-false':'')" v-for="(item, index) in levelList" :key="index" @tap="toDetail" :data-id="item.id">{{item.id}}</view>
        <view class="cancle" @tap="closeLevel"></view>
      </view>
      <view style="position:absolute;bottom:25%;position:absolute;bottom:24%;left:0;right:0;display:flex;justify-content:center;">
        <view :class="'yuan ' + (pageId==index?'yuan_':'')" v-for="(item, index) in counts" :key="index" @tap="toGetLevel" :data-page="item" :data-index="index"></view>

      </view>
    </view>
  </view>

</block>
<block data-type="template" data-is="limitItem" data-attr="limitImg:limitImg" v-if="is_limit">
  <view class="popup">
    <view class="popupcont"></view>
    <view class="bg-img bg-limit" :style="'background-image: url(' + limitImg + ')'">


      <view class="btn-box1 clear">

        <view class="exit sure" :data-id="id" @tap="exit"></view>
      </view>
    </view>
  </view>

</block>
<block data-type="template" data-is="lastItem" data-attr="lastImg:lastImg" v-if="is_last">
  <view class="popup">
    <view class="popupcont"></view>
    <view class="bg-img last-limit" :style="'background-image: url(' + lastImg + ')'">


      <view class="btn-box1 clear">

        <view class="exit last" :data-id="id" @tap="goBack"></view>
      </view>
    </view>
  </view>

</block>
</view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      is_last: false,
      lastImg: '',
      sequence: false,
      succImg: '',
      failImg: '',
      limitImg: '',
      backGroundImg: '',
      toIndex: "",
      c: '',
      levelList: [],
      counts: 0,
      next_id: 0,
      topic: '',
      answer: '',
      id: '',
      ids: "",
      is_wrong: false,
      is_succ: false,
      is_limit: false,
      levelList: [],
      counts: 0,
      action: {
        method: 'pause'
      },
      audio: '',
      is_p: false,
      page: 1,
      pagesize: 12,
      pageId: 0,
      startX: 0,
      slider: false,
      animationData: {},
      cardInfoList: [{
        name: 1
      }, {
        name: 2
      }, {
        name: 3
      }, {
        name: 4
      }],
      answerList: [],
      backgroundImg: "",
      isLevel: false,
      ans: "",
      currentId: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAudio();
    this.playorpause();
    this.backGroundImgFun();
    this.succImgFun();
    this.failImgFun();
    this.limitImgFun();
    this.lastImgFun();

    if (options.is_share) {
      this.setData({
        toIndex: 1
      });
    }

    var _this = this;

    wx.getSystemInfo({
      success: function (res) {
        let nav_top = res.statusBarHeight;

        if (res.platform.toLowerCase() == 'android') {
          nav_top += 4;
        }
      }
    });
    this.topicList();
    this.getLevel();
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
      title: '发现一个很好玩的文字游戏，快来跟我一起玩吧！',
      path: '/pages/brain/fillBlanks/fillBlanks?is_share=1',
      success: function (res) {}
    };
  },
  methods: {
    backGroundImgFun: function () {
      var that = this;
      util.ajaxs('index/getSystem', {
        type: 9
      }, res => {
        that.setData({
          backgroundImg: res.data
        });
      });
    },
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element
      }
    },
    toGetLevel(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        page: e.currentTarget.dataset.page,
        pageId: index
      });
      this.getLevel();
    },

    getDataBindTap: function (e) {
      var result = e.detail.value;
    },
    topicList: function () {
      let that = this;

      if (wx.getStorageSync('game-fid')) {
        this.setData({
          id: wx.getStorageSync('game-fid')
        });
      }

      var param = {
        type: 2,
        id: that.id
      };
      util.ajaxs('game/choiceList', param, res => {
        console.log(res);

        if (res.status == 2) {
          if (res.msg == '今日答题数量已达上限') {
            setTimeout(function () {
              that.setData({
                is_limit: true
              });
            }, 500);
            return;
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              mask: true
            });
            let pages = getCurrentPages();
            let prevPage = pages[pages.length - 2];
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
            return;
          }
        } else if (res.status == 3) {
          that.setData({
            sequence: true,
            id: that.ids
          });
          wx.setStorageSync('game-fid', that.id);
          setTimeout(function () {
            that.setData({
              sequence: false
            });
          }, 2000);
          return;
        } else if (res.status == 1) {
          that.setData({
            topic: res.data.title,
            id: res.data.id,
            ids: res.data.id,
            next_id: res.data.next_id,
            answerList: res.data.array
          });
          wx.setStorageSync('game-fid', res.data.id);
        }
      });
    },
    answerFun: function (e) {
      let val = e.detail.value;
      console.log(val);
      this.setData({
        answer: val
      });
      let that = this;

      if (val.length <= 0) {
        return;
      }

      var param = {
        type: 2,
        id: that.id,
        answer: that.answer
      };
      setTimeout(function () {
        util.ajaxs('game/answer', param, res => {
          if (res.status == 1) {
            that.setData({
              // id: res.data.id,
              // ids: res.data.id,
              is_succ: true,
              answer: '',
              is_wrong: false
            }); // that.topicList()
          } else {
            if (res.msg == '今日答题数量已达上限') {
              setTimeout(function () {
                that.setData({
                  is_limit: true,
                  answer: ''
                });
              }, 500);
            } else if (res.msg == '回答错误') {
              setTimeout(function () {
                that.setData({
                  is_wrong: true,
                  answer: ''
                });
              }, 500);
            }
          }
        });
      }, 1000);
    },
    ansFun: function (e) {
      this.setData({
        answer: e.detail.value
      });
    },
    reset: function (e) {
      let id = e.currentTarget.dataset.id;
      this.topicList();
      this.setData({
        is_wrong: false,
        is_succ: false,
        answer: ''
      });
    },
    exit: function () {
      // wx.navigateTo({
      //   url: '/pages/brain/brain',
      // })
      wx.navigateBack({
        delta: 1
      });
    },
    click: function (e) {},

    getLevel() {
      var that = this;
      let param = {
        type: 2,
        page: this.page,
        page_size: this.pagesize
      };
      util.ajaxs('game/guanqia', param, res => {
        var counts = [];

        if (res.status == 1) {
          that.setData({
            levelList: res.data.list
          });

          for (var i = 0; i < res.data.count; i++) {
            counts.push(i + 1);
          }

          that.setData({
            counts: counts,
            c: res.data.count
          });
        }
      });
    },

    closeLevel() {
      this.setData({
        isLevel: false
      });
    },

    showLevel() {
      this.setData({
        isLevel: true
      });
      this.getLevel();
    },
    selected() {

    },

    toDetail(e) {
      this.setData({
        id: e.currentTarget.dataset.id,
        isLevel: false,
        ans: '',
        currentId: '-1'
      });
      wx.setStorageSync('game-fid', e.currentTarget.dataset.id);
      this.topicList();
    },

    next() {
      if (this.next_id == 0) {
        this.setData({
          is_succ: false,
          is_last: true
        }); // wx.navigateTo({
        //   url: '/pages/brain/brain',
        // })
        //  wx.navigateBack({
        //    delta: 1
        //  })

        return false;
      }

      this.setData({
        id: this.next_id
      });
      wx.setStorageSync('game-fid', this.next_id);
      this.topicList();
      this.setData({
        is_succ: false,
        ans: '',
        answer: '',
        currentId: '-1'
      });
    },

    getAudio() {
      let that = this;
      wx.request({
        url: getApp().globalData.requestUrl + 'index/getSystem',
        method: 'post',
        data: {
          type: 8
        },
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync("token")
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            audio: res.data.data
          });
        },
        fail: function () {
          wx.hideLoading();
          wx.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false,
            mask: true
          });
        }
      });
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
        that.setData({
          action: actionPlay,
          is_p: true
        });
      } else {
        //若当前是播放，则点击后暂停
        that.setData({
          action: actionPause,
          is_p: false
        });
      }
    },

    goBack() {
      var that = this;
      var actionPause = {
        method: "pause"
      }; //定义暂停

      that.setData({
        action: actionPause,
        is_p: false
      });

      if (this.toIndex == 1) {
        wx.switchTab({
          url: '/pages/index/index'
        });
      } else {
        wx.navigateBack({
          delta: 1
        });
      } // wx.navigateTo({
      //   url: '/pages/brain/brain',
      // })

    },

    touchstart(e) {
      this.setData({
        startX: e.changedTouches[0].clientX
      });
    },

    touchend(e) {
      let that = this;
      let startX = this.startX;
      let endX = e.changedTouches[0].clientX; // if (this.data.slider) return;
      // 下一页(左滑距离大于30)

      if (startX - endX > 30) {
        this.setData({
          slider: true
        }); //尾页(当前页 等于 总页数)

        if (this.page == this.c) {
          this.setData({
            slider: false
          }); // wx.showToast({ title: '已经是最后一张了', icon: 'none' });

          return;
        }

        ;
        this.setData({
          page: this.page + 1,
          pageId: this.pageId + 1
        });
        this.getLevel();
      } // 上一页


      if (endX - startX > 30) {
        this.setData({
          slider: true
        }); //首页

        if (this.page == 1) {
          this.setData({
            slider: false
          }); // wx.showToast({ title: '已经到第一张了', icon: 'none' })

          return;
        }

        ;
        this.setData({
          page: this.page - 1,
          pageId: this.pageId - 1
        });
        this.getLevel();
      }
    },

    nextPage() {
      //尾页(当前页 等于 总页数)
      if (this.page == this.c) {
        return;
      }

      ;
      this.setData({
        page: this.page + 1,
        pageId: this.pageId + 1
      });
      this.getLevel();
    },

    prevPage() {
      //首页
      if (this.page == 1) {
        return;
      }

      ;
      this.setData({
        page: this.page - 1,
        pageId: this.pageId - 1
      });
      this.getLevel();
    },

    failImgFun() {
      var that = this;
      util.ajaxs('index/getSystem', {
        type: 11
      }, res => {
        that.setData({
          failImg: res.data
        });
      });
    },

    succImgFun() {
      var that = this;
      util.ajaxs('index/getSystem', {
        type: 10
      }, res => {
        that.setData({
          succImg: res.data
        });
      });
    },

    limitImgFun() {
      var that = this;
      util.ajaxs('index/getSystem', {
        type: 12
      }, res => {
        that.setData({
          limitImg: res.data
        });
      });
    },

    lastImgFun() {
      var that = this;
      util.ajaxs('index/getSystem', {
        type: 13
      }, res => {
        that.setData({
          lastImg: res.data
        });
      });
    }

  }
};
</script>
<style>
@import "./fillBlanks.css";
</style>