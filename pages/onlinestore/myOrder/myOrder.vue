<template>
  <view>
    <view class="myorder">
      <view class="myorder_tab">
        <view
          :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')"
          v-for="(item, id) in section"
          :key="id"
          :data-currentId="item.typeId"
          @tap="handleTap"
        >
          <text class="text">{{item.name}}</text>
        </view>
      </view>

      <!-- 待付款 -->
      <view class="tabcont daifukuan">
        <view class="tabcontitem" v-for="(item, index) in tabcontitem" :key="index">
          <navigator>
            <view class="tabconttitle" :data-order_id="item.order_id" @tap="orderDetails">
              <!-- <image class='tabconttitle_icon' src='/img/onlinestore/shopicon.png'> -->
              <text class="storename">订单号：{{item.order_sno}}</text>
              <text class="dealstate waitfukuan">{{item.status_name}}</text>
            </view>
            <view
              class="storedetail"
              v-for="(items, index2) in item.goods"
              :key="index2"
              :data-order_id="item.order_id"
              @tap="orderDetails"
            >
              <view class="tableftimg tabfloct">
                <image class="productimg" :src="items.image" />
                <!-- //items.image -->
              </view>
              <view class="tabright tabfloct">
                <view class="title over">{{items.goods_name}}</view>
                <view class="title over" style="color:#999">{{items.goods_attr}}</view>
                <!-- <text class='baozhuang'>礼盒装</text> -->
                <view class="storemoney">
                  <text class="money">¥{{items.price}}</text>
                  <text class="storenum">x{{items.quantity}}</text>
                </view>
              </view>
            </view>
          </navigator>
          <view class="amountmoney">
            <view class="amountcont">
              <text class="zonggong">共{{item.sum}}件商品</text>
              <!-- {{item.zonggong}} -->
              <text>合计：¥{{item.amount}}</text>
            </view>
          </view>
          <view class="tabcontbottom" v-show="item.refund_status == 1">
            <view
              class="bottomlink"
              :data-order_id="item.order_id"
              v-if="item.status == 2 && item.evaluate_status==10"
              :data-index="index"
              @tap="addComment"
            >去评价</view>
            <navigator
              class="bottomlink"
              v-if="item.status == -2"
              :data-order_id="item.order_id"
              :data-index="index"
              @tap="cancle"
            >取消订单</navigator>
            <navigator
              class="bottomlink"
              v-if="item.status == -2"
              :data-order_id="item.order_id"
              :data-index="index"
              @tap="pay"
            >付款</navigator>
            <navigator
              class="bottomlink"
              v-if="item.status == 0"
              :data-order_id="item.order_id"
              :data-index="index"
              @tap="reminder"
            >催单</navigator>

            <navigator
              class="bottomlink"
              v-if="(item.status == 0 && item.is_refund==1) || (item.status == 1 && item.is_refund==1) || (item.status==2 && item.is_refund==1)"
              :data-index="index"
              :data-order_id="item.order_id"
              @tap="returnFun"
            >退货</navigator>

            <navigator
              class="bottomlink"
              v-if="item.status == 1"
              :data-order_id="item.order_id"
              :data-index="index"
              @tap="confirm"
            >确认收货</navigator>
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
      refreshId: "a",
      section: [
        {
          name: "全部",
          typeId: "0"
        },
        {
          name: "待付款",
          typeId: "1"
        },
        {
          name: "待发货",
          typeId: "2"
        },
        {
          name: "待收货",
          typeId: "3"
        }, // {
        //   name: '退货',
        //   typeId: '4'
        // },
        {
          name: "待评价",
          typeId: "6"
        }
      ],
      tabcontitem: [],
      currentId: 0,
      page: 1,
      page_size: 10,
      count: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;

    if (options.currentId) {
      that.setData({
        currentId: options.currentId,
        page: 1
      });
    }

    var param = {
      type: that.currentId
    };
    that.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;

    if (that.refreshId != "a") {
      wx.getStorage({
        key: "refreshIds",
        success: function(res) {

          if (res.data == 1) {
            that.deleteList();
          }
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
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      page: 1
    });
    that.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "开心书写",
      path:
        "pages/index/index?myshare=1&tourl=/pages/onlinestore/myOrder/myOrder" // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    };
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    that.getDataBott();
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    //点击切换
    handleTap: function(e) {
      var that = this;
      let currentId = e.currentTarget.dataset.currentid;

      if (currentId) {
        that.setData({
          currentId: currentId,
          page: 1,
          tabcontitem: [],
          count: 1
        });
        that.getData();
      }
    },

    //数据加载,把上拉的数据加载和这个区分开，如果有问题则还原上拉事件中的getDataBott为getData
    getData() {
      const that = this;
      const param = {
        page: that.page,
        page_size: that.page_size,
        type: that.currentId
      };
      const studylis = that.studylist; // if (that.data.count < that.data.page) {
      //   wx.showToast({
      //     title: '暂无更多信息',
      //     icon:'none'
      //   })
      // } else {

      util.ajaxs("order/orderList", param, res => {
        var tabcontitem = that.tabcontitem;
        that.setData({
          page: that.page + 1,
          count: res.data.count > 1 ? res.data.count : 1,
          tabcontitem: tabcontitem.concat(res.data.list)
        });
        wx.stopPullDownRefresh();
      }); // }
    },

    //上拉数据加载
    getDataBott() {
      const that = this;
      const param = {
        page: that.page,
        page_size: that.page_size,
        type: that.currentId
      };
      const studylis = that.studylist;

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息",
          icon: "none"
        });
      } else {
        util.ajaxs("order/orderList", param, res => {
          var tabcontitem = that.tabcontitem;
          that.setData({
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            tabcontitem: tabcontitem.concat(res.data.list)
          });
          wx.stopPullDownRefresh();
        });
      }
    },

    /**
     * 取消订单
     */
    cancle(e) {
      var that = this;
      var list = that.tabcontitem;
      wx.showModal({
        title: "提示",
        content: "是否确认取消订单",

        success(res) {
          if (res.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            util.ajaxs("order/cancle", param, ress => {
              // //删除订单
              wx.showToast({
                title: ress.msg,
                icon: "none",
                mask: true
              });
              that.setData({
                tabcontitem: [],
                currentId: 0,
                page: 1,
                page_size: 10
              });
              that.getData();
            });
          }
        }
      });
    },

    /**
     * 支付订单
     */
    pay(e) {
      const order_id = e.currentTarget.dataset.order_id; // let that = this;
      // that.setData({
      //   order_id: order_id
      // })

      wx.showModal({
        title: "提示",
        content: "是否确认付款",

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs("paygoods/repay", param, res => {
							uni.requestPayment({
							  provider:'wxpay',
								orderInfo:res.data,
							  success: function(payres) {
							  
							    wx.redirectTo({
							      url:
							        "/pages/onlinestore/orderdetails/orderdetails?order_id=" +
							        e.currentTarget.dataset.order_id
							    });
							  },
							  fail: function() {

							  },
							  complete: function() {
							    // complete
							  }
							});
             
            });
          }
        }
      });
    },

    /**
     * 催单
     */
    reminder(e) {
      wx.showModal({
        title: "提示",
        content: "是否确认催单",

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs("order/reminder", param, res => {
              wx.showToast({
                title: "催单成功",
                mask: true
              });
            });
          } else if (ress.cancel) {
          }
        }
      });
    },

    /**
     * 退货
     */
    returnFun(e) {
      const order_id = e.currentTarget.dataset.order_id;
      var that = this;
      wx.showModal({
        title: "提示",
        content: "是否确认退货",

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            util.ajaxs("order/returnGoods", param, res => {
              wx.showToast({
                title: res.msg,
                icon: "none"
              });
              that.setData({
                currentId: 4,
                tabcontitem: [],
                page: 1,
                page_size: 10
              });
              that.getData();
            });
          }
        }
      });
    },

    /**
     * 确认收货
     */
    confirm(e) {
      var that = this;
      const order_id = e.currentTarget.dataset.order_id;
      var list = that.tabcontitem;
      wx.showModal({
        title: "提示",
        content: "是否确认收货",

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            util.ajaxs("order/sure_goods", param, res => {
              wx.showToast({
                title: "收货成功",
                icon: "none",
                mask: true
              });
              that.setData({
                currentId: 3,
                tabcontitem: [],
                page: 1,
                page_size: 10
              });

              if (list[index].is_refund == 1) {
                that.getData();
              } else {
                that.getData(); // wx.setStorageSync('modelType', 1)
                // wx.switchTab({
                //   url: '/pages/jctbxzjx/jctbxzjx?id=21&type=2&content=教材同步学习教学&md_id=7',
                // })
              } // list[index].status = 2
              // that.setData({
              //   tabcontitem: list
              // })
            });
          }
        }
      });
    },

    /**
     * 删除订单
     */
    deleteFun(e) {
      var that = this;
      var list = that.tabcontitem;
      wx.showModal({
        title: "提示",
        content: "是否删除订单",

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const index = e.currentTarget.dataset.index;
            const param = {
              order_id: order_id
            };
            util.ajaxs("order/del", param, res => {

              wx.showToast({
                title: "删除成功",
                mask: true
              });
              list.splice(index, 1);
              that.setData({
                tabcontitem: list
              });
            });
          }
        }
      });
    },

    orderDetails(e) {
      var order_id = e.currentTarget.dataset.order_id;

      if (order_id) {
        wx.navigateTo({
          url:
            "/pages/onlinestore/orderdetails/orderdetails?order_id=" + order_id
        });
      }
    },

    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    },

    //去评价
    addComment(e) {
      let id = e.currentTarget.dataset.order_id;
      this.setData({
        refreshId: e.currentTarget.dataset.index
      });
      wx.navigateTo({
        url: "/pages/addComment/addComment?order_id=" + id
      });
    },

    //评价完毕后，回来删除已评价的数组下标
    deleteList() {
      let that = this;
      let arrlist = that.tabcontitem;
      arrlist.splice(that.refreshId, 1);
      that.setData({
        tabcontitem: arrlist,
        refreshId: "a"
      });
      wx.setStorage({
        //储存一个刷新值，返回到前一页然后获取到，有就进行刷新
        key: "refreshIds",
        data: "0"
      });
    }
  }
};
</script>
<style>
@import "./myOrder.css";
</style>