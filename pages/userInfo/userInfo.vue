<template>
	<view>
		<view class="info_wrap">
			<image :src="userinfo.avatar" class="avatar"></image>

			<view class="info_text">
				<view class="top">
					<view class="name">{{ userinfo.nickname }}</view>
					<!-- <view class="btn had_btn">
						<image src="../../static/my/add.png" class="addhao"></image>
						关注
					</view> -->

					<!-- <view class="btn">
						<image src="../../static/my/ygz.png" class="ygz"></image>
						已关注
					</view> -->
				</view>
				<view class="sub">开心号：{{ userinfo.mobile }}</view>
				<!-- <view class="sub">男</view> -->
			</view>
		</view>

		<view class="section_title"><text>最近打卡</text></view>

		<view class="works_list">
			<navigator class="work_item" v-for="(item, index) in logList" :key="index" @click="gotoPublished()">
				<view class="user_info">
					<view class="left_side">
						<view class="date">{{ item.date }}</view>
					</view>

					<text class="view_count">浏览{{ item.logNum }}次</text>
				</view>
				<view class="msg">{{ item.msg }}</view>
				<view class="gallery" @tap.stop="gotoPublished" :data-browse_times="item.browse_times" :data-p_id="item.dy_id"
				 :data-index="index" :data-comment_count="item.comment_count">
					<view class="case-li case-view-item">
						<view style="position:relative;display:inline">
							<image v-if="item.video_ids" style="width:30%;height:200rpx;" :hidden="item.fullScreen" class="case-picture"
							 :src="item.video_ids + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast'"
							 mode="scaleToFill"></image>
							<image v-if="item.video_ids" :data-fullScreen="item.fullScreen" class="bt" mode="scaleToFill" :data-src="item.video_ids"
							 :data-index="index" @tap.stop="playVideo" src="/static/img/index/play3.png" style="width:60rpx;height:60rpx;position:absolute;top:-122rpx;left:73rpx;"></image>
						</view>

						<image v-for="(items, index2) in item.picture_arr" :key="index2" :src="items" @tap.stop="previewImg"
						 :data-effect_pic="item.picture_arr" :data-src="items" mode="aspectFill" :data-index="index"></image>
						<!--前提一个播放的按钮-->
					</view>

					<audio v-if="item.voice_ids" :src="item.voice_ids" controls class="audio" :poster="item.poster" :name="item.name"
					 :author="item.author" :data-index="index" @tap.stop="playorpause" :action="item.action"></audio>
					<view>
						<view></view>
					</view>
				</view>

				<view class="actions">
					<view class="item">
						<image src="../../static/index/zf.png" mode=""></image>
						<text>{{ item.shareNum }}</text>
					</view>
					<view class="item">
						<image src="../../static/index/pl.png" mode=""></image>
						<text>{{ item.commentNum }}</text>
					</view>
					<view class="item">
						<image src="../../static/index/sc.png" mode=""></image>
						<text>{{ item.likeNum }}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		ajax
	} from '../../utils/public.js';
	export default {
		data() {
			return {
				logList: [],
				userinfo: ''
			};
		},
		onload() {
			var value = uni.getStorageSync('loginToken');
			console.log(value + '123456');
			this.getLoglist
		},
		onShow: function() {
			// this.getuserData();
		},
		methods: {
			//传参 打卡数据id
			gotoPublished: function(e) {
				uni.navigateTo({
					url: '../myPublished/myPublished'
				});
			},
			//点赞
			praised: function() {
				ajax({
					url: 'study/praiseStudy',
					method: 'POST',
					data: {
						dy_id: '366'
					},
					success: res => {
						console.log(res + '123456');
					}
				});
			}
		},
		methods:{
			getLoglist(){
				      ajax({index:'index/myDaily', data:{}, success:(res) => {
						  console.log(res.data.data)
				        let list = res.data.list;
				        var action = {
				          method: "pause"
				        };
				
				        for (var i = 0; i < list.length; i++) {
				          list[i].if_input = false;
				          list[i].fullScreen = false;
				          list[i].action = action;
				          list[i].poster = list[i].picture_idss[0];
				          list[i].name = list[i].nickname + '的音频';
				        }
				
				        that.setData({
				          daka: list
				        });
				      }});
			}
		},
		mounted() {
			ajax({
					url: 'index/getProfile',
					data: {},
					method: 'POST',
					success: res => {
						const details = res.data.data;
						this.userinfo = details;
						console.log(this.userinfo);
					},
					error: function() {}
				})
		},
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
