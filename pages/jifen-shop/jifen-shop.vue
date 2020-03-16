<template>
	<view>
		<view class="banner">
			<cover-view>banner</cover-view>
			<image src="" style="width: 750rpx;height: 260rpx;" mode="aspectFit"></image>
		</view>
		<view class="jifen">
			<image src="../../static/jifenshop/jf.png" style="width: 52rpx;height: 50rpx;"></image>
			<text class="jifenTxt" style="color: #f7b500;font-size: 36rpx;font-weight: 500;">900积分</text>
		</view>
		<view>
			<view class="title">
				<image src="../../static/jifenshop/meirirexiao.png" style="width: 230rpx;height: 32rpx;"></image></view>
			<view class="product-hot">
				
				<view class="uni-product" v-for="(item,index) in goodsList" :key="index">
					<navigator url="jifen-detail/jifen-detail" @click="gotoDetails()">
					<view class="image-view">
						<!-- <image v-if="renderImage" class="uni-product-image" :src="item.image"></image></view> -->
						<image :src="item.icon" style="width:200rpx ;height: 180rpx;" mode="aspectFit"></image>
					</view>
					<view class="goods-detail">
						<view class="uni-product-title">{{ item.name }}</view>
						<view class="uni-product-price">
							<view class="goods-price" style="font-size: 22rpx;">
								{{ item.total_sale }}
								<text style="font-size:22rpx ;color: #999999;">积分</text>
							</view>
							<view style="font-size: 22rpx;color: #999999;">{{ item.see_time }}人兑换</view>
						</view>
					</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	  ajax
	 } from '../../utils/public.js'
export default {
	data() {
		return {
		   goodsList:[],
		};
	},
	created() {
		ajax({
		     url: 'integral/goodsList',
		     data: {
		     },
		     method: 'POST',
		     success: function(res) {
					 const{count,list}=res.data.data
					 // console.log(list)
					 this.goodsList = list
					 console.log(this.goodsList)
		     },
		     error: function() {}
		    })
	},
	methods: {
		gotoDetails:function(e){
			let goods_id = e.id
			uni.navigateTo({
				url: '../product-detail/product-datail?productName=' + encodeURIComponent(JSON.stringify(goods_id))
			});
		},
	}
};
</script>

<style>
@import './jifen-shop.css';
</style>
