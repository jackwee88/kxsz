<template>
	<view>
		<!--pages/onlinestore/sureorder/sureorder.wxml-->
		<view class="sureorder">
			<view class="title-w">
				<view class="left-title"><text>商品信息</text></view>
			</view>
			<block v-for="(item, index) in goods" :key="index">
				<view class="store">
					<view class="box">
						<view class="store_left">
							<image class="storeimg" :src="item.goods_sku.spec_image ? item.goods_sku.spec_image : item.image" style="width: 150rpx; height: 150rpx;"></image>
						</view>
						<view class="store-flex">
							<view>
								<text class="title" style="overflow: hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">{{ item.p_name }}</text>
								<text class="guankan" style="margin-bottom:5rpx">{{ item.goods_sku.goods_attr }}</text>
								<text class="guankan" v-if="item.p_detail">{{ item.p_detail }}</text>
							</view>
							<view class="store-flex-right">
								<text class="flex-price">￥{{ item.goods_price }}</text>
								<text class="flex-num">×{{ item.quantity }}</text>

								<!-- <text class='flex-price'>总计:￥{{total}}</text>        -->
							</view>
							<!-- <view class='numbtn' wx:if="{{now_buy==1}}">
            <text bindtap="minusCount" class='jiannun numbtncont' data-ct_id="{{item.p_id}}" data-coupon_price="{{item.coupon_price}}" data-index="{{index}}">-</text>
            <input class='numbtncont num' type="number" data-ct_id="{{item.p_id}}" value="{{item.quantity}}" bindinput='changeNum' data-index="{{index}}" data-coupon_price="{{item.coupon_price}}" min="1" data-coupon_price="{{item.coupon_price}}">{{item.quantity}}</input>
            <text data-coupon_price="{{item.coupon_price}}" bindtap="addCount" catchlongtap='addnum' class='addnum numbtncont' data-ct_id="{{item.p_id}}" data-index="{{index}}">+</text>
          </view> -->
						</view>
					</view>
				</view>
				<view class="title-send" v-if="item.video.length != 0"><text>配套视频包</text></view>
				<view v-if="item.video.length != 0">
					<view class="store" v-for="(items, index2) in item.video" :key="index2">
						<view class>
							<view class="store_left"><image class="storeimg" :src="items.thumb"></image></view>
							<view class="store-flex">
								<view>
									<text class="title">{{ items.title }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="title-send" v-if="item.bindpacks.length != 0"><text>视频礼包</text></view>
				<view v-if="item.bindpacks.length != 0">
					<view class="store" v-for="(items_, index2) in item.bindpacks" :key="index2">
						<view class>
							<view class="store_left"><image class="storeimg" :src="items_.icon"></image></view>
							<view class="store-flex">
								<view>
									<text class="title">{{ items_.title }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!-- <view class='' wx:for="{{goods}}" wx:key="{{index}}">
    <view class="content">    
      <image class='storeimg item-img' src='{{item.image}}'></image>
       <view class="l text item-img">
          <view class=''>{{item.p_name}}</view>
          <view class=''>{{item.goods.p_detail}}</view>
        </view>
        <view class="l text item">
            <view class="red">￥{{item.coupon_price}}</view>
            <view class="">×{{item.quantity}}</view>
            <view class='red'>总计:￥{{total}}</view>
        </view>     
    </view>

     <view wx:if="item.video" class="content">
          <view class="title-w">
            <view class="left-title">
              <text>商品信息</text>
            </view>
          </view>
          
            <image class='storeimg item-img' src='{{item.image}}'></image>
            <view class="l text item-img">
              <view class=''>{{item.p_name}}</view>
              <view class=''>{{item.goods.p_detail}}</view>
            </view>
            <view class="l text">
                <view class="red">￥{{item.coupon_price}}</view>
                <view class="">×{{item.quantity}}</view>
                <view class='red'>总计:￥{{total}}</view>
            </view>     
       
      </view>
  </view> -->
			<!-- <view class='address'>
    <view class='payfangshi_title'>收货地址</view>
    <view class='wechatzhifu'>
     <view class="addressView">
      <view class="userContact">
      <text class="name">梁预期</text>
      <text class="tel">18859631392</text>
      </view>
      <view class="addressDetails">
      福建省厦门市思明区
      </view>
     </view>
     <view>
     </view>
    </view>
  </view> -->
			<!-- 地址标题 -->

			<view class="title-w">
				<view class="left-title"><text>优惠券</text></view>
			</view>
			<!--  -->
			<view class="address-content" @tap="linkToMy" :data-money="totals">
				<view class="address-left">
					<view v-if="discount" class="address-wrap">
						<text class="address-r">已抵扣{{ prv_money }}元</text>
					</view>
					<view v-else><text>请选择优惠券</text></view>
				</view>
				<view class="address-right"><image src="/static/img/freeTeaching/arrow-rt.png"></image></view>
			</view>
			<!-- 地址标题 -->
			<view class="title-w">
				<view class="left-title"><text>收货地址</text></view>
			</view>
			<!-- 地址内容 -->
			<view class="address-content" @tap="linkTo">
				<view class="address-left">
					<view v-if="address" class="address-wrap">
						<view class="address-l">
							<text>{{ address.person }}</text>
							<text>{{ address.provice }}{{ address.city }}{{ address.area }}{{ address.address }}</text>
						</view>
						<text class="address-r">{{ address.mobile }}</text>
					</view>
					<view v-else><text>请添加收货地址</text></view>
				</view>
				<view class="address-right"><image src="/static/img/freeTeaching/arrow-rt.png"></image></view>
			</view>

			<!-- 支付方式 -->
			<view class="title-w">
				<view class="left-title"><text>支付方式</text></view>
			</view>
			<view class="payfangshi">
				<!-- <view class='payfangshi_title'>支付方式</view> -->
				<view class="wechatzhifu">
					<image class="wechaticon" src="/static/img/onlinestore/wechaticon.png"></image>
					<text>微信支付</text>
					<!-- 判断是否选中状态 -->
					<view class="rodio">
						<icon v-if="selected" type="success" color="#48DB8D" size="20"></icon>
						<icon v-else type="circle" size="20" @tap="selectList"></icon>
					</view>
				</view>
			</view>

			<view class="payfangshi jf">
				<!-- <view class='payfangshi_title'>支付方式</view> -->
				<view class="wechatzhifu">
					<image class="wechaticon" src="/static/img/onlinestore/huiyuanjifen.png"></image>
					<text>可用积分{{ integral }}</text>
					<!-- 判断是否选中状态 -->
					<view class="rodio">
						<icon v-if="selected_integral" type="success" color="#48DB8D" size="20" @tap="selectList"></icon>
						<icon v-else type="circle" size="20" @tap="selectList"></icon>
					</view>
				</view>
				<view class="wechatzhifu" @tap.stop="invoice" style="display:flex;justify-content:space-between;align-item:center">
					<text>发票</text>
					<view style="display:flex;align-items:center;height:90rpx">
						<text style="float:right;margin-right:15rpx;">{{ is_fp }}</text>
						<image src="/static/img/freeTeaching/arrow-rt.png" style="width:20rpx;height:24rpx;"></image>
					</view>
				</view>
				<view class="remarks-box">
					<text>订单备注：</text>
					<textarea
						placeholder="请在此填写备注"
						placeholder-style="font-size:28rpx;"
						class="remarks"
						auto-height="true"
						maxlength="-1"
						@input="bindRemarksAreaBlur"
						v-model="remarks"
					></textarea>
				</view>
				<view class="wechatzhifu">
					<text>是否代付款</text>

					<view class="rodio">
						<icon v-if="selected_other" type="success" color="#48DB8D" size="20" @tap="selectListOther"></icon>
						<icon v-else type="circle" size="20" @tap="selectListOther"></icon>
					</view>
				</view>

				<view class="zhuyi">温馨提示：该订单暂不支持退款</view>
			</view>

			<view class="wechatzhifu" style="border-top:1rpx solid #ccc;margin-top:36rpx;text-align:center">
				<view style="padding-left:30rpx;" @tap.stop="toDzxy">点击购买，确认支付，表示您已同意并遵守</view>
				<text style="color:#008800" @tap.stop="toDzxy">{{ dzxy }}</text>

				<!-- <view class="rodio" style="padding-right:30rpx">
      <icon wx:if="{{selected_explain}}" type="success" color="#48DB8D" size='20' bindtap="selectExplain" />
      <icon wx:else type="circle" size='20' bindtap="selectExplain" />
    </view> -->
			</view>
		</view>
		<view class="explain">
			<!-- <view>
    <text>{{explain}}</text>
  </view> -->
		</view>

		<!-- 底部操作栏 -->
		<view class="sureorder_bottom">
			<view class="left corderflooct">
				<view class="shifunum">
					合计：
					<text class="total-price">
						￥{{ totals }}
						<text style="color:grey;font-size:26rpx;margin-left:20rpx">含运费({{ transport_total }})元</text>
					</text>
				</view>
				<text></text>
			</view>
			<view class="right corderflooct" @tap="pay">确认支付</view>
		</view>

		<view class="ewm-box" v-if="is_ewm == true">
			<view class="little-box">
				<view class="close-ewm" @tap.stop="closeEwm">X</view>
				<image :src="ewm" class="ewm"></image>
				<view class="ewm-btn" v-if="is_save == true">图片已保存至二维码，可分享给好友</view>
			</view>
		</view>

		<!-- 礼包弹窗 -->
		<view class="popup" v-if="is_dzxy">
			<view class="popupcont"></view>
			<view class="popupback">
				<view class="popupback_cont">
					<view class="popupbacktitle">电子协议</view>
					<view class="popuplist">
						<text class="popupitem">{{ explain }}</text>
					</view>
				</view>
			</view>

			<view class="clickbtn"><button class="close" @tap="hideExplain">关闭</button></view>
		</view>

		<template is="toTop"></template>
	</view>
</template>

<script>
// pages/onlinestore/sureorder/sureorder.js
// var app = getApp().globalData;
var util = require('../../../utils/util.js');
import { ajax } from '../../../utils/public.js';

export default {
	data() {
		return {
			invoiceArr: {},
			is_fp: '不开发票',
			dzxy: '',
			is_dzxy: '',
			ewm: '',
			is_ewm: false,
			moneys: '',
			discount: '',
			integral: '109',
			storeimg: 'https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/test/chanpintu.png',
			title: '多功能尺子教学全套课程',
			guankan: '永久观看',
			selected: true,
			selected_integral: false,
			type: 1,
			//1为商品直接购买 2为购物车下单
			ids: '',
			ct_id: '',
			p_id: '',
			goods: [],
			address: {},
			total: 0.0,
			totals: '',
			flag_y: false,
			flag_n: false,
			prv_money: 0,
			transport_total: 0,
			selected_num: 0,
			num: 0,
			buy_num: 1,
			now_buy: '',
			selected_other: false,
			is_save: false,
			order_id: '',
			explain: '',
			selected_explain: true,
			price: '',
			goods_sku_id: '',
			goods_num: '',
			goods_spec_id: '',
			remarks: '',
			banner: ''
		};
	},

	components: {},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(event) {
		wx.setStorageSync('a', []);
		this.banner = JSON.parse(decodeURIComponent(event.sureOrder));
		if (this.banner.now_buy == 1) {
			(this.now_buy = 1),
				(this.goods_sku_id = this.banner.goods_sku_id),
				(this.goods_num = this.banner.goods_num),
				(this.buy_num = this.banner.goods_num),
				(this.goods_spec_id = this.banner.goods_spec_id);
		}
		var that = this;
		this.dzxyFun();
		if (that.banner.type && (that.banner.type == 1 || that.banner.type == 2)) {
			this.type = that.banner.type;
		}

		if (!that.banner.ids) {
			uni.navigateBack({});
		} else {
			this.ids = that.banner.ids;
		}

		if (that.type == 1) {
			(this.p_id = that.ids), (this.ct_id = '');
		} else if (that.type == 2) {
			(this.p_id = ''), (this.ct_id = that.ids);
		}

		var param = {};
		ajax({
			url: 'goods/settlement',
			data: {
				ct_id: this.ct_id,
				p_id: this.p_id,
				goods_sku_id: this.goods_sku_id,
				goods_num: this.goods_num,
				goods_spec_id: this.goods_spec_id
			},
			success: res => {
				if (res.data.data.send_status == false) {
					uni.showToast({
						title: '当前地址不在配送范围哦 ~',
						icon: 'none'
					});
				} else {
					(this.goods = res.data.data.goods),
						// quantity: res.data.goods.quantity,
						(this.address = res.data.data.address),
						(this.total = res.data.data.total),
						(this.totals = res.data.data.total.toFixed(2)),
						(this.integral = res.data.data.score),
						(this.transport_total = res.data.data.transport_total),
						(this.price = res.data.data.total);
				}
			}
		});
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var that = this;
	},

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
	onReachBottom: function() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {},
	methods: {
		// 地址
		linkTo: function() {
			// var i = '../shaddress/shaddress?quantity=' + this.data.buy_num + '&p_id=' + this.data.goods[0].p_id
			wx.navigateTo({
				url:
					'../../shoppingcart/shaddress/shaddress?quantity=' +
					this.buy_num +
					'&ct_id=' +
					this.ct_id +
					'&p_id=' +
					this.goods[0].p_id +
					'&score=' +
					this.selected_integral +
					'&cp_id=' +
					this.discount +
					'&goods_sku_id=' +
					this.goods_sku_id
			});
		},
		changeData: function(list) {
			this.setData({
				address: list
			});
		},
		//确认支付
		pay: function() {
			var that = this;
			if (!this.selected_explain) {
				uni.showToast({
					title: '请先同意电子协议',
					icon: 'none'
				});
				return;
			} // if (!this.data.address){
			//   wx.showToast({
			//     title: '请先选择收货地址',		icon:'none'      })
			// } else if (this.data.address.ar_id == '' || this.data.address.ar_id==undefined){
			//   wx.showToast({
			//     title: '请先选择收货地址', icon: 'none'
			//   })
			// }else{
			var account;
			var account_type;
			if (this.invoiceArr.content == undefined) {
				account = ' ';
				account_type = '';
			} else {
				account = this.invoiceArr.content;
				account_type = this.invoiceArr.acc_type;
			}
			if (this.now_buy == 1) {
				var param = {
					ct_id: this.ct_id,
					p_id: this.goods[0].p_id,
					ar_id: this.address.ar_id,
					score: this.selected_integral,
					cp_id: this.discount,
					quantity: this.buy_num,
					invoiceArr: '',
					account: account,
					account_type: account_type,
					goods_sku_id: that.goods_sku_id,
					mark: this.remarks
				};
			} else {
				// 购物车跳转
				var param = {
					ct_id: this.ct_id,
					p_id: this.goods[0].p_id,
					ar_id: this.address.ar_id,
					score: this.selected_integral,
					cp_id: this.discount,
					invoiceArr: JSON.stringify(this.invoiceArr),
					account: this.invoiceArr.content,
					account_type: this.invoiceArr.acc_type,
					goods_sku_id: that.goods_sku_id,
					mark: this.remarks
				};
			}

			if (this.selected_other == true) {
				//找他人代付
				ajax({
					url: 'goods/downOrder',
					data: param,
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						this.order_id = res.data.order_id;
						ajax({
							url: 'goods/repay_other',
							data: {
								order_id: res.data.order_id
							},
							success: ress => {
								(this.ewm = ress.data.code), (this.is_ewm = true);
								var aa = wx.getFileSystemManager();
								aa.writeFile({
									filePath: wx.env.USER_DATA_PATH + '/test.png',
									data: that.ewm.slice(22),
									encoding: 'base64',
									success: res => {
										wx.saveImageToPhotosAlbum({
											filePath: wx.env.USER_DATA_PATH + '/test.png',
											success: function(res) {
												// wx.showToast({
												//   title: '保存成功',
												// })
												this.is_save = true;
											},
											fail: function(err) {}
										});
									},
									fail: err => {}
								});
							}
						});
					}
				});
			} else {
				ajax({
					url: 'goods/downOrder',
					data: param,
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						if (res.status == 2) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							return;
						}

						ajax({
							url: 'paygoods/pay',
							data: {
								order_id: res.data.data.order_id
							},

							success: ress => {
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: ress.data.data, //微信、支付宝订单数据
									success: function(res) {
										uni.showToast({
											title: '支付成功'
										});
										uni.redirectTo({
											url: '/pages/onlinestore/orderdetails/orderdetails?order_id=' + res.data.data.order_id
										});
									},
									fail: function(err) {
										uni.showToast({
											title: '支付失败'
										});
										uni.redirectTo({
											url: '/pages/onlinestore/orderdetails/orderdetails?order_id=' + res.data.data.order_id
										});
									}
								});
							}
						});
					}
				});
			} // }
		},
		linkToMy: function(e) {
			var money = e.currentTarget.dataset.money;
			wx.navigateTo({
				url:
					'/pages/my/mydiscount/mydiscount?way=' +
					1 +
					'&money=' +
					money +
					'&prv_money=' +
					this.prv_money +
					'&ct_id=' +
					this.ct_id +
					'&p_id=' +
					this.goods[0].p_id +
					'&ar_id=' +
					this.address.ar_id +
					'&score=' +
					this.selected_integral +
					'&quantity=' +
					this.buy_num +
					'&cp_id=' +
					this.discount +
					'&price=' +
					this.price +
					'&goods_sku_id=' +
					this.goods_sku_id
			});
		},
		selectList: function(e) {
			if (!this.address) {
				wx.showToast({
					title: '请先选择收货地址',
					icon: 'none'
				});
				return false;
			}

			var int = this.integral / 100;
			var integral = parseFloat(int.toFixed(2));
			this.selected_integral = !this.selected_integral;

			if (this.selected_integral == true) {
				if (this.flag_y == false) {
					this.flag_n = false;
					var new_total = (this.totals - integral).toFixed(2);

					if (new_total <= 0) {
						new_total = 0.01;
					}
					this.jf();
				}
			} else {
				if (this.flag_n == false) {
					var new_total = (parseFloat(this.totals) + parseFloat(integral)).toFixed(2);
					this.jf();
				}

				this.flag_y = false;
			}
		},

		// 增加数量
		// addCount(e) {
		// 	const index = e.currentTarget.dataset.index;
		// 	const ct_id = e.currentTarget.dataset.ct_id;
		// 	const coupon_price = e.currentTarget.dataset.goods_price;
		// 	let carts = this.goods;

		// 	if (parseFloat(carts[index].quantity) + 1 <= 1) {
		// 		return false;
		// 	}

		// 	carts[index].quantity = parseFloat(carts[index].quantity) + 1;
		// 	var totals = parseFloat(coupon_price * carts[index].quantity) + parseFloat(this.transport_total);
		// 	this.setData({
		// 		goods: carts,
		// 		totals: totals.toFixed(2),
		// 		buy_num: carts[index].quantity
		// 	});
		// 	this.jf();
		// },

		// // 减少数量
		// minusCount(e) {
		// 	var that = this;
		// 	const index = e.currentTarget.dataset.index;
		// 	const ct_id = e.currentTarget.dataset.ct_id;
		// 	const coupon_price = e.currentTarget.dataset.coupon_price;
		// 	let carts = this.goods;

		// 	if (carts[index].quantity <= 1) {
		// 		return false;
		// 	}

		// 	carts[index].quantity = parseFloat(carts[index].quantity) - 1;
		// 	var totals = parseFloat(coupon_price * carts[index].quantity) + parseFloat(that.transport_total);
		// 	this.setData({
		// 		goods: carts,
		// 		totals: totals.toFixed(2),
		// 		buy_num: carts[index].quantity
		// 	});
		// 	this.jf();
		// },

		// changeNum: function(e) {
		// 	var that = this;
		// 	const index = e.currentTarget.dataset.index;
		// 	const coupon_price = e.currentTarget.dataset.coupon_price;
		// 	let carts = that.goods;
		// 	carts[index].quantity = e.detail.value;
		// 	that.setData({
		// 		goods: carts,
		// 		buy_num: e.detail.value
		// 	});
		// 	var totals = parseFloat(coupon_price * e.detail.value) + parseFloat(that.transport_total);
		// 	that.setData({
		// 		totals: totals.toFixed(2)
		// 	});
		// 	this.jf();
		// },
		jf: function() {
			if (!this.address) {
				this.address = '';
			}
			var param = {
				ct_id: this.ct_id,
				p_id: this.goods[0].p_id,
				ar_id: this.address.ar_id,
				score: this.selected_integral,
				cp_id: this.discount,
				quantity: this.buy_num,
				goods_sku_id: this.goods_sku_id
			};
			var that = this;
			ajax({
				url: 'goods/OrderMoney',
				data: param,
				success: res => {
					(this.integral = res.data.data.use_integral),
						(this.totals = res.data.data.amount.toFixed(2)),
						(this.price = res.data.data.prices),
						(this.transport_total = res.data.data.transport);
				}
			});
		},
		selectListOther: function(e) {
			this.selected_other = !this.selected_other;
		},
		closeEwm: function() {
			this.is_ewm = false;
			wx.redirectTo({
				url: '/pages/onlinestore/orderdetails/orderdetails?order_id=' + this.order_id
			});
		},
		selectExplain: function(e) {
			this.setData({
				selected_explain: !this.selected_explain
			});
		},
		explainFun: function() {
			this.is_dzxy = true;
		},
		hideExplain: function() {
			this.is_dzxy = false;
		},
		//获取协议
		dzxyFun() {
			ajax({
				url: 'index/getSystemDesc',
				data: {
					type: 5
				},
				success: res => {
					this.dzxy = res.data.data;
				}
			});
		},

		toDzxy() {
			wx.navigateTo({
				url: '/pages/dzxy/dzxy'
			});
		},

		invoice() {
			uni.navigateTo({
				url: '/pages/invoice/invoice'
			});
		},

		toTop(e) {
			var that = this;
			that.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},

		bindRemarksAreaBlur(e) {
			this.remarks = e.detail.value;
		}
	}
};
</script>
<style>
@import './sureorder.css';
</style>
