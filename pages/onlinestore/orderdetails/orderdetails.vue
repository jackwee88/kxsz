<template>
<view>
<view class="statusShow">
  <view class="statusleft">
    <view class="orderStatus">{{details.status_name}}</view>

  </view>
  <view class="statusright">
    <image class="carImg" src="/static/img/onlinestore/car.png"></image>
  </view>
</view>
<view class="delivery clear">
  <view class="logistics clear" v-if="details.logistics.length != 0">
    <view class="logistics-left">
      <image class="cion" src="/static/img/onlinestore/wuliu.png"></image>
    </view>
    <view class="logistics-right clear">
      <view class="logistics-details">{{details.logistics[0].context}}</view>
      <view class="time">{{details.logistics[0].time}}</view>
    </view>
  </view>
  <view :class="'address clear ' + (details.logistics.length == 0 ? 'if-wuli':'')">
    <view class="address-left">
      <image class="cion" src="/static/img/onlinestore/address.png"></image>
    </view>
    <view class="address-right">
      <view class="user">{{details.username}}<text class="tel">{{details.mobile}}</text>
      </view>
      <view class="address">{{details.province}} {{details.city}} {{details.area}} {{details.address}}</view>
    </view>
  </view>
</view>

<view class="sureorder clear">
  <view class="store">
    <view class="store-title-view">
      <view class="store-title">商品信息</view>
    </view>

    <block v-for="(items, index) in details.goods" :key="index">
      <view class="storeList clear">
        <view class="store_left stroedetail">
          <image class="storeimg" :src="items.image"></image>
        </view>
        <view class="store_mid stroedetail clear">
          <text class="title over" style="-webkit-line-clamp:3;">{{items.goods_name}}</text>
          <text class="guankan over" style="-webkit-line-clamp:1;">{{items.goods_attr}}</text>
          <text class="guankan">{{items.content}}</text>
        </view>
        <view class="store_right stroedetail clear">
          <text class="unit">￥{{items.price}}</text>
          <text class="number">X {{items.quantity}}</text>
          <!-- <text class='total'>总计：￥{{items.real_money}}</text> -->
        </view>
      </view>

      <view class="send-title" v-if="items.video.length!=0" style>配套视频包</view>
     
      <view class="storeList clear" v-if="items.video" v-for="(videoitems, index2) in items.video" :key="index2">
        <view class="store_left stroedetail">
          <image class="storeimg" :src="videoitems.thumb"></image>
        </view>
        <view class="store_mid stroedetail clear">
          <text class="title">{{videoitems.title}}</text>
        </view>
        <!-- <view class='store_right stroedetail clear'>
        <text class='unit'>￥{{items.price}}</text>
        <text class='number'>{{items.quantity}}</text>
        <text class='total'>总计：￥{{items.real_money}}</text>
      </view> -->
      </view>
 <view class="send-title" v-if="items.bindpacks.length!=0" style>视频礼包</view>
      <view class="storeList clear" v-if="items.bindpacks" v-for="(bindpacksitems, index2) in items.bindpacks" :key="index2">
        <view class="store_left stroedetail">
          <image class="storeimg" :src="bindpacksitems.icon"></image>
        </view>
        <view class="store_mid stroedetail clear">
          <text class="title">{{bindpacksitems.title}}</text>
        </view>
        
      </view>

    </block>
    <view class="orderButton">
      <block v-if="details.refund_status == 1">
        <view class="button" v-if="(details.status==0 &&  details.is_refund==1) || (details.status==1 &&  details.is_refund==1) || (details.status==2 && details.is_refund==1)" :data-order_id="details.order_id" @tap="returnFun">退货</view>
        
        <view class="button" v-if="details.status==1" :data-order_id="details.order_id" @tap="confirm">确认收货</view>
        <view class="button" v-if="details.status==-2" :data-order_id="details.order_id" @tap="cancle">取消订单</view>
        <view class="button" v-if="details.status==-2" :data-order_id="details.order_id" @tap="pay">付款</view>
        <view class="button" v-if="details.status==0" :data-order_id="details.order_id" @tap="reminder">催单</view>
        <view class="button" v-if="details.status==2" :data-order_id="details.order_id" @tap="deleteFun">删除订单</view>
        <!-- <view class="button" wx:if="{{details.status==3}}">已取消</view> -->
        <!-- <view class="button" wx:if="{{details.is_activation == 0 && details.if_have_activate &&(details.status==1 || details.status==2)}}" data-order_id="{{details.order_id}}" bindtap='activate'>视频激活</view> -->
      </block>

    </view>

    <view calss="price">
      <view calss="price-details">
        <view class="price-one">
          <view class="price-left">商品总价</view>
          <view class="price-right">￥{{details.prices}}</view>
        </view>
        <view class="price-one">
          <view class="price-left">运费（快递）</view>
          <view class="price-right">￥{{details.transport}}</view>
        </view>
        <view class="price-total">
          <view class="price-left">订单总价</view>
          <view class="price-right">￥{{details.amount}}</view>
        </view>
      </view>
      <view class="price-result">
        <view class="price-left">实付款</view>
        <view class="price-right">￥{{details.real_money}}</view>
      </view>
    </view>
  </view>
