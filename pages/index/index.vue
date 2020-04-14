<template>
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
			<view class="menu_item" v-for="(item, index) in indexList" :key="index">
				<navigator :url="item.to_url">
					<image :src="item.pic_url" mode=""></image>
					<text>{{ item.content }}</text>
				</navigator>
			</view>
		</view>

		<view class="section_title">
			<text class="recommend_title">推荐用品</text>
			<navigator url="../onlinestore/onlinestore">
				更多
				<image src="../../static/index/qj.png" mode=""></image>
			</navigator>
		</view>

		<view class="recommend">
			<view @click="gotoDetails(item)" v-for="(item, index) in hotGoods" :key="index" class="recomment_goods">
				<image :src="item.image" mode=""></image>
				<view class="info">
					<view class="title">{{ item.p_name }}</view>
					<view class="subtitle">{{ item.p_detail }}</view>
				</view>
			</view>
		</view>

		<view class="section_title">
			<text>作品赏析</text>
			<navigator url="../studySquare/studySquare">
				更多
				<image src="../../static/index/qj.png" mode=""></image>
			</navigator>
		</view>
		<!-- 点击进入我的发表页 请求所有用户数据-->

		<view class="studylist">
			<view class="studyitem" v-for="(item, index) in studylist" :key="index">
				<view class="studylistflex">
					<view class="user_info" @tap="gotoGrowthDairy" :data-uid="item.uid" :data-index="index" :data-thumbs_times="item.thumbs_times" :data-pid="item.dy_id">
						<view class="left_side">
							<view class="avatar"><image :src="item.avatar" class="avatar" @tap.stop="gotoUserInfo" :data-uid="item.uid"></image></view>
							<view class="date">
								<view class="username">{{ item.nickname }}</view>
								<view>{{ item.createtime }}</view>
							</view>
						</view>
						<text class="view_count">浏览{{ item.browse_times }}次</text>
					</view>
					<view class="studyitem-middle">
						<text
							class="impression"
							:data-dy_id="item.dy_id"
							@tap="gotoPublished"
							:data-browse_times="item.browse_times"
							:data-p_id="item.dy_id"
							:data-index="index"
							:data-comment_count="item.comment_count"
						>
							{{ item.content }}
						</text>

						<view>
							<view style="position:relative;display:inline">
								<image
									v-if="item.video_ids"
									style="width:30%;height:200rpx;margin-right:10rpx"
									:hidden="item.fullScreen"
									class="acticleimg"
									:src="item.video_ids + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast'"
									mode="scaleToFill"
								/>
								<image
									v-if="item.video_ids"
									:data-fullScreen="item.fullScreen"
									class="bt"
									mode="scaleToFill"
									:data-src="item.video_ids"
									:data-index="index"
									@tap="playVideo"
									src="../../static/studySquare/play3.png"
									style="width:60rpx;height:60rpx;position:absolute;top:-118rpx;left:78rpx;"
								/>
							</view>
							<image
								v-for="(items, index2) in item.picture_arr"
								:key="index2"
								class="acticleimg"
								:src="items"
								:data-src="items"
								:data-effect_arr="item.picture_ids"
								@tap="previewImg"
								mode="aspectFill"
							/>
							<audio
								v-if="item.voice_ids"
								:src="item.voice_ids"
								controls
								loop
								class="audio"
								:poster="item.poster"
								:name="item.name"
								:author="item.author"
								:data-index="index"
								@tap.stop="playorpause"
								:action="item.action"
							></audio>
							<view></view>
						</view>

						<view class="hr"></view>
						<view class="thirdlineblock">
							<view class="thirdline share" :data-dy_id="item.dy_id" :data-index="index" @tap="praise">
								<image class="collecticon" v-if="item.is_give == true" src="../../static/index/collect.png" style="margin-top:6rpx;" />
								<image class="collecticon" v-if="item.is_give == false" src="../../static/index/uncollect.png" />
								<text>{{ item.thumbs_times }}</text>
							</view>
							<view
								class="thirdline share"
								:data-dy_id="item.dy_id"
								open-type="share"
								:data-nickname="item.nickname"
								:data-image="item.picture_arr[0]"
								:data-video="item.video_ids"
								v-show="false"
							>
								<image class="shareicon" src="../../static/index/fx.png" />
								<text>分享</text>
							</view>
							<view
								class="thirdline share"
								@tap.stop="gotoPublished"
								:data-dy_id="item.dy_id"
								:data-browse_times="item.browse_times"
								:data-p_id="item.dy_id"
								:data-index="index"
								:data-comment_count="item.comment_count"
								open-type="share"
							>
								<image class="shareicon" src="../../static/index/pl.png" />
								<text>{{ item.comment_count }}</text>
							</view>
						</view>
					</view>
					<view class="studyitem-bottom" v-if="item.if_input">
						<!-- <text class='dianzanname'>{{item.dianzanname}},{{item.dianzanname}},{{item.dianzanname}}</text> -->
						<view v-for="(item, index2) in release" :key="index2" class="shoppcall comment" :data-id="item.id">
							<view class="publish">
								<view class="publish_list comment">
									<text class="publish_list_item red">{{ item.name }}:</text>
									<text class="redtree_text">{{ item.textareaValue }}</text>
								</view>
							</view>
						</view>
						<input placeholder="请输入评论内容" :focus="if_false" v-if="item.if_input" class="input" />
					</view>
				</view>
			</view>
		</view>

		<!-- 在线教程 -->
		<!-- <view class="const-list">
			<view class="const-line" v-for="(data, index) in onlineTeaching" :key="index">
				<view class="const-list-item">
					<navigator :url="data.to_url">
						<image :src="data.pic_url" mode="widthFix">
						<text>{{ data.content }}</text>
					</navigator>
				</view>
			</view>
    </view>-->
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
						>
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
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode="">
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode="">
							<image src="https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png" mode="">
						</view>
					</view>
				</navigator>
				<view class="smallicon">
					<view class="smallicon-flex">
						<image src="../../static/index/uncollect.png" mode="widthFix" style="width: 38rpx;height: 36rpx;">
						<text>10086</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/fx.png" mode="widthFix" style="width: 45rpx;height: 42rpx;">
						<text>分享</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/messageicon.png" mode="widthFix" style="width: 40rpx;height: 40rpx;">
						<text>10086</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 上拉加载 -->
		<!-- 		<view class="">
			<uni-load-more :status="status" />
			</view> -->
		<view class="upload" @click="gotoStudy">点击加载更多</view>
		<!-- 签到 -->
		<view class="dakaciclecont_daka">
			<view class="dakaciclecont_daka_flex">
				<navigator url="/pages/my/daySignin/daySignin"><text>签到</text></navigator>
			</view>
		</view>
		<view class="big-box" v-if="if_over">
			<view class="containerModal">
				<view class="modalTitle">恭喜您获得新人礼包</view>
				<view class="youhuiquan">
					<view class="youhuiNum">
						<text style="font-size:36rpx ;">
							¥
							<text style="font-size: 54rpx;">10</text>
						</text>
					</view>
					<view class="youhuiDetail">
						<view class="detail">每满99减10元</view>
						<view class="date">2019.03.20-2019.05.20</view>
						<image class="image" src="../../static/index/newPerpson.png" style="width: 84rpx;height: 78rpx;" />
					</view>
				</view>
				<view class="btn" @click="gotoNovice">快去完成新人任务吧！</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import '../public/rongyun.js';
