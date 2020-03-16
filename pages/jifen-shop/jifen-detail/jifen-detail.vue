<template>
	<view>
		<!-- 商品详情 -->
		<view class="product-banner">
		<swiper class="goods-adverse" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(data, index) in swiperImges" :key="index">
				<swiper-item>
					<view class="swiper-item">
						<navigator :url="data.to_url" open-type="navigate">
							<image :src="data.pic_url" class="banner" style="width: 100%;height: 650rpx;" mode="aspectFill"></image>
						</navigator>
					</view>
				</swiper-item>
			</block>
		</swiper>
			<!-- <image :src="banner.title" style="width: 750rpx;height: 650rpx;" mode="aspectFit"></image> -->
		</view>
		<!-- 商品价格 库存 -->
		<view class="product-detail">
			<view class="beij">
				<text style="color: #e33944;margin-right: 12rpx;">488</text>
				<text style="color: #e33944;font-size: 24rpx;">积分</text>
			</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;margin-right: 12rpx;">已兑换277</text>
				<text style="color: #A1A4A5;font-size: 28rpx;">库存59</text>
			</view>
		</view>
		<view class="product-title">
			<view class="productTxt">
				<text
					style="font-size: 30rpx;
				color: #333333;font-weight: bolder;"
				>
					<!-- 			{{ banner.title }} -->
					雨女无瓜雨女无瓜雨女无瓜雨女无瓜雨女无瓜
				</text>
			</view>

			<navigator class="btn-share">
				<image src="../../static/onlineStore/share.png" style="width:30rpx ;height: 28rpx;"></image>
				<text style="color:#b3b3b3;font-size: 28rpx;">分享</text>
			</navigator>
		</view>
		<!-- 地址 -->
		<navigator url="" class="address">
			<text class="txt-address">地址</text>
			<text class="choose-address">选择收货地址</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="address">
			<text class="txt-address">参数</text>
			<text class="choose-address">选择收货地址地址</text>
			<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="comment">
			<view class="choose-address">评价(999+)</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;">查看全部</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
			</view>
		</navigator>
		<view class="pic-txt-detail">
			<view>图文详情</view>
			<view><image src="" width="750rpx;height:1140rpx"></image></view>
		</view>
		<!-- 加入购物车  固定-->
		<view class="oprate">
			<view class="oprate-content">
					<button size="" class="bth-gwc">立即兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperImages: [],
			teamlist: [
				{
					name: '与女无瓜',
					num: '1'
				},
				{
					name: '与女无瓜',
					num: '1'
				}
			]
		};
	},
	// onLoad(event) {
	// 	console.log(event);
	// 	this.banner = JSON.parse(decodeURIComponent(event.detailDate));
	// 	uni.setNavigationBarTitle({
	// 	title:this.banner.title
	// 	})
	// },
	mounted() {},
	methods: {}
};
</script>

<style style lang="less" scoped>
@import './jifen-detail.css';
	.top_title{
		.input-wrap{
			height:60rpx;
			background:rgba(239,239,239,1);
			border-radius:34rpx;
			width: 70%;
			.search{
				width: 32rpx;
				height: 34rpx;
				margin-left: 50rpx;
				margin-right: 22rpx;
			}
			.input{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:#333;
				line-height:60rpx;
			}
		}
		.icon1{
			width: 18rpx;
			height: 32rpx;
		}
		.icon2{
			height: 44rpx;
			width: 44rpx;
		}
	}
</style>

