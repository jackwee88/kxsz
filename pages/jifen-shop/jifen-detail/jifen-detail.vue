<template>
  <view>
    <!-- 商品详情 -->
    <swiper :autoplay="true" :interval="3000" :duration="1000" class="detailPicture">
      <block v-for="(item, index) in swiperImages" :key="index">
        <swiper-item>
          <view class="detailPicture">
            <image :src="item" style="width: 100%;height: 660rpx;" />
          </view>
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品价格 库存 -->
    <view class="product-detail">
      <view class="beij">
        <text style="color: #e33944;margin-right: 12rpx;">{{ goodsDetail.score }}</text>
        <text style="color: #e33944;font-size: 24rpx;">积分</text>
      </view>
      <view>
        <text
          style="color: #A1A4A5;font-size: 28rpx;margin-right: 12rpx;"
        >已兑换{{ goodsDetail.total_sale }}</text>
        <!-- <text style="color: #A1A4A5;font-size: 28rpx;">库存59</text> -->
      </view>
    </view>
    <view class="product-title">
      <view class="productTxt">
        <text style="font-size: 30rpx;
				color: #333333;font-weight: bolder;">
          <!-- 			{{ banner.title }} -->
          {{ goodsDetail.name }}
        </text>
      </view>

      <navigator class="btn-share">
        <image src="../../../static/onlineStore/share.png" style="width:30rpx ;height: 28rpx;" />
        <text style="color:#b3b3b3;font-size: 28rpx;">分享</text>
      </navigator>
    </view>
   <view class="address"  @tap="linkTo">
      <text class="txt-address">地址</text>
      <view class="choose-address">{{ address.provice }}{{ address.city }}{{ address.area }}{{ address.address }}</view>
      <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
    </view>
    <view class="pic-txt-detail">
      <view>图文详情</view>
      <view v-for="(item, index) in swiperImages" :key="index" class="detailPicture">
        <image :src="item" style="width: 100%;height: 650rpx;" />
      </view>
    </view>
    <!-- 加入购物车  固定-->
    <view class="oprate">
      <view class="oprate-content">
        <button size class="bth-gwc" @tap="exchange" type="submit">立即兑换</button>
      </view>
    </view>
  </view>
</template>

<script>
import { ajax } from "../../../utils/public.js";
export default {
  data() {
    return {
      detailPicture: [],
      swiperImages: [],
      goods_id: "",
			address: {},
			total: 0.0,
			transport_total: 0,
      teamlist: [
        {
          name: "与女无瓜",
          num: "1"
        },
        {
          name: "与女无瓜",
          num: "1"
        }
      ],
      goodsDetail: "",
      id: "",
      ar_id: "",
			ct_id:'',
			
    };
  },
  onLoad(event) {
    this.banner = JSON.parse(decodeURIComponent(event.productName));
    this.id = this.banner.goods_id;
  },
  mounted() {
    ajax({
      url: "integral/goodsDetail",
      data: {
        goods_id:this.id
        // goods_id: "1"
      },
      method: "POST",
      success: (res) => {
        this.goodsDetail = res.data.data;
        const { image_text } = res.data.data;
        this.swiperImages = image_text;
      },
      error: function() {}
    });
  },
  methods: {
		linkTo: function() {
			wx.navigateTo({
				url:'../../shoppingcart/shaddress/shaddress'
					
			});
		},
    exchange() {
      ajax({
        url: "integral/placeOrder",
        data: {
          goods_id:this.id,
          ar_id: this.address.ar_id
        },
        method: "POST",
        success: res => {
          uni.showToast({
            title: res.data.msg,
            duration: 1000
          });
        },
        error: function() {}
      });
    }
  }
};
</script>

<style style lang="less" scoped>
@import "./jifen-detail.css";
.address {
  margin-top: 12rpx;
}
.detailPicture {
  width: 750rpx;
  height: 660rpx;
}
.top_title {
  .input-wrap {
    height: 60rpx;
    background: rgba(239, 239, 239, 1);
    border-radius: 34rpx;
    width: 70%;
    .search {
      width: 32rpx;
      height: 34rpx;
      margin-left: 50rpx;
      margin-right: 22rpx;
    }
    .input {
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333;
      line-height: 60rpx;
    }
  }
  .icon1 {
    width: 18rpx;
    height: 32rpx;
  }

  .icon2 {
    height: 44rpx;
    width: 44rpx;
  }
  .swiper-item {
    height: 660rpx;
    width: 100%;
  }
}
</style>
