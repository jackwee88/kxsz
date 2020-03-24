<template>
	<view>
		<view class="info_wrap">
			<image :src="userinfo.avatar" class="avatar"></image>

			<view class="info_text">
				<view class="top">
					<view class="name">{{userinfo.nickname}}</view>
					<view class="btn had_btn" v-if="userinfo.type==='none'">
						<image src="../../static/my/add.png" class="addhao" @click="follow"></image>
						关注
					</view>

					<view class="btn" v-if="userinfo.type==='only'" @click="follow">
						<image src="../../static/my/ygz.png" class="ygz"></image>
						取消关注
					</view>

					<view class="btn" v-if="userinfo.type==='mutual'" @click="follow" >
						<image src="../../static/my/hxgz.png" class="hxgz"></image>
						互相关注
					</view>
				</view>
				<view class="sub">开心号：{{userinfo.number}}</view>
				<!-- <view class="sub">男</view> -->
			</view>
		</view>

		<view class="section_title"><text>最近打卡</text></view>

		<view class="works_list">
			<navigator class="work_item" v-for="(item,index) in logList" :key="index" @click="gotoPublished()">
				<view class="user_info">
					<view class="left_side"><view class="date">{{item.date}}</view></view>
		
					<text class="view_count">浏览{{item.logNum}}次</text>
				</view>
				<view class="msg">{{item.msg}}</view>
		
				<view class="gallery">
					<view v-for="(imageItem,imageIndex) in item.imageList" :key="imageIndex" class="imageList">
						<image :src="imageItem.imageUrl" mode=""></image>
					</view>
				</view>
				<view class="actions">
					<view class="item">
						<image src="../../static/index/zf.png" mode=""></image>
						<text>{{item.shareNum}}</text>
					</view>
					<view class="item">
						<image src="../../static/index/pl.png" mode=""></image>
						<text>{{item.commentNum}}</text>
					</view>
					<view class="item">
						<image src="../../static/index/sc.png" mode=""></image>
						<text>{{item.likeNum}}</text>
					</view>
				</view>
			</navigator>
		</view>

		<view class="talk_btn">聊天</view>
	</view>
</template>

<script>
	import {
	  ajax
	 } from '../../utils/public.js'
export default {
	data() {
		return {
			logList:[
				{
					date:"2020-02-02 08:32:23",
					logNum:'99',
					msg:'打卡',
					imageList:[
						{
							imageUrl:'../../static/index/dnkf.png'
						},
						{
							imageUrl:'../../static/index/dnkf.png'
						},
						{
							imageUrl:'../../static/index/dnkf.png'
						},
					],
					likeNum:'345',
					shareNum:'345',
					commentNum:'345',
				}
			],
		 userinfo:'',
		 id:'',
		};
	},
	methods:({
		//传参 打卡数据id
		gotoPublished:function(e){
			uni.navigateTo({
				url:'../myPublished/myPublished'
			})
		}
	}),
	onLoad(event) {
		this.userinfo = JSON.parse(decodeURIComponent(event.infoDetail));
		this.id = this.userinfo.uid;
		console.log(this.id)
		this.getData()
	},
	mounted(){

	},
	methods:{
		follow(){
			ajax({
			     url: 'friend/follow',
			     data: {
			      // token:uni.getStorageSync('access_token'),
						friend_uid :this.id
			     },
			     method: 'POST',
			     success: (res) =>{
						 console.log(res.data.msg)
						 this.getData()
			     },
			     error: function() {
						 console.log("111")
					 }
			    })
		},
		praise(e) {
			var that = this;
		
			const index = e.currentTarget.dataset.index;
			const dy_id = e.currentTarget.dataset.dy_id;
			console.log('123' + dy_id);
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
		getData(){
			ajax({
			     url: 'friend/userDetail',
			     data: {
						// friend_uid :'366',
						friend_uid :this.id
			     },
			     method: 'POST',
			     success: (res) =>{
						 const details = res.data.data
						 this.userinfo  = details
						 this.type = details.type
			     },
			     error: function() {}
			    })
		}
	}

};
</script>

<style lang="less" scoped>
.info_wrap {
	display: flex;
	align-items: center;
	padding: 0 44rpx;
	margin: 54rpx 0 82rpx;

	.avatar {
		width: 160rpx;
		height: 160rpx;
		margin-right: 48rpx;
	}
	.info_text {
		flex: 1;

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.name {
			font-size: 40rpx;
			font-weight: 500;
			color: rgba(50, 50, 50, 1);
		}

		.btn {
			display: flex;
			align-items: center;
			line-height: 48rpx;
			overflow: hidden;
			word-break: break-all;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			height: 48rpx;
			padding: 0 18rpx;
			font-size: 24rpx;
			color: rgba(153, 153, 153, 1);
			background: #fff;
			border-radius: 26rpx;
			border: 1px solid rgba(221, 221, 221, 1);

			image {
				width: 24rpx;
				height: 24rpx;
				margin-right: 10rpx;
			}
			.ygz {
				height: 18rpx;
			}

			.hxgz {
				height: 16rpx;
			}
		}

		.had_btn {
			color: #fff;
			background: rgba(63, 174, 42, 1);
		}

		.sub {
			font-size: 32rpx;
			color: rgba(153, 153, 153, 1);
			line-height: 44rpx;
		}
	}
}

.section_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 44rpx;
	margin: 44rpx 0 22rpx;

	text {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(50, 50, 50, 1);
		line-height: 40rpx;
	}
}

.works_list {
	padding: 0 44rpx;
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

.talk_btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 36rpx 0;
	font-size: 36rpx;
	text-align: center;
	color: rgba(51, 51, 51, 1);
	line-height: 50rpx;
	background-color: #fff;
	border-top: 1rpx solid #ddd;
}
</style>

