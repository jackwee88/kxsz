<!-- 首页弹出窗口 -->

<template>
	<view class="containerModal">
		<view class="modalTitle">恭喜您获得新人礼包</view>
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
.modalTitle{
	color: #ffffff;
	font-weight: 600;
	font-size: 52rpx;
}
.containerModal{
	width: 602rpx;
	height: 660rpx;
	background-color: #2F881E;
	padding:30rpx 20rpx 15rpx 20rpx;
	text-align: center;
	margin: 328rpx auto;
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