<template>
	<view>
		<view class="loginText">登录</view>
		<view class="register"><navigator url="register/register" style="display: inline-block;">还没有账号，立即注册</navigator></view>
		<form action="">
			<input maxlength="11" class="phoneInput loginInput" type="number" value="" placeholder="请输入手机号码" placeholder-class="pla" v-model="phone" />
			<input v-if="msgLogin == 'isMsgLogin'" type="password" class="passwordInput loginInput" value="" placeholder="请输入密码" placeholder-class="pla" v-model="password" />
			<view class="yzmLogin" v-else>
				<input type="text" class="yzmInput" value="" placeholder="请输入验证码" placeholder-class="pla" v-model="yzm" />
				<text v-if="second == ''" class="yzmBtn" @click="yzmBtn">获取验证码</text>
				<text v-else class="yzmTime">{{ second }}s</text>
			</view>
			<button
				v-if="msgLogin == 'isMsgLogin'"
				:class="phone == '' || password == '' ? 'loginBtn loginnBtNo' : 'loginBtn loginnBtnYes'"
				:disabled="phone == '' || password == '' ? true : false"
				type="submit"
				@tap="phoneLogin"
			>
				登录
			</button>
			<button
				v-else
				:class="phone == '' || yzm == '' ? 'loginBtn loginnBtNo' : 'loginBtn loginnBtnYes'"
				:disabled="phone == '' || yzm == '' ? true : false"
				type="submit"
				@tap="phoneSmsLogin"
			>
				登录
			</button>
			<view class="orderLogin">
				<text v-if="msgLogin == 'isMsgLogin'" @click="orderLogin(msgLogin)">短信登录</text>
				<text v-else @click="orderLogin(msgLogin)">账号密码登录</text>
			</view>
		</form>
		<view class="">
			<view class="orderLoginView"><text>第三方登录</text></view>
			<view class="orderLoginBtn">
				<image src="../../static/login/qq.png" mode="widthFix" class="qqlogin" @tap="qqLogin"></image>
				<image src="../../static/login/weixin.png" mode="widthFix" class="weixinlogin" @tap="wxLogin"></image>
			</view>
		</view>
		<!-- <view v-if="canIUse">
		    <view class='header'>
		        <image src='https://kxsx.kaifadanao.cn/assets/img/logoxcx.png'></image>
		    </view>
		
		    <view class='content'>
		        <view>申请获取以下权限</view>
		        <text>获得你的公开信息(昵称，头像等)</text>
		    </view>
		     <button class='login-btn' type='primary' open-type="getUserInfo" lang="zh_CN" @click="getUserInfo" v-if="is_login=='true'">
		        授权登录
		    </button>
		    <button  class='login-btn' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="is_login=='true'">手机号登录</button>
		</view> -->
	</view>
</template>

<script>
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			//登录判断，判断是否是短信登录
			msgLogin: 'isMsgLogin',
			phone: '', //电话，账号
			yzm: '', //验证码
			password: '', //密码
			second: '' ,//验证码需要的秒
		  // canIUse: wx.canIUse('button.open-type.getUserInfo'),
			canIUse: false,
      is_login:'true'
		};
	},
	onLoad: function() {
				uni.login({
					success: function(res) {
						// 获取code
						// console.log(JSON.stringify(res));
					}
				});
},
	methods: {
		//短信登录、账号登录点击
		orderLogin(id) {
			if (id == 'isMsgLogin') {
				this.msgLogin = 'isAccountLogin';
			} else {
				this.msgLogin = 'isMsgLogin';
			}
		},
		phoneLogin() {
			ajax({
				url: 'index/phoneLogin',
				data: {
					phone: this.phone,
					password: this.password
					// code
				},
				method: 'POST',
				success: function(res) {
					uni.setStorageSync('loginToken', res.data.data);
					uni.switchTab({
						url: '../index/index'
					});
				},
				error: function() {}
			});
		},
		qqLogin() {
			console.log('您使用的是微信登录');
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'qq',
							success: function(loginRes) {
								console.log(loginRes.authResult);
								// 获取用户信息
								// this.getPhoneNumber()
								uni.getUserInfo({
									provider: 'qq',
									success: function(infoRes) {
										console.log('用户昵称为：' + JSON.stringify(infoRes.userInfo));
										var i_uid=0;
										var scene = wx.getStorageSync('scene');
										ajax({
											url: 'index/qqLogins',
											data: {
												// phone: '',
												// code: '',
											  qq_openid:infoRes.userInfo.openId,
												user_info: JSON.stringify(infoRes.userInfo),
												i_uid: i_uid,
												scene: scene
											},
											success: (res )=> {
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
    getPhoneNumber: function(e) {
				console.log(e);
				console.log('123131')
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
 
				} else {
 
				}
 
				// 				console.log(JSON.stringify(e.encryptedData));
				// 				console.log(JSON.stringify(e.iv));
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
												user_info: JSON.stringify(infoRes.userInfo),
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
		
		phoneSmsLogin() {
			ajax({
				url: 'index/phoneSmsLogin',
				data: {
					phone: this.phone,
					code: this.yzm
					// code
				},
				method: 'POST',
				success: function(res) {
					uni.setStorageSync('loginToken', res.data.data);
					uni.switchTab({
						url: '../index/index'
					});
				},
				error: function() {}
			});
		},
		//获取验证码点击
		yzmBtn() {
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(this.phone)) {
				this.loading = false;
				uni.showModal({
					title: '错误',
					content: '请输入正确的手机号'
				});
			} else {
				let _self = this;
				let s = 60;
				let stime = setInterval(function() {
					s--;
					if (s == 0) {
						_self.second = '';
						clearInterval(stime);
					} else {
						_self.second = s;
					}
				}, 1000);
				ajax({
					url: 'index/sendMobileCode',
					data: {
						phone: this.phone // code
					},
					method: 'POST',
					success: function(res) {},
					error: function() {}
				});
			}
		}
	},
	mounted() {}
};
</script>

<style>
@import './login.css';
</style>
