<template>
	<view>
		<view class="top_title">
			<navigator open-type="navigateBack">
				<image src="/static/onlineStore/back@2x.png" mode="aspectFit" class="icon1"></image></navigator>
			<navigator url="../shoppingcart/shoppingcart"><image src="/static/index/gwc.png" mode="" class="icon2"></image></navigator>
		</view>
		<!-- 商品详情 -->
		<cover-view class="team-position" v-if="assemble!=null">
			<view class="team-num">2人团</view>
			<view class="team-total">已拼26件</view>
		</cover-view>
		<!-- 商品详情 -->
		<swiper :autoplay="true" :interval="3000" :duration="1000" class="detailPicture">
			<block v-for="(item, index) in swiperImages" :key="index">
				<swiper-item>
					<view class="detailPicture"><image :src="item" style="width: 100%;height: 660rpx;"></image></view>
				</swiper-item>
			</block>
		</swiper>
		<!-- 限时秒杀 判断商品是否为秒杀商品-->
		<view class="xsms" v-if="productDetail.sale_status==='2'">
			<view class="back-red">
				<view class="back-red-txt">
					<text style="color: #ffffff;font-size: 32rpx;">¥</text>
					<text style="color: #ffffff;font-size: 52rpx;">56</text>
					<view style="color: #E5E5E5;font-size: 24rpx;" class="origin-price">¥88.00</view>
				</view>
				<view class="cheap">已抢227件</view>
			</view>
			<view class="back-yello">
				<text style="color: #E44A54;font-size: 32rpx;">距结束</text>
				<uni-countdown backgroundColor="#F3F15B" color="#e44a54" splitorColor="#e44a54" :hour="1" :minute="12" :second="40" :showDay="false"></uni-countdown>
			</view>
		</view>
		<!-- 商品价格 库存 -->
		<view class="product-detail">
			<view class="beij">
				<text style="color: #e33944;font-size: 24rpx;">¥</text>
				<text style="color: #e33944;margin-right: 12rpx;">488</text>
				<text style="color: #A1A4A5;font-size: 28rpx;text-decoration: line-through;">¥588</text>
			</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;margin-right: 12rpx;">已售277</text>
				<text style="color: #A1A4A5;font-size: 28rpx;">库存59</text>
			</view>
		</view>
		<view class="product-title">
			<view class="productTxt">
				<text
					style="font-size: 30rpx;
				color: #333333;font-weight: bolder;"
				>
					<!-- 			{{ banner.title }} -->
					雨女无瓜雨女无瓜雨女无瓜雨女无瓜雨女无瓜
				</text>
			</view>

			<navigator class="btn-share">
				<image src="../../static/onlineStore/share.png" style="width:30rpx ;height: 28rpx;"></image>
				<text style="color:#b3b3b3;font-size: 28rpx;">分享</text>
			</navigator>
		</view>
		<!-- 拼团 -->
		<view class="team-buy">
				<view class="youhuiquan">
					<text style="color: #333333;font-size:30rpx ;">10个团正在热拼，可直接参与</text>
					<view @click="assmbleDetail()">
						<text style="color: #666666;font-size:24rpx ;">查看全部</text>
						<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
					</view>
					</view>		
				<view class="team-buy-detail" v-for="(data, index) in teamlist.splice(0,2)" :key="index">
					<view class="assmebleleft">
					<view class="circle-avator">
						<image src="" mode="aspectFit"></image>
						</view>
					<view class="team-user">{{ data.name }}</view>
					</view>
						<view class="assmebleright">
							<view>
						<view class="pingtuan">
							差<text style="font-size: 28rpx;color:#E02020;">{{ data.num }}</text>
							人拼成
						</view>
						<view class="timeSetting">
							<text style="font-size: 28rpx;color: #999999;">剩余</text>
							<uni-countdown backgroundColor="#ffffff" color="#999999" splitorColor="#999999" :hour="1" :minute="12" :second="40" :showDay="false"></uni-countdown>
						</view>
						</view>
					<button class="team-btn"><text style="color: #ffffff;font-size:28rpx ;">参团&nbsp;></text></button>
				</view>
				</view>
		</view>
		<!-- 优惠券 -->
		<view></view>
		<view class="youhuiquan" url="">
			<view><text style="color: #666666;font-size:26rpx ;">优惠券</text></view>
			<navigator url="">
				<text style="color: #666666;font-size:26rpx ;">领取优惠券</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
			</navigator>
		</view>
		<!-- 售后售前 -->
		<navigator class="pre-sale">
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">全场包邮</view>
			</view>
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">极速发货</view>
			</view>
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">七天无理由退换</view>
			</view>
			<view style="margin-left:120rpx ;"><image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image></view>
		</navigator>
		<!-- 地址 -->
		<navigator url="" class="address">
			<text class="txt-address">地址</text>
			<view class="choose-address">选择收货地址</view>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="address">
			<text class="txt-address">参数</text>
			<view class="choose-address productTxt">选择收货地址地址选择收货地址地址地址选择收货地址地址择收货地址地址<<</view>
			<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="comment">
			<view class="choose-address">评价(999+)</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;">查看全部</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
			</view>
		</navigator>
		<view class="pic-txt-detail">
			<view>图文详情</view>
			<view v-for="(item, index) in swiperImages" :key="index" class="detailPicture">
				<image :src="item" style="width: 100%;height: 650rpx;"></image></view>
		</view>
		<!-- 加入购物车  固定-->
		<view class="oprate">
			<view class="oprate-content">
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/kf.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">客服</view>
				</navigator>
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/gwc.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">购物车</view>
				</navigator>
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/sc.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">收藏</view>
				</navigator>
				<view>
					<button size="mini" class="bth-gwc">加入购物车</button>
					<button size="mini" class="btn-fastbuy">立即购买</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../utils/public.js'
