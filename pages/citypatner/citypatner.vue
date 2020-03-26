<template>
  <view>
    <!--pages/cityPartner/cityPartner.wxml-->

    <view style="page">
      <view>
        <view class="title">{{detail}}</view>
        <view class="img-box" style="padding-bottom:200rpx;">
          <image
            :src="item.image"
            class="img"
            v-for="(item, index) in imgList"
            :key="index"
            :data-id="item.id"
            @tap="jump(item.jump,item.id)"
          />
        </view>
      </view>
      <view class="btn" @tap.stop="showOver">申请加入</view>
    </view>

    <view class="big-box" v-if="if_over">
      <view class="info-box">
        <view class="h1">申请加入</view>
        <view class="input">
          <text class="text">姓名：</text>
          <input type="text" :value="username" data-type="username" @input="inputChange" />
        </view>
        <view class="input">
          <text class="text">电话：</text>
          <input type="number" :value="phone" data-type="phone" @input="inputChange" />
        </view>
        <view>
          <view @click="toggleTab" :range="region">
            <label class="text" style="float:left">地址:</label>
            <view class="picker clear" v-if="region != ''" style="float:right">
              <text style="font-size:24rpx;">{{region[0]}},{{region[1]}},{{region[2]}}</text>
            </view>
            <view class="picker" v-else>
              <text style="color:#595959;padding-left:10rpx">请选择省市县</text>
              <image
                src="/static/img/freeTeaching/arrow-rt.png"
                style="float:right;width:20rpx;height:30rpx;position:relative;top:10rpx;right:10rpx"
              />
            </view>
            <w-picker mode="region" @confirm="bindRegionChange" @cancel="cancel" ref="region"></w-picker>
          </view>
        </view>
        <view class="input" style="claer:both;margin-top:20rpx;">
          <text class="text">邮箱：</text>
          <input class="text" :value="email" data-type="email" @input="inputChange" />
        </view>

        <textarea
          placeholder="请输入您的留言内容"
          style="width:418rpx;height:213rpx;"
          data-type="content"
          @input="inputChange"
          :value="content"
        ></textarea>
        <view class="submit" @tap.stop="submit">提交</view>
        <image src="../../static/close.png" class="svg" @tap.stop="close" />
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
        username: "", //昵称
        mobile: "", //手机
        email: "",
        province: "", //省份
        city: "", //城市
        area: "", //地区
        region: []
      },
      detail: {},
      imgList: [],
      region: [],
      if_over: false,
      username: "",
      phone: "",
      content: "",
      email: "",
      type: ""
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
        console.log(res.data.data);
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

        console.log(res.data.province);

        if (res.data.province == "" || res.data.province == null) {
          that.uploadInfo.region = ["请选择省", "市", "区"];
        }
      }
    });

    this.getData();
    this.getDataCate();
  },

  methods: {
    cancel() {
      this.$refs.region.hide();
    },
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    getevalue() {
      // util.ajax('evaluate/getEvaluateHeadLableList', { goods_id: that.data.p_id }, res => {
      //      that.setData({
      //        detail: res.data.detail
      //      })
      //    })
    },
    jump(type, id) {
      if (type == "cate") {
        uni.navigateTo({
          url: "/pages/companyInfo/companyInfo?id=" + id
        });
      } else {
        uni.navigateTo({
          url: "/pages/otherInfo/otherInfo?id=" + id
        });
      }
    },
    toggleTab() {
      this.$refs.region.show();
    },
    //地址选择
    bindRegionChange(e) {
      console.log(e);
      // console.log("picker发送选择改变，携带值为", e.detail.value);
      // thhis.region = e.detail.value;
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

    submit(e) {
      var username = this.username;

      if (!username) {
        wx.showToast({
          title: "请输入姓名",
          icon: "none"
        });
        return;
      }

      var phone = this.phone;

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
      if (this.content == "") {
        wx.showToast({
          title: "请输入留言",
          icon: "none"
        });
        return;
      }

      var email = this.email;

      var reg = new RegExp(
        "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
      ); //正则表达式

      if (this.email != "") {
        if (!reg.test(this.email)) {
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
        province: this.region[0],
        city: this.region[1],
        area: this.region[2],
        email: this.email,
        content: this.content
      };
      util.ajax({
        url: "/partner/upload",
        data: obj,
        success: res => {
          uni.showToast({
            title: res.data.msg
          });
          that.close();
        }
      });
    },

    getDataCate() {
      var that = this;
      ajax({
        url: "partner/partnerCate",
        data: {},
        success: res => {
          console.log(res.data.data);
          this.imgList = res.data.data.list;
          console.log(res.data.data.list[0].jump);
        }
      });
    },

    getData() {
      var that = this;
      ajax({
        url: "partner/getIntroduction",
        data: {},
        success: res => {
          console.log(res);
          this.detail = res.data.data;
        }
      });
    }
  }
};
</script>
<style>
@import "./cityPartner.css";
</style>
