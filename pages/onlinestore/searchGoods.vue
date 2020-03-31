<template>
	<view class="container">
		<view class = "status-bar"></view>
		<view class="top_title">
			<navigator open-type="navigateBack">
				<image src="/static/onlineStore/back@2x.png" mode="aspectFit" class="icon1"></image>
				</navigator>
			<view class="input-wrap flex">
				<image class="search" src="/static/onlineStore/ss@2x.png"  @click="searchGoods"/>
				<input  placeholder-class="placeholder-class" class="input" v-model="input"/>
			</view>
			<navigator url=""><image src="/static/index/gwc.png" mode="" class="icon2"></image></navigator>
		</view>
					<!-- 商品推荐 -->
					<view class="recommend-footer">
						<view class="recommend-list" v-for="(item, index) in productList" :key="index">
							<view class="uni-product" @click="gotoDetails(item)">
								<view class="image-view">
									<!-- <image v-if="renderImage" class="uni-product-image" :src="item.image"></image></view> -->
									<image :src="item.image" style="width:220rpx ;height: 200rpx;" mode="aspectFit"></image>
								</view>
								<view class="goods-detail">
									<view class="uni-product-title">{{ item.p_detail }}</view>
									<view class="uni-product-price">
										<view style="font-size:28rpx ;">
											价格:
											<text class="goods-price" style="font-size: 32rpx;">￥{{ item.coupon_price }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>

					</view>
	</view>
</template>
<script>
import { ajax} from '../../utils/public.js';
export default {
	data() {
		return {
			input: '',
			productList:[],
		};
	},
	components: {
	},

	onLoad(event) {
		this.search = JSON.parse(decodeURIComponent(event.searchInput));
		this.input = this.search.input
		this.searchGoods()
	},
	mounted() {
		
	},
	methods: {
		gotoDetails: function(e) {
			let param = {
				id: e.p_id
			};
			console.log(param);
			uni.navigateTo({
				url: '../product-detail/product-detail?gd_id=' + e.p_id
			});
		},
		searchGoods(){
			ajax({
				url:'goods/searchGoods',
				data:{
					keyword:this.input
				},
				method:'POST',
				success:(res)=>{
					console.log(res.data)
					const {count,list} = res.data.data
					this.productList = list
				}
			})
		},


	}
};
</script>

<style style lang="less" scoped>
@import './onlinestore.css';
page,
.container {
	min-height: 100%;
	height: 100%;
	// background-color: rgba(239, 239, 239, 0.3);
}
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: #f8f8f8;
}
.uni-product-title{
	max-height: 130upx;
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	}
	
.list-scroll-content {
	height: 100%;
}
.red {
	font-size: 28rpx;
	margin-right: 18rpx;
	color: #e02020;
}
/*商品推荐*/
.recommend-banner {
	.banner-icon {
		width: 100%;
		height: 244rpx;
		border: 2rpx solid rgba(63, 174, 42, 1);
	}
	.banner-item {
		padding-top: 4rpx;
		width: 262rpx;
		height: auto;
		margin-right: 36rpx;
	}
}
/*時間僅剩*/
/deep/.uni-countdown__number {
	width: 48rpx;
	height: 48rpx;
	border-radius: 4rpx;
}
/*将成团*/
.uni-product {
	.goods-detail {
		margin-top: 0;
		margin-left: 12rpx;
	}
}
/*爲你推薦*/
.recommend-ruler {
	.uni-product-title {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}
}
/*頭部搜索*/
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
}
/*tab*/
.tabBars-content {
	width: 92%;
	.tabBars {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		.tabBars-item {
			width: 20%;
			text-align: center;
			font-size: 32rpx;
			font-family: PingFangSC-Light, PingFang SC;
			font-weight: 300;
			color: rgba(51, 51, 51, 1);
			&.active {
				font-size: 40rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
}
.more {
	width: 32rpx;
	height: 26rpx;
}
/*根据tab加载不同内容*/
/*輪播圖*/
/deep/uni-swiper .uni-swiper-dot {
	width: 12rpx;
	height: 12rpx;
}
/deep/uni-swiper .uni-swiper-dot-active {
	background: rgba(63, 174, 42, 1);
}
.uni-tab-content {
	margin-top: 26rpx;
}
.swiper-box {
	height: 100%;
	overflow-y: scroll;
	box-sizing: border-box;
	background-color: rgba(239, 239, 239, 0.3);
	/*广告*/
	.adver {
		position: relative;
		width: 100%;
		background-color: pink;
		.ggxbq {
			width: 80rpx;
			height: 40rpx;
		}
		.close {
			position: absolute;
			top: 0;
			right: 16rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}
}
</style>

