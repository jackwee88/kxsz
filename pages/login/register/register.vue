<template>
	<view class="">
		<view class="loginText">欢迎注册</view>
		<view class="register"><navigator url="../login" style="display: inline-block;">已有账号，立即登录</navigator></view>
		<form action="">
			<input maxlength="11" class="phoneInput loginInput" type="number" value="" placeholder="请输入手机号码" placeholder-class="pla" v-model="phone" />
			<view class="yzmLogin">
				<input type="text" class="yzmInput" value="" placeholder="请输入验证码" placeholder-class="pla" v-model="yzm" />
				<text v-if="second == ''" class="yzmBtn" @click="yzmBtn">获取验证码</text>
				<text v-else class="yzmTime">{{ second }}s</text>
			</view>
			<input type="password" class="passwordInput loginInput" value="" placeholder="请输入登录密码(6-18位字符)" placeholder-class="pla" v-model="password" maxlength="16"/>
			<input type="password" class="passwordInput loginInput" value="" placeholder="请再次输入登录密码（6-18位字符）" placeholder-class="pla" v-model="rePassword" />
			<button
				type="submit" @tap="submit"
				:class="phone == '' || password == '' || yzm == '' || rePassword == '' ? 'loginBtn loginnBtNo' : 'loginBtn loginnBtnYes'"
				:disabled="phone == '' || password == '' || yzm == '' || rePassword == '' ? true : false"
			>
				注册
			</button>
		</form>
		<view class="">
			<view class="orderLoginView"><text>第三方登录</text></view>
			<view class="orderLoginBtn">
				<image src="../../../static/login/qq.png" mode="widthFix" class="qqlogin" @tap="qqLogin"></image>
				<image src="../../../static/login/weixin.png" mode="widthFix" class="weixinlogin" @tap="wxLogin"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../../utils/public.js'
export default {
	data() {
		return {
			phone: '', //电话
			second: '', //秒数
			yzm: '', //验证码
			password: '', //密码
			rePassword: '' //二次密码
		};
	},
	methods: {
		//获取验证码点击
		// yzmBtn(){
		// 	ajax({
		// 	     url: 'index/appCode',
		// 	     data: {
		// 				 phone:this.phone,							 // code
		// 	     },
		// 	     method: 'POST',
		// 	     success: function(res) {
		// 			(res)
		// 	     },
		// 	     error: function() {}
		// 	    })
		// },
		yzmBtn(){
			if(this.phone===''){
				
			}else{
			let _self=this
			let s=60
			let stime=setInterval(function(){
				s--;
				if(s==0){
					_self.second=''
					clearInterval(stime)
				}else{
					_self.second=s
				}
			},1000)
			ajax({
			     url: 'index/appCode',
			     data: {
						 phone:this.phone,							 // code
			     },
			     method: 'POST',
			     success: function(res) {
			     },
			     error: function() {}
			    })
}
		},
		wxLogin() {
			console.log('您使用的是微信登录');
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes.authResult);
								// 获取用户信息
								// this.getPhoneNumber()
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log('用户昵称为：' + JSON.stringify(infoRes.userInfo));
										var i_uid=0;
										var scene = wx.getStorageSync('scene');
										ajax({
											url: 'index/wxLogins',
											data: {
												// phone: '',
												// code: '',
											  openid:infoRes.userInfo.openId,
												user_info: infoRes.userInfo,
												i_uid: i_uid,
												scene: scene
											},
											success: (res )=> {
												console.log(res)
												if (res.data.status == 2) {
													uni.showToast({
														title: '登录成功'
													});
													uni.switchTab({
														url:'../index/index'
													})
													uni.setStorageSync('loginToken',res.data.data.token)
												}
											},
											fail: () => {
												console.log('登陆失败');
											},
											complete: () => {}
										});
									},
									fail: function(infoRes) {
										uni.showToast({
											title: infoRes.errMsg
										});
										console.log(失败)
									}
								});
							}
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: '微信登录授权失败'
					});
				}
			});
		},
		submit() {
			if(this.password===this.rePassword){
				ajax({
					url: 'index/appRegister',
					data: {
						phone: this.phone,
						password: this.password,
						code: this.yzm
					},
					method: 'POST',
					success: function(res) {
						// const{count,list}=res.data.data
						// // (list)
						// this.goodsList = list
						// (this.goodsList)
						uni.setStorageSync('loginToken',res.data.data)
						uni.navigateTo({
							url: '../../index/index'
						})
					},
					error: function() {}
				});
			}else{
				uni.showModal({
					// title: '提示',
					    content: '您两次输入的密码不一致，请重新输入',
					    success: function (res) {
					        if (res.confirm) {
					            ('用户点击确定');
					        } else if (res.cancel) {
					            ('用户点击取消');
					        }
					    }
				})
			}
			
		},
	}
};
</script>

<style>
@import './register.css';
</style>
