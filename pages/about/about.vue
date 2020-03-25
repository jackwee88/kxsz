<template>
	<view class="about_page">
		<view v-html ="data">{{data}}</view>
		<view class="Copyright">
			 闽ICP备19004461号 版权由开心书写所有    2019-2029
		</view>
	</view>
</template>

<script>
import { ajax } from '../../utils/public.js';
export default {
	onLoad() {
		this.getIndexStystem();
	},
	data() {
		return {
			data:''
		};
	},
	methods: {
		getIndexStystem() {
			ajax({
				url: 'index/getSystem',
				data: {
					type:"16"
				},
				success: (res) => {
					this.data = res.data.data
				}
			});
		}
	}
};
</script>

<style lang="less">
.about_page {
	padding: 70rpx 44rpx 0;
}
.Copyright{
	color: #999999;
	font-size: 28rpx;
	width: 390rpx;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 50rpx;
}
.title {
	margin-top: 88rpx;
	margin-bottom: 32rpx;
	font-size: 30rpx;
	color: rgba(62, 61, 61, 1);
	line-height: 38rpx;
}

.p {
	position: relative;
	padding-left: 28rpx;
	margin-bottom: 34rpx;
	font-size: 28rpx;
	color: rgba(62, 61, 61, 1);
	line-height: 38rpx;

	&::before {
		position: absolute;
		top: 12rpx;
		left: 0;
		width: 16rpx;
		height: 16rpx;
		background-color: #585858;
		content: '';
		border-radius: 50%;
	}
}
</style>
