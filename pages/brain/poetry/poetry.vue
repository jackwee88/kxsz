<template>
<view>
<view class="page" :style="'background-image: url(' + backgroundImg + ')'">
  <image src="/static/img/index/backs1.png" style="width:84rpx;height:84rpx;position:fixed;top:64rpx;left:6rpx;" @tap.stop="goBack"></image>
  <view class="aud" @tap.stop="playorpause" v-if="is_p==false"></view>
  <view class="audio" @tap.stop="playorpause" v-if="is_p==true"></view>
  <audio controls loop :src="audio" id="audioID" :action="action"></audio>
  <text v-if="ids" class="where">第{{ids}}关</text>
  <text v-else class="where">第1关</text>
  <view class="topic">
    <image src="https://kxsx.kaifadanao.cn/assets/img/pig.png" class="pig"></image>
    <!-- <text style="position:absolute;top:-140rpx;right:46rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:if="{{id}}">{{id}}</text> -->
    <!-- <text style="position:absolute;top:-120rpx;right:64rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:else>1</text> -->
    <view class="topic-box" style="float:left;width:17%">
      <view v-for="(item, index) in topicLeft" :key="index">
        <view class="item item-has" v-if="item.select == true" :data-select="item.select" @touchstart="clickLeft" :data-k="item.key" :data-index="index" :data-name="item.key">{{item.name}}</view>
        <view class="item item-none" v-if="item.select == false" @touchstart="clickLeft" :data-k="item.key" :data-index="index" :data-select="item.select" :data-name="item.key">{{item.name}}</view>
      </view>

    </view>
    <canvas style="height:100%;width:64%;background-color:transparent;z-index:1;float:left;" canvas-id="customCanvas" :class="is_canvas?'':'can'"></canvas>
    <view class="topic-box" style="float:left;width:17%">
      <view v-for="(item, index) in topicRight" :key="index">
        <view class="item item-has" v-if="item.select == true" @touchstart="clickRight" :data-index="index" :data-k="item.key" :data-select="item.select" :data-name="item.key">{{item.name}}</view>
        <view class="item item-none" v-if="item.select == false" @touchstart="clickRight" :data-k="item.key" :data-index="index" :data-select="item.select" :data-name="item.key">{{item.name}}</view>
      </view>
    </view>

  </view>
<image src="/static/img/index/ts.png" style="width:153px;height:65px;position:absolute;top:25%;left:5%;" v-if="sequence"></image>
  <view class="btn-boxs">
    <button class="btn share" open-type="share" id="share" style="background-color:transparent;border:none;"></button>
    <view class="btn level" @tap.stop="showLevel"></view>
    <view class="btn next" @tap="next" v-if="next_id!=0"></view>
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
function unique(arr) {
  if (!Array.isArray(arr)) {
    return;
  }

  return [...new Set(arr)];
}

