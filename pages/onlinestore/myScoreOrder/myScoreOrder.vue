<template>
  <view>
    <!--pages/onlinestore/myOrder/myOrder.wxml-->
    <view class="myorder">
      <view class="tabcont daifukuan">
        <view class="tabcontitem" v-for="(item, index) in tabcontitem" :key="index">
          <view class="tabconttitle" :data-order_id="item.order_id">
            <!-- <image class='tabconttitle_icon' src='/img/onlinestore/shopicon.png'> -->
            <text class="storename">订单号：{{item.order_sno}}</text>
            <text class="dealstate waitfukuan">{{item.status_text}}</text>
          </view>
          <view class="storedetail">
            <view class="tableftimg tabfloct">
              <image class="productimg" :src="item.image" />
            </view>
            <view class="tabright tabfloct">
              <view class="title over">{{item.name}}</view>
              <!-- <view class="title over" style="color:#999">{{item.goods_attr}}</view> -->
              <!-- <text class='baozhuang'>礼盒装</text> -->
              <!-- <view class="storemoney">
                  <text class="money">¥{{item.price}}</text>
                  <text class="storenum">x{{item.quantity}}</text>
              </view>-->
            </view>
          </view>
          <!-- <view class="amountmoney">
            <view class="amountcont">
              <text class="zonggong">共{{item.sum}}件商品</text>
              <text>合计：¥{{item.amount}}</text>
            </view>
          </view>-->
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
      tabcontitem: [],
      page: 1,
      page_size: 5,
      isFinish: false
    };
  },

  components: {},
  mounted() {
    this.getData();
  },
  onReachBottom() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.isFinish) return;
      util.ajaxs(
        "integral/orderList",
        {
          page: this.page,
          page_size: this.page_size
        },
        res => {
          this.tabcontitem = this.tabcontitem.concat(res.data.list);
          if (res.data.count == this.page) {
            this.isFinish = true;
          } else {
            this.page += 1;
          }
        }
      );
    }
  }
};
</script>
<style>
@import "./myScoreOrder.css";
</style>