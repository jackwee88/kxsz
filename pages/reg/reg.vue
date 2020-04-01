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
								<view class="picker text">
									{{school[uploadInfo.school]}}
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<text class="itemtitle">年级</text>
							<picker mode="selector" :range="array" @change="bindGradeChange">
								<view class="picker text">
									{{ array[uploadInfo.grade] }}
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<picker mode="selector" :range="arrayClass" class="" @change="bindClassChange">
								<text class="itemtitle">班级</text>
								<view class="picker text">
									{{arrayClass[uploadInfo.class]}}
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</picker>
						</view>
						<view class="form-item">
							<view class="pickerpicker" @click="toggleTab">
								<text class="itemtitle">家庭住址</text>
								<view class="picker text">
									<text v-if="uploadInfo.region.length==0"></text>
									<text v-else class="pickerText">
										{{uploadInfo.region[0]}}，{{uploadInfo.region[1]}}，{{uploadInfo.region[2]}}
									</text>
									<image class="xaiicon" src="../../static/my/righticon.png" mode="widthFix"></image>
								</view>
							</view>
							<w-picker mode="region"  @confirm="bindCityChange" ref="region"></w-picker>
						</view>
						<view class="form-item">
							<text class="itemtitle" v-model="uploadInfo.addressdetail">详细住址</text>
							<input  type="text" value="" class="input picker text"/>
						</view>
						<view class="form-item">
							<text class="itemtitle">联系方式</text>
							<input maxlength="11" type="number" class="input picker text" v-model="uploadInfo.mobile"/>
						</view>
						<view class="code-item">
							<text class="codetxt">验证码</text>
							<input type="text" value="" class="code" maxlength="6" />
							<text v-if="second == ''||second==0" class="get_code" @click="getcode">获取验证码</text>
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
						class:'',
				        grade: '',
				        province: '',
				        city: '',
				        area: '',
				        region: ['福建省', '厦门市', '思明区'],
				        code: '' ,// classes: [],
				        school:''
				
				      },
				      userinfo: {},
				      sms_zt: '发送验证码',
				      second: '',
				      nullHouse1: false,
				      nullHouse2: true,
				      mySchool: '',
				      phone: '',
				      noPhone: 'false',
				      type: "",
				      selected: false,
				      selected1: false,
				}
			},
		
		  onLoad: function (options) {
		    let that = this;
		    ajax({url:'index/getSchool', data:{}, success:(res) => {
				const{list} = res.data.data
				for(var i=0;i<list.length;i++){
					// this.school.push(list[i].school_name)
					this.school=this.school.concat(list[i].school_name)
				}
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
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    // 日期选择
    bindDateChange(e) {
        this.uploadInfo.birthday= e.detail.value
    },

    // 年级选择
    bindPickerChange(e) {
        this.uploadInfo.gender= Number(e.detail.value) + 1
    },

    bindClassChange(e) {
    	this.uploadInfo.class = e.target.value;
    },

    bindGradeChange(e) {
        this.uploadInfo.grade= Number(e.detail.value) + 1
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

     ajax({url:'/index/registerProfile', data:uploadInfo,success:(res)  => {
        if (res.data.status == 1) {
          wx.showToast({
            title: '成功',
            icon: 'none',
            mask: 'true'
          });
        } else {
          wx.showToast({
            title: res.data.msg,
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
      }});
    },
bindCityChange(e) {
			this.uploadInfo.province= e.checkArr[0];
			this.uploadInfo.city= e.checkArr[1];
			this.uploadInfo.area= e.checkArr[2];
			this.uploadInfo.region=e.checkArr;
		},
    getcode: function (e) {
		var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		      if (!myreg.test(this.uploadInfo.mobile)) {
		        this.loading = false;
		        uni.showModal({
		        	title:'错误',
					content:'请输入正确的手机号'
		        })
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
			var that = this;
			ajax({url:'user/sendUpgradeMembershipCode', data:{
			  mobile: this.uploadInfo.mobile
			}, success:(res) => {
			  if (res.data.status == '1') {
			    that.countdown();
			  }
			}});

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
          this.selected= false,
          this.selected1= true,
          this.second= 60,
          this.nullHouse1= false,
          this.nullHouse2= true
      }

      var time = setTimeout(function () {
          this.second=second - 1,
          this.nullHouse1= true,
          this.nullHouse2= false
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
        this.school_index= Number(e.detail.value),
        this.uploadInfo.school= e.detail.value,
        this.mySchool=school[Number(e.detail.value)].school_name
    },
		toggleTab() {
			this.$refs.region.show();
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
