<template>
	<!--页面路径 pages/index/index -->
	<view class="index_page">
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="top_title">
			<text>开心书写</text>
			<navigator url="../shoppingcart/shoppingcart"><image src="../../static/index/gwc.png" mode=""></image></navigator>
		</view>
		<!-- 轮播 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(data, index) in swiperImges" :key="index">
				<swiper-item>
					<view class="swiper-item">
						<navigator :url="data.to_url" open-type="navigate"><image :src="data.pic_url" class="banner"></image></navigator>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<view class="menu_wrap">
			<view class="menu_item" v-for="(item, index) in indexList">
				<navigator :url="item.to_url">
					<image :src="item.pic_url" mode=""></image>
					<text>{{ item.content }}</text>
				</navigator>
			</view>
		</view>

	<!-- 	<view class="menu_wrap">
			<navigator url="../publishedDiary/publishedDiary">
				<image src="../../static/index/daka.png" mode=""></image>
				<text>打卡</text>
			</navigator>
			<navigator url="../studySquare/studySquare">
				<image src="../../static/index" mode=""></image>
				<text>成长广场</text>
			</navigator>
			<navigator url="../freeTeaching/freeTeaching">
				<image src="../../static/index/mfkc.png" mode=""></image>
				<text>免费课程</text>
			</navigator>
			<navigator url="../jifen-shop/jifen-shop">
				<image src="../../static/index/jxkc.png" mode=""></image>
				<text>积分商城</text>
			</navigator>
			<navigator url="../study-product/study-product">
				<image src="../../static/index/xxyp.png" mode=""></image>
				<text>学习用品</text>
			</navigator>
			<navigator url="../onlinestore/onlinestore">
				<image src="../../static/index/zxsc.png" mode=""></image>
				<text>在线商城</text>
			</navigator>
			<navigator url="../brain/brain">
				<image src="../../static/index/dnkf.png" mode=""></image>
				<text>大脑开发</text>
			</navigator>
		</view>
 -->
		<view class="section_title">
			<text class="recommend_title">推荐用品</text>
			<navigator url="../onlinestore/onlinestore">
				更多
				<image src="../../static/index/qj.png" mode=""></image>
			</navigator>
		</view>

		<view class="recommend">
			<navigator url="" v-for="(item,index) in ">
				<image src="../../static/index/zxsc.png" mode=""></image>
				<view class="info">
					<view class="title">书法尺</view>
					<view class="subtitle">练习书法常备用品</view>
				</view>
			</navigator>
			<navigator url="">
				<image src="../../static/index/zxsc.png" mode=""></image>
				<view class="info">
					<view class="title">书法尺</view>
					<view class="subtitle">练习书法常备用品</view>
				</view>
			</navigator>
			<navigator url="">
				<image src="../../static/index/zxsc.png" mode=""></image>
				<view class="info">
					<view class="title">书法尺</view>
					<view class="subtitle">练习书法常备用品</view>
				</view>
			</navigator>
		</view>

		<view class="section_title">
			<text>作品赏析</text>
			<navigator url="">
				更多
				<image src="../../static/index/qj.png" mode=""></image>
			</navigator>
		</view>
		<!-- 点击进入我的发表页 请求所有用户数据-->
		<view class="works_list">
			<view class="work_item" v-for="(item, index) in studylist" :key="index" >
				<view class="user_info">
					<view class="left_side">
						<view class="avatar"><image :src="item.avatar" class="avatar"></image></view>
						<view class="date">
							<view class="username">{{ item.nickname }}</view>
							<view>{{ item.createtime }}</view>
						</view>
					</view>
					<text class="view_count">浏览{{ item.browse_times }}次</text>
				</view>
				<view @click="gotoPublished(item)">
				<view class="msg">{{ item.content }}</view>
				<view class="gallery">
					<view v-for="(imageitem, imageIndex) in item.picture_arr" :key="imageIndex" class="imageList"><image :src="imageitem" mode=""></image></view>
				</view>
				</view>
				<view class="actions">
					<view class="item">
						<image src="../../static/index/zf.png" mode=""></image>
						<text>{{ item.shareNum }}</text>
					</view>
					<view class="item">
						<image src="../../static/index/pl.png" mode=""></image>
						<text>{{ item.comment_count }}</text>
					</view>
					<view class="item" @tap="praise(item)">
						<image v-if="item.is_give" src="../../static/index/collect.png"></image>
						<image v-else src="../../static/index/uncollect.png"></image>
						<text>{{item.thumbs_times }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 在线教程 -->
		<!-- <view class="const-list">
			<view class="const-line" v-for="(data, index) in onlineTeaching" :key="index">
				<view class="const-list-item">
					<navigator :url="data.to_url">
						<image :src="data.pic_url" mode="widthFix"></image>
						<text>{{ data.content }}</text>
					</navigator>
				</view>
			</view>
		</view> -->
		<!-- 精品推荐 -->
		<!-- <view class="recommend"><view class="recommendText">精品推荐</view></view> -->
		<!-- 精品推荐主内容 -->
		<!-- <view>
			<view class="recommend-item" v-for="data in recomItem" :key="data.id">
				<navigator url="/pages/growthDiary/growthDiary">
					<view class="item-top">
						<image
							class="touxiangicon"
							src="https://wx.qlogo.cn/mmopen/vi_32/99iaN59Fn6lNvW4gXAmaueWC2PCw3ycdjYwQ9c1TKaAz8EePsvN2bR5BDprHTJnXicgiaW88hicOHpVIo5W2PfLQRg/132"
							mode="widthFix"
						></image>
						<view class="info">
							<text class="title">{{ data.name }}</text>
							<text class="time">2019-08-29 17:03:55</text>
							<text class="time">浏览35次</text>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/myPublished/myPublished">
					<view class="item-middle">
						<view class="detail"><text class="conttext">真心觉得摒弃物质诱惑，好好带孩子感受书法，让孩子爱上书法，由内而外的兴趣才是学好书法的核心动力。</text></view>
						<view class="middle-image">
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode=""></image>
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode=""></image>
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode=""></image>
						</view>
					</view>
				</navigator>
				<view class="smallicon">
					<view class="smallicon-flex">
						<image src="../../static/index/uncollect.png" mode="widthFix" style="width: 38rpx;height: 36rpx;"></image>
						<text>10086</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/fx.png" mode="widthFix" style="width: 45rpx;height: 42rpx;"></image>
						<text>分享</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/messageicon.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<text>10086</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 上拉加载 -->
		<view class=""><uni-load-more :status="status" /></view>
		<!-- 签到 -->
		<view class="dakaciclecont_daka">
			<view class="dakaciclecont_daka_flex">
				<navigator url="/pages/my/daySignin/daySignin"><text>签到</text></navigator>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import '../public/rongyun.js';
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			//轮播图片
			swiperImges: [],
			indexList: [],
			page: 1,
			type: 1,
			page_size: 10,
			//在线教学图标
			onlineTeaching: [],
			status: 'more',
			banner: '',
			studylist: [],
			pictureList: [],
			statusTypes: [
				{
					value: 'more',
					text: '加载前'
				},
				{
					value: 'loading',
					text: '加载中'
				},
				{
					value: 'noMore',
					text: '没有更多'
				}
			],
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多'
			},
			recomItem: [
				{
					name: '测试1',
					id: 1
				}
			]
		};
	},
	components: {
		uniLoadMore
	},

	onLoad() {
		// var value = uni.getStorageSync('loginToken')
		// console.log(value)
		// uni.showModal({
		//     title: '提示',
		//     content: '这是一个模态弹窗',
		//     success: function (res) {
		//         if (res.confirm) {
		//             console.log('用户点击确定');
		//         } else if (res.cancel) {
		//             console.log('用户点击取消');
		//         }
		//     }
		// });
		// 			uni.$on('login', (usnerinfo) => {
		// 				//this.usnerinfo = usnerinfo;
		// 				console.log(usnerinfo);
		// 			});
		// 			// 登陆页面
		// 			uni.$emit('login', {
		// 				avatarUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/nav_menu/10.jpg',
		// 				token: 'user123456',
		// 				userName: 'unier',
		// 				login: true
		// 			});
		// 			uni.getProvider({
		// 				service: 'push',
		// 				success: function(res) {
		// 					console.log(res.provider)
		//
		// 					// 个推的名称为 igexin
		// 					if (~res.provider.indexOf('igexin')) {
		// 						uni.subscribePush({
		// 							provider: 'igexin',
		// 							success: function(res) {
		// 								console.log('success:' + JSON.stringify(res));
		// 							}
		// 						});
		// 					}
		// 				}
		// 			});
	},
	//下拉刷新
	onLoad() {
		this.getData();
	},
	// onLoad: function(options) {
	// 	var that = this;
	// 	that.setData({
	// 		page: 1,
	// 		page_size: this.page_size,
	// 		studylist: []
	// 	});
	// 	that.getData();
	// 	var pages = getCurrentPages();
	// 	var prevPage = pages[pages.length - 2];
	// 	prevPage.setData({
	// 		is_wait: '',
	// 		wait: ''
	// 	});
	// },
	onPullDownRefresh() {
		console.log('下拉');
		setTimeout(function() {
			uni.stopPullDownRefresh(); //结束下拉动画
		}, 1000);
	},
	//上拉加载
	onReachBottom() {
		let _self = this;
		_self.status = 'loading'; //赋值加载中
		this.load();
	},
	methods: {
		load: function() {
			let index = this.recomItem.length;
			let id = this.recomItem[index - 1].id;
			id++;
			if (id < 5) {
				let loadData = {
					name: '测试' + id,
					id: id
				};
				this.recomItem.push(loadData);
				this.status = 'more'; //赋值查看更多
			} else {
				this.status = 'noMore'; //赋值查看更多
			}
		},
		//转发
		onShareAppMessage: function(e) {
			if (e.from === 'button') {
				var nickname = e.target.dataset.nickname;
				var title = nickname + '的打卡日记';
				var image = e.target.dataset.image;
				var video = e.target.dataset.video;

				if (image) {
					var img = image;
				} else if (video) {
					var img = video + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast';
				}

				var that = this;
				return {
					title: title,
					path: '/pages/myPublished/myPublished?dy_id=' + e.target.dataset.dy_id + '&is_share=1',
					imageUrl: img,
					success: function(res) {}
				};
			} else {
				return {
					title: '开心书写',
					path: 'pages/index/index?myshare=1&tourl=/pages/studySquare/studySquare' // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
				};
			}
		},
		//点赞
		praise(e) {
			var that = this;
			const index = e.index;
			const dy_id = e.dy_id;
			console.log('123'+e.dy_id)
			ajax({
				url:'study/praiseStudy',
				data:{
					dy_id: dy_id
				},
				success:(res) => {
					const details = this.studylist;
					if (res.data.data.is_ok) {
						this.studylist.is_give=!details.is_give,
						this.studylist.thumbs_times = details.thumbs_times + 1
					} else {
						this.studylist.is_give=!details.is_give,
						this.studylist.thumbs_times = details.thumbs_times - 1
					}
				}
			});
		},
		getUserDetail: function() {},
		gotoPublished: function(e) {
			let param = {
				dy_id: e.dy_id,
				index: e.index,
				browse_times: e.browse_times,
				comment_count: e.comment_count,
				thumbs_times: e.thumbs_times
			};
			uni.navigateTo({
				url: '../myPublished/myPublished?pulishedDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		getData() {
			ajax({
				url: 'study/studyList',
				data: {
					page: this.page,
					page_size: this.page_size,
					type: this.type
				},
				success: res => {
					console.log(res);
					const { list, count } = res.data.data;
					this.studylist = list;
					console.log(this.studylist)
				},
				error: function() {}
			});
		}
	},
	mounted() {
		//https://kxsx.kaifadanao.cn/api/cate/smodelList
		//轮播图片、在线教学请求
		uni.request({
			url: 'https://kxsx.kaifadanao.cn/api/index/index',
			method: 'POST',
			data: {},
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			success: res => {
				if (res.data.status == 1) {
					//轮播图片数据
					this.swiperImges = res.data.data.banner;
					//在线教学数据
					this.onlineTeaching = res.data.data.smodel;
				}
			},
			fail: () => {},
			complete: () => {}
		});
		ajax({
			url: 'index/app',
			data: {},
			method: 'POST',
			success: res => {
				const { banner, smodel } = res.data.data;
				this.indexList = smodel;
				this.banner = banner;
				console.log(this.indexList + '123');
			},
			error: function() {}
		});
	}
};
</script>

<style lang="less">
@import './index.css';
.username {
	color: #323232;
	font-size: 28rpx;
	padding: 5rpx 0rpx;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: #f8f8f8;
}
.top_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	margin-bottom: 26rpx;

	text {
		font-size: 36rpx;
		font-weight: 500;
		color: rgba(50, 50, 50, 1);
		line-height: 50rpx;
	}

	image {
		width: 44rpx;
		height: 44rpx;
	}
}

