<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item, index) in fansList" :key="index">
				<navigator url="../../userInfo/otherInfo"><image :src="item.avatar" mode=""></image></navigator>
				<view class="info_wrap">
					<view class="left_side">
						<view class="name">{{ item.nickname }}</view>
						<view class="account">{{ item.frend_uid }}</view>
					</view>

					<view class="btn">
						<image src="../../../static/my/add.png" class="addhao"></image>
						关注
					</view>
					<view class="btn">
						<image src="../../../static/my/add.png" class="addhao"></image>
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
		return { fansList: [] };
	},
	mounted() {
		ajax({
			url: 'friend/myFansList',
			data: {
				// type:that.type,
				// platform_type:that.index,
				// page:page,
				// page_size:that.page_size,
				// access_token:uni.getStorageSync('access_token')
				keyword: ''
			},
			method: 'POST',
			success: res => {
				const { count, list } = res.data.data;
				this.fansList = list;
			},
			error: function() {}
		});
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
