<template>
	<view class="container">
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		<view class="top_title">
			<navigator open-type="navigateBack"><image src="/static/onlineStore/back@2x.png" mode="aspectFit" class="icon1"></image></navigator>
			<view class="input-wrap flex">
				<image class="search" src="/static/onlineStore/ss@2x.png" @click="searchGoods" />
				<input placeholder="一年级上册…" placeholder-class="placeholder-class" class="input" v-model="input" />
			</view>
			<navigator url="../shoppingcart/shoppingcart"><image src="/static/index/gwc.png" mode="" class="icon2"></image></navigator>
		</view>

		<scroll-view class="list-scroll-content" scroll-y>
			<view class="swiper-item">
				<!-- 轮播 -->
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-active-color="#008800">
					<block v-for="(data, index) in swiperImges" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<navigator :url="data.to_url" open-type="navigate">
									<image :src="data.pic_url" class="banner" style="width: 100%;height: 332rpx;" mode="aspectFit"></image>
								</navigator>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- gonggao -->
			<!-- 新品上市 -->
			<view class="new-goods">
				<image src="../../static/onlineStore/xpss.png" style="width:182rpx;height: 78rpx;" mode="aspectFit"></image>
				<view class="recommend">推荐</view>
				<view class="marquee-bg" @tap.stop="toAnnouncement" :data-url="toAn">
					<image src="/static/img/index/1@2x.png" class="bg-text"></image>
					<view class="marquee_container" :style="'--marqueeWidth--:' + marqueeW + ';--allTs--:' + allT + ';'">
						<view class="marquee_text" :style="'font-size:' + size + 'px'">{{ content_t }}</view>
					</view>
				</view>
			</view>
			<!-- 广告链接 -->
			<view class="adver" :style="{ display: isClose == true ? 'none' : 'block' }">
				<image class="ggxbq" src="/static/onlineStore/ggxbq@2x.png" />
				<image class="close" @tap="close" src="/static/onlineStore/close-circle@2x.png" />
				<view class="adversity"><image src="/static/onlineStore/gg@2x.png" mode="aspectFit" style="width: 100%;height: 196rpx;"></image></view>
			</view>
			<!-- 限时秒杀 -->
			<view class="limitedTime">
				<image src="../../static/onlineStore/xsms.png" style="width: 150rpx;height: 98rpx;" mode="aspectFit"></image>
				<view class="flex" style="margin-left: 20rpx;">
					<text style="font-size: 24rpx;" @tap="xsmsDetails(flashSale.p_id)" :data-id="flashSale.p_id" :data-hour="hour" :data-minute="minute" :data-second="second">{{ flashSale.p_name }}</text>
					<!-- <text class="red">时间仅剩</text> -->
					<uni-countdown backgroundColor="#545458" color="#ffffff" :hour="hour" :minute="minute" :second="second" :showDay="false"></uni-countdown>
				</view>
			</view>
			<!-- 商品推荐 -->
			<view class="recommend-banner">
				<swiper previous-margin="96rpx" circular="true" next-margin="360rpx" style="height: 350rpx;">
					<swiper-item class="flex" v-for="(item, index) in bannerList" :key="index">
						<view class="banner-item" :data-id="item.goods.p_id" @tap.stop="gotoDetails(item.goods.p_id)">
							<image class="banner-icon" :src="item.goods.icon" />
							<view class="goods-price">¥{{ item.price }}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="banner-title"><text style="font-size:48rpx;color:#3FAE2A ;">——将成团——</text></view>
			<!-- 商品推荐 -->
			<view class="recommend-footer">
				<view class="recommend-list" v-for="(item, index) in joinAssembleList" :key="index">
					<view class="uni-product" @tap.stop="gotoDetails(item.goods.p_id)" :data-id="item.goods.p_id">
						<view class="image-view">
							<!-- <image v-if="renderImage" class="uni-product-image" :src="item.image"></image></view> -->
							<image :src="item.goods.icon" style="width:220rpx ;height: 200rpx;" mode="aspectFit"></image>
						</view>
						<view class="goods-detail">
							<view class="uni-product-title">{{ item.goods.p_name }}</view>
							<view class="uni-product-price">
								<view style="font-size:28rpx ;">
									团购价:
									<text class="goods-price" style="font-size: 32rpx;">￥{{ item.assemble.price }}</text>
								</view>
								<view style="font-size: 28rpx;">
									团购价:
									<text class="goods-price" style="font-size: 32rpx;">￥{{ item.goods.p_cityprice }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 为您推荐 -->
				<view class="recommend-image"><image src="../../static/onlineStore/wntj.png" style="width: 224rpx;height: 30rpx;"></image></view>
				<view class="recommend-ruler">
					<view class="uni-ruler" v-for="(item, index) in productList" :key="index">
						<view class="image-ruler">
							<!-- <image v-if="renderImage" class="uni-product-image" :src="item.image"></image></view> -->
							<image :src="item.image" style="width:330rpx ;height: 350rpx;" :data-id="item.p_id" @tap.stop="gotoDetails(item.p_id)"></image>
						</view>
						<view class="goods-detail">
							<view class="uni-product-title">{{ item.p_name }}</view>
							<view class="uni-product-price">
								<text style="font-size:28rpx ;color:#666666" class="subtitle">{{ item.p_detail }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import screenTextScroll from '@/components/p-screenTextScroll/screenTextScroll.vue';
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			marqueeW: 0,
			content_t: '',
			allT: '0s',
			toAn: '',
			size: 14,
			announcement: '',
			gonggao: '',
			input: '',
			leftWords: '',
			rightWords: '',
			rightIcon: '',
			tabindex: 1,
			tabIndex: 0, //选中标签栏的序列
			contentList: ['分类', '分类', '分类', '分类', '分类'],
			swiperImges: [],
			isClose: false,
			flashSale: {},
			productList: [],
			renderImage: false,
			joinAssembleList: [],
			page: 1,
			pagesize: 10,
			hour: 0,
			minute: 0,
			second: 0,
			moveTimes: 8,
			p_id: '',
			swiperHeight: 0,
			bannerList:[]
		};
	},
	components: {
		uniCountdown,
		screenTextScroll
	},
	onLoad() {
		this.getHotGoods();
		this.getData();
		this.getAboutUs();
		this.getflashtime();
		this.getNewgoods();
	},
	created() {},
	mounted() {
		// 换地址
		ajax({
			url: 'index/shopBanner',
			data: {},
			success: res => {
				this.swiperImges = res.data.data.list;
			}
		});
	},
	methods: {
		getAboutUs() {
			ajax({
				url: 'index/getSystem',
				data: { type: '16' },
				success: res => {
					this.gonggao = res.data.data;
				}
			});
		},
		// 秒杀详情
		xsmsDetails: function(id) {
			uni.navigateTo({
				url: '../product-detail/product-detail?gd_id=' + id
			});
		},
		getData() {
			ajax({
				url: 'assemble/joinAssemble',
				data: {
					page: this.page,
					pagesize: this.pagesize
				},
				method: 'POST',
				success: res => {
					const { list, count } = res.data.data;
					this.joinAssembleList = list;
					this.bannerList = list
					// console.log(count);
				},
				error: function() {}
			});
		},
		timeChange(value) {
			var lastTime = parseInt(value);
			if (lastTime > 60) {
				var middle = parseInt(lastTime / 60);
				lastTime = parseInt(lastTime % 60);
				if (middle > 60) {
					var hour = parseInt(middle / 60);
					middle = parseInt(middle % 60);
					this.hour = hour; //小时
				}
			}
			var result = parseInt(lastTime);
			this.second = result; //秒
			if (middle > 0) {
				var minute = parseInt(middle);
				this.minute = minute;
			}
			if (hour > 0) {
				var hour = parseInt(hour);
				this.hour = hour;
			}
			return result;
		},
		getflashtime() {
			ajax({
				url: 'assemble/flashSale',
				data: {},
				success: res => {
					const { count, list } = res.data.data;
					this.flashSale = list[0].goods;
					this.bannerList = list
					console.log(this.bannerList)
					console.log(this.flashSale);
					// 获取当前时间戳
					let timeNoew = new Date().getTime() / 1000;
					if (timeNoew > list[0].endtime) {
						console.log('秒杀结束');
					} else if (timeNoew < list[0].createTime) {
						console.log('秒杀未开始');
					} else {
						var lastTime = list[0].endtime - timeNoew; //(当前时间距离秒杀结束的秒)
						// 然后将秒转化成时间  (定时器每秒更新一次)
						this.timeChange(lastTime);
					}
				}
			});
		},
		getNewgoods() {
			let that = this;
			var screenW = wx.getSystemInfoSync().windowWidth; //获取屏幕宽度
			var width = 200;
			ajax({
				url: 'index/announcement',
				data: {},
				success: res => {
					// if (!res.data.title){
					//   return
					// }
					if (!res.data.data.title) {
						return false;
					}

					var contentW = res.data.data.title.length * this.size; //获取文本宽度（大概宽度）
					(this.marqueeW = -contentW + 'px'), (this.content_t = res.data.data.title), (this.toAn = res.data.data.url), (this.announcement = res.data.data);
					var allT = (contentW / width) * this.moveTimes;
					allT = allT < 8 ? 8 : allT; //不够一平-----最小滚动一平时间

					// marqueeW: -contentW + "px",
					this.allT = allT + 's';
				}
			});
		},
		gotoDetails: function(id) {
			uni.navigateTo({
				url: '../product-detail/product-detail?gd_id=' + id
			});
		},
		getHotGoods() {
			let that = this;
			ajax({
				url: 'shop/goods',
				data: {},
				success: res => {
					console.log(res.data.data);
					const { count, list } = res.data.data;
					this.productList = list;
				}
			});
		},
		toAnnouncement(e) {
			var url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: url
			});
		},
		searchGoods() {
			let param = {
				input: this.input
			};
			uni.navigateTo({
				url: './searchGoods?searchInput=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		close() {
			this.isClose = true;
		}
	}
};
</script>

<style style lang="less" scoped>
@import './onlinestore.css';
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: #f8f8f8;
}
.flashgoods {
	background-color: pink;
	
}
.subtitle {
	color: rgba(102, 102, 102, 1);
	line-height: 40rpx;
	line-height: 40rpx;
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.title {
	font-size: 28rpx;
	font-weight: 500;
	color: rgba(50, 50, 50, 1);
	line-height: 40rpx;
	height: 40rpx;
	overflow: hidden;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}
page,
.container {
	min-height: 100%;
	height: 100%;
	// background-color: rgba(239, 239, 239, 0.3);
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
		border: 2rpx solid #3FAE2A;
	}
	.banner-item {
		padding-top: 4rpx;
		width: 262rpx;
		height: auto;
		margin-right: 36rpx;
		box-sizing: border-box;
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
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 30rpx;
	.uni-product-title {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		font-size: 28rpx;
		color: rgba(50, 50, 50, 1);
		line-height: 40rpx;
		height: 40rpx;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
}
/*頭部搜索*/
.top_title {
	margin-bottom: 10rpx;
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

/*广告*/
.adver {
	position: relative;
	width: 100%;
	// background-color: pink;
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
</style>
