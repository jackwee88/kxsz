<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item, index) in fansList" :key="index">
				<view @click="gotoOtherInfo(item)"><image :src="item.avatar" mode=""></image></view>
				<view class="info_wrap">
					<view class="left_side">
						<view class="name">{{ item.nickname }}</view>
						<view class="account">开心号{{ item.number }}</view>
					</view>
					<view class="btn" v-if="item.type === 'only'">
						<image src="../../../static/my/add.png" class="ygz"></image>
						关注
					</view>
					<view class="btn" v-if="item.type === 'mutual'">
						<image src="../../../static/my/hxgz.png" class="ygz"></image>
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
		return { fansList: [] };
	},
	mounted() {
		ajax({
			url: 'friend/myFansList',
			data: {
				token:'60f14aca9f2b3cf023e25639d5e120e2',
				keyword: '雨季'
			},
			method: 'POST',
			success: res => {
				const { count, list } = res.data.data;
				this.fansList = list;
			},
			error: function() {}
		});
	},
	methods:{
		gotoOtherInfo:function(e){
			let param ={id:e.friend_uid,	}
				console.log(param)
			uni.navigateTo({
				url: '../../userInfo/otherInfo?userInfo=' + encodeURIComponent(JSON.stringify(param))
			});
		},
	}
};
</script>

<style lang="less" scoped>
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
				text-align: center;
				height: 48rpx;
				padding: 0 18rpx;
				font-size: 24rpx;
				color: #fff;
				background: rgba(63, 174, 42, 1);
				border-radius: 26rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>
