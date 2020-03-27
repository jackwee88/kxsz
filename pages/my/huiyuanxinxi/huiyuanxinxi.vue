<template>
	<view class="back">
		<view class="bottom">
			<form action="">
				<view class="form">
					<!-- 头像 -->
					<view class="touxiang">
						<text class="itemtitle">头像</text>
						<image class="huiyuanimg" :src="uploadInfo.avatar" mode="widthFix" @tap="changeAvatar"></image>
					</view>
					<!-- 昵称 -->
					<view class="form-item">
						<text class="itemtitle">昵称</text>
						<input type="text" v-model="uploadInfo.nickname" class="input" maxlength="140" />
					</view>
					<!-- 性别 -->
					<view class="form-item">
						<text class="itemtitle">性别</text>
						<picker mode="selector" :range="gender" @change="bindSexChange">
							<view class="picker">
								{{ gender[uploadInfo.gender] }}
								<image class="xaiicon" src="../../../static/my/righticon.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<!-- 出生日期 -->
					<view class="form-item form-item-bottom">
						<text class="itemtitle">出生日期</text>
						<picker mode="date" @change="bindBirthdayChange">
							<view class="picker">
								{{ uploadInfo.birthday }}
								<image class="xaiicon" src="../../../static/my/righticon.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<view class="datedirsday"></view>
					<!-- 联系方式 -->
					<view class="form-item">
						<text class="itemtitle">联系方式</text>
						<input class="input" type="number" v-model="uploadInfo.mobile" maxlength="11" />
					</view>
					<!-- 年级 -->
					<view class="form-item">
						<text class="itemtitle">年级</text>
						<picker mode="selector" :range="array" @change="bindClassChange">
							<view class="picker">
								{{ array[uploadInfo.grade] }}
								<image class="xaiicon" src="../../../static/my/righticon.png" mode="widthFix"></image>
							</view>
						</picker>
					</view>
					<!-- 地区 -->
					<view class="form-item">
						<text class="itemtitle">地区</text>
						<view class="pickerpicker" @click="toggleTab">
							<view class="picker">
								<text v-if="uploadInfo.region.length == 0"></text>
								<text v-else>{{ uploadInfo.region[0] }}，{{ uploadInfo.region[1] }}，{{ uploadInfo.region[2] }}</text>
								<image class="xaiicon" src="../../../static/my/righticon.png" mode="widthFix"></image>
							</view>
						</view>
						<w-picker mode="region" @confirm="bindCityChange" ref="region"></w-picker>
					</view>
					<!-- 保存 -->
					<view class="lijishengji"><button type="primary" class="sengjibtn" v-on:click="sengjibtn">保存</button></view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