import { ajax } from '../../utils/public.js';
import util from '../../utils/util.js';
var _self;
export default {
	data() {
		return {
			//轮播图片
			bugId: true,
			//购买商品送书包显示隐藏id
			activeImg: '',
			//活动图片
			activeUrl: '',
			if_over: false,
			//活动链接
			to_details: true,
			preview: true,
			keyword: '',
			host: getApp().globalData.requestUrl,
			bannerUrl: [],
			name: '梁雨淇',
			time: '今天10：30',
			contText: '生活不止眼前的苟且，还有读不了的诗和别不了的远方',
			dianzanNum: '203',
			userName: '流浪人',
			userReview: '哈哈，see里就你最煽情。',
			datalist: '',
			daily: [],
			page: 1,
			page_size: 10,
			count: 1,
			smodel: '',
			constlist: '',
			modelType: 1,
			section: [
				{
					name: '热卖推荐',
					typeId: '1'
				},
				{
					name: '精品推荐',
					typeId: '2'
				}
			],
			currentId: 1,
			producturl: [],
			comment_num: 0,
			release: [
				{
					name: '1',
					textareaValue: 'sfdf'
				}
			],
			isFolded: true,
			src: '',
			curIdx: '',
			ifNewUser: '',
			popupitem: [],
			index_model: 1000,
			content_t: '',
			//内容
			size: 14,
			barHeight:25,
			//宽度即文字大小
			marqueeW: 0,
			moveTimes: 8,
			//一屏内容滚动时间为8s
			allT: '0s',
			scrollLeft: 0,
			announcement: [],
			toAn: '',
			start_page: '',
			is_give: '',
			thumbs_times: '',
			currentTab: '',
			type: 1,
			playIndex: '',
			indeNum: '',
			item: '',
			swiperImges: [],
			indexList: [],
			browse_times: '',
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
			],
			hotGoods: []
		};
	},
	components: {
		uniLoadMore
	},
	onLoad: function(options) {
		// this.setData({
		// 	daily: []
		// });

		if (options.myshare) {
			setTimeout(function() {
				if (options.title) {
					wx.navigateTo({
						url: options.tourl + '?title=' + options.title + '&md_id=' + options.md_id + '&type=' + options.type
					});
				} else {
					wx.navigateTo({
						url: options.tourl
					});
				}
			}, 100);
		}

		var that = this;
		this.getHotGoods();
		this.getData(); //代理商的邀请码 options.scene

		if (decodeURIComponent(options.scene)) {
			var qrId = decodeURIComponent(options.scene);
		} else {
			var qrId = 0;
		}

		wx.setStorageSync('scene', qrId);
		// wx.request({
		// 	url: getApp().globalData.requestUrl + 'shop/ifNewUser',
		// 	method: 'post',
		// 	data: '',
		// 	header: {
		// 		'content-type': 'application/json',
		// 		token: wx.getStorageSync('token')
		// 	},
		// 	success: function(res) {
		// 		if (res.data.data.if_new_user) {
		// 			that.setData({
		// 				ifNewUser: res.data.data.if_new_user
		// 			});
		// 		}
		// 	},
		// 	fail: function() {}
		// }); //获取活动图片
		//let that = this

		// util.ajax('index/getActive', {}, res => {
		// 	let that = this;

		// 	if (res.data == '') {
		// 		that.setData({
		// 			bugId: false
		// 		});
		// 	} else {
		// 		that.setData({
		// 			activeImg: res.data.image,
		// 			activeUrl: res.data.jump
		// 		});
		// 	}
		// });

		this.getData();
		this.getHotGoods();
		_self=this;
		_self.getSystemStatusBarHeight()
	},
	onPullDownRefresh: function() {
		var that = this;
		(this.page = 1), (this.producturl = []), (this.daily = []), (this.count = 1);

		if (that.modelType == 1) {
			that.getIndexData();
		} else if (that.modelType == 2) {
			that.getDataGoods();
		}
	},

	onHide() {
		this.preview = true;
	},
	//下拉刷新
	onShow: function() {
		if (getApp().globalData.preview == true) {
			this.setData({
				start_page: '',
				daily: []
			});
			var that = this;
			this.getAnnouncement();
			this.setData({
				page: 1,
				count: 1,
				start_page: ''
			});
		}
		// this.getIndexData()
		// this.init();
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh(); //结束下拉动画
		}, 1000);
	},
	//上拉加载
	onReachBottom() {
		// let _self = this;
		// _self.status = 'loading'; //赋值加载中
		// this.getMoreStudyList();
	},
	// onShow(e){
	// 	let pages = getCurrentPages();
	// 	('get'+pages)
	// 		let currPage = pages[pages.length-1];
	// 		if(currPage.data.times==undefined || currPage.data.times==''){

	// 		}else{
	// 			this.studylist.browse_times = currPage.data.times
	// 			// this.address_id = currPage.data.selectedAddressID
	// 		}
	// },
	methods: {
		// 加载更多数据
		getSystemStatusBarHeight:function(){
		            // #ifdef APP-PLUS
		            var height = plus.navigator.getStatusbarHeight();
		            _self.barHeight = height;
		            // #endif
		            // #ifdef H5
		            _self.barHeight = 0;
		            // #endif
		        },
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
		//热销产品
		getHotGoods() {
			let that = this;
			ajax({
				url: 'shop/goods',
				data: {},
				success: res => {
					const { count, list } = res.data.data;
					this.hotGoods = list;
				}
			});
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
		gotoStudy() {
			uni.navigateTo({
				url: '../studySquare/studySquare'
			});
		},
		getUserDetail: function() {},
		gotoPublished: function(e) {
			let param = {
				dy_id: e.currentTarget.dataset.dy_id,
				index: e.currentTarget.dataset.index,
				browse_times: e.currentTarget.dataset.browse_times,
				comment_count: e.currentTarget.dataset.comment_count,
				thumbs_times: e.currentTarget.dataset.thumbs_times,
				type: 1
			};
			uni.navigateTo({
				url: '../myPublished/myPublished?pulishedDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		gotoUserInfo: function(e) {
			let param = {
				uid: e.currentTarget.dataset.uid
			};
			uni.navigateTo({
				url: '../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
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
					// uni.removeStorageSync('loginToken')
					const { list, count } = res.data.data;
					// for (var i = 0; i < list.length; i++) {
					// 	list[i].isPlaying = false;
					// 	list[i].fullScreen = false;
					// 	(list[i].type = 1), (list[i].action = action);
					// 	list[i].poster = list[i].picture_ids[0];
					// 	list[i].name = list[i].nickname + '的音频';
					// }

					(this.page = this.page + 1), (this.count = res.data.count > 1 ? res.data.count : 1), (this.studylist = list);
				},
				error: function() {}
			});
		},
		gotoDetails: function(e) {
			let param = {
				id: e.p_id
			};
			uni.navigateTo({
				url: '../product-detail/product-detail?gd_id=' + e.p_id
			});
		},
		praise(e) {
			var that = this;

			const index = e.currentTarget.dataset.index;
			const dy_id = e.currentTarget.dataset.dy_id;
			ajax({
				url: 'study/praiseStudy',
				data: {
					dy_id: dy_id
				},
				success: res => {
					const daily = that.studylist;
					const is_give = 'daily[' + index + '].is_give';
					const thumbs_times = 'daily[' + index + '].thumbs_times';
					if (res.data.data.is_ok == true) {
						(this.studylist[index].is_give = !daily[index].is_give), (this.studylist[index].thumbs_times = daily[index].thumbs_times + 1);
						uni.showToast({
							title: '点赞成功',
							icon: 'none'
						});
					} else {
						(this.studylist[index].is_give = !daily[index].is_give), (this.studylist[index].thumbs_times = daily[index].thumbs_times - 1);
					}
				}
			});
		},
		//放大图片
		previewImg(e) {
			getApp().globalData.preview = false;
			var src = e.currentTarget.dataset.src; //获取data-src  循环单个图片链接

			var str = e.currentTarget.dataset.effect_arr; //获取data-effect_pic   图片列表
			var imgList = str.split(',');
			//图片预览
			uni.previewImage({
				current: src,
				// 当前显示图片的http链接
				urls: imgList // 需要预览的图片http链接列表
			});
		},
		ifinput: function(e) {
			let that = this;
			const index = e.currentTarget.dataset.index;
			const daily = that.daily;
			daily[index].if_input = !daily[index].if_input; // studylist[index].if_jp = !studylist[index].if_jp

			that.setData({
				daily: daily
			});
		},
		getUserInfo: function(e) {},
		// init: function() {
		// 	var that = this;
		// 	util.ajax(
		// 		'cate/smodelList',
		// 		{
		// 			type: 1,
		// 			auditing: true
		// 		},
		// 		res => {
		// 			that.setData({
		// 				datalist: res.data.list
		// 			});
		// 		}
		// 	);
		// 	that.getIndexData();
		// },

		getIndexData() {
			var that = this;
			var param = {
				page: that.page,
				page_size: that.page_size,
				keyword: that.keyword
			};
			const daily = that.daily;

			if (that.page > 1) {
			} else {
				util.ajax('index/daily', param, res => {
					var daily = that.daily;
					let list = res.data.list;
					var action = {
						method: 'pause'
					};

					for (var i = 0; i < list.length; i++) {
						list[i].isPlaying = false;
						list[i].fullScreen = false;
						(list[i].type = 1), (list[i].action = action);
						list[i].poster = list[i].picture_idss[0];
						list[i].name = list[i].nickname + '的音频';
					}

					that.setData({
						page: that.page + 1,
						count: res.data.count > 1 ? res.data.count : 1,
						daily: daily.concat(list)
					});
					wx.stopPullDownRefresh();
				});
			}
		},

		//购买商品送书包的点击立即前往
		leaveBuy(e) {
			let that = this;
			let url = e.currentTarget.dataset.id;
			wx.navigateTo({
				url: url
			});
		},

		//购买商品送书包的取消点击
		buyQuxiao() {
			var that = this;
			that.setData({
				bugId: false
			});
		},

		// getbanner: function() {
		// 	var that = this;
		// 	util.ajax('index/index', 2, res => {
		// 		that.setData({
		// 			bannerUrl: res.data.banner,
		// 			smodel: res.data.smodel,
		// 			index_model: res.data.index_model
		// 		});
		// 	});
		// },
		jump: function(e) {
			var time = parseInt(this.index_model);
			var that = this;
			var jump_type = e.currentTarget.dataset.jump_type;
			var url = e.currentTarget.dataset.url;
			this.setData({
				start_page: e.currentTarget.dataset.md_id
			});
			setTimeout(function() {
				wx.navigateTo({
					url: url
				});
			}, time);
		},
		jumpOther: function(e) {
			var that = this;
			var type = e.currentTarget.dataset.type;
			var types = e.currentTarget.dataset.types;
			var url = e.currentTarget.dataset.url;
			wx.navigateTo({
				url: url
			});
		},

		/* 商城js*/
		swichNav: function(e) {
			let that = this;

			if (this.currentTab === e.target.dataset.current) {
				return false;
			} else {
				that.setData({
					currentTab: e.target.dataset.current
				});
			}
		},
		getDataGoods() {
			const that = this;
			const param = {
				page: that.page,
				page_size: that.page_size,
				type: that.type,
				keyword: that.keyword
			};

			if (that.count < that.page) {
				wx.showToast({
					title: '暂无更多信息',
					icon: 'none'
				});
			} else {
				util.ajax('shop/goods', param, res => {
					var producturl = that.producturl;
					that.setData({
						page: that.page + 1,
						count: res.data.count > 1 ? res.data.count : 1,
						producturl: producturl.concat(res.data.list)
					});
					wx.stopPullDownRefresh();
				});
			}
		},

		//点击切换
		handleTap: function(e) {
			let id = e.currentTarget.id;
			var that = this;
			that.setData({
				type: id,
				currentId: id,
				producturl: [],
				count: 1,
				daily: [],
				page: 1
			});

			if (id) {
				const param = {
					page: 1,
					page_size: 10,
					type: that.type
				};
				that.getDataGoods(); // util.ajax('shop/goods', param, res => {
				//   var producturl = [];
				//   that.setData({
				//     page: 1,
				//     currentId: id,
				//     count: res.data.count,
				//     producturl: producturl.concat(res.data.list)
				//   })
				//   wx.stopPullDownRefresh();
				// })
			}
		},
		// onReachBottom: function() {
		//   var that = this;
		//   if (that.data.modelType == 1) {
		//     that.getIndexData()
		//   } else if (that.data.modelType == 2) {
		//     that.getDataGoods()
		//   }
		// },
		gotoGrowthDairy: function(e) {
			let uid = e.currentTarget.dataset.uid;
			let pid = e.currentTarget.dataset.pid;
			let index = e.currentTarget.dataset.index;
			const thumbs_times = e.currentTarget.dataset.thumbs_times;
			getApp().globalData.preview = false;
			uni.navigateTo({
				url: '../growthDiary/growthDiary?uid=' + uid + '&pid=' + pid + '&index=' + index + '&type=1' + '&thumbs_times=' + thumbs_times
			});
		},
		show: function() {
			// this.setData({ flag: false })
		},
		hide: function() {
			this.ifNewUser = 1;
		},
		goindex: function() {
			var that = this;
			getApp().globalData.infoModel();
			that.onShow(); // wx.switchTab({
			//   url: '/pages/index/index'
			// })
		},
		goTop: function(e) {
			// 一键回到顶部
			if (wx.pageScrollTo) {
				wx.pageScrollTo({
					scrollTop: 0
				});
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				});
			}
		},
		gotoNovice: function() {
			uni.navigateTo({
				url: '../novice/novice'
			});
		},
		change: function(e) {
			let that = this;
			const index = e.currentTarget.dataset.index;
			const daily = that.daily;
			daily[index].is_folded = !daily[index].is_folded;
			that.setData({
				daily: daily
			});
		},
		keywordFun: function(e) {
			var that = this;
			that.setData({
				type: that.type,
				page: 1,
				producturl: [],
				keyword: e.detail.value
			});
			var timer = null;
			clearTimeout(timer);
			timer = setTimeout(function() {
				that.getDataGoods();
			}, 1000);
		},
		growthDaily: function(e) {
			let uid = e.currentTarget.dataset.uid;
			let pid = e.currentTarget.dataset.pid;
			let index = e.currentTarget.dataset.index;
			const thumbs_times = e.currentTarget.dataset.thumbs_times;
			getApp().globalData.preview = false;
			wx.navigateTo({
				url: '../growthDiary/growthDiary?uid=' + uid + '&pid=' + pid + '&index=' + index + '&type=1' + '&thumbs_times=' + thumbs_times
			});
		},
		playMusic: function(e) {
			let id = e.currentTarget.dataset.id;
			var index = e.target.dataset.index; //获取点击音乐的下标

			var item = 'daily[' + index + '].action'; //获取音乐的播放状态

			var actionPlay = 'play'; //定义播放

			var actionPause = 'pause'; //定义暂停

			this.setData({
				playIndex: id
			});

			if (this.daily[index].action == 'pause') {
				//若当前是暂停，则点击后播放
				for (let i = 0; i < that.bgmList.length; i++) {
					if (index != i) {
						let indeNum = 'bgmList[' + i + '].action';
						that.setData({
							[indeNum]: actionPause
						});
					}
				}

				this.audioCtx = wx.createAudioContext(id);
				this.audioCtx.play();
			} else {
				//若当前是播放，则点击后暂停
				this.setData({
					[item]: actionPause
				});
			}
		},

		playVideo(e) {
			getApp().globalData.preview = false;
			var src = e.currentTarget.dataset.src;
			wx.navigateTo({
				url: '../video/video?src=' + src
			});
		},

		playorpause: function(e) {
			var that = this;
			var index = e.target.dataset.index; //获取点击音乐的下标

			var item = 'daily[' + index + '].action'; //获取音乐的播放状态

			var actionPlay = {
				method: 'play'
			}; //定义播放

			var actionPause = {
				method: 'pause'
			}; //定义暂停

			if (that.daily[index].action.method == 'pause') {
				//若当前是暂停，则点击后播放
				that.setData({
					[item]: actionPlay
				});

				for (let i = 0; i < that.daily.length; i++) {
					if (index != i) {
						let indeNum = 'daily[' + i + '].action';
						that.setData({
							[indeNum]: actionPause
						});
					}
				}
			} else {
				//若当前是播放，则点击后暂停
				that.setData({
					[item]: actionPause
				});
			}
		},
		getCoupon: function(e) {
			var that = this;
			util.ajax('shop/getNewUserCoupon', {}, res => {
				that.setData({
					popupitem: res.data.list
				});
			});
		},
		getGiftPack: function() {
			let that = this;
			util.ajax('shop/newUserCouponAction', {}, res => {
				wx.showToast({
					title: res.msg,
					icon: 'none'
				});
				that.setData({
					ifNewUser: 1
				});
			});
		},
		//判断当前滚动超过一屏时
		checkCor: function(e) {
			var that = this;

			if (that.currentTab > 2) {
				that.setData({
					scrollLeft: 300
				});
			} else {
				that.setData({
					scrollLeft: 0
				});
			}
		},
		toPlay(e) {
			var url = e.currentTarget.dataset.url;
			wx.navigateTo({
				url: url
			});
		},

		toCatalogues() {
			wx.navigateTo({
				url: '/pages/catalogues/catalogues'
			});
		},

		//获取通告消息
		getAnnouncement() {
			let that = this;
			var screenW = wx.getSystemInfoSync().windowWidth; //获取屏幕宽度

			util.ajax('index/announcement', {}, res => {
				// if (!res.data.title){
				//   return
				// }
				if (!res.data.title) {
					return false;
				}

				var contentW = res.data.title.length * this.size; //获取文本宽度（大概宽度）

				that.setData({
					marqueeW: -contentW + 'px',
					content_t: res.data.title,
					toAn: res.data.url,
					announcement: res.data
				});
				var allT = (contentW / screenW) * this.moveTimes;
				allT = allT < 8 ? 8 : allT; //不够一平-----最小滚动一平时间

				this.setData({
					// marqueeW: -contentW + "px",
					allT: allT + 's'
				});
			});
		},

		//回到顶部
		toTop(e) {
			var that = this;
			wx.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},

		//
		toAnnouncement(e) {
			var url = e.currentTarget.dataset.url;
			wx.navigateTo({
				url: url
			});
		},

		//点击查看更多
		more() {
			wx.navigateTo({
				url: '/pages/studySquare/studySquare',
				success: function(res) {},
				fail: function(res) {},
				complete: function(res) {}
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
			},
			error: function() {}
		});
	}
};
</script>

<style lang="less">
@import './index.css';
.upload {
	color: #999999;
	font-size: 24rpx;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
}
.username {
	color: #323232;
	font-size: 28rpx;
	padding: 5rpx 0rpx;
}

.top_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 74rpx 0 20rpx 0;
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
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	overflow: hidden;
	overflow-x: scroll;
	image {
		width: 220rpx;
		height: 220rpx;
		margin-bottom: 12rpx;
	}
	.recomment_goods {
		width: 220rpx;
		margin-right: 20rpx;
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

	.subtitle {
		font-size: 20rpx;
		color: rgba(102, 102, 102, 1);
		line-height: 40rpx;
		line-height: 40rpx;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
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

.studylistflex {
	float: left;
}
.user_info {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	height: 80rpx;
	margin-bottom: 10rpx;

	.left_side {
		display: flex;
		align-items: center;

		.avatar {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}

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

	.view_count {
		font-size: 20rpx;
		color: rgba(153, 153, 153, 1);
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
