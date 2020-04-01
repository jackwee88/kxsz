<template>
  <view>
    <!--pages/hncjiaoxue_intro/hncjiaoxue_intro.wxml-->

    <block v-if="isShowGoodsList">
      <cover-view class="goods-mask-box">
        <cover-view class="goodsMask" @tap.stop="showGoodsList"></cover-view>

        <cover-view class="goodsbox">
          <cover-view class="goods-close">
            <cover-image src="/static/img/hncjiaoxue_intro/close.png" @tap.stop="showGoodsList"></cover-image>
          </cover-view>
          <cover-view class="goods-main-title">视频中同款商品备份</cover-view>

          <cover-view class="goods-list" id="goods-list" v-if="goodList.length>0">
            <cover-view
              class="goods-item"
              v-for="(item, index) in goodList"
              :key="index"
              :data-pid="item.goods_id"
              key="index"
              @tap="buyGoods(item.goods_id)"
            >
              <cover-view class="goods-item-left">
                <cover-image :src="item.icon"></cover-image>
              </cover-view>
              <cover-view class="goods-item-right">
                <cover-view class="goods-item-title">{{myFilter.cutString(item.p_name,56)}}</cover-view>
                <cover-view class="goods-bottom">
                  <cover-view class="goods-bottom-left">¥{{item.spec_price}}</cover-view>
                  <cover-view class="goods-bottom-right">立即购买</cover-view>
                </cover-view>
              </cover-view>
            </cover-view>
          </cover-view>

          <cover-view v-else class="noGoods goods-list">暂无商品</cover-view>
        </cover-view>
      </cover-view>
    </block>

    <view class="buy-tip" @tap="showGoodsList" :data-vpid="vp_id">
      <image src="/static/img/hncjiaoxue_intro/gwc.png" />
      <view>视频中同款商品</view>
    </view>

    <view class="intro">
      <view class="banner">
        <video v-if="type == 1" class="video" :src="video" custom-cache="false" autoplay></video>
        <audio v-if="type == 2" :src="video" autoplay></audio>
        <image v-if="!video" :src="image" />
      </view>
      <view class="jianjie">简介</view>
      <view class="jianjiecont">
        <view class="conttext">
          <view class="title">{{title}}</view>

          <rich-text :nodes="content"></rich-text>
          <!-- <template is="wxParse" data="{{wxParseData:article.nodes}}"/> -->
        </view>
        <image class="pictureurl" :src="image" />
        <!-- <view class='picture'>
        <view class='pictureitem' wx:for="{{pictureurl}}" wx:key="key">
          <image class='pictureurl' src='{{item.img}}'>
        </view>
        </view>-->
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script module="myFilter" lang="wxs" src="../../utils/myFilter.wxs"></script>

<script>
var util = require("../../utils/util.js"); // var WxParse = require('../../wxParse/wxParse.js');

export default {
  data() {
    return {
      title: "",
      section:
        "暖和的春天到来了，池塘里的冰也融化了，池塘里有一群小蝌蚪。大大的脑袋，黑灰色的身子，甩着长长的尾巴，快活地游来游去...",
      video: "",
      pictureurl: [
        {
          img: "/img/writingStory/img1.png"
        },
        {
          img: "/img/writingStory/img2.png"
        },
        {
          img: "/img/writingStory/img3.png"
        },
        {
          img: "/img/writingStory/img4.png"
        },
        {
          img: "/img/writingStory/img5.png"
        },
        {
          img: "/img/writingStory/img2.png"
        }
      ],
      image: "",
      type: "",
      index: "",
      browse: "",
      vp_id: 0,
      is_share: false,
      content: "",
      isShowGoodsList: false,
      goodList: [],
      page: 1,
      page_size: 20,
      count: 1,
      isFisrt: true,
      up: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      });
      that.setData({
        title: options.title
      });
    }

    if (options.is_share) {
      is_share: is_share;
    }

    if (options) {
      that.setData({
        vp_id: options.vp_id
      });
    } else {
      wx.navigateBack({});
    }

    if (options.index) {
      that.setData({
        index: options.index
      });
    }

    if (options.browse) {
      that.setData({
        browse: options.browse
      });
    }

    util.ajaxs(
      "videopacks/videopacksDetails",
      {
        vp_id: options.vp_id
      },
      res => {
        if (res.data.status == 2) {
          getApp().globalData.infoModel();
          that.onShow();
        } else {
          //js页面（result.data.newdata.content----html标签）
          var content = res.data.content; // WxParse.wxParse('article', 'html', res.data.content, that, 5);

          that.setData({
            title: res.data.title,
            video: res.data.video,
            image: res.data.image,
            type: res.data.type,
            content: content
          });
        }
      }
    );

    if (that.index) {
      setTimeout(function() {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面

        var index = that.index;
        var up = "teach[" + index + "].browse";
        var newp = ++that.browse;

        if (prevPage) {
          // 可以修改上一页的数据
          prevPage.setData({
            [up]: newp
          });
        }
      }, 1000);
    }
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
  onReachBottom: function() {},
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },

    showGoodsList(e) {

      if (e.currentTarget.dataset.vpid && this.isFisrt) {
        this.setData({
          isFisrt: false
        });
        this.getGoodsData();
      } else {
        this.setData({
          isShowGoodsList: !this.isShowGoodsList
        });
      }
    },

    getGoodsData() {
      const that = this;
      const param = {
        page: that.page,
        page_size: that.page_size,
        // vp_id: 882
        vp_id: this.vp_id
      };

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajax("/api/videopacks/videoGoods", param, res => {
          let list = res.data.list;
          that.setData({
            page: that.page + 1,
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            goodList: this.goodList.concat(list),
            isShowGoodsList: !this.isShowGoodsList
          });
        });
      }
    },

    buyGoods(pid) {
      wx.navigateTo({
        url: "/pages/product-detail/product-detail?p_id=" + pid,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {}
      });
    }
  }
};
</script>
<style>
@import "./hncjiaoxue_intro.css";
</style>