var util = require("../../../utils/util.js");
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
	components: {
		wPicker
	},
	data() {
		return {
			gender: ['男', '女'],
			array: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
			accessid: "",
			uploadInfo: {
				nickname: '', //昵称
				avatar: '',
				gender: '', //性别
				birthday: '', //生日
				mobile: '', //手机
				grade: '', //年级
				province: '', //省份
				city: '', //城市
				area: '', //地区
				region: [],
				classes: []
			},
		}
	},
	onLoad() {
		let that = this
		util.ajaxs('index/getProfile', '', res => {
		let data = {
			'nickname': res.data.nickname,
			'avatar': res.data.avatar,
			'gender': res.data.gender,
			'birthday': res.data.birthday,
			'mobile': res.data.mobile,
			'grade': res.data.grade,
			'province': res.data.province,
			'city': res.data.cityname,
			'area': res.data.areaname,
			"region": res.data.region,
			"type": ''
		}
		that.setData({
			uploadInfo:data
		});

		console.log(res.data.province);

		if (res.data.province == '' || res.data.province == null) {
			that.uploadInfo.region= ['请选择省', '市', '区']
		}
		});
	},
	methods: {
		setData(param) {
			for (const key in param) {
				const element = param[key];
				this[key] = element
			}
		},
		changeAvatar: function() {
		  let that = this;
		
		    wx.chooseImage({
		      count: that.count - that.num,
		      // 默认6
		      sizeType: ["compressed"],
		      // 可以指定是原图还是压缩图，默认二者都有
		      sourceType: ["album", "camera"],
		      // 可以指定来源是相册还是相机，默认二者都有
		      success: res => {
		        var imageSrc = res.tempFilePaths;
		        imageSrc.forEach(function(value, index, arrSelf) {
		          wx.showToast({
		            title: "正在上传...",
		            icon: "success",
		            mask: true,
		            duration: 10000
		          });
		          const timestamp = Date.parse(new Date()) / 1000;
		          const filename =
		            String(timestamp) + String(Math.floor(Math.random() * 50));
		
		          wx.uploadFile({
		            url: that.host,
		            filePath: value,
		            name: "file",
		            formData: {
		              name: value,
		              key: that.dir + "/" + filename + ".png",
		              policy: that.policy,
		              OSSAccessKeyId: that.accessid,
		              success_action_status: "200",
		              signature: that.signature
		            },
		            success: function(res) {
		              util.ajaxs(
		                "index/getProfilr",
		                {
		                  media_url:
		                    that.host + "/" + that.dir + "/" + filename + ".png",
		                  media_type: 2
		                },
		                res => {
		                  var imgArr = that.imgArr;
		                  var imgUrl =
		                    that.host + "/" + that.dir + "/" + filename + ".png";
		                  imgArr = imgArr.concat(imgUrl);
		                  that.setData({
		                    imgArr: imgArr,
		                    num: imgArr.length
		                  });
		                  wx.hideToast();
		                }
		              );
		            },
		            fail: function(errMsg) {
		              console.log(errMsg);
		            }
		          });
		        });
		        that.setData({
		          imageSrc
		        }); // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
		
		        let tempFilePaths = res.tempFilePaths;
		        that.setData({
		          tempFilePaths: tempFilePaths
		        });
		        /**
		         * 上传完成后把文件上传到服务器
		         */
		
		        var count = 0;
		      }
		    });
		    // wx.showToast({
		    //   title: "上传数量已达上限"
		    // });
		},
		// changeAvatar(){
		// 	uni.chooseImage({
		// 	    count: 1, //默认9
		// 	    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		// 	    sourceType: ['album'], //从相册选择
		// 	    success: function (res) {
		// 				const tempFilePaths = res.tempFilePaths;
		// 				var that = this;
		// 				uni.uploadFile({
		// 				  url: url+'',
		// 				  filePath: tempFilePaths,
		// 				  name: 'file',
		// 				  formData: {
		// 						name: tempFilePaths,
		// 						key: that.dir + "/" + filename + ".png",
		// 						policy: that.policy,
		// 						OSSAccessKeyId: that.accessid,
		// 						success_action_status: "200",
		// 						signature: that.signature
		// 				  },
		// 				  success: function (res) {
		// 						uni.hideLoading()
								
		// 		      var infoMessage = JSON.parse(uploadFileRes.data);
		// 						if (infoMessage.code==1){
		// 							 that.imgUrl = infoMessage.data;      // 图片地址
		// 													    this.weburl=this.websiteUrl;         // 域名
		// 													    this.hear=this.weburl+that.imgUrl
		// 											             uni.showToast({
		// 											                title: '上传成功',
		// 											               	icon: 'none',
		// 											             })
		// 						}else{
		// 							uni.showToast({
		// 								title:infoMessage.message,
		// 								icon:'none'
		// 							})
		// 						}
		// 				  },
		// 				  fail: function (errMsg) {
		// 				    console.log(errMsg);
		// 				  }
		// 				});
		// },
		// });
		// },
		//性别选择点击
		bindSexChange(e) {
			this.uploadInfo.gender = e.target.value;
		},
		//生日选择点击
		bindBirthdayChange(e) {
			this.uploadInfo.birthday = String(e.target.value);
		},
		//年级选择点击
		bindClassChange(e) {
			this.uploadInfo.grade = e.target.value;
		},
		//地区点击出现选项
		toggleTab() {
			this.$refs.region.show();
		},
		//地区选择点击
		bindCityChange(e) {
			this.uploadInfo.province= e.checkArr[0];
			this.uploadInfo.city= e.checkArr[1];
			this.uploadInfo.area= e.checkArr[2];
			this.uploadInfo.region=e.checkArr;
		},
		//保存点击
		sengjibtn(){
			const uploadInfo = this.uploadInfo;
			util.ajaxs('index/xcxProfile', uploadInfo, res => {
				wx.showToast({
				title: '更新成功'
				});
				// setTimeout(function () {
				// 	wx.navigateBack({});
				// }, 1000);
			});
		},
	}
	
};
</script>

<style>
@import './huiyuanxinxi.css';
</style>
