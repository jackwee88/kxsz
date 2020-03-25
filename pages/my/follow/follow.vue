<template>
	<view>
		<view class="search_box">
			<image src="../../../static/jctbxzjx/search.png" class="icon"></image>
			<input type="text" :value="search_txt" placeholder="搜索关注" />
		</view>

		<view class="list">
			<view class="item" v-for="(item,index) in myFriendList" :key="index">
				<view @click="gotoOtherInfo(item)">
					<image :src="item.avatar" mode=""></image>
				</view>
				<view class="info_wrap">
					<view class="left_side">
						<view class="name">{{item.nickname}}</view>
						<view class="account">开心号：{{item.number}}</view>
					</view>
					<view class="btn" v-if="item.type === 'only'">
						<image src="../../../static/my/ygz.png" class="ygz" @tap.stop="follow(item)"></image>
						已关注
					</view>
					<view class="btn" v-if="item.type === 'none'">
						<image src="../../../static/my/ygz.png" class="ygz" @tap.stop="follow(item)"></image>
						关注
					</view>
					<view class="btn" v-if="item.type === 'mutual'">
						<image src="../../../static/my/ygz.png" class="ygz" @tap.stop="follow(item)"></image>
						互相关注
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
			myFriendList:[]
		};
	},
	onLoad(){
		this.getData()
	},
	mounted() {
		
	},
	methods: {
		getData(){
			ajax({
			url: 'friend/myFriendList',
			data: {},
			method: 'POST',
			success: (res)=> {
				const{count,list} = res.data.data
				this.myFriendList = list
			},
			error: function() {}
		})
		},
		
		gotoOtherInfo:function(e){
			let param ={uid:e.id,}
				console.log(param)
			uni.navigateTo({
				url: '../../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		follow(e){
			ajax({
			     url: 'friend/follow',
			     data: {
						friend_uid :e.id
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
	}
};
</script>

<style lang="less" scoped>
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
		}
	}
}
</style>
