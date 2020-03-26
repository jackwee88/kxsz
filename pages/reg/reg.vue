<template>
	<view>
		<image class="bg-img" src="../../static/reg/bj.png" mode="widthFix"></image>
		<view class="bottom-box">
			<view style="text-align: center;">
				<image class="logo-img" src="../../static/reg/log.png" mode="widthFix"></image>
				<view class="title">
					新用户注册
				</view>
				<form action="">
					<view class="form">
						<view class="form-item">
							<text class="itemtitle">姓名</text>
							<input maxlength="7" type="text" value="" class="input picker" placeholder="请填写姓名" v-model="uploadInfo.username"/>
						</view>
						<view class="form-item">
							<picker mode="selector" :range="school" class="" @change="bindSchoolChange">
								<text class="itemtitle">学校</text>
								<view class="picker">
									<!-- {{school[uploadInfo.school]}} -->
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<picker mode="selector" :range="array" class="" @change="bindClassChange">
								<text class="itemtitle">年级</text>
								<view class="picker">
									{{array[uploadInfo.class]}}
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<picker mode="selector" :range="arrayClass" class="" @change="bindGradeChange">
								<text class="itemtitle">班级</text>
								<view class="picker">
									{{arrayClass[uploadInfo.classClass]}}
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<view class="pickerpicker" @click="toggleTab">
								<text class="itemtitle">家庭住址</text>
								<view class="picker">
									<text v-if="uploadInfo.region.length==0"></text>
									<text v-else class="pickerText">
										{{uploadInfo.region[0]}}，{{uploadInfo.region[1]}}，{{uploadInfo.region[2]}}
									</text>
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</view>
							</picker>
							<w-picker mode="region"  @confirm="bindCityChange" ref="region"></w-picker>
						</view>
						<view class="form-item">
							<text class="itemtitle" v-model="uploadInfo.addressdetail">详细住址</text>
							<input  type="text" value="" class="input picker"/>
						</view>
						<view class="form-item">
							<text class="itemtitle">联系方式</text>
							<input maxlength="11" type="number" class="input picker" v-model="uploadInfo.mobile"/>
						</view>
						<view class="code-item">
							<text class="codetxt">验证码</text>
							<input type="text" value="" class="code" maxlength="6" />
							<text v-if="second == ''" class="get_code" @click="getcode">获取验证码</text>
							<text v-else class="get_code">{{ second }}s</text>
						</view>
						<view class="lijishengji">
							<button @click="save" class="sengjibtn">确定</button>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {ajax} from '../../utils/public.js'
	export default{
		components: {
			wPicker
		},
		data(){
			return{
				 school_index: -1,
				      school: [],
				      array: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
				      //传值时加1
				      arrayClass: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班', '11班', '12班', '13班', '14班', '15班'],
				      region: ['福建省', '厦门市', '思明区'],
				      uploadInfo: {
				        username: '',
				        mobile: '',
				        // grade: '',
				        province: '',
				        city: '',
				        area: '',
				        region: ['福建省', '厦门市', '思明区'],
				        code: '' // classes: [],
				        // school:''
				
				      },
				      userinfo: {},
				      sms_zt: '发送验证码',
				      second: 60,
				      nullHouse1: false,
				      nullHouse2: true,
				      mySchool: '',
				      phone: '',
				      noPhone: 'false',
				      type: "",
				      selected: false,
				      selected1: false
				}
			},
		
		  onLoad: function (options) {
		    let that = this;
		    ajax({url:'index/getSchool', data:{}, success:(res) => {
				const{list} = res.data.data
		        this.school=list
		    }});
		
		    if (wx.getStorageSync('wxPhone')) {
		      this.setData({
		        "uploadInfo.region": ['请选择省', '市', '区'],
		        'uploadInfo.mobile': wx.getStorageSync('wxPhone')
		      });
		    }
		
		    if (uni.getStorageSync('phone') == "" || !uni.getStorageSync('phone')) {
		        this.noPhone=true
		     ajax({url:'index/getProfile', data:{}, success:(res) => {
		          this.uploadInfo.mobile=res.data.data.mobile
		      }});
}
		  },
  methods: {
    // 日期选择
    bindDateChange(e) {
      console.log(e);
      this.setData({
        'uploadInfo.birthday': e.detail.value
      });
    },

    // 年级选择
    bindPickerChange(e) {
      this.setData({
        'uploadInfo.gender': Number(e.detail.value) + 1
      });
    },

    bindClassChange(e) {
      this.setData({
        'uploadInfo.classes': Number(e.detail.value) + 1
      });
    },

    bindGradeChange(e) {
      this.setData({
        'uploadInfo.grade': Number(e.detail.value) + 1
      });
    },

    // 省区选择
    bindRegionChange(e) {
      this.setData({
        'uploadInfo.region': e.detail.value,
        'uploadInfo.province': e.detail.value[0],
        'uploadInfo.city': e.detail.value[1],
        'uploadInfo.area': e.detail.value[2]
      });
    },

    inputChange(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        [type]: e.detail.value
      });
    },

    inputPhoneChange(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        phone: e.detail.value
      });
    },

    save(e) {
      // if (!this.data.uploadInfo.mobile){
      //   this.setData({
      //     'uploadInfo.mobile':this.data.phone
      //   })
      // }
      const uploadInfo = this.uploadInfo; // if (uploadInfo.username == '') {
      //   wx.showToast({
      //     title: '请输入姓名',
      //     icon: 'none'
      //   })
      //   return false;
      // }
      // if (uploadInfo.region == '请选择省' ||uploadInfo.province == ""){
      //   wx.showToast({
      //     title: '请选择家庭住址',
      //     icon:'none'
      //   })
      //   return false;
      // }
      // if (uploadInfo.mobile == '') {
      //   wx.showToast({
      //     title: '请输入联系方式',
      //     icon: 'none'
      //   })
      //   return false;
      // }

      util.ajax('/api/index/registerProfile', uploadInfo, res => {
        if (res.status == 1) {
          wx.showToast({
            title: '成功',
            icon: 'none',
            mask: 'true'
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            mask: 'true'
          });
        } // setTimeout(function () { wx.switchTab({
        //   url: '/pages/index/index',
        // }) }, 1000);


        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      });
    },

    getcode: function (e) {
      var phone = this.uploadInfo.mobile;

      if (!phone) {
        wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        });
      } else {
        var that = this;
        util.ajax('/api/user/sendUpgradeMembershipCode', {
          mobile: phone
        }, res => {
          if (res.status == '1') {
            that.countdown();
          }
        });
      }
    },

    codeChange(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        [type]: e.detail.value
      });
    },

    //倒计时方法
    countdown() {
      var that = this;
      var second = that.second;

      if (second == 0) {
        // console.log("Time Out...");
        that.setData({
          selected: false,
          selected1: true,
          second: 60,
          nullHouse1: false,
          nullHouse2: true
        });
        return;
      }

      var time = setTimeout(function () {
        that.setData({
          second: second - 1,
          nullHouse1: true,
          nullHouse2: false
        });
        that.countdown();
      }, 1000);
    },

    inputChangeSchool(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        [type]: e.detail.value
      });
    },

    inputChangeHome(e) {
      var that = this;
      var type = e.currentTarget.dataset.type;
      this.setData({
        [type]: e.detail.value
      });
    },

    bindSchoolChange(e) {
      var that = this;
      var school = this.school;
      var id = that.school[e.detail.value].id;
      this.setData({
        school_index: Number(e.detail.value),
        'uploadInfo.school': id,
        mySchool: school[Number(e.detail.value)].school_name
      });
    },

    writeSchool(e) {
      this.setData({
        school_index: 0,
        'uploadInfo.school': e.detail.value,
        mySchool: e.detail.value
      });
    }

  }
	}
</script>

<style>
	@import "./reg.css";
</style>