export default {
	data() {
		return {
			swiperImages: [],
			productDetail:{},
			assemble:null,
			teamlist: [
				{
					name: '与女无瓜',
					num: '1'
				},
				{
					name: '与女无瓜',
					num: '1'
				}
			],
			pid:''
		};
	},
	onLoad(event) {
		console.log(event);
		this.banner = JSON.parse(decodeURIComponent(event.productDetail));
		this.pid = this.banner.id
	},
	mounted() {
		//请求商品详情
		ajax({
			url:'goods/detail',
			data:{
				// pid:'this.pid',
				pid:'1201',
			},
			method:'POST',
			success:(res)=>{
				this.productDetail =  res.data.data
				const {image_text,assmeble} = res.data.data
				this.swiperImages =  image_text
				this.assemble = assmeble
			},
			error:function(){
				
			}
		}),
		ajax({
			url:'assemble/wait',
			method:'POST',
			data:{
				// goods_id:this.pid,
				goods_id:'1072'
				},
			success:(res)=>{
				const {count,list} = res.data.data
				 this.teamlist = list
			},
			error:function(){
				
			}
		})
	},
	methods: {
		assmbleDetail:function(){
			console.log(this.pid)
	  uni.navigateTo({
				url: '../assemble/assemble',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
			}
	}
};
</script>

<style style lang="less" scoped>
@import './product-detail.css';
.detailPicture {
	width: 750rpx;
	height: 660rpx;
}
.assmeble{
	background-color: #ffffff;
}
	.top_title{
		.input-wrap{
			height:60rpx;
			background:rgba(239,239,239,1);
			border-radius:34rpx;
			width: 70%;
			.search{
				width: 32rpx;
				height: 34rpx;
				margin-left: 50rpx;
				margin-right: 22rpx;
			}
			.input{
				font-size:28rpx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:#333;
				line-height:60rpx;
			}
		}
		.icon1{
			width: 18rpx;
			height: 32rpx;
		}
		.icon2{
			height: 44rpx;
			width: 44rpx;
		}
	}
</style>
