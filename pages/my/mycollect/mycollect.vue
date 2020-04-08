<template>
  <view>
    <!--pages/my/mycollect/mycollect.wxml-->

    <view class="mycollect">
      <view class="search">
        <image class="searchicon" src="/static/img/shuhuajs/search.png" />
        <input
          class="searchinput"
          placeholder-class="place-hoder"
          placeholder="搜索"
          @input="keywordFun"
        />
      </view>

      <view class="navtab">
        <view
          :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')"
          v-for="(item, id) in section"
          :key="id"
          @tap.stop="handleTap(item.typeId)"
          :idAttr="item.typeId"
        >
          <image :src="item.clicknavtabimg" v-if="currentId==item.typeId" class="navtabimg" />
          <image :src="item.navtabimg" v-else class="navtabimg" />
          {{item.name}}
        </view>
      </view>

      <view class="tabcont" :hidden="currentId!=1">
        <view class="tabcontlist">
          <view
            class="tabcontitem"
            v-for="(item, index) in tabcontitem"
            :key="index"
            :data-vp_id="item.vp_id"
            @tap="details"
            :data-title="item.title"
          >
            <view class="left itemfolt">
              <image class="leftimg" :src="item.img[0]" />
            </view>
            <view class="right itemfolt">
              <view class="title">{{item.title}}</view>
              <view class="xaingqing">详情：{{item.detail}}</view>
              <view class="title" :data-p_id="item.p_id" @tap="details">{{item.p_name}}</view>

              <view
                @tap.stop="collectF"
                :data-index="index"
                :data-p_id="item.vp_id"
                class="collect"
              >
                <image class="collectimg_active" src="/static/img/freeTeaching/shoucangyi.png" />
                <text class="collecttext_active">取消收藏</text>
              </view>
              <view class="shouting clear">
                <view class="shoutingdate">
                  收藏时间：
                  <text class="date">{{item.date}}</text>
                  <text class="time">{{item.time}}</text>
                </view>
                <navigator class="goonlink">继续收听</navigator>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="tabcont" :hidden="currentId!=2">
        <view class="tabcontlist">
          <view
            class="tabcontitem"
            v-for="(item, index) in tabcontitem"
            :key="index"
            :data-vp_id="item.vp_id"
            @tap="details"
          >
            <view class="left itemfolt">
              <image
                class="leftimg"
                src="/../kxsx_xcx/pages/my/mycollect/https:/kxsx-front-pic.oss-cn-beijing.aliyuncs.com/test/collectproduct-img.png"
              />
            </view>
            <view class="right itemfolt">
              <view class="title">{{item.title}}</view>
              <view class="xaingqing">详情：{{item.detail}}</view>
              <view class="shouting">
                <view class="shoutingdate">
                  上次听到：
                  <text class="date">{{item.date}}</text>
                  <text class="time">{{item.createtime}}</text>
                </view>
                <navigator class="goonlink">继续收听</navigator>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="tabcont" :hidden="currentId!=3">
        <view class="productlist">
          <view
            class="productitem"
            v-for="(item, index) in goodsList"
            :key="index"
            :data-p_id="item.p_id"
						@tap="goodsdetails"
          >
            <view class="leftitem leftitem_left">
              <image class="productimg" style="width:100%;height:100%;" :src="item.image" />
            </view>
            <view class="leftitem leftitem_right">
              <view class="title">{{item.p_name}}</view>
              <view class="jieshao">
                <text class="text-detail">{{item.p_detail}}</text>
              </view>
              <view
                :data-index="index"
                :data-p_id="item.p_id"
                class="collects"
								 @tap.stop="collectP"
              >
                <image class="collectimg_active" src="/static/img/freeTeaching/shoucangyi.png"/>
                <text class="collecttext_active">取消收藏</text>
              </view>
              <view class="seedetail" @tap="goodsdetails" :data-p_id="item.p_id">查看详情</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      currentId: "1",
      section: [
        {
          navtabimg: "../../../static/my/collectshipin-wei.png",
          clicknavtabimg: "../../../static/my/collectshipin-yi.png",
          name: "视频",
          typeId: "1"
        },
        {
          navtabimg: "../../../static/my/collectyinpin-wei.png",
          clicknavtabimg: "../../../static/my/collectyinpin-yi.png",
          name: "音频",
          typeId: "2"
        },
        {
          navtabimg: "../../../static/my/chanpin-wei.png",
          clicknavtabimg: "../../../static/my/chanpin-yi.png",
          name: "产品",
          typeId: "3"
        }
      ],
      tabcontitem: [],
      goodsList: [],
      type: 1,
      keyword: "",
      page: 1,
      page_size: 10,
      count: 1,
      content: "",
      cl_id: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.currentId) {
      this.setData({
        currentId: options.currentId,
        type: options.currentId,
        tabcontitem: [],
        goodsList: [],
        page: 1
      });
    }

    this.getData();
  },
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      page: 1,
      tabcontitem: [],
      goodsList: []
    });
    that.getData();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getData();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    keywordFun: function(e) {
      var that = this;
      that.setData({
        type: that.type,
        page: 1,
        tabcontitem: [],
        goodsList: [],
        keyword: e.detail.value
      });
      that.getData();
    },
    //点击切换
    handleTap: function(typeId) {
      let id = typeId;
      if (id) {
        this.setData({
          currentId: id,
          type: id,
          page: 1,
          tabcontitem: [],
          goodsList: []
        });
        this.getData();
      }
    },

    getData() {
      var that = this;
      var param = {
        type: that.type,
        keyword: that.keyword,
        page: that.page,
        page_size: that.page_size
      };

      if (that.type == 1 || that.type == 2) {
        if (that.count < that.page) {
          wx.showToast({
            title: "暂无更多信息",
            icon: "none"
          });
        } else {
          util.ajaxs("videopacks/collectList", param, res => {
            var tabcontitem = that.tabcontitem;
            that.setData({
              page: that.page + 1,
              page: that.page + 1,
              count: res.data.count > 1 ? res.data.count : 1,
              tabcontitem: tabcontitem.concat(res.data.list)
            });
            wx.stopPullDownRefresh();
          });
        }
      } else if (that.type == 3) {
        if (that.count < that.page) {
          wx.showToast({
            title: "暂无更多信息"
          });
        } else {
          util.ajaxs("goods/goodsCollectList", param, res => {
            var goodsList = that.goodsList;
            that.setData({
              page: that.page + 1,
              page: that.page + 1,
              count: res.data.count > 1 ? res.data.count : 1,
              goodsList: goodsList.concat(res.data.list)
            });
            wx.stopPullDownRefresh();
          });
        }
      }
    },

    details(e) {
      var that = this;
      let param = {
        vp_id: e.currentTarget.dataset.vp_id
      };
      util.ajaxs("videopacks/videopacksLimit", param, res => {
        if (res.status == 2) {
          that.setData({
            content: res.data.content,
            cl_id: res.data.cl_id
          });
          wx.showToast({
            title: "付费视频,请到首页购买",
            icon: "none"
          });
        } else {
          wx.navigateTo({
            url:
              "/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=" +
              e.currentTarget.dataset.vp_id +
              "&title=" +
              e.currentTarget.dataset.title
          });
        }
      });
    },

    goodsdetails(e) {
      const gd_id = e.currentTarget.dataset.p_id;
			console.log(gd_id)
      uni.navigateTo({
        url: "/pages/product-detail/product-detail?gd_id=" + gd_id
      });
    },
		
    collectF(e) {
      let _this = this;

      let p_id = e.currentTarget.dataset.p_id;
      var index = e.currentTarget.dataset.index;
      var tabcontitem = _this.tabcontitem;
      util.ajaxs(
        "videopacks/videoCollect",
        {
          vp_id: p_id
        },
        res => {
          tabcontitem.splice(index, 1);

          _this.setData({
            tabcontitem: tabcontitem
          });
        }
      );
    },

    collectP(e) {
      let _this = this;

      let p_id = e.currentTarget.dataset.p_id;
      var index = e.currentTarget.dataset.index;
      var goodsList = _this.goodsList;
      util.ajaxs(
        "goods/goodsCollect",
        {
          p_id: p_id
        },
        res => {
          goodsList.splice(index, 1);

          _this.setData({
            goodsList: goodsList
          });
        }
      );
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
@import "./mycollect.css";
</style>