export default {
  data() {
    return {
      lastImg: '',
      is_last: false,
      sequence: false,
      succImg: '',
      failImg: '',
      limitImg: '',
      backGroundImg: '',
      c: '',
      pageId: 0,
      levelList: [],
      counts: 0,
      is_succ: false,
      is_limit: false,
      l: '',
      r: '',
      ansList: [],
      id: '',
      next_id: '',
      curTarL: '',
      curTarR: '',
      list: '',
      objs: {},
      ctx: '',
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
      topicLeft: [],
      topicRight: [],
      audio: '',
      action: {
        method: 'pause'
      },
      is_p: false,
      canvasWidth: '',
      canvasHeight: '',
      pagesize: 12,
      page: 1,
      is_canvas: true,
      ids: '',
      nowPgae: 1,
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
      toIndex: '',
      select: false,
      backgroundImg: "",
      is_wrong: false,
      currentId: "",
      isLevel: false,
      ans: ""
    };
  },

  components: {},
  props: {},
  onShow: function () {
    var ctx = wx.createCanvasContext('customCanvas');
    this.setData({
      ctx: ctx
    });
  },

  onLoad(options) {
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

    var myCanvasWidth = '';
    var myCanvasHeight = '';
    wx.getSystemInfo({
      success: function (res) {
        myCanvasWidth = res.windowWidth - 56;
        myCanvasHeight = res.windowHeight - 200;
      }
    });
    this.setData({
      canvasWidth: myCanvasWidth,
      canvasHeight: myCanvasHeight
    });
    this.setData({
      l: '',
      r: '',
      ansList: [],
      curTarL: '',
      curTarR: '',
      list: '',
      objs: {},
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    });
    this.topicList();
    this.getLevel();
  },

  onShareAppMessage: function () {
    return {
      title: '发现一个很好玩的文字游戏，快来跟我一起玩吧！',
      path: '/pages/brain/poetry/poetry?is_share=1',
      success: function (res) {}
    };
  },
  methods: {
    //   //绑定出没开始事件，记录起点
    //  canvasBindStart:function(e){
    //   var that = this;
    //   that.setData({
    //     startX:e.touches[0].x,
    //     startY:e.touches[0].y
    //   });
    // },
    beginCanvas: function () {
      var that = this;

      if (this.ansList.length > 4) {
        return false;
      }

      this.ctx.beginPath();
      this.list.forEach(function (item, index) {
        that.ctx.moveTo(item.beginX, item.beginY);
        that.ctx.lineTo(item.endX, item.endY);
      });
      this.ctx.strokeStyle = "#F9D322";
      this.ctx.stroke();
      this.ctx.draw();

      if (this.ansList.length == 4) {
        this.answer();
      }
    },

    // canvasBindMove:function(e){
    //   var that = this;
    //   that.setData({
    //     endX:e.touches[0].x,//重点touches后边一定要加索引[0],不然读取不到坐标
    //     endY:e.touches[0].y,//重点touches后边一定要加索引[0],不然读取不到坐标
    //   });
    //   console.log(e.touches[0].x);//重点touches后边一定要加索引[0],不然读取不到坐标
    //   //记录上下文
    //   var context = wx.createContext();
    //   //设置线条粗细
    //   context.setLineWidth(4);
    //   //设置直线的起点
    //   context.lineTo(that.data.startX, that.data.startY)
    //   //设置直线的终点
    //   context.lineTo(that.data.endX, that.data.endY)
    //   //设置描边，记住画直线一定要设置描边，否则没有图像
    //   context.stroke()
    //    wx.drawCanvas({
    //     canvasId: 1,
    //     actions: context.getActions()
    //   });
    // },
    clickLeft(e) {
      let that = this;
      this.setData({
        beginX: 0,
        beginY: e.currentTarget.offsetTop,
        l: e.currentTarget.dataset.name
      });
      let index = e.currentTarget.dataset.index;
      let select = e.currentTarget.dataset.select;
      const topicLeft = that.topicLeft;
      let ansLis = this.ansList;

      if (ansLis.length == 0) {
        topicLeft.forEach(function (item, index) {
          item.select = false;
        });
        that.setData({
          topicLeft: topicLeft
        });
      }

      if (select == false) {
        ansLis.forEach(function (k, i) {
          if (k[0] != e.currentTarget.dataset.k) {
            let selectLis = that.topicLeft;
            selectLis.forEach(function (key, item) {
              if (k[0] != key.key) {
                key.select = false;
              }
            });
            that.setData({
              topicLeft: selectLis
            });
          }
        });

        if (this.curTarL == e.currentTarget.dataset.k) {
          const select = 'topicLeft[' + index + '].select';
          that.setData({
            [select]: true
          });
        } else {
          const select = 'topicLeft[' + index + '].select';
          that.setData({
            [select]: !topicLeft[index].select
          });
        }
      } else {
        var flag = false;
        ansLis.forEach(function (k, i) {
          if (k[0] == e.currentTarget.dataset.k) {
            flag = true;
          }
        });

        if (flag == false) {
          const select = 'topicLeft[' + index + '].select';
          that.setData({
            [select]: !topicLeft[index].select
          });
        } else {
          const select = 'topicLeft[' + index + '].select';
          that.setData({
            [select]: true
          });
          return;
        }
      }

      if (this.curTarR === e.currentTarget.dataset.k) {
        let list = [];
        list.push({
          beginX: this.beginX,
          beginY: this.beginY,
          endX: this.endX,
          endY: this.endY
        });
        let ans = e.currentTarget.dataset.k + '' + this.r;
        var ansList = [];
        ansList.push(ans);
        this.setData({
          list: list.concat(this.list),
          ansList: ansList.concat(this.ansList)
        });
        ansList = unique(this.ansList);
        this.setData({
          ansList: ansList
        });
        this.beginCanvas();
      }

      this.setData({
        curTarL: e.currentTarget.dataset.k
      });
    },

    clickRight(e) {
      let that = this;
      let index = e.currentTarget.dataset.index;
      let select = e.currentTarget.dataset.select;
      const topicRight = that.topicRight;
      let ansLis = this.ansList;

      if (ansLis.length == 0) {
        topicRight.forEach(function (item, index) {
          item.select = false;
        });
        that.setData({
          topicRight: topicRight
        });
      }

      if (select == false) {
        // ansLis.forEach(function (k, i) {
        //   if (k[0] != e.currentTarget.dataset.k) {
        //     const select = 'topicRight[' + index + '].select'
        //     that.setData({
        //       [select]: false,
        //     })
        //   }
        // })
        ansLis.forEach(function (k, i) {
          if (k[0] != e.currentTarget.dataset.k) {
            let selectLis = that.topicRight;
            selectLis.forEach(function (key, item) {
              if (k[0] != key.key) {
                key.select = false;
              }
            });
            that.setData({
              topicRight: selectLis
            });
          }
        });

        if (this.curTarL == e.currentTarget.dataset.k) {
          const select = 'topicRight[' + index + '].select';
          that.setData({
            [select]: true
          });
        } else {
          const select = 'topicRight[' + index + '].select';
          that.setData({
            [select]: !topicRight[index].select
          });
        }
      } else {
        var flag = false;
        ansLis.forEach(function (k, i) {
          if (k[0] == e.currentTarget.dataset.k) {
            flag = true;
          }
        });

        if (flag == false) {
          const select = 'topicRight[' + index + '].select';
          that.setData({
            [select]: !topicRight[index].select
          });
        } else {
          const select = 'topicRight[' + index + '].select';
          that.setData({
            [select]: true
          });
          return;
        }
      }

      this.setData({
        endX: e.currentTarget.offsetLeft - 70,
        endY: e.currentTarget.offsetTop,
        r: e.currentTarget.dataset.name
      });

      if (this.curTarL === e.currentTarget.dataset.k) {
        let list = [];
        list.push({
          beginX: this.beginX,
          beginY: this.beginY,
          endX: this.endX,
          endY: this.endY
        });
        let ans = this.l + '' + e.currentTarget.dataset.k;
        var ansList = [];
        ansList.push(ans);
        this.setData({
          list: list.concat(this.list),
          ansList: ansList.concat(this.ansList)
        });
        ansList = unique(this.ansList);
        this.setData({
          ansList: ansList
        });
        this.beginCanvas();
      }

      this.setData({
        curTarR: e.currentTarget.dataset.k
      });
    },

    backGroundImgFun: function () {
      var that = this;
      util.ajax('/api/index/getSystem', {
        type: 9
      }, res => {
        that.setData({
          backgroundImg: res.data
        });
      });
    },
    reset: function (e) {
      let id = e.currentTarget.dataset.id;
      this.topicList();
      this.setData({
        is_wrong: false,
        currentId: '-1',
        is_succ: false
      });
      this.ctx.draw();
    },
    exit: function () {
      // wx.navigateTo({
      //   url: '/pages/brain/brain',
      // })
      wx.navigateBack({
        delta: 1
      });
    },
    topicList: function () {
      let that = this;

      if (wx.getStorageSync('game-pid')) {
        this.setData({
          id: wx.getStorageSync('game-pid')
        });
      }

      var param = {
        id: that.id
      };
      util.ajax('/api/game/ligature', param, res => {
        if (res.status == 2) {
          if (res.msg == '今日答题数量已达上限') {
            that.setData({
              is_limit: true
            });
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
          setTimeout(function () {
            that.setData({
              sequence: false
            });
          }, 2000);
          wx.setStorageSync('game-pid', that.id);
          return;
        }

        if (res.status == 1) {
          that.setData({
            topicLeft: res.data.arr1,
            next_id: res.data.next_id,
            topicRight: res.data.arr2,
            id: res.data.id,
            ids: res.data.id
          });
          wx.setStorageSync('game-pid', res.data.id);
        }
      });
    },
    answer: function () {
      let that = this;
      var param = {
        is_canvas: false,
        id: this.id,
        answer: that.ansList
      };
      util.ajax('/api/game/ligatureAnswer', param, res => {
        if (res.status == 1) {
          that.setData({
            is_succ: true
          }); // that.topicList()

          that.setData({
            l: '',
            r: '',
            ansList: [],
            curTarL: '',
            curTarR: '',
            list: '',
            objs: {},
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
          });
          this.ctx.draw();
        } else {
          that.setData({
            is_wrong: true,
            l: '',
            r: '',
            ansList: [],
            curTarL: '',
            curTarR: '',
            list: '',
            objs: {},
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
          });
          this.ctx.draw();
        }
      });
    },

    getLevel() {
      var that = this;
      let param = {
        type: 3,
        page: this.page,
        page_size: this.pagesize
      };
      util.ajax('/api/game/guanqia', param, res => {
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
        } else {}
      });
    },

    closeLevel() {
      this.setData({
        isLevel: false,
        is_canvas: true,
        list: [],
        ansList: [],
        curTarL: '',
        curTarR: '',
        objs: {},
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0
      });
      this.topicList();
      this.ctx.draw(); // this.beginCanvas()
    },

    showLevel() {
      this.setData({
        isLevel: true,
        is_canvas: false
      });
      this.getLevel();
    },

    toDetail(e) {
      this.setData({
        id: e.currentTarget.dataset.id,
        isLevel: false,
        ans: '',
        currentId: '-1',
        list: [],
        ansList: [],
        curTarL: '',
        curTarR: '',
        objs: {},
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0,
        is_canvas: true
      });
      wx.setStorageSync('game-pid', e.currentTarget.dataset.id);
      this.topicList();
      this.ctx.draw();
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
      wx.setStorageSync('game-pid', this.id);
      this.topicList();
      this.setData({
        is_succ: false,
        ans: '',
        currentId: '-1',
        list: [],
        ansList: [],
        curTarL: '',
        curTarR: '',
        objs: {},
        beginX: 0,
        beginY: 0,
        endX: 0,
        endY: 0
      });
      this.ctx.draw();
    },

    toGetLevel(e) {
      var index = e.currentTarget.dataset.index;
      this.setData({
        page: e.currentTarget.dataset.page,
        pageId: index
      });
      this.getLevel();
    },

    getAudio() {
      let that = this;
      wx.request({
        url: getApp().globalData.requestUrl + '/api/index/getSystem',
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
      }
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
      util.ajax('/api/index/getSystem', {
        type: 11
      }, res => {
        that.setData({
          failImg: res.data
        });
      });
    },

    succImgFun() {
      var that = this;
      util.ajax('/api/index/getSystem', {
        type: 10
      }, res => {
        that.setData({
          succImg: res.data
        });
      });
    },

    limitImgFun() {
      var that = this;
      util.ajax('/api/index/getSystem', {
        type: 12
      }, res => {
        that.setData({
          limitImg: res.data
        });
      });
    },

    lastImgFun() {
      var that = this;
      util.ajax('/api/index/getSystem', {
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
@import "./poetry.css";
</style>