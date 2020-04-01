<template>
	<view>
  <view>
    <view class="title">{{detail}}</view>
    <view class="img-box" style="padding-bottom:200rpx;">
      <image :src="item.image" class="img" v-for="(item, index) in imgList" 
			:key="index" :data-id="item.id" 
			 @tap.stop="toOther"
			></image>
    </view>
  <view class="btn" @tap.stop="showOver">申请加入</view>
</view>

<view class="big-box" v-if="if_over">
  <view class="info-box">
    <view class="h1">申请加入</view>
    <view class="input">
      <text class="text">姓名：</text>
      <input type="text"  data-type="username" v-model="uploadInfo.username" class="text"/>
    </view>
    <view class="input">
      <text class="text">电话：</text>
      <input type="number"  data-type="phone" v-model="uploadInfo.mobile" class="text"/>
    </view>
    <view>
       <view class="pickerpicker">
						<text class="text">地址:</text>
						<view  @click="toggleTab">
							<view class="picker">
								<view v-if="uploadInfo.region.length == 0" style="color:#595959;padding-left:10rpx">请选择省市县
								<image src="/static/img/freeTeaching/arrow-rt.png" style="float:right;width:20rpx;height:30rpx;position:relative;top:10rpx;right:10rpx"></image>
								</view>
								<text v-else class="text">{{ uploadInfo.region[0] }}，{{ uploadInfo.region[1] }}，{{ uploadInfo.region[2] }}</text>
							</view>
						</view>
						<w-picker mode="region" @confirm="bindCityChange" ref="region"></w-picker>
					</view>

    </view>
    <view class="input" style="claer:both;margin-top:20rpx;">
      <text class="text">邮箱：</text>
      <input class="text"  data-type="email" v-model="uploadInfo.email"/>
    </view>

    <textarea placeholder="请输入您的留言内容" style="width:418rpx;height:213rpx;" data-type="content" v-model="uploadInfo.remark" ></textarea>
    <view class="submit" @tap.stop="submit">提交</view>
    <image src="../../static/close.png" class="svg" @tap.stop="close"></image>
  </view>
	</view>
	</view>
</template>

<script>
import wPicker from "@/components/w-picker/w-picker.vue";
var util = require("../../utils/util.js");
import { ajax } from "../../utils/public.js";
export default {
  data() {
    return {
			uploadInfo: {
				nickname: '', //昵称
				mobile: '', //手机
				province: '', //省份
				city: '', //城市
				area: '', //地区
				region: [],
				classes: [],
				remark:''
			},
      detail: {},
      imgList: [],
      region: [],
      if_over: false,
      username: '',
      phone: '',
      content: '',
      email: '',
      type: "",
			timetext:'请选择地区',
			array: ['中国', '美国', '巴西', '日本'],
    };
  },

  components: { wPicker },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    ajax({
      url: "index/getProfile",
      data: {},
      success: res => {
        let data = {
          nickname: res.data.nickname,
          avatar: res.data.avatar,
          gender: res.data.gender,
          birthday: res.data.birthday,
          mobile: res.data.mobile,
          grade: res.data.grade,
          province: res.data.province,
          city: res.data.cityname,
          area: res.data.areaname,
          region: res.data.region,
          type: ""
        };
        that.setData({
          uploadInfo: data
        });


        if (res.data.province == "" || res.data.province == null) {
          that.uploadInfo.region = ["请选择省", "市", "区"];
        }
      }
    });

    this.getData();
    this.getDataCate();
  },

  methods: {
		toggleTab() {
			this.$refs.region.show();
		},
		yearChange : function(e){
		                this.timetext = e.detail.value;
		            } ,
    getevalue() {
      // util.ajax('evaluate/getEvaluateHeadLableList', { goods_id: that.data.p_id }, res => {
      //      that.setData({
      //        detail: res.data.detail
      //      })
      //    })
    },

    toCompanyInfo(e) {
      uni.navigateTo({
        url: '../companyInfo/companyInfo?id=' + e.currentTarget.dataset.id
      });
    },

    toOther(e) {
      uni.navigateTo({
        url: '../otherInfo/otherInfo?id=' + e.currentTarget.dataset.id
      });
    },
    //地址选择
    bindRegionChange(e) {

      this.uploadInfo.region = e.checkArr;
      this.region = e.checkArr;
    },
    //关闭遮罩层
    close() {
      (this.if_over = false),
        (this.username = ""),
        (this.phone = ""),
        (this.region = []),
        (this.content = []),
        (this.email = "");
    },

    //显示遮罩层
    showOver() {
      this.if_over = true;
    },

    inputChange(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        [type]: e.detail.value
      });
    },
bindCityChange(e) {
			this.uploadInfo.province= e.checkArr[0];
			this.uploadInfo.city= e.checkArr[1];
			this.uploadInfo.area= e.checkArr[2];
			this.uploadInfo.region=e.checkArr;
		},
    submit(e) {
      var username = this.uploadInfo.username;

      if (!username) {
        wx.showToast({
          title: "请输入姓名",
          icon: "none"
        });
        return;
      }

      var phone = this.uploadInfo.mobile;

      if (!phone) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none"
        });
        return;
      }

      if (!/^1\d{10}$/.test(phone)) {
        wx.showToast({
          title: "手机号不合法",
          icon: "none"
        });
        return false;
      } 
      if (this.uploadInfo.remark == '') {
        wx.showToast({
          title: "请输入留言",
          icon: "none"
        });
        return;
      }

      var email = this.uploadInfo.email;

      var reg = new RegExp(
        "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
      ); //正则表达式

      if (email != '') {
        if (!reg.test(email)) {
          wx.showToast({
            title: "邮箱格式错误",
            icon: "none"
          });
          return false;
        }
      }

      var that = this;
      var obj = {
        realname: username,
        phone: phone,
        province: this.uploadInfo.region[0],
        city: this.uploadInfo.region[1],
        area: this.uploadInfo.region[2],
        email: email,
        content: this.uploadInfo.remark
      };
      ajax({url:'/partner/upload',data:obj, success:(res) => {
        uni.showToast({
          title: res.data.msg
        });
        that.close();
      }});
    },

    getDataCate() {
      var that = this;
      ajax({
				url:'partner/partnerCate', data:{}, success:(res) => {
				    this.imgList= res.data.data.list
				}
			});
    },

    getData() {
      var that = this;
      ajax({
        url: "partner/getIntroduction",
        data: {},
        success: res => {
          this.detail = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>

@import "./cityPartner.css";	
.pickerpicker{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	// margin-bottom: 20rpx;
}
</style>
