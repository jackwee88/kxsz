<template>
	<view class="section">
		<view class="header-box">
			<image class="header class_first" :src="userinfo.avatar"></image>

			<view class="body-box class_second">
				<view class="section_cont">
					<view class="item1">
						<view class="name showinfo">{{ userinfo.username}}</view>
						<image v-if="status == 1" class="icon wujieguo" src="../../../static/my/wujieguo.png"></image>
						<view v-if="status == 1" class="tip">{{ tips }}</view>
						<view class="name showinfos" v-if="status == 2"><image src="userinfo.signature" mode="widthFix"></image></view>
						<view class="time showinfo" vif="status==2">{{ userinfo.createtime }}</view>
					</view>

					<!-- 没有个性签名是显示 -->
					<view class="noshow" v-if="status == 3">
						<view class="text">{{ userinfo.nickname }}</view>
						<image class="icon wujieguo" src="../../../static/jctbxzjx/wujieguo.png"></image>
						<view class="tip">{{ tips }}</view>
					</view>
					<navigator v-if="status == 3" class="seedetail" @click="applySign">申请签名</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {ajax} from '../../../utils/public.js'
export default{
	data(){
		return{
			userinfo:{},
		}
	},
	onLoad: function (options) {
	    var that = this;
	 ajax(
	 {
		 url:'index/getProfile', 
		 data:{}, 
		 success:(res) => {
	        this.userinfo=res.data.data
	    }})
	    // 1已申请，未设计签名,2:已申请，已设计签名，3未申请
	  ajax({url:'videoPacks/getSignature',data:{},success:(res)=>{
	        if (res.data.data.status==1){
	            this.status= res.data.data.status,
	            this.tips= '签名正在努力设计中...'

	        } else if (res.data.status == 2){
	            this.status= res.data.data.status,
	            this.tips= res.data.msg
	        }else{
	            this.status= res.data.data.status
	            // createtime: res.data.data.createtime
	        }

	      }})
	  },
}
</script>

<style>
@import './signatrue.css';
</style>