.swiper {
	height: 248rpx;
	margin-bottom: 44rpx;

	.banner {
		width: 100%;
		height: 248rpx;
		border-radius: 8rpx;
	}
}
.works_list {
	.work_item {
		padding-bottom: 50rpx;
		margin: 30rpx 0 50rpx;
		border-bottom: 1rpx solid #ddd;
		&:last-of-type {
			border: 0;
		}
		.user_info {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left_side {
				display: flex;
				align-items: center;

				.date {
					font-size: 20rpx;
					color: rgba(153, 153, 153, 1);
					line-height: 1;
				}
			}

			.view_count {
				font-size: 20rpx;
				color: rgba(153, 153, 153, 1);
				line-height: 28rpx;
			}
		}

		.msg {
			margin-top: 20rpx;
			margin-bottom: 10rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(50, 50, 50, 1);
			line-height: 34rpx;
		}

		.gallery {
			display: flex;
			flex-direction: row;
		}

		.actions {
			display: flex;
			justify-content: space-around;
			margin-top: 38rpx;

			.item {
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: rgba(153, 153, 153, 1);
					line-height: 34rpx;
				}
			}
		}
	}
}

.menu_wrap {
	width: 100%;
	white-space: nowrap;
	overflow-x: scroll;
	display: flex;
	flex-direction: row;
	navigator,
	.menu_item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		width: 98rpx;
		margin-right: 46rpx;

		&:last-of-type {
			margin-right: 0;
		}
	}

	image {
		width: 72rpx;
		height: 72rpx;
		margin-bottom: 5rpx;
	}

	text {
		letter-spacing: 3rpx;
		font-size: 24rpx;
		color: rgba(102, 102, 102, 1);
		line-height: 34rpx;
	}
}

