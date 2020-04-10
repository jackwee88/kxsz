<template>
	<view>
		<view v-if="carts.length != 0">
			<view class="cart-box">
				<!-- wx:for 渲染购物车列表 -->
				<view v-for="(item, index) in carts" :key="index" class="shopcartitem">
					<!-- wx:if 是否选择显示不同图标 -->
					<view class="rodio">
						<icon v-if="item.selected" type="success" color="#48DB8D" size="20" @tap="selectList" :data-index="index"></icon>
						<icon v-else type="circle" size="20" @tap="selectList" :data-index="index"></icon>
					</view>

					<!-- 点击商品图片可跳转到商品详情 -->
					<view class="sahngpin">
						<view class="left floctcont">
							<view @tap="details(item.goods_id)" class="navigator">
								<image class="cart-thumb" :src="item.goods_sku.spec_image ? item.goods_sku.spec_image : item.goods.image" mode="scaleToFill" />
							</view>
						</view>
						<view class="right floctcont">
							<text class="itemtitle" @tap="details(item.goods.p_id)">{{ item.goods.p_name }}</text>
							<!-- <text class='haoping' data-p_id="{{item.p_id}}" bindtap='details'>999+好评爆款{{item.haoping}}</text> -->
							<!-- 删除按钮 -->
							<image @tap="deleteList" :data-ct_id="item.ct_id" :data-index="index" class="deleteimg" src="/static/img/onlinestore/delete.png" />
							<!-- 增加减少数量按钮 -->
							<text class="price sku" style="color:#999;font-size:26rpx;">{{ item.goods_sku.goods_attr }}</text>
							<view style="position:relative;margin-top:10rpx;height:60rpx;">
								<text class="price">￥{{ item.goods_sku.goods_price }}</text>
								<view class="numbtn">
									<text @tap="minusCount" class="jiannun numbtncont" :data-ct_id="item.ct_id" :data-index="index">-</text>
									<input
										class="numbtncont num"
										type="number"
										:data-ct_id="item.ct_id"
										:value="item.quantity"
										@input="changeNum"
										:data-index="index"
										:data-coupon_price="item.coupon_price"
										min="1"
									/>
									<text @tap="addCount" catchlongtap="addnum" class="addnum numbtncont" :data-ct_id="item.ct_id" :data-index="index">+</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="whiteView"></view>
			<!-- 底部操作栏 -->
			<view class="shopcart_bottom">
				<view style="float:left">
					<icon v-if="selectAllStatus" type="success_circle" size="20" class="quanxuanicon" color="#48DB8D" @tap="selectAll"></icon>
					<icon v-else type="circle" class="quanxuanicon" size="20" color="#CACACA" @tap="selectAll"></icon>
					<text class="quanxuan" @tap="selectAll">全选</text>
				</view>
				<!-- 总价 -->
				<text class="zongjia">总计：￥{{ totalPrice }}</text>
				<button class="jiesuanbtn" @tap="orderDown">结算</button>
			</view>
		</view>
		<view v-if="carts.length == 0" class="none">
			<image src="/static/my/wujieguo.png" class="wujieguo" />
			<view class="none none-text">购物车空空如也</view>
		</view>

		<template is="toTop"></template>
	</view>
</template>

