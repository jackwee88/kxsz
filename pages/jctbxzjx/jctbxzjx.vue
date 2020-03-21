<template>
  <view>
    <!--pages/jctbxzjx/jctbxzjx.wxml-->
    <view v-if="modelType == 1">
      <view style="border-bottom:1rpx solid #e6e6e6;">
        <view class="searchcont">
          <view class="search">
            <image class="searchicon" src="/static/img/shuhuajs/search.png" />
            <input
              class="searchinput"
              placeholder-class="place-hoder"
              placeholder="请输入搜索的产品"
              @input="keywordFun"
            />
          </view>
        </view>
      </view>
      <view class="jctbxzjx clear">
        <view scroll-y class="cataloguelist catalogueleft">
          <scroll-view class="catalogueleft_tab">
            <!-- {{item.typeId == currentId ? 'nav-active':''}} -->
            <view
              :class="'navtab_item ' + (item.cl_id == currentId ? 'nav-active':'')"
              v-for="(item, id) in catalogue"
              :key="id"
              @tap.stop="handleTap(item.cl_id)"
              :data-i="currentId"
              :idAttr="item.cl_id"
            >
              <text class="text">{{item.title}}</text>
            </view>
          </scroll-view>
        </view>

        <view class="cataloguelist catalogueright clear">
          <view class="tabcont">
            <view class="tabcontitem" v-for="(item, index) in tabcontitem" :key="index">
              <view
                class="tableftimg tabfloct"
                :data-vp_id="item.vp_id"
                :data-title="item.title"
                @tap="show"
              >
                <image class="productimg" :src="item.image" />
              </view>
              <view class="tabright tabfloct">
                <view class="title">{{item.title}}</view>
                <view class="renqi">{{item.browse}}人气</view>
                <view class="collect" @tap="collect" :data-index="index" :data-vp_id="item.vp_id">
                  <image class="collectimg" v-if="item.if_collect" :src="collectimg2" />
                  <image class="collectimg" v-else :src="collectimg" />
                  <text class="collecttext green" v-if="item.if_collect">已收藏</text>
                  <text class="collecttext" v-else>未收藏</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 商品分类 -->
    <!--pages/onlinestore/fenleilist/fenleilist.wxml-->
    <block v-else>
      <view class="fenleilist">
        <view class="cataloguelist catalogueleft">
          <view class="catalogueleft_tab">
            <view
              :class="'navtab_item ' + (index == currentIds ? 'nav-active':'')"
              v-for="(item, id) in section"
              :key="id"
              :data-index="index"
              :data-gd_id="item.gd_id"
              @tap.stop="handleTapGoods"
            >
              <text class="text">{{item.title}}</text>
            </view>
          </view>
        </view>

        <view class="cataloguelist catalogueright">
          <view class="tabcont" v-if="tabcontitems.length">
            <view class="pagetitle"></view>

            <view class="tabcontitems" v-for="(item, index) in tabcontitems" :key="index">
              <view class="tableftimg tabfloct" :data-p_id="item.p_id" @tap="details">
                <image class="productimg" :src="item.image" />
              </view>
              <view class="tabright tabfloct">
                <view
                  class="title"
                  :data-p_id="item.p_id"
                  @tap="details"
                  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
                >{{item.p_name}}</view>
                <view
                  class="collect"
                  v-if="item.if_collect == false"
                  @tap="collectF"
                  :data-index="index"
                  :data-p_id="item.p_id"
                >
                  <image class="collectimg" :src="collectimg" />
                  <text class="collecttext">收藏</text>
                </view>
                <view
                  v-else
                  @tap="collectF"
                  :data-index="index"
                  :data-p_id="item.p_id"
                  class="collect"
                >
                  <image class="collectimg_active" :src="collectimg2" />
                  <text class="collecttext_active">{{collecttext2}}</text>
                </view>
                <view class="addmoney">
                  <text class="money">¥{{item.coupon_price}}</text>
                  <view class="addicon" :data-p_id="item.p_id" @tap="add">
                    <image class="addimg" src="/static/img/onlinestore/add.png" />
                    <text>加入购物车</text>
                  </view>
                  <!-- <view class='addicon' data-p_id="{{item.p_id}}"  bindtap='add' wx:if="{{item.is_integral==1}}">
              <text class="jf">积分商品</text>
                  </view>-->
                </view>
              </view>
            </view>
          </view>
          <view class="tabcont" v-else>暂无数据</view>
        </view>
      </view>
    </block>

    <!-- 礼包弹窗 -->
    <view class="popup" :hidden="flag">
      <view class="popupcont"></view>
      <view class="popupback">
        <image
          style="position:absolute;color:white;top:-90rpx;right:-24rpx;height:56rpx;width:56rpx"
          @tap.stop="hide"
          src="/static/img/my/close.png"
        />
        <view class="popupback_cont">
          <view class="popupbacktitle">礼包介绍</view>
          <view class="popuplist">
            <text class="popupitem">{{content}}</text>
          </view>
        </view>
      </view>

      <view class="clickbtn">
        <button class="nowbuy" :data-cl_id="cl_id" @tap="buy" style="background-color:red">购买</button>
        <button class="close" @tap="jhmShow">输入激活码</button>
      </view>
    </view>

    <!-- 礼包弹窗 -->
    <view class="popup" v-if="is_code==true">
      <view class="popupcont"></view>

      <view class="popupback-jhm">
        <view class="popupback_cont-jhm">
          <view class="popupbacktitle-jhm" style="position:relative">
            提示
            <text
              style="position:absolute;coloe:white;top:-34rpx;right:16rpx;font-size:40rpx"
              @tap.stop="closeJhm"
            >x</text>
          </view>
          <view class="popuplist-jhm">
            <input placeholder="请输入激活码" style="font-size:32rpx;" type="text" @input="changeInput" />
          </view>
          <view class="clickbtn-jhm">
            <button
              class="close"
              @tap="buyJhm"
              style="font-size:24rpx"
              :data-cl_id="cl_id"
              :data-vp_id="item.vp_id"
              :data-title="item.title"
            >确认</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      pages: 1,
      counts: 1,
      vp_ids: "",
      titles: "",
      code: "",
      is_code: false,
      currentId: 0,
      collectimg2: "/static/img/freeTeaching/shoucangyi.png",
      collectimg: "/static/img/freeTeaching/shoucangwei.png",
      tabcontitem: [],
      content: "",
      flag: true,
      catalogue: [],
      page: 1,
      page_size: 10,
      count: 1,
      cl_id: 0,
      p_id: "",
      notice: "",
      md_id: 7,
      showModal: false,
      banner: [],
      currentId: 0,
      section: [],
      pagetitle: "一年级",
      tabcontitems: [],
      popupitem: [],
      collecttext2: "已收藏",
      collecttext: "收藏",
      flags: true,
      count: 1,
      page: 1,
      page_size: 10,
      modelType: 1,
      currentIds: 0,
      type: "",
      gd_id: "",
      producturl: [],
      keyword: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // if(options.id){
    //   this.setData({
    //     currentId: options.id
    //   })
    // }
    if (wx.getStorageSync("modelType") == 1) {
    }

    let that = this;

    if (options.content) {
      wx.setNavigationBarTitle({
        title: options.content
      });
    } else {
      wx.setNavigationBarTitle({
        title: "教材同步学习教学"
      });
    }

    if (options.type) {
      that.setData({
        type: options.type,
        md_id: options.md_id
      });
    } else {
      that.setData({
        type: 2,
        md_id: 7
      });
    }

    util.ajaxs(
      "videopacks/videopacksList",
      {
        md_id: this.md_id
      },
      res => {
        that.setData({
          catalogue: res.data.catalog,
          currentId: res.data.catalog[0].cl_id
        }); //视频列表

        that.getData();
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.setData({
      currentIds: 0
    });

    if (wx.getStorageSync("modelType")) {
      //modelType 普通类型
      that.setData({
        modelType: wx.getStorageSync("modelType")
      });
    } else {
      //modelType 商城类型
      that.setData({
        modelType: 1
      });
    } //modelType = 2时

    if (wx.getStorageSync("modelType") == 1) {
      var that = this;

      wx.setNavigationBarTitle({
        title: "在线视频"
      });
    }

    if (that.modelType == 2) {
      wx.setNavigationBarTitle({
        title: "商品分类",
        pages: 1
      });
      that.setData({
        pages: 1
      });
      util.ajaxs("goods/cate", {}, res => {
        that.setData({
          section: res.data.list
        });

        if (res.data.list) {
          that.setData({
            gd_id: res.data.list[0].gd_id,
            pages: 1,
            tabcontitems: [],
            count: 1
          });
          that.getDataGoods();
        }
      });
    }
  },

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
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * i
   */
  onReachBottom: function() {
    if (wx.getStorageSync("modelType") == 1) {
      this.getData();
    } else {
      this.getDataGoods();
    }
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

      if (id) {
        this.setData({
          currentId: id,
          page: 1,
          page_size: 10,
          tabcontitem: [],
          count: 1
        });
        that.getData();
      }
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
          let list = _this.tabcontitem;
          list[index].if_collect = !list[index].if_collect;

          _this.setData({
            tabcontitem: list
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
    },

    // 弹出层函数
    show: function(e) {
      var that = this;
      var vp_id = e.currentTarget.dataset.vp_id;
      var title = e.currentTarget.dataset.title;
      var param = {
        vp_id: vp_id
      };
      this.setData({
        vp_ids: vp_id,
        titles: title
      });
      util.ajaxs("videopacks/videopacksLimit", param, res => {
        if (res.status == 2) {
          that.setData({
            content: res.data.content,
            cl_id: res.data.cl_id,
            p_id: res.data.p_id,
            notice: res.data.notice
          });
          that.setData({
            flag: false
          });
        } else {
          wx.navigateTo({
            url:
              "/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=" +
              vp_id +
              "&title=" +
              title
          });
        }
      });
    },

    buy(e) {
      if (this.p_id == 0) {
        wx.showToast({
          title: this.notice,
          icon: "none"
        });
        return;
      } else {
        var p_id = this.p_id;
        wx.navigateTo({
          url: "/pages/onlinestore/productDetail/productDetail?p_id=" + p_id
        });
      } // console.log("e", e.currentTarget.dataset.cl_id)
      // var cl_id = e.currentTarget.dataset.cl_id
      // wx.navigateTo({
      //   url: '/pages/onlinestore/surevideo/surevideo?cl_id=' + cl_id,
      // })
    },

    hide: function() {
      this.setData({
        flag: true
      });
    },

    getData() {
      var that = this;
      var param = {
        cl_id: that.currentId,
        page: that.page,
        page_size: that.page_size,
        keyword: that.keyword
      };
      const tabcontitem = that.tabcontitem; // console.log(that.data.count ,'dfdsgdsgsdgsd',that.data.page)

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息",
          icon: "none"
        });
      } else {
        util.ajaxs("videopacks/videoList", param, res => {
          let list = [];

          if (res.data.list != "") {
            list = tabcontitem.concat(res.data.list);
          }

          that.setData({
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            tabcontitem: list
          });
          wx.stopPullDownRefresh();
        });
      }
    },

    keywordFun: function(e) {
      var that = this;
      that.setData({
        type: that.type,
        page: 1,
        producturl: [],
        keyword: e.detail.value
      });

      if (e.detail.value == "") {
        return;
      }

      if (that.page == 1) {
        that.setData({
          tabcontitem: []
        });
      }

      var timer = null;
      clearTimeout(timer);
      timer = setTimeout(function() {
        that.getData();
      }, 1000);
    },

    jhmShow() {
      this.setData({
        flag: true,
        is_code: true
      });
    },

    closeJhm() {
      this.setData({
        is_code: false
      });
    },

    buyJhm(e) {
      var that = this;
      util.ajaxs(
        "order/videocodeactive",
        {
          code: this.code,
          cl_id: e.currentTarget.dataset.cl_id
        },
        res => {
          wx.showToast({
            title: res.msg,
            mask: true,
            duration: 2000
          });
          this.setData({
            is_code: false
          });
          wx.navigateTo({
            url:
              "/pages/hncjiaoxue_intro/hncjiaoxue_intro?vp_id=" +
              that.vp_ids +
              "&title=" +
              that.titles
          });
        }
      );
    },

    changeInput(e) {
      var val = e.detail.value;
      this.setData({
        code: val
      });
    },

    /**
     * 收藏
     */
    collectF(e) {
      let _this = this;

      let target = e.currentTarget.dataset;
      util.ajaxs(
        "goods/goodsCollect",
        {
          p_id: target.p_id
        },
        res => {
          if (res.status == 1) {
            let list = _this.tabcontitems;
            list[target.index].if_collect = !list[target.index].if_collect;

            _this.setData({
              tabcontitems: list
            });
          } else {
            wx.showModal({
              title: "错误提示",
              content: "收藏失败",
              showCancel: false
            });
          }
        }
      );
    },

    getDataGoods() {
      const that = this;
      const param = {
        page: that.pages,
        page_size: that.page_size,
        gd_id: that.gd_id
      };

      if (that.counts < that.pages) {
        wx.showToast({
          title: "暂无更多信息",
          icon: "none"
        });
      } else {
        util.ajaxs("goods/goodsList", param, res => {
          var tabcontitems = that.tabcontitems;
          that.setData({
            pages: that.pages + 1,
            counts: res.data.count > 1 ? res.data.count : 1,
            tabcontitems: tabcontitems.concat(res.data.list)
          });
          wx.stopPullDownRefresh();
        });
      }
    },

    toUrl(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
    },

    //点击切换
    handleTapGoods: function(e) {
      //gd_id
      var that = this;
      let index = e.currentTarget.dataset.index;
      let gd_id = e.currentTarget.dataset.gd_id;
      that.setData({
        currentIds: index,
        gd_id: gd_id,
        pages: 1,
        tabcontitems: [],
        counts: 1
      });
      that.getDataGoods(); //请求数据
    },

    details(e) {
      const p_id = e.currentTarget.dataset.p_id;
      wx.navigateTo({
        url: "/pages/onlinestore/productDetail/productDetail?p_id=" + p_id
      });
    },

    add(e) {
      var that = this;
      const p_id = e.currentTarget.dataset.p_id;

      if (p_id) {
        var param = {
          p_id: p_id
        };
        util.ajaxs("cart/add", param, res => {
          wx.showToast({
            title: res.msg
          });
        });
      } else {
        wx.showToast({
          title: "网络异常.."
        });
      }
    },

    go: function() {
      this.setData({
        showModal: false
      });
    }
  }
};
</script>
<style>
@import "./jctbxzjx.css";
</style>