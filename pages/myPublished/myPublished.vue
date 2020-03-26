<template>
	<view>
		<scroll-view scroll-y>
			<view class="recommend-item">
				<view class="item-top" >
					<image class="touxiangicon" :src="studyDetails.avatar" mode="widthFix" @tap="gotoUserInfo" :data-uid="studyDetails.uid"/>
					<view class="info">
						<text class="title">{{ studyDetails.nickname }}</text>
						<text class="time">{{ studyDetails.createtime }}</text>
						<text class="time">浏览{{ browse_times }}次</text>
					</view>
				</view>
				<view class="item-middle">
					<view class="detail">
						<text class="conttext">{{ studyDetails.content }}</text>
					</view>
					<view class="middle-image">
						<view v-for="(item, index) in studyDetails.picture_arr" :key="index"><image :src="item" style="width: 220rpx;height: 220rpx;" /></view>
					</view>
				</view>
				<view class="smallicon">
					<view class="smallicon-flex" @tap="praise">
						<image class="collecticon" v-if="studyDetails.is_give" src="../../static/index/collect.png" style="width: 45rpx;height: 42rpx;" />
						<image class="collecticon" v-else src="../../static/index/uncollect.png" style="width: 45rpx;height: 42rpx;" />
						<text>{{ studyDetails.thumbs_times }}</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/fx.png" mode="widthFix" style="width: 45rpx;height: 42rpx;" />
						<text>分享</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/messageicon.png" mode="widthFix" style="width: 40rpx;height: 40rpx;" />
						<text>{{ comment_count }}</text>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="studyitem-bottom">
				<view class="shoppcall comment">
					<view class="comment-item" v-for="(item, index) in commenlist" :key="index">
						<view class="publish_list comment">
							<view class>
								<image :src="item.avatar" mode="widthFix" class="comment-avatar" />
								<text class="publish_list_item textred">{{ item.nickname }}</text>
							</view>
							<view class="comment-body">
								<view class="redtree_text">{{ item.content }}</view>
								<view class>
									<view class="comment-time l">{{ item.createtime }}</view>
									<view class="comment-count l" 
									@tap.stop="commentDetail" 
									:data-d_id="item.d_id" 
									:data-owner_uid="item.id" 
									:data-index="index" 
									:data-comment_count="item.count"
									>
										{{ item.count }} 回复
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="input-box">
				<!-- 				<input placeholder="请输入评论内容" class="input" 
				@input="getComment" 
				:value="comment_content"
        v-model="comment_content"/>-->
				<input placeholder="请输入评论内容" class="input" v-model="comment_content" :focus="if_false" />
				<text class="send" @tap.stop="send">发送</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			inits: '',
			page: 1,
			page_size: 10,
			if_false:false,
			details: '',
			dy_id: '',
			release: [],
			comment_num: 0,
			comment_content: '',
			count: 1,
			comment_count: 0,
			index: '',
			browse_times: '',
			type: '',
			thumbs_times: '',
			fullScreen: false,
			myDaily: false,
			is_share: '',
			index_: '',
			up: '',
			is_give: '',
			preview: false,
			to_details: false,
			item: '',
			studyDetails: {},
			picturelist: [],
			commenlist: [],
		};
	},
	onLoad(event) {
		console.log(event);
		// this.getData()
		const { dy_id, browse_times, comment_count, thumbs_times ,type,index} = JSON.parse(decodeURIComponent(event.pulishedDetail));
		if (dy_id) {
			this.dy_id = dy_id;
			this.browse_times = browse_times;
			this.comment_count = comment_count;
			this.thumbs_times = thumbs_times;
			this.index = index
			setTimeout(function() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				// var that = this;
				// var index = index;
				if (type == 1) {
					//type:1首页，2学习广场,3打卡,
					var up = 'studylist[' + index + '].browse_times';
					console.log(up+'123')
				} else if (type==2) {
					var up = 'studylist[' + index + '].browse_times';
				} else if (type == 3) {
					var up ='dakalog[' + index + '].browse_times';
				}
				console.log('thumbs_times'+browse_times)
				let times = browse_times
				var newp = ++times;
				console.log('newp'+newp)
				if (prevPage) {
					// 可以修改上一页的数据
					prevPage.setData({
						times: newp
					});
				}
				// uni.navigateBack()
			}, 1000);
			this.getData();
			this.comment();
		} else if (options.scene) {
			that.setData({
				dy_id: decodeURIComponent(options.scene)
			});
			this.getData();
			this.comment();
		} else {
			uni.redirectTo({
				url: '../index/index'
			});
		}
	},
	mounted() {},
	methods: {
		//评论详情
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
		commentDetail: function(e) {
			let param = {
				d_id: e.currentTarget.dataset.d_id,
				owner_uid: e.currentTarget.dataset.owner_uid,
				index: e.currentTarget.dataset.index,
				comment_count: e.currentTarget.dataset.comment_count
			};
			console.log(e.index);
			uni.navigateTo({
				url: 'commentDetails/commentDetails?commentDetails=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		//获取详情
		getData() {
			ajax({
				url: 'study/studyDetails',
				data: { id: this.dy_id },
				// data:{id:'926'},
				success: res => {
					this.studyDetails = res.data.data;
				}
			});
		},
		//获取评论列表
		comment() {
			ajax({
				url: 'comment/comment',
				data: { d_id: this.dy_id },
				// data: { d_id: '926' },
				success: res => {
					if (this.count < this.page) {
					} else {
						let release = this.release;
						const { count, list } = res.data.data;
						this.commenlist = list;
						(this.page = this.page + 1), (this.count = count > 1 ? count : 1), (this.release = release.concat(list)), (this.comment_num = count);
					}
				}
			});
		},
		//发送评论
		send: function() {
			let that = this;
			ajax({
				url: 'comment/commentAdd',
				data: { content: this.comment_content, d_id: this.dy_id },
				method: 'POST',
				success: res => {
					this.comment_content = '';
					uni.showModal({
						title: '提示',
						content: res.data.msg,
						showCancel: false,
						duration: 1000,
						success: function(res) {}
					});
					ajax({
						url: 'comment/comment',
						data: { d_id: this.dy_id },
						success: (res) => {
							console.log(res.data.data);
							let list = res.data.data;
							list.if_input = false;
							this.release = res.data.list;
							this.comment_num = res.data.count;
							var pages = getCurrentPages();
							var prevPage = pages[pages.length - 2]; //上一个页面
							var index = this.index;
							if (that.type == 1) {
								var up = 'daily[' + index + '].comment_count';
							} else if (that.type == 2) {
								var up = 'studyList[' + index + '].comment_count';
							} else if (that.type == 3 || that.type == 4) {
								var up = 'daka[' + index + '].comment_count';
							}

							var newp = ++that.comment_count; // that.setData({
							//   comment_count:newp
							// })

							if (prevPage) {
								可以修改上一页的数据
								prevPage.setData({
								  [up]: newp
								})
							}

							var prevPages = pages[pages.length - 3];

							if (prevPages) {
								if (prevPages.__route__ == 'pages/index/index') {
									var up = 'daily[' + index + '].comment_count';
								} else if (prevPages.__route__ == 'pages/my/my') {
									var up = 'daka[' + index + '].comment_count';
								} else if (prevPages.__route__ == 'pages/studySquare/studySquare') {
									var up = 'studylist[' + index + '].comment_count';
								} // prevPages.setData({
								//   [up]: newp
								// })
							}
						}
					});
				}
			});
		},
		//跳转用户详情
		gotoUserInfo: function(e) {
			console.log(e.currentTarget.dataset.uid+'123')
			let param = {
				uid: e.currentTarget.dataset.uid,
		
			};
			uni.navigateTo({
				url: '../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		//点赞
		
		praise(e) {
			var that = this;
			var index_ = that.index_;
			ajax({
				url: 'study/praiseStudy',
				data: {
					dy_id: this.dy_id
				},
				success: res => {
					const details = this.studyDetails;
					if (res.data.data.is_ok == true) {
						console.log('点赞');
						this.studyDetails.is_give = !details.is_give, 
						this.studyDetails.thumbs_times = details.thumbs_times + 1;
						
					} else {
						console.log('取消点赞');
						this.studyDetails.is_give = !details.is_give, 
						this.studyDetails.thumbs_times = details.thumbs_times - 1;
					}
					var pages = getCurrentPages();
					var index = that.index;
					
					var prepage = pages[pages.length - 2]; //上一页面指针 
					console.log(prepage)
					wx.setStorageSync('a', arr);
					if (that.type == 1) {//
					prepage.studylist[index].thumbs_times = this.studyDetails.thumbs_times
					prepage.studylist[index].is_give = this.studyDetails.is_give
					} else if (that.type ==2) {
					prepage.studylist[index].thumbs_times = this.studyDetails.thumbs_times
					prepage.studylist[index].is_give = this.studyDetails.is_give
					} else if (that.type == 3) {
					prepage.loglist[index].thumbs_times = this.studyDetails.thumbs_times
					prepage.loglist[index].is_give = this.studyDetails.is_give
					}
					wx.navigateBack({
					  delta: 1
					}); 
				},
				error: function() {}
			});
		}
	},
	mounted() {}
};
</script>

<style style lang="less" scoped>
@import './myPublished.css';
.input-box {
	position: fixed;
	width: 100%;
	bottom: 14rpx;
	height: 100rpx;
	line-height: 150rpx;
	display: flex;
	left: 0;
	justify-content: center;
	/* align-items:center; */
}
.send {
	width: 120rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 30rpx;
	background-color: #008800;
	margin-left: 20rpx;
	font-size: 28rpx;
	color: white;
	margin-top: 22rpx;
}
.input {
	font-size: 24rpx;
	margin-top: 20rpx;
	background-color: #f5f5f5;
	border-radius: 50rpx;
	padding-left: 30rpx;
	height: 70rpx;
	line-height: 70rpx;
	width: 70%;
	/* margin-left:70rpx */
}
.comment-item {
	padding: 10rpx 0 20rpx 0;
}
</style>
