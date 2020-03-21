<template>
  <view>
    <!-- 评价标签 -->
    <view :class="'evaluate ' + evaluateHeight">
      <text
        v-for="(item, index) in LaberList"
        :key="index"
        :class="'LaberList ' + (index== indexId ? 'checkLaber' : '')"
        :data-id="item.name"
        :data-index="index"
        @tap="changeBtn"
      >{{item.name}}{{item.number=='' ? '' : '('+item.number+')' }}</text>
    </view>
    <view class="showImg" @tap="showHeight">
      <image v-if="evaluateHeight!=''" src="/static/img/commentList/bottom.png" class="topImg" />
      <image v-if="evaluateHeight==''" src="/static/img/commentList/top.png" class="topImg" />
    </view>
    <!-- 评价主内容 -->
    <view class="evaluateContent">
      <view class="evaluateList" v-for="(item, index) in evaluateList" :key="index">
        <view class="evaluateValue">
          <!-- 这个是用户头像 -->
          <!-- <image src="{{item.avatar}}" class="userImg"> -->
          <!-- 这个是固定的logo -->
          <image
            src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/kxsx/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20191031134814.png"
            class="userImg"
          />
          <view class="evaluateValueRight">
            <view class="evaluateName">{{item.nickname}}</view>
            <!-- 产品：{{item.goods_name}} -->
            <view class="evaluateTitle">{{item.createtime_text}}</view>
          </view>
          <view style="clear:both"></view>
        </view>
        <view class="evaluateDetails">{{item.content}}</view>
        <view class="evaluateDetailsImg">
          <view class="img-box">
            <!-- 有视频 -->
            <view class="videoUrlImg" v-if="item.videoUrl">
              <image
                v-if="item.videoUrl"
                style="width:90%;height:200rpx;margin-bottom:0rpx;border-radius: 10rpx;"
                :hidden="item.fullScreen"
                class="case-picture"
                :src="item.videoUrl + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast'"
                mode="widthFix"
              />
              <image
                v-if="item.videoUrl"
                :data-fullScreen="item.fullScreen"
                class="bt"
                mode="scaleToFill"
                :data-src="item.videoUrl"
                :data-index="index"
                @tap="playVideo"
                src="/static/img/index/play3.png"
                style="width:60rpx;height:60rpx;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;"
              />
            </view>
            <!-- 图片 -->
            <view
              class="evaluateDetailsImgList"
              v-for="(items, index2) in item.image_array"
              :key="index2"
              v-if="items"
            >
              <image
                :src="items"
                @tap="previewImg"
                :data-effect_pic="item.image_array"
                :data-src="items"
                mode="aspectFill"
                class="acticleimg"
              />
            </view>
            <view style="clear:both"></view>
          </view>

          <!-- <view class="evaluateDetailsImgList">
        <image src="https://pic.kaifadanao.cn/20191029/8e2f59aaeb0dbbc02eae5bc64e5cfa5e.jpg" mode="widthFix" bindtap='previewImg' data-src="https://pic.kaifadanao.cn/20191029/8e2f59aaeb0dbbc02eae5bc64e5cfa5e.jpg" data-effect_pic='{{imgList}}'>
          </view>-->
        </view>
      </view>
    </view>
    <view style="height:100rpx;"></view>
    <!-- 固定底部导航栏 -->
    <view class="twobtn">
      <view class="twobtncont">
        <button class="add" @tap="collectP" v-if="collect_p=='false'" :data-id="collect_p">收藏商品</button>
        <button class="add" @tap="collectP" v-else :data-id="collect_p">取消收藏</button>
      </view>
      <view class="twobtncont">
        <button class="buy" @tap="buyNow">立即购买</button>
      </view>
      <view class="twobtncont">
        <button class="add" @tap="add">加入购物车</button>
      </view>
    </view>
  </view>
</template>

<script>
// pages/commentList/commentList.js
var app = getApp().globalData;
const util = require("../../../utils/util.js");

