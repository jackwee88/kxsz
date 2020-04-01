<template>
	<view>
		<view v-if="fansList.length == 0" class="none">
		  <image src="../../../static/my/wujieguo.png" class="wujieguo" />
		  <view class="none none-text">您目前还没有粉丝哦</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in fansList" :key="index">
				<view @click="gotoOtherInfo(item)"><image :src="item.avatar" mode=""></image></view>
				<view class="info_wrap">
					<view class="left_side">
						<view class="name">{{ item.nickname }}</view>
						<view class="account">开心号{{ item.number }}</view>
					</view>
					<view class="btn" v-if="item.type == 'only'" 
					@tap="follow" 
					:data-id="item.id" 
					:data-index="index"
					:data-type="item.type">
						<image src="../../../static/my/add.png" class="ygz"></image>
						关注
					</view>
					<view class="btn" v-if="item.type == 'mutual'" 
					@tap="follow" 
					:data-id="item.id"
					:data-type="item.type"
					:data-index="index"
					>
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
		return { fansList: [],type:'',keyword:'' };
	},
	mounted() {

	},
	onLoad(event){
		this.banner = JSON.parse(decodeURIComponent(event.fans));
		this.keyword = this.banner.keyword;
		this.getdata()
	},
	methods:{
		getdata(){
			ajax({
				url: 'friend/myFansList',
				data: {
					token:uni.getStorageSync('loginToken'),
					keyword:this.keyword
				},
				method: 'POST',
				success: res => {
					const { count, list } = res.data.data;
					this.fansList = list;
					for(var i=0;i<list.length;i++){
						this.type=list[i].type
						
					}
				},
				error: function() {}
			});
		},
		gotoOtherInfo:function(e){
			let param ={id:e.friend_uid,}
			uni.navigateTo({
				url: '../../userInfo/otherInfo?userInfo=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		follow(e){
			const index=e.currentTarget.dataset.index
			let type = e.currentTarget.dataset.type
			ajax({
			     url: 'friend/follow',
			     data: {
						friend_uid :e.currentTarget.dataset.id
			     },
			     method: 'POST',
			     success: (res) =>{
						 if(res.data.status==1){
							 this.myFansList[index].type ='only'
						 }else if(res.data.status==2){
							 this.myFansList[index].type = 'mutual'
						 }
						 this.getdata()
			     },
			     error: function() {
					 }
			    })
		},
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
