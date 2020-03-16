<!-- 首页弹出窗口 -->

<template>
	<view class="containerModal">
		<view class="youhuiquan" >
			<view class="youhuiNum">
				<text>¥10</text>
			</view>
			<view class="youhuiDetail">
				<view>每满99减10元</view>
				<view>2019.03.20-2019.05.20</view>
				<image src="../../static/index/newPerpson.png" style="width: 84rpx;height: 78rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.containerModal{
	width: 602rpx;
	height: 660rpx;
	background-color: #2F881E;
}
.youhuiquan{
	display: flex;
	flex-direction: row;
	height: 130rpx;
}
.youhuiNum{
	background-image:linear-gradient(#e38735,#EB6930) ;
}
.youhuiDetail{
	background-color: #ffffff;	
}
</style>