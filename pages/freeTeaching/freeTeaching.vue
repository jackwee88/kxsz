<template>
	<view>
		<!-- 视频 -->
		<view class="banner">
			<video class="video" src="https://video.kaifadanao.cn/20190911/e0c488cd3847a8b8f54fec96ee1b66aa.mp4" autoplay="true" objectFit="fill" controls></video>
		</view>
		<!-- 一些功能 -->
		<view class="module">
			<navigator class="module_item" url="../online_Teach/onlineTeach">
				<view class="itemcont">
					<image class="icon" src="../../static/freeTeaching/tongbuxuexi.png" mode="widthFix"></image>
				</view>
				<text>教材同步教学视频</text>
			</navigator>
			<view class="module_item" v-for="(item,index) in moduleList" @click="gotoCommonMulu(item)">
				<view class="itemcont">
					<image class="icon" :src="item.img" mode="widthFix"></image>
				</view>
				<text>{{item.title}}</text>
			</view>
			<navigator class="module_item" url="../ruler-buy/ruler-buy">
				<view class="itemcont">
					<image class="icon" src="../../static/freeTeaching/goumai.png" mode="widthFix"></image>
				</view>
				<text>书法尺购买</text>
			</navigator>
			<navigator class="module_item" url="../Copyright/Copyright">
				<view class="itemcont">
					<image class="icon" src="../../static/freeTeaching/banquan.png" mode="widthFix"></image>
				</view>
				<text>版权声明</text>
			</navigator>
			<navigator class="module_item" url="../my/shengjihuiyuan/shengjihuiyuan">
				<view class="itemcont">
					<image class="icon" src="../../static/freeTeaching/huiyuan.png" mode="widthFix"></image>
				</view>
				<text>会员福利</text>
			</navigator>
		</view>
		<!-- 联系客服按钮 -->
		<view class="rightfiex">
			<navigator url="" class="rightfiex_cont rightfiex_first">
				<image class="" src="../../static/freeTeaching/kefu.png" mode="widthFix"></image>
			</navigator>
			<navigator url="" class="rightfiex_cont rightfiex_first">
				<image class="" src="../../static/freeTeaching/addhao.png" mode="widthFix"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				moduleList:[
					{
						title:'功能尺教学',
						img:'../../static/freeTeaching/shiyongjiaoxue.png'
					},
					{
						title:'笔画+思政教学',
						img:'../../static/freeTeaching/bihua.png'
					},
					{
						title:'坐姿握笔',
						img:'../../static/freeTeaching/zuozi.png'
					},
					{
						title:'文字解码',
						img:'../../static/freeTeaching/jiema.png'
					},
					{
						title:'扩展教学',
						img:'../../static/freeTeaching/kuozhan.png'
					},
				]
			}
		},
		onLoad() {
			
		},
		methods:{
			gotoCommonMulu: function(e) {
				let param = {
					title:e.title
				};
				uni.navigateTo({
					url: '../commonMulu/commonMulu?name=' + encodeURIComponent(JSON.stringify(param))
				});
			},
		},
		mounted() {
			// uni.request({
			// 	url: 'https://kxsx.kaifadanao.cn/api/cate/smodelList',
			// 	method: 'POST',
			// 	data: {},
			// 	success: res => {
			// 		console.log(res);
			// 	},
			// 	fail: () => {},
			// 	complete: () => {}
			// });
		}
	}
</script>

<style>
	@import "./freeTeaching.css";
</style>
