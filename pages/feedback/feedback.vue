<template>
	<view class="feedback_page">
		<view class="tip">您好，亲爱的用户，对于我们的商品让您不满意感到抱歉，请您留下宝贵意见，我们将尽快处理</view>

		<view class="section_title"><text>请选择您要反馈的意见类型：</text></view>

		<view class="feedback_types">
			<view :class="{item: true, active: activeIndex == index}" v-for="(item, index) in typeList" :key="index" @click="selectType(index)" :data-id="item.id">
			{{item.name}}
			</view>
		</view>

<!-- 		<view class="section_title">
			<text>请选择问题订单</text>
			<navigator url=""><image src="../../static/index/qj.png" mode=""></image></navigator>
		</view> -->

		<form>
			<textarea class="content_input" v-model="content" placeholder="请填写意见描述(500字以内)" />
			<input type="text" v-model="qq" class="qq_input" placeholder="请填写联系QQ" />
			<input type="text" v-model="mobile" placeholder="请填写联系电话" />
			<view class="uploadbtn">
			  <button class="btn" type="submit" @tap="submit">发表</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
	  ajax
	 } from '../../utils/public.js'
export default {
	data() {
		return {
			typeList: [
			],
			activeIndex: null,
			content: '',
			qq: '',
			mobile: '',
			id:''
		};
	},
	
	methods: {
		selectType(i) {
			this.activeIndex = i
			this.id = this.activeIndex+1
		},
		submit(e){
			ajax({
				url:'feedback/upload',
				data:{
					cate:this.id,
					content:this.content,
					qq:this.qq,
					mobile:this.mobile
				},
				method:'POST',
				success:(res)=>{
					console.log(res.data.msg)
					uni.showToast({
						title:res.data.msg
					})
				},
				error:function(){
					
				}
			})
	},
	},
	mounted() {
		ajax({
			url:'feedback/cate',
			data:{},
			method:'POST',
			success:(res)=>{
				console.log(res)
				const{list} = res.data.data
				this.typeList = list
			},
			error:function(){
				
			}
		})
	}
};
</script>

<style lang="less" scoped>
.feedback_page {
	padding: 0 44rpx;
}
.tip {
	padding: 0 48rpx;
	margin: 30rpx 0;
	font-size: 26rpx;
	color: rgba(161, 164, 165, 1);
	line-height: 38rpx;
	text-align: center;
}
.uploadbtn {
  width: 100%;
  height: 90rpx;
	margin-top: 60rpx;
}
.btn {
  width: 70%;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #008800;
  color: #fff;
  font-size: 36rpx;
  border-radius: 10rpx;
  margin: 0 auto;
}
.section_title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 44rpx 0 22rpx;

	text {
		font-size: 28rpx;
		font-weight: 500;
		color: rgba(50, 50, 50, 1);
		line-height: 40rpx;
	}

	navigator {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #999;

		image {
			width: 16rpx;
			height: 24rpx;
			margin-left: 10rpx;
		}
	}
}

.feedback_types {
	display: flex;
	flex-wrap: wrap;

	.item {
		width: 178rpx;
		height: 56rpx;
		margin-bottom: 26rpx;
		margin-right: 50rpx;
		font-size: 26rpx;
		color: rgba(101, 104, 105, 1);
		text-align: center;
		line-height: 56rpx;
		background-color: #fff;
		border-radius: 28rpx;
		border: 1rpx solid #999;
		
		&:nth-of-type(3n) {
			margin-right: 0;
		}
	}
	
	.active {
		color: #41AD29;
		border-color: #41AD29;
	}
}
.content_input {
	margin-top: 60rpx;
}
.qq_input {
	margin-bottom: 70rpx;
}
</style>
