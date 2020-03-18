<template>
	<view class="">
		<view class="tequan_line">
			<text class="tequan-title">会员特权</text>
		</view>
		<view class="cover">
			<view class="part part_one">
				<image src="../../../static/my/shipin.png" mode="widthFix" class="shipin"></image>
				<view class="">
					<text>视频</text>
				</view>
			</view>
			<view class="part part_two">
				<image src="../../../static/my/yinpin.png" mode="widthFix" class="shipin"></image>
				<view class="">
					<text>音频</text>
				</view>
			</view>
			<view class="part part_three">
				<image src="../../../static/my/tuwen.png" mode="widthFix" class="shipin"></image>
				<view class="">
					<text>图文</text>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="bottom-txt">
				<text @tap="jifen">会员积分</text>
				<text @tap="back">个人中心</text>
				<text>联系客服</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		jifen() {
			wx.navigateTo({
				url: '/pages/my/jifenguize/jifenguize'
			});
		},

		toTop(e) {
			var that = this;
			that.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		back() {
			wx.navigateBack({});
		}
	}
}
</script>

<style>
	@import "./huiyuantequan.css";
</style>
