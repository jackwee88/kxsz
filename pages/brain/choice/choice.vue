<template>
  <view>
    <!--pages/choiceQuestion/choiceQuestion.wxml-->

    <view class="page" :style="'background-image: url(' + backgroundImg + ')'">
      <image
        src="/static/index/backs1.png"
        style="width:84rpx;height:84rpx;position:fixed;top:64rpx;left:0rpx;"
        @tap.stop="goBack"
      />
      <view class="aud" @tap.stop="playorpause" v-if="is_p==false"></view>
      <view class="audio" @tap.stop="playorpause" v-if="is_p==true"></view>
      <audio controls loop :src="audio" id="audioID" :action="action"></audio>
      <text v-if="id" class="where">第{{ids}}关</text>
      <text v-else class="where">第1关</text>
      <view class="topic">
        <image src="https://kxsx.kaifadanao.cn/assets/img/pig.png" class="pig" />
        <!-- <text style="position:absolute;top:-120rpx;right:64rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:if='{{id}}'>{{id}}</text>
        <text style="position:absolute;top:-120rpx;right:64rpx;fint-size:60rpx;color:#8FD6F2;font-weight:bolder" wx:else>1</text>-->
        <view class="topic-box">
          <view v-for="(item, index) in topic" :key="index">
            <view class="item" v-if="item != ' '">{{item}}</view>
            <view
              :class="'item-none ' + (ans?'ans':'')"
              v-if="item == ' '"
              :style="index==3 || index==7 ? 'margin-right:0':''"
            >
              {{item}}
              <text
                :style="is_ok?'color:black; position:relative;top:3rpx;left:11rpx;font-size:45rpx;':'color:red; position:relative;top:3rpx;left:11rpx;font-size:45rpx;'"
              >{{ans}}</text>
            </view>
          </view>
        </view>
        <view class="ans-box">
          <view class="answer">
            <!-- <view class="grid"> -->
            <view
              v-for="(items, index) in answerList"
              :key="index"
              :data-index="index"
              @tap.stop="selected"
              :data-answer="items"
              :class="index == currentId ? 'red':''"
            >{{items}}</view>

            <!-- </view> -->
          </view>
        </view>
      </view>
      <image
        src="/static/img/index/ts.png"
        style="width:153px;height:65px;position:absolute;top:25%;left:5%;"
        v-if="sequence"
      />
      <view class="btn-boxs">
        <button
          class="btn share"
          open-type="share"
          id="share"
          style="background-color:transparent;border:none;"
        ></button>
        <view class="btn level" @tap.stop="showLevel"></view>

        <view class="btn next" @tap="next" v-if="next_id!=0"></view>
      </view>
    </view>

    <block
      data-type="template"
      data-is="failItem"
      data-attr="id:id,failImg:failImg"
      v-if="is_wrong"
    >
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
    <block
      data-type="template"
      data-is="levelItem"
      data-attr="levelList:levelList,counts:counts,pageId:pageId"
      v-if="isLevel"
    >
      <view class="popup">
        <view class="popupcont"></view>
        <view>
          <image
            class="prevPage"
            @tap.stop="prevPage"
            src="/static/img/index/Arrow_inactive.png"
            v-if="pageId==0"
          />
          <image
            class="prevPage"
            @tap.stop="prevPage"
            src="/static/img/index/Arrowicon2.png"
            v-if="pageId!=0"
          />
          <image
            class="nextPage"
            @tap.stop="nextPage"
            src="/static/img/index/Arrow_inactives.png"
            v-if="pageId==counts.length-1"
          />
          <image
            class="nextPage"
            @tap.stop="nextPage"
            src="/static/img/index/Arrowicon.png"
            v-if="pageId!=counts.length-1"
          />
          <view class="bg-img bg-level" @touchstart="touchstart" @touchend="touchend">
            <!-- <view class="level-item {{item.pass==false?'level-false':''}}" wx:for="{{levelList}}" bindtap='{{item.pass==true&&"toDetail"}}' data-id="{{item.id}}">{{item.id}}</view> -->
            <view
              :class="'level-item ' + (item.pass==false?'level-false':'')"
              v-for="(item, index) in levelList"
              :key="index"
              @tap="toDetail(item.id)"
              :data-id="item.id"
            >{{item.id}}</view>
            <view class="cancle" @tap="closeLevel"></view>
          </view>
          <view
            style="position:absolute;bottom:25%;position:absolute;bottom:24%;left:0;right:0;display:flex;justify-content:center;"
          >
            <view
              :class="'yuan ' + (pageId==index?'yuan_':'')"
              v-for="(item, index) in counts"
              :key="index"
              @tap="toGetLevel"
              :data-page="item"
              :data-index="index"
            ></view>
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
      innerAudioContext: null,
      is_last: false,
      is_order: false,
      sequence: false,
      is_ok: false,
      rightAns: "",
      succImg: "",
      failImg: "",
      limitImg: "",
      backGroundImg: "https://kxsx.kaifadanao.cn/assets/img/gamebackground.png",
      lastImg: "",
      lastImg: "",
      toIndex: "",
      topic: "",
      answerList: ["我", "本", "辅", "我", "我", "本", "辅", "我"],
      ans: "",
      answer: "",
      id: "",
      currentId: "-1",
      is_wrong: false,
      page: 1,
      pagesize: 12,
      levelList: [],
      counts: 0,
      is_succ: false,
      is_limit: false,
      audio: "",
      action: {
        method: "pause"
      },
      is_p: true,
      pageId: 0,
      ids: "",
      startX: 0,
      slider: false,
      animationData: {},
      cardInfoList: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        },
        {
          name: 4
        }
      ],
      c: "",
      backgroundImg: "https://kxsx.kaifadanao.cn/assets/img/gamebackground.png",
      next_id: "",
      isLevel: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAudio();
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
      success: function(res) {
        let nav_top = res.statusBarHeight;

        if (res.platform.toLowerCase() == "android") {
          nav_top += 4;
        }
      }
    });
    this.topicList();
    this.getLevel();
  },

  onHide: function() {
    this.innerAudioContext.pause();
  },
  onBackPress() {
    this.innerAudioContext.destroy();
    this.innerAudioContext = null;
  },
  methods: {
    backGroundImgFun: function() {
      var that = this;
      // util.ajax({
      //   url:'/api/index/getSystem', data:{
      //     type: 9
      //   }, success:res => {
      //     that.backgroundImg= res.data
      //   }
      // });
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 9
        },
        success: res => {
          that.backgroundImg = res.data;
        }
      });
    },

    toGetLevel(e) {
      var index = e.currentTarget.dataset.index;
      (this.page = e.currentTarget.dataset.page), (this.pageId = index);
      this.getLevel();
    },

    topicList: function() {
      let that = this;

      if (uni.getStorageSync("game-cid")) {
        this.id = uni.getStorageSync("game-cid");
      }

      var param = {
        type: 1,
        id: that.id
      };
      util.ajax({
        url: "game/choiceList",
        data: param,
        success: res => {
          if (res.status == 1) {
            (this.topic = res.data.title),
              (this.id = res.data.id),
              (this.ids = res.data.id),
              (this.answerList = res.data.array),
              (this.next_id = res.data.next_id),
              (this.rightAns = res.data.right);
            uni.setStorageSync("game-cid", res.data.id);
          } else {
            if (res.status == 2) {
              if (res.msg == "今日答题数量已达上限") {
                setTimeout(function() {
                  that.is_limit = true;
                }, 500);
                return;
              } else {
                uni.showToast({
                  title: res.msg,
                  icon: "none",
                  mask: true
                });
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                setTimeout(function() {
                  uni.navigateBack({
                    delta: 1
                  });
                }, 1000);
                return;
              }
            } else if (res.status == 3) {
              (that.sequence = true), (that.id = that.ids);
              setTimeout(function() {
                that.sequence = false;
              }, 2000);
              uni.setStorageSync("game-cid", res.data.id);
            }
          }
        }
      });
    },
    answerFun: function() {
      let that = this;
      var param = {
        type: 1,
        id: this.ids,
        answer: that.answer
      };
      util.ajax({
        url: "game/answer",
        data: param,
        success: res => {
          if (res.status == 1) {
            // that.setData({
            //   id: res.data.id
            // })
            setTimeout(function() {
              that.is_succ = true;
            }, 500); // that.topicList()
          } else {
            if (res.msg == "回答错误") {
              setTimeout(function() {
                that.is_wrong = true;
              }, 500);
            } else if ((res.msg = "今日答错数量已达上限")) {
              that.is_limit = true;
            } else {
              that.is_limit = true;
            }
          }
        }
      });
    },
    selected: function(e) {
      let answer = e.currentTarget.dataset.answer;
      let index = e.currentTarget.dataset.index;

      if (answer == this.rightAns) {
        this.is_ok = true;
      } else {
        this.is_ok = false;
      }

      (this.answer = answer), (this.currentId = index), (this.ans = answer);

      this.answerFun();
    },
    reset: function(e) {
      let id = e.currentTarget.dataset.id;
      (this.is_wrong = false),
        (this.currentId = "-1"),
        (this.ans = ""),
        (this.id = this.id),
        (this.is_succ = false);
      this.topicList();
    },
    exit: function() {
      // uni.navigateTo({
      //   url: '/pages/brain/brain',
      // })
      uni.navigateBack({
        delta: 1
      });
    },

    getLevel() {
      var that = this;
      let param = {
        type: 1,
        page: this.page,
        page_size: this.pagesize
      };
      util.ajax({
        url: "game/guanqia",
        data: param,
        success: res => {
          var counts = [];

          if (res.status == 1) {
            that.levelList = res.data.list;

            for (var i = 0; i < res.data.count; i++) {
              counts.push(i + 1);
            }

            (that.counts = counts), (that.c = res.data.count);
          } else {
          }
        }
      });
    },

    closeLevel() {
      this.isLevel = false;
    },

    showLevel() {
      this.isLevel = true;
      this.getLevel();
    },

    toDetail(id) {
      (this.isLevel = false), (this.ans = ""), (this.currentId = "-1");
      uni.setStorageSync("game-cid", id);
      this.topicList();
    },

    next() {
      if (this.next_id == 0) {
        (this.is_succ = false), (this.is_last = true);
        // uni.navigateTo({
        //   url: '/pages/brain/brain',
        // })
        //  uni.navigateBack({
        //    delta: 1
        //  })

        return false;
      }

      this.id = this.next_id;
      uni.setStorageSync("game-cid", this.next_id);
      this.topicList();
      (this.is_succ = false), (this.ans = ""), (this.currentId = "-1");
    },

    getAudio() {
      let that = this;
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 8
        },
        success: res => {
          this.audio = res.data;
          this.initAudio();
        }
      });
    },

    initAudio() {
      if (this.innerAudioContext != null) {
        if (this.is_p) {
          this.innerAudioContext.play();
        }
        return;
      }
      const innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.loop = true;
      innerAudioContext.src = this.audio;
      innerAudioContext.onCanplay(() => {
      });
      this.innerAudioContext = innerAudioContext;
    },
    playorpause: function(e) {
      var that = this;

      if (this.innerAudioContext.paused) {
        //若当前是暂停，则点击后播放
        that.is_p = true;
        this.innerAudioContext.play();
      } else {
        //若当前是播放，则点击后暂停
        that.is_p = false;
        this.innerAudioContext.pause();
      }
    },

    goBack() {
      var that = this;
      var actionPause = {
        method: "pause"
      }; //定义暂停

      (this.action = actionPause), (this.is_p = false);

      if (this.toIndex == 1) {
        uni.switchTab({
          url: "/pages/index/index"
        });
      } else {
        uni.navigateBack({
          delta: 1
        });
      } // uni.navigateTo({
      //   url: '/pages/brain/brain',
      // })
    },

    touchstart(e) {
      this.startX = e.changedTouches[0].clientX;
    },

    touchend(e) {
      let that = this;
      let startX = this.startX;
      let endX = e.changedTouches[0].clientX; // if (this.data.slider) return;
      // 下一页(左滑距离大于30)

      if (startX - endX > 30) {
        this.slider = true;

        if (this.page == this.c) {
          this.slider = false;

          return;
        }

        (this.page = this.page + 1), (this.pageId = this.pageId + 1);
        this.getLevel();
      } // 上一页

      if (endX - startX > 30) {
        this.slider = true;

        if (this.page == 1) {
          this.slider = false; // uni.showToast({ title: '已经到第一张了', icon: 'none' })

          return;
        }

        (this.page = this.page - 1), (this.pageId = this.pageId - 1);
        this.getLevel();
      }
    },

    nextPage() {
      //尾页(当前页 等于 总页数)
      if (this.page == this.c) {
        return;
      }

      (this.page = this.page + 1), (this.pageId = this.pageId + 1);
      this.getLevel();
    },

    prevPage() {
      //首页
      if (this.page == 1) {
        return;
      }

      (this.page = this.page - 1), (this.pageId = this.pageId - 1);
      this.getLevel();
    },

    failImgFun() {
      var that = this;
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 11
        },
        success: res => {
          this.failImg = res.data;
        }
      });
    },

    succImgFun() {
      var that = this;
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 10
        },
        success: res => {
          this.succImg = res.data;
        }
      });
    },

    limitImgFun() {
      var that = this;
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 12
        },
        success: res => {
          this.limitImg = res.data;
        }
      });
    },

    lastImgFun() {
      var that = this;
      util.ajax({
        url: "index/getSystem",
        data: {
          type: 13
        },
        success: res => {
          this.lastImg = res.data;
        }
      });
    }
  }
};
</script>
<style>
@import "./choice.css";
</style>