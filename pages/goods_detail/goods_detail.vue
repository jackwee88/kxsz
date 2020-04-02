<template>
	<view>
		<view class="top">
			<view class="list-msg2" @tap="bindShowMsg">
				{{ tihuoWay }}
				<image style="height:40rpx;width:40rpx;vertical-align:middle;" src="../../static/img/down.png"></image>
			</view>
			<view style="float:left;display: flex;flex-direction: row;text-align: center;align-items: center;">
				<icon v-if="checkedAllStatus" type="success_circle" size="20" class="quanxuanicon" color="#48DB8D" @tap="checkedAll"></icon>
				<icon v-else type="circle" class="quanxuanicon" size="20" color="red" @tap="checkedAll"></icon>
				<text class="quanxuan" @tap="checkedAll" style="font-size:30rpx;position:relative;top:-8rpx;left:5rpx;">全选</text>
			</view>
		</view>
		<view v-if="tabcontitem.length == 0" style="text-align:center;font-size:32rpx;padding-top:20rpx">暂无数据</view>

		<view class="tabcont" v-if="tabcontitem.length > 0" style>
			<view class="tabcontlist">
				<view class="tabcontitem clear" v-for="(item, index) in tabcontitem" :key="index" :data-id="item.p_id">
					<view class="left itemfolt"><image class="leftimg" :src="item.image"></image></view>
					<view class="right itemfolt">
						<view class="title">
							<text class="titles">{{ item.p_name }}\n</text>
							{{ item.p_detail }}
						</view>
					</view>
					<view class="rodio" @tap="clickedItem" :data-index="index">
						<icon v-if="item.selected" type="success" color="#48DB8D" size="20"></icon>
						<icon v-else type="circle" size="20" color="#fff"></icon>
						单选购买
					</view>
				</view>
			</view>
		</view>

		<!-- <template is="toTop"/> -->

		<!-- 固定底部导航栏 -->

		<view class="twobtn" v-if="tabcontitem.length > 0">
			<view class="twobtncont">
				<button class="add" @tap="collectP" >收藏商品</button>
				<!-- <button class='add' bindtap='collectP' wx:else data-id="{{collect_p}}">取消收藏</button> -->
			</view>
			<view class="twobtncont"><button class="buy" @tap="orderDown">立即购买</button></view>
			<view class="twobtncont"><button class="add" @tap="add">加入购物车</button></view>
		</view>

		<view class="select_box" v-if="select">
			<view class="select_one" @tap="mySelect" :data-name="item.title" v-for="(item, index) in goodsCate" :key="index" :data-gd_id="item.gd_id">{{ item.title }}</view>
		</view>
	</view>

</template>