.section_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 44rpx 0 22rpx;

	text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(50, 50, 50, 1);
		line-height: 40rpx;
	}

	navigator {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #999;

		image {
			width: 16rpx;
			height: 24rpx;
			margin-left: 10rpx;
		}
	}
}

.recommend {
	display: flex;
	justify-content: space-between;

	image {
		width: 220rpx;
		height: 220rpx;
		margin-bottom: 12rpx;
	}

	.title {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(50, 50, 50, 1);
		line-height: 40rpx;
	}

	.subtitle {
		font-size: 20rpx;
		color: rgba(102, 102, 102, 1);
		line-height: 28rpx;
	}
}
.works_list {
	margin-top: 20rpx;
	.work_item {
		.user_info {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left_side {
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

				.name_n_date {
					.name {
						margin-bottom: 10rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(50, 50, 50, 1);
						line-height: 1;
					}

					.date {
						font-size: 20rpx;
						color: rgba(153, 153, 153, 1);
						line-height: 1;
					}
				}
			}

			.view_count {
				font-size: 20rpx;
				color: rgba(153, 153, 153, 1);
				line-height: 28rpx;
			}
		}

		.msg {
			margin-top: 20rpx;
			margin-bottom: 10rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(50, 50, 50, 1);
			line-height: 34rpx;
		}

		.gallery {
			display: flex;

			image {
				width: 220rpx;
				height: 220rpx;
				margin-right: 14rpx;

				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
		}

		.actions {
			display: flex;
			justify-content: space-around;
			margin-top: 38rpx;

			.item {
				display: flex;
				align-items: center;

				image {
					width: 30rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
					color: rgba(153, 153, 153, 1);
					line-height: 34rpx;
				}
			}
		}
	}
}
</style>