export default {
  data() {
    return {
      evaluateHeight: "evaluateHeight",
      //评论标签展开
      evaluateList: "",
      //评论列表
      imgList: [
        "https://pic.kaifadanao.cn/20191029/8e2f59aaeb0dbbc02eae5bc64e5cfa5e.jpg",
        "https://pic.kaifadanao.cn/20191029/8e2f59aaeb0dbbc02eae5bc64e5cfa5e.jpg"
      ],
      //评论的图片列表
      collect_p: false,
      //收藏商品标识
      p_id: 0,
      //商品id
      LaberList: "",
      //标签列表
      indexId: 0,
      //标签切换标识
      laber: "",
      //标签名，用于点击标签获取不同的评论
      page: 1,
      page_size: 10,
      userName: "",
      preview: false,
      string: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      p_id: options.p_id,
      collect_p: options.collect_p
    }); //获取评论列表标签

    util.ajaxs(
      "evaluate/getEvaluateHeadLableList",
      {
        goods_id: that.p_id
      },
      res => {
        that.setData({
          LaberList: res.data.list
        });
      }
    );
    that.getEvaluateList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  onReachBottom: function() {
    let that = this;
    let page = that.page;
    page++;
    let param = {
      goods_id: that.p_id,
      label: that.laber,
      page: page,
      page_size: that.page_size
    };
    util.ajaxs("evaluate/getEvaluateList", param, res => {
      if (page < res.data.count) {
        that.setData({
          evaluateList: that.evaluateList.concat(res.data.list),
          page: page
        });
      } else {
        wx.showToast({
          title: "到底了...",
          icon: "none"
        });
      }
    });
  },

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
    //获取评论列表
    getEvaluateList() {
      let that = this;
      let param = {
        goods_id: that.p_id,
        label: that.laber
      };
      util.ajaxs("evaluate/getEvaluateList", param, res => {
        that.setData({
          evaluateList: res.data.list
        });

        for (let i = 0; i < res.data.list.length; i++) {
          let namee = res.data.list[i].nickname;
          let userName = "evaluateList[" + i + "].nickname";

          if (namee.length == 1) {
            //用户名为一个字的显示*
            that.setData({
              [userName]: "*"
            });
          } else if (namee.length == 2) {
            //用户名为2个字
            let newName = namee.slice(0, 1);
            that.setData({
              [userName]: newName + "*"
            });
          } else {
            let startName = namee.slice(0, 1);
            let endName = namee.slice(namee.length - 1, namee.length);

            if (namee.length == 3) {
              //用户名称3个字的
              that.setData({
                [userName]: startName + "*" + endName
              });
            } else {
              //用户名称4个字及以上
              that.setData({
                [userName]: startName + "**" + endName
              });
            }
          }
        }
      });
    },

    //展开所有评论标签
    showHeight() {
      let that = this;

      if (that.evaluateHeight != "") {
        //如果标签不是展开状态
        that.setData({
          evaluateHeight: ""
        });
      } else {
        that.setData({
          evaluateHeight: "evaluateHeight"
        });
      }
    },

    //在新页面中全屏预览图片
    previewImg: function(e) {
      let src = e.currentTarget.dataset.src;
      let pic_arr = e.currentTarget.dataset.effect_pic;
      wx.previewImage({
        current: src,
        urls: pic_arr
      });
    },

    //收藏商品
    collectP(e) {
      let _this = this;

      util.ajaxs(
        "goods/goodsCollect",
        {
          p_id: _this.p_id
        },
        res => {
          wx.showToast({
            title: res.msg,
            icon: "none",
            mask: true
          });

          _this.setData({
            collect_p: !_this.collect_p
          });
        }
      );
    },

    //立即购买
    buyNow() {
      util.ajaxs("index/getProfile", "", res => {
        var that = this;

        if (!wx.getStorageSync("token")) {
          wx.navigateTo({
            url: "/pages/login/login"
          });
        } else {
          wx.navigateTo({
            url:
              "/pages/onlinestore/sureorder/sureorder?type=1&ids=" +
              that.p_id +
              "&now_buy=1"
          });
        }
      });
    },

    //加入购物车
    add(e) {
      var that = this;
      var param = {
        p_id: that.p_id
      };
      util.ajaxs("cart/add", param, res => {
        wx.showToast({
          title: res.msg
        });
      });
    },

    //标签切换点击
    changeBtn(e) {
      let that = this;
      that.setData({
        indexId: e.currentTarget.dataset.index,
        laber: e.currentTarget.dataset.id
      });
      that.getEvaluateList();
    },

    //点击跳转到播放视频页面
    playVideo(e) {
      this.setData({
        preview: false
      });
      var src = e.currentTarget.dataset.src;
      wx.navigateTo({
        url: "../video/video?src=" + src
      });
    },

    //标签点击选择(多选)
    checkedBtn: function(e) {
      let string = "obtnArry[" + e.target.dataset.index + "].selected";
      this.setData({
        [string]: !this.obtnArry[e.target.dataset.index].selected
      });
      let detailValue = this.obtnArry
        .filter(it => it.selected)
        .map(it => it.name);
    },
    //标签点击选择(单选)
    chooseCampus: function(options) {
      var _this = this;

      var id = options.currentTarget.dataset.id; //设置当前样式

      _this.setData({
        currentCampus: id
      });
    }
  }
};
</script>
<style>
@import "./commentList.css";
</style>