<script>
// pages/goods_detail/goods_detail.js
const app = getApp().globalData;
var util = require('../../utils/util.js');
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			page: 1,
			page_size: 10,
			count: 1,
			gd_id: 0,
			tabcontitem: [],
			goodsCate: [],
			select: false,
			tihuoWay: '',
			checkedAllStatus: false,
			item: ''
		};
	},

	components: {},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.gd_id = options.gd_id;
		this.getData();
		this.getGoodsCate();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {},

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
	onReachBottom: function() {
		this.getData();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {},
	methods: {
		//商品列表
		getData() {
			var that = this;
			var param = {
				gd_id: this.gd_id,
				page: that.page,
				page_size: that.page_size
			};

			if (that.count < that.page) {
				uni.showToast({
					title: '暂无更多信息',
					icon: 'none'
				});
			} else {
				ajax({
					url: 'goods/goodsList',
					data: param,
					success: res => {
						var tabcontitem = that.tabcontitem;

						if (that.checkedAllStatus) {
							res.data.list.forEach(function(v) {
								v.selected = true;
							});
						}
						const{count,list}= res.data.data
						if (list != undefined) {
								this.page= that.page + 1,
								this.count= count > 1 ? count : 1,
								this.tabcontitem= tabcontitem.concat(list)
							uni.stopPullDownRefresh();
						}
					}
				});
			}
		},

		//单选一个个
		clickedItem(e) {
			let itemIndex = e.currentTarget.dataset.index;
			let that = this;
			let selected = that.tabcontitem[itemIndex].selected;
			this.tabcontitem[itemIndex].selected = !selected
			let item = 'tabcontitem[' + itemIndex + '].selected';
				this.item=selected

			var selectAllStatus = true;
			let tabcontitems = that.tabcontitem;
			tabcontitems.forEach(function(item, index, arrSelf) {
				if (item.selected == false) {
					selectAllStatus = false;
				}
			});

			if (selectAllStatus) {
					this.checkedAllStatus= true
			} else {
					this.checkedAllStatus= false
			}
		},

		//全选
		checkedAll(e) {
			let that = this;
			let checkedAllStatus = that.checkedAllStatus;
			this.checkedAllStatus = !this.checkedAllStatus
			checkedAllStatus = !checkedAllStatus;
			let tabcontitem = that.tabcontitem;

			for (let i = 0; i < tabcontitem.length; i++) {
				tabcontitem[i].selected = checkedAllStatus;
			}

				this.checkedAllStatus= checkedAllStatus,
				this.tabcontitem= tabcontitem
		},

		bindShowMsg() {
				this.select= !this.select
		},

		mySelect(e) {
			var name = e.currentTarget.dataset.name;
				this.tihuoWay= name,
				this.select=false,
				this.gd_id= e.currentTarget.dataset.gd_id,
				this.page= 1,
				this.tabcontitem= []
			this.getData();
		},

		//获取商品分类
		getGoodsCate() {
			var that = this;
			ajax({
				url: 'goods/goodsCate',
				data: {},
				success: res => {
					console.log('1234564' + res.data);
					const { count, list } = res.data.data;
					if (list != undefined) {
						 list.forEach(function (value, index, a) {
						  if (that.gd_id == value.gd_id) {
						        that.tihuoWay= value.title
						       return;
						            }
						          });
						this.goodsCate = list; 
					}
				}
			});
		},

		//立即购买
		orderDown() {
			var that = this;
			let carts = that.tabcontitem; // 获取购物车列表

			let selectGoods = [];

			for (let i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
					selectGoods.push(carts[i].p_id); // 所有价格加起来
				}
			}

			if (selectGoods.length == 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
				return;
			}

			var p_id = selectGoods.join(',');

			if (p_id) {
				ajax({
					url:'cart/changeCartQuantity',
					data:{
						p_id: p_id
					},
					success:(res) => {
						let param={
							type:2,
							ids:res.data.data
						}
						uni.navigateTo({
							url: '../product-detail/sureOrder/sureOrder?sureOrder='+encodeURIComponent(JSON.stringify(param))
						});
					}
				}
					
				);
			} else {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
			}
		},

		add() {
			var that = this;
			let carts = that.tabcontitem; // 获取购物车列表

			let selectGoods = [];

			for (let i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
					selectGoods.push(carts[i].p_id); // 所有价格加起来
				}
			}

			if (selectGoods.length == 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
				return;
			}

			var p_id = selectGoods.join(',');

			if (p_id) {
				ajax({
					url:'cart/addCart',
					data:{
						p_id: p_id
					},
					success:(res) => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
					
				);
			} else {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
			}
		},

		collectP() {
			var that = this;
			let carts = that.tabcontitem; // 获取购物车列表

			let selectGoods = [];

			for (let i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
					selectGoods.push(carts[i].p_id); // 所有价格加起来
				}
			}

			if (selectGoods.length == 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
				return;
			}

			var p_id = selectGoods.join(',');

			if (p_id) {
				ajax({
					url:'goods/collect',
					data:
					{
						p_id: p_id
					},
					success:(res) => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
					
				);
			} else {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
			}
		}
	}
};
</script>
<style>
@import './goods_detail.css';
</style>
