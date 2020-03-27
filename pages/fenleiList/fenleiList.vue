<template>
<view>
<!--pages/jctbxzjx/jctbxzjx.wxml-->
<view>
	<view class="status_bar"><!-- 这里是状态栏 --></view>
  <view style="border-bottom:1rpx solid #e6e6e6;">
    <view class="searchcont">
      <view class="search">
        <image class="searchicon" src="/static/img/shuhuajs/search.png"></image>
        <input class="searchinput"  placeholder="请输入搜索的产品" v-model="input"></input>
      </view>
    </view>
  </view>
  <view class="jctbxzjx clear">
    <view scroll-y class="cataloguelist catalogueleft">
      <scroll-view class="catalogueleft_tab">
        <!-- {{item.typeId == currentId ? 'nav-active':''}} -->
        <view :class="'navtab_item ' + (item.id== currentId ? 'nav-active':'')" v-for="(item, index) in catalogue" :key="index" @tap.stop="handleTap" :data-id="item.id" :data-index="index">
          <text class="text">{{item.name}}</text>
        </view>
      </scroll-view>
    </view>

    <view class="cataloguelist catalogueright clear">
			<text class="recommend">精品推荐</text>
      <view class="goods">
        <view class="goodsitem" v-for="(item, index) in tabcontitem" :key="index">
          <navigator class="goods-detail" :url="item.to_url">
            <image class="productimg" :src="item.pic_url"></image>
            <view class="title">{{item.name}}</view>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</view>

</view>
</template>

<script>

var util = require("../../utils/util.js");
import { ajax } from "../../utils/public.js";
export default {
  data() {
    return {
			input:'',
      pages: 1,
      counts: 1,
      vp_ids: '',
      titles: '',
      code: '',
      is_code: false,
      currentId: 0,
      collectimg2: '/img/freeTeaching/shoucangyi.png',
      collectimg: '/img/freeTeaching/shoucangwei.png',
      tabcontitem: [],
      content: '',
      flag: true,
      catalogue: [],
      page: 1,
      page_size: 10,
      count: 1,
      cl_id: 0,
      p_id: '',
			
			currentIndex:0,
      notice: '',
      md_id: 7,
      showModal: false,
      banner: [],
      section: [],
      pagetitle: '一年级',
      tabcontitems: [],
      popupitem: [],
      collecttext2: '已收藏',
      collecttext: '收藏',
      flags: true,
      modelType: 1,
      currentIds: 0,
      type: "",
      gd_id: "",
      producturl: [],
      keyword: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  this.getcatelogList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

 
	mounted() {
		
	},
  methods: {
    //点击切换
		getcatelogList(){
			ajax({
				url:'cate/cateLeftList', 
			  data:{
					md_id: this.md_id
				}, success:(res) => {
					const {list}= res.data.data
			    this.catalogue=list,
			    this.currentId=list[0].id,
					console.log(this.currentId)
					this.tabcontitem = list[0].data
					console.log(this.currentId)
			  // this.getData();
			}
			});
		},
		getData(){
			ajax({
				url:'cate/cateLeftList', 
			  data:{
					md_id: this.md_id
				}, success:(res) => {
					const {list}= res.data.data
			    this.catalogue=list,
					this.tabcontitem = list[0].data
					console.log(this.currentId)
			}
			});
		},
    handleTap: function (e) {
      let index = e.currentTarget.dataset.index;
			let id = e.currentTarget.dataset.id;
      var that = this;
          this.currentIndex= index
					this.currentId = id
          this.page= 1,
          this.page_size= 10,
          this.tabcontitem= [],
          this.count= 1,
					ajax({
						url:'cate/cateLeftList', 
					  data:{
							md_id: this.md_id
						}, success:(res) => {
							const {list}= res.data.data
							this.tabcontitem = list[this.currentIndex].data
					}
					});
      },



    // 弹出层函数
    
    changeInput(e) {
      var val = e.detail.value;
      this.setData({
        code: val
      });
    },
		searchGoods(){
			ajax({
				url:""
			})
		},
    //点击切换
    handleTapGoods: function (e) {
      //gd_id
      var that = this;
      let index = e.currentTarget.dataset.index;
      let gd_id = e.currentTarget.dataset.gd_id;
      that.setData({
        currentIds: index,
        gd_id: gd_id,
        pages: 1,
        tabcontitems: [],
        counts: 1
      });
      that.getDataGoods(); //请求数据
    },

    details(e) {
      const p_id = e.currentTarget.dataset.p_id;
      wx.navigateTo({
        url: '/pages/onlinestore/productDetail/productDetail?p_id=' + p_id
      });
    },

    add(e) {
      var that = this;
      const p_id = e.currentTarget.dataset.p_id;

      if (p_id) {
        var param = {
          p_id: p_id
        };
        util.ajax('/api/cart/add', param, res => {
          wx.showToast({
            title: res.msg
          });
        });
      } else {
        wx.showToast({
          title: '网络异常..'
        });
      }
    },

    go: function () {
      this.setData({
        showModal: false
      });
    }
  }
};
// </script>
<style lang="less" scoped>
@import "./catalogue.css";
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background-color: #f8f8f8;
}
.goods{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-right: 30rpx;
	padding-left: 25rpx;
}
.goodsitem{
	width: 219rpx;
	height: auto;
	text-align: center;
	height: 250rpx;
}
.goods-detail{
	margin: 0 auto;
	.productimg{
		width: 218rpx;
		height: 146rpx;
	}
}
.recommend{
	font-size:32rpx;
	height: 100rpx;
	line-height: 100rpx;
	padding-left: 60rpx;
	color: #3e3d3d;
	font-weight: 500;
	}
</style>