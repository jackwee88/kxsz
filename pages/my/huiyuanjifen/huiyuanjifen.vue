<template>
  <view>
    <view class="card">
      <text class="card_title">积分</text>
      <text class="jifen">{{jifen[0].after}}</text>
    </view>
    <!-- <view class="line">
      <text class="txt">积分规则</text>
    </view>-->
    <view class="mokuai">  
          <view class="qiandao" v-for="(item, index) in userdata" :key="index">
            <view class="qiandaotop">
              <image src="../../../static/img/qiandao.png" class="qd-icon"></image>
              <text class="font">{{item.title}}</text>
            </view>
            <view class="timer">
              <text class="date">{{item.createtime}}</text>
            </view>
            <text class="date add jifen">{{item.score}}</text>
          </view>
    
        </view>
  </view>
</template>

<script>
var util = require("../../../utils/util.js");
export default {
  data() {
    return {
			page:1,
			count:1,
			pagesize:10,
      jifen: [
        {
          after: 0
        }
      ],
			userdata:[],
    };
  },
	onReachBottom() {
		var that = this
		util.ajaxs("index/getScore", {page:this.page,pagesize:this.pagesize}, res => {
			if(this.page <=res.data.count){
			that.userdata= that.jifen.concat(res.data.list);
			that.page= that.page+1
			}else{
				uni.showToast({
				  title: "到底了...",
				  icon: "none"
				});
			}
		});
	},
  onLoad: function(options) {
    var that = this;
    util.ajaxs("index/getScore", {page:this.page,pagesize:this.pagesize}, res => {
      console.log(res.data);
      that.jifen = res.data.list;
			that.userdata= res.data.list;
			that.page= that.page+1
			this.count = this.count > 1 ? res.data.count : 1
    });
  }
};
</script>

<style>
@import "./huiyuanjifen.css";
</style>
