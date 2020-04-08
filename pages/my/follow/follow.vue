<template>
	<view>
<!-- 		<view class="search_box">
			<image src="../../../static/jctbxzjx/search.png" class="icon"></image>
			<input type="text" :value="search_txt" placeholder="搜索关注" />
		</view> -->
		<view v-if="myFriendList.length == 0" class="none">    
      <image src="../../../static/my/wujieguo.png" class="wujieguo" />
      <view class="none none-text">您暂时还没有关注的人哦</view>
    </view>
		<view class="list" v-if="myFriendList.length >= 1">
			<view class="item" v-for="(item, index) in myFriendList" :key="index">
				<view @click="gotoOtherInfo(item)"><image :src="item.avatar" mode=""></image></view>
				<view class="info_wrap">
					<view class="left_side">
						<view class="name">{{ item.nickname }}</view>
						<view class="account">开心号：{{ item.number }}</view>
					</view>
					<view class="btn" v-if="item.type == 'only'" @tap="follow" :data-id="item.id" :data-index="index" data-type="item.type">
						<image src="../../../static/my/ygz.png" class="ygz"></image>
						取消关注
					</view>
					<view class="had_btn" v-if="item.type == 'none'" @tap="follow" :data-id="item.id" :data-index="index" data-type="item.type">
						<image src="../../../static/my/add.png" class="ygz"></image>
						关注
					</view>
					<view class="btn" v-if="item.type == 'mutual'" @tap="follow" :data-id="item.id" :data-index="index" data-type="item.type">
						<image src="../../../static/my/hxgz.png" class="ygz"></image>
						相互关注
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { ajax } from '../../../utils/public.js';
export default {
	data() {
		return {
			search_txt: '',
			myFriendList: []
		};
	},
	onLoad() {
		this.getData();
	},
	mounted() {},
	methods: {
		getData() {
			ajax({
				url: 'friend/myFriendList',
				data: {},
				method: 'POST',
				success: res => {
					const { count, list } = res.data.data;
					this.myFriendList = list;
				},
				error: function() {}
			});
		},

		gotoOtherInfo: function(e) {
			let param = { uid: e.id };
			uni.navigateTo({
				url: '../../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},

		follow(e) {
			const index = e.currentTarget.dataset.index;
			const type = e.currentTarget.dataset.type;
			ajax({
				url: 'friend/follow',
				data: {
					friend_uid: e.currentTarget.dataset.id
				},
				method: 'POST',
				success: res => {
					if (type=='mutual') {
						if (res.data.status == 1) {
							this.myFriendList[index].type = 'none';
						} 
					}if(type=='none'){
						if(res.data.status==2){
							this.getData()
						}
					}
					else {
						if (res.data.status == 1) {
							this.myFriendList[index].type = 'none';
						} else if (res.data.status == 2) {
							this.myFriendList[index].type = 'only';
						}
					}
				},
				error: function() {
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
	.wujieguo {
	  margin-top: 30%;
	  width: 200rpx;
	  height: 200rpx;
	}
	.none {
	  text-align: center;
	}
	
	.none-text {
	  margin-top: 28rpx;
	  font-size: 32rpx;
	  color: #b5b5b5;
	}
.search_box {
	position: relative;
	width: 502rpx;
	height: 60rpx;
	margin: 30rpx auto;
	background: rgba(239, 239, 239, 1);
	border-radius: 34rpx;

	.icon,
	input {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.icon {
		left: 50rpx;
		width: 28rpx;
		height: 30rpx;
	}

	input {
		left: 90rpx;
	}
}

.list {
	padding: 0 36rpx 0 44rpx;

	.item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #ddd;

		&:last-of-type {
			border: 0;
		}

		image {
			width: 100rpx;
			height: 100rpx;
			margin-right: 24rpx;
		}

		.info_wrap {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left_side {
				.name {
					font-size: 36rpx;
					color: rgba(50, 50, 50, 1);
					line-height: 50rpx;
				}

				.account {
					font-size: 28rpx;
					color: rgba(153, 153, 153, 1);
					line-height: 40rpx;
				}
			}

			.btn {
				display: flex;
				align-items: center;
				height: 48rpx;
				padding: 0 18rpx;
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				background: rgba(255, 255, 255, 1);
				border-radius: 26rpx;
				border: 1px solid rgba(221, 221, 221, 1);

				image {
					width: 24rpx;
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
							display: flex;
							align-items: center;
							text-align: center;
							height: 48rpx;
							padding: 0 18rpx;
							font-size: 24rpx;
							color: #fff;
							background: rgba(63, 174, 42, 1);
							border-radius: 26rpx;
							.ygz {
								width: 24rpx;
								height: 24rpx;
							}
						}
		}
	}
}
</style>