</view>
<view class="sureorder">
  <view class="order-body">
    <view class="store-title-view">
      <view class="store-title">订单信息</view>
    </view>
    <view class="order-list">
      <view class="order">订单编号：{{details.order_sno}}</view>
      <view class="order">创建时间：{{details.createtime}}</view>
      <view class="order" v-if="details.status > -2">付款时间：{{details.pay_time}}</view>
      <view class="order" v-if="details.status > 0">发货时间：{{details.send_time}}</view>
      <view class="order" v-if="details.mark">订单备注：{{details.mark}}</view>
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
      order_id: 0,
      details: {}
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (options.order_id) {
      that.setData({
        order_id: options.order_id
      });
    } else {
      wx.navigateBack({});
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var param = {
      order_id: that.order_id
    }; //api/order/orderDetail

    util.ajaxs('order/orderDetail', param, res => {
      that.setData({
        details: res.data
      });
    });
  },

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
  onShareAppMessage: function () {},
  methods: {
	setData(param) {
		for (const key in param) {
			const element = param[key];
			this[key] = element
		}
	},
    /**
    * 取消订单
    */
    cancle(e) {
      var that = this;
      wx.showModal({
        title: '提示',
        content: '是否确认取消订单',

        success(res) {
          if (res.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            util.ajaxs('order/cancle', param, ress => {
              // //删除订单
              wx.showToast({
                title: ress.msg,
                icon: 'none',
                mask: true
              });
              that.onShow();
            });
          }
        }

      });
    },

    /**
    * 支付订单
    */
    pay(e) {
      const order_id = e.currentTarget.dataset.order_id;
      wx.showModal({
        title: '提示',
        content: '是否确认付款',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs('paygoods/repay', param, res => {
              console.log(res.data);
              wx.requestPayment({
                timeStamp: String(res.data.timeStamp),
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                success: function (payres) {
                  console.log(payres);
                  wx.showToast({
                    title: '支付成功，正在查询订单',
                    icon: 'none',
                    mask: true
                  });
                  setTimeout(function () {
                    that.onShow();
                  }, 3000);
                },
                fail: function () {// wx.showModal({
                  //   title: '错误提示',
                  //   content: '支付失败',
                  //   showCancel: false
                  // })
                },
                complete: function () {// complete
                }
              });
            });
          } else if (ress.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    /**
    * 视频激活
    */
    activate(e) {
      wx.showModal({
        title: '提示',
        content: '是否确认激活，激活后订单不可退',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs('order/videoactive', param, res => {
              wx.showToast({
                title: "已激活视频",
                icon: 'none',
                mask: true
              });
              setTimeout(function () {
                that.onShow();
              }, 1000);
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
        title: '提示',
        content: '是否确认催单',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs('order/reminder', param, res => {
              console.log(res.data);
              wx.showToast({
                title: "已收到您的催单信息",
                icon: 'none',
                mask: true
              });
            });
          }
        }

      });
    },

    /**
    * 退货
    */
    returnFun(e) {
      const order_id = e.currentTarget.dataset.order_id;
      wx.showModal({
        title: '提示',
        content: '是否确认退货',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            var that = this;
            util.ajaxs('order/returnGoods', param, res => {
              wx.showToast({
                title: "已申请退货",
                mask: true
              });
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
      wx.showModal({
        title: '提示',
        content: '是否确认收货',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            util.ajaxs('order/sure_goods', param, res => {
              wx.showToast({
                title: "收货成功",
                icon: 'none',
                mask: true
              });

              if (that.details.is_refund == 1) {
                that.onShow();
              } else {
                that.onShow(); // wx.setStorageSync('modelType', 1)
                // wx.switchTab({
                //   url: '/pages/jctbxzjx/jctbxzjx?id=21&type=2&content=教材同步学习教学&md_id=7',
                // })
              }
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
      wx.showModal({
        title: '提示',
        content: '是否删除订单',

        success(ress) {
          if (ress.confirm) {
            const order_id = e.currentTarget.dataset.order_id;
            const param = {
              order_id: order_id
            };
            util.ajaxs('order/del', param, res => {
              console.log(res.data); //删除订单

              wx.showToast({
                title: "删除成功",
                icon: 'none',
                mask: true
              });
              wx.navigateBack({});
            });
          }
        }

      });
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
@import "./orderdetails.css";
</style>