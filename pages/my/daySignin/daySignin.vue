<template>
  <view>
    <!--pages/my/daySignin/daySignin.wxml-->
    <view class="daySignin">
      <view class="daySignin_top" v-if="todaySign">
        <view class="qiandaoborder" @tap="signToday">
          <image class="dateimg" src="../../../static/my/dateimg.png" />
          <text>已签到</text>
        </view>
        <view class="qiaodaotext">已连续签到 {{continuity}} 天，继续加油！</view>
      </view>
      <view class="daySignin_top" v-else>
        <view class="qiandaoborder" @tap="show">
          <image class="dateimg" src="../../../static/my/dateimg.png" />
          <text>签到</text>
        </view>
        <view class="qiaodaotext">已连续签到 {{continuity}} 天，继续加油！</view>
      </view>

      <view class="daySignin_cont">
        <view class="canlendarBgView">
          <view class="canlendarView">
            <view class="canlendarTopView">
              <view class="leftBgView" @tap="handleCalendar" data-handle="prev">
                <view class="leftView">《</view>
              </view>
              <view class="centerView">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
              <view class="rightBgView" @tap="handleCalendar" data-handle="next">
                <view class="rightView">》</view>
              </view>
            </view>
            <view class="weekBgView">
              <view
                class="weekView"
                v-for="(item, index) in weeks_ch"
                :key="index"
                :data-idx="index"
              >{{item}}</view>
            </view>
            <view class="dateBgView">
              <view
                v-if="hasEmptyGrid"
                class="dateEmptyView"
                v-for="(item, index) in empytGrids"
                :key="index"
                :data-idx="index"
              ></view>
              <!-- bindtap="dateSelectAction" -->
              <view class="dateView" v-for="(item, index) in days" :key="index" :data-idx="index">
                <view :class="'datesView ' + (item.is_sign? 'dateSelectView' : '')">{{index}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 签到成功弹窗 -->
      <!-- <view class='popup' hidden='{{flag}}'>
  <view class='popupcont'></view>
  <view class='popupback'>
    <view class='popupback_cont'>
      <view class='congratulate'>签到成功!获得{{signScore}}积分</view>
      <view class='sintegral'>{{signDay}}</view>
      <button class='savebtn' bindtap='hide'>好的</button>
    </view>
  </view>
</view>
      </view>-->

      <view class="popup" :hidden="flag">
        <view class="popupcont"></view>
        <view class="popupback">
          <image src="../../../static/my/bg@2x.png" class="bag" />
          <view style="position:absolute;top:36rpx;left:0;right:0">
            <image src="../../../static/my/dateimg.png" class="small-icon" />
            <view class="tips">签到成功</view>
          </view>
          <view class="cen congratulate">恭喜获得{{signScore}}积分</view>
          <button class="savebtn" @tap="hide">好的</button>
        </view>
      </view>
    </view>

    <view class="dakaciclecont_daka">
      <navigator class="dakatext_daka" :url="'/pages/publishedDiary/publishedDiary?type=' + 1">打卡</navigator>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
// pages/my/daySignin/daySignin.js
const app = getApp().globalData;
var util = require("../../../utils/util.js");
import uniCalendar from "@/components/uni-calendar/uni-calendar";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniCalendar, //日历组件
    uniPopup //弹出层组件
  },
  data() {
    return {
      hasEmptyGrid: false,
      cur_year: "",
      cur_month: "",
      sintegral: "在签到5天即可获得双倍积分",
      flag: true,
      todaySign: false,
      continuity: 0,
      signScore: 0,
      signDay: "在签到5天即可获得双倍积分",
      days: "",
      todayIndex: "",
      weeks_ch: "",
      empytGrids: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setNowDate();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    // 弹出层函数
    show: function() {
      var that = this;
      util.ajaxs("index/UserSign", {}, res => {
        that.setData({
          flag: false,
          signScore: res.data.score,
          signDay: res.data.day,
          todaySign: true
        });
        that.setNowDate();
      });
    },
    hide: function() {
      this.setData({
        flag: true
      });
    },

    getMonthDayList() {
      var that = this;
      const date = new Date();
      var mydata = {
        year: that.cur_year ? that.cur_year : date.getFullYear(),
        month: that.cur_month ? that.cur_month : date.getMonth() + 1
      };
      util.ajaxs("index/getUserSignLog", mydata, res => {
        let days_count = res.data.list.length;
        that.setData({
          days: res.data.list,
          todaySign: res.data.todaySign,
          continuity: res.data.continuity
        });
      });
    },

    signToday() {
      wx.showToast({
        title: "今日已签到",
        icon: "none"
      });
    },

    dateSelectAction: function(e) {
      var cur_day = e.currentTarget.dataset.idx;
      this.setData({
        todayIndex: cur_day
      });
    },
    setNowDate: function() {
      const date = new Date();
      const cur_year = date.getFullYear();
      const cur_month = date.getMonth() + 1;
      const todayIndex = date.getDate() - 1;
      const weeks_ch = ["日", "一", "二", "三", "四", "五", "六"];
      this.calculateEmptyGrids(cur_year, cur_month);
      this.getMonthDayList();
      this.setData({
        cur_year: cur_year,
        cur_month: cur_month,
        weeks_ch,
        todayIndex
      });
    },

    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },

    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },

    calculateEmptyGrids(year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
      let empytGrids = [];

      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i);
        }

        this.setData({
          hasEmptyGrid: true,
          empytGrids
        });
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        });
      }
    },

    calculateDays(year, month) {
      // let days = [];
      // const thisMonthDays = this.getThisMonthDays(year, month);
      // for (let i = 1; i <= thisMonthDays; i++) {
      //   days.push(i);
      // }
      // this.setData({
      //   days
      // });
    },

    handleCalendar(e) {
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.cur_year;
      const cur_month = this.cur_month;

      if (handle === "prev") {
        let newMonth = cur_month - 1;
        let newYear = cur_year;

        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
        this.getMonthDayList();
        this.calculateEmptyGrids(newYear, newMonth);
      } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;

        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
        this.getMonthDayList();
        this.calculateEmptyGrids(newYear, newMonth); // this.setData({
        //   cur_year: newYear,
        //   cur_month: newMonth
        // })
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
@import "./daySignin.css";
</style>