<script>
const util = require('../../utils/util');
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			carts: [],
			// 购物车列表
			hasList: false,
			// 列表是否有数据
			totalPrice: 0,
			// 总价，初始为0
			selectAllStatus: false,
			// 全选状态，默认全选
			page: 1,
			page_size: 5,
			count: 1,
			selected_num: 0,
			num: 0
		};
	},

	components: {},
	props: {},

	onShow() {
		// if (uni.getStorageSync("modelType") == 1) {
		//   app.shopModel()
		// }
		(this.page = 1), (this.carts = []), (this.count = 1), (this.selectAllStatus = false), (this.totalPrice = 0);
		this.getData();
	},

	onLoad: function(options) {
		this.selectAllStatus = false;
	},
	onReachBottom: function() {
		// this.page = that.page; // carts: [],
		this.getData();
	},
	methods: {
		getTotalPrice() {
			let carts = this.carts; // 获取购物车列表

			let total = 0;

			for (let i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
					total += carts[i].quantity * carts[i].goods_sku.goods_price; // 所有价格加起来
				}
			}

			(this.carts = carts), (this.totalPrice = total.toFixed(2));
		},

		selectList(e) {
			var index = e.currentTarget.dataset.index; // 获取data- 传进来的index

			let carts = this.carts; // 获取购物车列表

			const selected = carts[index].selected; // 获取当前商品的选中状态

			carts[index].selected = !selected; // 改变状态

			let selectAll = true;
			carts.forEach(function(item, index, arrSelf) {
				if (item.selected == false) {
					selectAll = false;
				}
			});

			if (selectAll) {
				this.selectAllStatus = true;
			} else {
				this.selectAllStatus = false;
			}

			this.carts = carts;
			this.getTotalPrice(); // 重新获取总价
		},

		selectAll(e) {
			let selectAllStatus = this.selectAllStatus; // 是否全选状态

			selectAllStatus = !selectAllStatus;
			let carts = this.carts;

			for (let i = 0; i < carts.length; i++) {
				carts[i].selected = selectAllStatus; // 改变所有商品状态
			}

			(this.selectAllStatus = selectAllStatus), (this.carts = carts);
			this.getTotalPrice(); // 重新获取总价
		},

		// 增加数量
		addCount(e) {
			var that = this;
			const index = e.currentTarget.dataset.index;
			const ct_id = e.currentTarget.dataset.ct_id;
			let carts = that.carts;
			let quantity = carts[index].quantity;
			quantity = quantity + 1;
			var param = {
				ct_id: ct_id,
				is_check: 1,
				quantity: quantity
			};
			util.ajax({
				url: 'cart/edit',
				data: param,
				success: res => {
					carts[index].quantity = quantity;
					that.carts = carts;
					that.getTotalPrice();
				}
			});
		},

		// 减少数量
		minusCount(e) {
			var that = this;
			const index = e.currentTarget.dataset.index;
			const ct_id = e.currentTarget.dataset.ct_id;
			let carts = this.carts;
			let quantity = carts[index].quantity;

			if (quantity <= 1) {
				return false;
			}

			quantity = quantity - 1;
			var param = {
				ct_id: ct_id,
				is_check: 1,
				quantity: quantity
			};
			util.ajax({
				url: 'cart/edit',
				data: param,
				success: res => {
					carts[index].quantity = quantity;
					that.carts = carts;
					that.getTotalPrice();
				}
			});
		},

		deleteList(e) {
			const index = e.currentTarget.dataset.index;
			const ct_id = e.currentTarget.dataset.ct_id;
			var that = this;
			let carts = that.carts;
			var param = {
				ct_id: ct_id
			}; ///api/cart/del

			util.ajax({
				url: 'cart/del',
				data: param,
				success: res => {
					carts.splice(index, 1); // 删除购物车列表里这个商品

					uni.showToast({
						title: '删除成功'
					});
					that.carts = carts;
					this.getTotalPrice();
				}
			});
			this.getTotalPrice(); // if (!carts.length) { // 如果购物车为空
			//   this.setData({
			//     hasList: false // 修改标识为false，显示购物车为空页面
			//   });
			// } else { // 如果不为空
			//   this.getTotalPrice(); // 重新计算总价格
			// }
		},

		getData() {
			console.log('123');
			const that = this;
			const param = {
				page: that.page,
				page_size: that.page_size
			};

			if (that.count < that.page) {
				uni.showToast({
					title: '暂无更多信息'
				});
			} else {
				ajax({
					url: 'cart/index',
					data: param,
					success: res => {
						const { list, count } = res.data.data;
						const carts = this.carts;
						that.carts = list;
						(that.page = that.page + 1), (that.count = count > 1 ? count : 1), (that.carts = carts.concat(list));
						uni.stopPullDownRefresh();
					}
				});
			}
		},

		details(p_id) {
			uni.navigateTo({
				url: '/pages/product-detail/product-detail?gd_id=' + p_id
			});
		},

		changeNum: function(e) {
			var that = this;
			const index = e.currentTarget.dataset.index;
			const coupon_price = e.currentTarget.dataset.coupon_price;
			let carts = that.carts;
			carts[index].quantity = e.detail.value; // var new_tol = e.detail.value * coupon_price

			this.carts = carts;
			// if (carts[index].quantity <= 0) {
			//   carts[index].quantity = 1
			//   that.setData({
			//     carts: carts,
			//   })
			// }

			const ct_id = e.currentTarget.dataset.ct_id;
			var param = {
				ct_id: ct_id,
				is_check: 1,
				quantity: e.detail.value
			};
			util.ajax({
				url: 'cart/edit',
				data: param,
				success: res => {}
			});
			that.getTotalPrice(); // util.ajax('/api/cart/edit', param, res => {
			// })
		},

		orderDown() {
			var that = this;
			let carts = that.carts; // 获取购物车列表

			let selectGoods = [];

			if (that.totalPrice <= 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
				return;
			}

			for (let i = 0; i < carts.length; i++) {
				// 循环列表得到每个数据
				if (carts[i].selected) {
					// 判断选中才会计算价格
					selectGoods.push(carts[i].ct_id); // 所有价格加起来
				}
			}

			var ct_id = selectGoods.join(',');

			if (ct_id) {
				// uni.navigateTo({
				//   url: './sureorder/sureorder?type=2&ids=' + ct_id
				// });
				let param = {
					type: 2,
					ids: ct_id
				};
				uni.navigateTo({
					url: '/pages/product-detail/sureOrder/sureOrder?sureOrder=' + encodeURIComponent(JSON.stringify(param))
				});
			} else {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				});
			} // util.ajax('/api/cart/index', param, res => {
			// })
			// this.setData({ // 最后赋值到data中渲染到页面
			//   carts: carts,
			//   totalPrice: total.toFixed(2)
			// });
		},

		toTop(e) {
			var that = this;
			that.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		}
	}
};
</script>
<style>
@import './shoppingcart.css';
</style>
