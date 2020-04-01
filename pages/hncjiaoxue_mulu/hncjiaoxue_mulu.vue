<template>
  <view>
    <view class="wenzijiema">
      <view class="rumenkecheng clear">
        <view class="topcont topleft">
          <view class="titles">{{catalogue.mintro.content}}</view>
          <view class="kechenglist">
            <!-- <view class="kechengitem" v-for="(item, index) in course" :key="index">
              <text>{{item.kechengtext}}</text>
            </view>-->
          </view>
        </view>
        <view class="topcont topright">
          <image class="topcontimg" :src="catalogue.mintro.main_pic" style="width:100%;height:100%" />
        </view>
      </view>

      <view class="catalogue">
        <view class="mulu">目录</view>
        <view class="hncjiaoxuelist">
          <view
            class="hncjiaoxueitem"
            v-for="(item, index) in teach"
            :key="index"
            :data-index="index"
            :data-browse="item.browse"
            :data-vp_id="item.vp_id"
            :data-title="item.title"
            @tap="bindViewTab"
            :data-navigator="item.navigator"
          >
            <view
              class="leftitem leftitem_left"
              :data-index="index"
              :data-browse="item.browse"
              :data-vp_id="item.vp_id"
              :data-title="item.title"
              :data-navigator="item.navigator"
            >
              <image class="productimg" :src="item.image" style="width:100%;height:100%" />
            </view>

            <view class="leftitem leftitem_right">
              <view class="title">{{item.title}}</view>
              <view class="renqi">浏览{{item.browse}}次</view>
              <view class="collect" :data-index="index" :data-vp_id="item.vp_id">
                <view v-if="item.if_collect == true">
                  <image
                    class="collectimg"
                    :src="collectimg2"
                    @tap.stop="collect"
                    :data-index="index"
                    :data-vp_id="item.vp_id"
                  />
                  <text
                    class="collecttext green"
                    @tap.stop="collect"
                    :data-index="index"
                    :data-vp_id="item.vp_id"
                  >{{collecttext2}}</text>
                </view>
                <view v-else>
                  <image
                    class="collectimg"
                    :src="collectimg"
                    @tap.stop="collect"
                    :data-index="index"
                    :data-vp_id="item.vp_id"
                  />
                  <text
                    class="collecttext"
                    @tap.stop="collect"
                    :data-index="index"
                    :data-vp_id="item.vp_id"
                  >{{collecttext}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
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
      content: "",
      catalogueurl: "",
      catalogue: {
        catalog: [],
        mintro: {
          mi_id: 23,
          md_id: 31,
          title: "一年级免费课程上册",
          content:
            "培养识、写汉字兴趣，初步感受汉字形体美，配合练写进度，由简到难，循序渐进，培养学生热爱祖国语言文字的情感。",
          main_pic:
            "https://video.kaifadanao.cn/uploads/20200205/665cf80f16b83a4b9d432213b9e805ad.jpg",
          is_effective: 1,
          createtime: 1580898308,
          updatetime: 1580898308,
          deletetime: null,
          invite_situation: 1
        }
      },
      type: 1,
      title: "",
      id: 0,
      teach: [],
      collectimg2: "/static/img/freeTeaching/shoucangyi.png",
      collecttext2: "已收藏",
      collectimg: "/static/img/freeTeaching/shoucangwei.png",
      collecttext: "收藏",
      page: 1,
      page_size: 10,
      count: 1,
      cl_id: ""
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
    }

    that.setData({
      type: options.type,
      content: options.title,
      id: options.md_id
    });
    util.ajaxs(
      "videopacks/videopacksList",
      {
        md_id: options.md_id
      },
      res => {
        that.setData({
          catalogue: res.data
        });
      }
    );
    this.getIndexData();
  },
  onReachBottom: function() {
    this.getIndexData();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    getIndexData() {
      var that = this;
      var param = {
        md_id: that.id,
        page: that.page,
        page_size: that.page_size,
        keyword: ""
      };
      const teach = that.teach;

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajaxs("videopacks/videoList", param, res => {
          let list = [];

          if (res.data.list != "") {
            list = teach.concat(res.data.list);
          }

          that.setData({
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            teach: list
          });
          wx.stopPullDownRefresh();
        });
      }
    },
    bindViewTab: function(e) {
      const vp_id = e.currentTarget.dataset.vp_id;
      const title = e.currentTarget.dataset.title;
      const index = e.currentTarget.dataset.index;
      const browse = e.currentTarget.dataset.browse;
      var param = {
        vp_id: vp_id
      };
      util.ajaxs("videopacks/videopacksLimit", param, res => {
        if (res.status == 1) {
          wx.navigateTo({
            url:
              "/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=" +
              vp_id +
              "&title=" +
              title +
              "&vp_id=" +
              vp_id +
              "&index=" +
              index +
              "&browse=" +
              browse
          });
        } else if (res.status == 2) {
        }
      });
    },
    collect: function() {},

    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },

    collect(e) {
      let [_this, target] = [this, e.currentTarget.dataset];

      _this.apiLoad(
        {
          vp_id: target.vp_id
        },
        _this,
        target.index
      );
    },

    apiLoad(param, _this, index) {
      util.ajaxs("videopacks/videoCollect", param, res => {
        if (res.status == 1) {
          let list = _this.teach;
          list[index].if_collect = !list[index].if_collect;

          _this.setData({
            teach: list
          });
        } else {
          wx.hideLoading();
          wx.showModal({
            title: "错误提示",
            content: "收藏失败",
            showCancel: false
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./hncjiaoxue_mulu.css";
</style>