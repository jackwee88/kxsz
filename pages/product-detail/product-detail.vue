<template>
	<view>
		<view class="top_title">
			<navigator open-type="navigateBack"><image src="/static/onlineStore/back@2x.png" mode="aspectFit" class="icon1"></image></navigator>
			<navigator url="../shoppingcart/shoppingcart"><image src="/static/index/gwc.png" mode="" class="icon2"></image></navigator>
		</view>
		<!-- 商品详情 -->
		<cover-view class="team-position" v-if="assemble === []">
			<view class="team-num">2人团</view>
			<view class="team-total">已拼26件</view>
		</cover-view>
		<!-- 商品详情 -->
		<swiper :autoplay="true" :interval="3000" :duration="1000" class="detailPicture">
			<block v-for="(item, index) in detail.icon" :key="index">
				<swiper-item>
					<view class="detailPicture"><image :src="item" style="width: 100%;height: 660rpx;"></image></view>
				</swiper-item>
			</block>
		</swiper>
		<!-- 限时秒杀 判断商品是否为秒杀商品-->
		<view class="xsms" v-if="productDetail.sale_status === '2'">
			<view class="back-red">
				<view class="back-red-txt">
					<text style="color: #ffffff;font-size: 32rpx;">¥</text>
					<text style="color: #ffffff;font-size: 52rpx;">56</text>
					<view style="color: #E5E5E5;font-size: 24rpx;" class="origin-price">¥88.00</view>
				</view>
				<view class="cheap">已抢227件</view>
			</view>
			<view class="back-yello">
				<text style="color: #E44A54;font-size: 32rpx;">距结束</text>
				<uni-countdown backgroundColor="#F3F15B" color="#e44a54" splitorColor="#e44a54" :hour="1" :minute="12" :second="40" :showDay="false"></uni-countdown>
			</view>
		</view>
		<!-- 商品价格 库存 -->
		<view class="product-detail">
			<view class="beij">
				<text style="color: #e33944;font-size: 24rpx;">¥</text>
				<text style="color: #e33944;margin-right: 12rpx;">{{detail.coupon_price}}</text>
				<text style="color: #A1A4A5;font-size: 28rpx;text-decoration: line-through;">¥{{detail.coupon_price}}</text>
			</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;margin-right: 12rpx;">已售{{ detail.sale }}件</text>
				<!-- <text style="color: #A1A4A5;font-size: 28rpx;">库存59</text> -->
			</view>
		</view>
		<view class="product-title">
			<view class="productTxt">
				<text
					style="font-size: 30rpx;
				color: #333333;font-weight: bolder;"
				>
					{{detail.p_name}}
				</text>
			</view>

			<navigator class="btn-share">
				<image src="../../static/onlineStore/share.png" style="width:30rpx ;height: 28rpx;"></image>
				<text style="color:#b3b3b3;font-size: 28rpx;">分享</text>
			</navigator>
		</view>
		<!-- 拼团 -->
		<view class="team-buy" v-if="assemble === ''">
			<view class="youhuiquan">
				<text style="color: #333333;font-size:30rpx ;">10个团正在热拼，可直接参与</text>
				<view @click="assmbleDetail()">
					<text style="color: #666666;font-size:24rpx ;">查看全部</text>
					<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
				</view>
			</view>
			<view class="team-buy-detail" v-for="(data, index) in teamlist.splice(0, 2)" :key="index">
				<view class="assmebleleft">
					<view class="circle-avator"><image src="" mode="aspectFit"></image></view>
					<view class="team-user">{{ data.name }}</view>
				</view>
				<view class="assmebleright">
					<view>
						<view class="pingtuan">
							差
							<text style="font-size: 28rpx;color:#E02020;">{{ data.num }}</text>
							人拼成
						</view>
						<view class="timeSetting">
							<text style="font-size: 28rpx;color: #999999;">剩余</text>
							<uni-countdown backgroundColor="#ffffff" color="#999999" splitorColor="#999999" :hour="1" :minute="12" :second="40" :showDay="false"></uni-countdown>
						</view>
					</view>
					<button class="team-btn"><text style="color: #ffffff;font-size:28rpx ;">参团&nbsp;></text></button>
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view></view>
		<view class="youhuiquan" url="">
			<view><text style="color: #666666;font-size:26rpx ;">优惠券</text></view>
			<navigator url="">
				<text style="color: #666666;font-size:26rpx ;">领取优惠券</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
			</navigator>
		</view>
		<!-- 售后售前 -->
		<navigator class="pre-sale">
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">全场包邮</view>
			</view>
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">极速发货</view>
			</view>
			<view class="pre-detail">
				<image src="../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;"></image>
				<view class="jisu">七天无理由退换</view>
			</view>
			<view style="margin-left:120rpx ;"><image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image></view>
		</navigator>
		<!-- 地址 -->
		<navigator url="" class="address">
			<text class="txt-address">地址</text>
			<view class="choose-address">选择收货地址</view>
			<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="address">
			<text class="txt-address">参数</text>
			<view class="choose-address productTxt">选择收货地址地址选择收货地址地址地址选择收货地址地址择收货地址地址<<</view>
			<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
		</navigator>
		<navigator url="" class="comment">
			<view class="choose-address">评价({{ detail.comment_num }})</view>
			<view>
				<text style="color: #A1A4A5;font-size: 28rpx;">查看全部</text>
				<image src="../../static/onlineStore/go%20(1).png" style="width: 16rpx;height: 24rpx;"></image>
			</view>
		</navigator>
		<view class="pic-txt-detail">
			<view>图文详情</view>
			<view v-for="(item, index) in swiperImages" :key="index" class="detailPicture"><image :src="item" style="width: 100%;height: 650rpx;"></image></view>
		</view>
		<!-- 加入购物车  固定-->
		<view class="oprate">
			<view class="oprate-content">
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/kf.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">客服</view>
				</navigator>
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/gwc.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">购物车</view>
				</navigator>
				<navigator url="" class="oprate-icon">
					<image src="../../static/onlineStore/sc.png" style="width: 36rpx;height: 34rpx;"></image>
					<view class="oprate-txt">
						<view class="twobtncont">
							<text class="add" @click="collectP" v-if="collect_p == false">收藏商品</text>
							<text class="add" @click="collectP" v-else>取消收藏</text>
						</view>
					</view>
				</navigator>
				<view>
					<button size="mini" class="bth-gwc" @tap="showSku" data-type="2">加入购物车</button>
					<button size="mini" class="btn-fastbuy" @tap="showSku" data-type="1">立即购买</button>
				</view>
			</view>
		</view>
		<scroll-view class="commodity_attr_list" v-if="sku_show" scroll-y="true">
			<view class="sku-img-box">
				<image :src="detail.image" class="sku-img"></image>
				<view>
					<view style="margin-bottom:10rpx;color:red;font-size:34rpx;">￥{{ detail.coupon_price }}</view>
					<text v-if="valueStr">已选:{{ valueStr }}</text>
					<text v-if="!valueStr">请选择商品规格</text>
				</view>
			</view>
			<view class="attr_box" v-for="(attrValueObj, attrIndex) in sku_arr" :key="attrIndex">
				<view class="attr_name">{{ attrValueObj.group_name }}</view>

				<view class="attr_value_box">
					<view
						:class="'attr_value ' + (value.selected ? 'attr_value_active' : '')"
						@tap="selectAttrValue"
						:data-value="value.spec_value"
						:data-key="attrValueObj.item_id"
						:data-code="attrCode"
						:data-index="attrIndex"
						:data-selectedvalue="attrValueObj.selectedValue"
						v-for="(value, valueIndex) in attrValueObj.spec_items"
						:key="valueIndex"
						:data-sec_index="valueIndex"
						:data-item="value"
					>
						{{ value.spec_value }}
					</view>
				</view>
			</view>

			<!-- 购买数量 -->
			<view class="buyNum">
				<view class="buyNumTitle">购买数量：</view>
				<view class="buyNumRight">
					<text :class="'buyNumReduce ' + (buyQuantity >= 1 ? 'buyNumReducebj' : '')" @tap="minusCount" style="display:flex;align-item:center;justify-content:center;">-</text>
					<text class="buyNumSum">{{ buyQuantity }}</text>
					<text :class="'buyNumAdd ' + (buyQuantity >= shopGooesNum ? 'buyNumAddbg' : '')" @tap="addCount" style="display:flex;align-item:center;justify-content:center;">+</text>
				</view>
			</view>

			<image src="../../static/my/close.png" class="close" @tap.stop="closeSku"></image>
			<view class="weui-btn-area" v-if="sku_show">
				<button class="weui-btn" @tap="submit">确定</button>
				</view>
		</scroll-view>
	</view>
</template>

<script>
import { ajax } from '../../utils/public.js';
var util = require('../../utils/util.js');
export default {
	data() {
		return {
			evaluateList: '',
			//获取评论列表
			// detail: {
			// 	coupon_price: 0.0,
			// 	create_time_text: '',
			// 	html: {},
			// 	icon: {},
			// 	p_detail: '',
			// 	p_name: '',
			// 	price: '0.00',
			// 	status: 1,
			// 	stock: 1
			// },
			detail:{},
			html: {},
			icon: {},
			p_id: 0,
			is_share: '',
			collect_p: false,
			buyQuantity: 1,
			//购买数量
			sku_arr: [],
			//规格数组
			sku_show: false,
			//是否出现sku弹窗
			valueStr: '',
			//所选的规格名称
			valueStrNum: '',
			//所选的规格goods_sku_id
			type: '',
			//1立即购买，2加入购物车
			goods_spec_id: '',
			main_image: '',
			userName: '',
			attrValueList: '',
			swiperImages: [],
			productDetail: {},
			assemble: null,
			teamlist: [
				{
					name: '与女无瓜',
					num: '1'
				},
				{
					name: '与女无瓜',
					num: '1'
				}
			],
			pid: ''
		};
	},
	onLoad(event) {
		console.log(event);
		this.banner = JSON.parse(decodeURIComponent(event.productDetail));
		this.pid = this.banner.id;
	},

	onShareAppMessage: function(res) {
		if (res.from === 'button') {
			var p_name = res.target.dataset.p_name;
		} else {
			var p_name = '开心书写';
		}

		var that = this;
		return {
			title: p_name,
			path: 'pages/onlinestore/productDetail/productDetail?is_share=1&p_id=' + that.p_id,
			success: function(res) {}
		};
	},
	onShow: function() {
		//  if(this.data.valueStrNum){
		//    this.setData({
		//      sku_arr: this.data.detail.specData.spec_attr
		//    })
		//  }
		this.setData({
			sku_show: false,
			valueStrNum: '',
			valueStr: ''
		});
	},
	mounted() {
		ajax({
			url: 'goods/detail',
			data: {
				// p_id:this.pid,
				p_id: '1201'
			},
			method: 'POST',
			success: (res) => {
				console.log(res.data.data)
				res.data.data.coupon_price = res.data.data.spec ? res.data.data.spec[0].goods_price : res.data.data.coupon_price;
				res.data.data.image = res.data.data.spec ? res.data.data.spec[0].spec_image : res.data.data.image;
				
				this.detail = res.data.data, 
				this.collect_p = res.data.data.if_collect;
				this.main_image = res.data.data.image;
				if (res.data.data.specData) {
					const {spec_attr,spec_list} = res.data.data.specData
					this.sku_arr = spec_attr
				}
			},
			error: function() {}
		}),
			ajax({
				url: 'assemble/wait',
				method: 'POST',
				data: {
					// goods_id:this.pid,
					goods_id: '1072'
				},
				success: res => {
					const { count, list } = res.data.data;
					this.teamlist = list;
				},
				error: function() {}
			});
	},
	methods: {
		assmbleDetail: function() {
			console.log(this.pid);
			uni.navigateTo({
				url: '../assemble/assemble',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		getEvaluateList() {
			let that = this;
			let param = {
				goods_id: that.p_id
			};
			util.ajax('/api/evaluate/getEvaluateList', param, res => {
				console.log(res.data.total);
				that.setData({
					evaluateList: res.data
				});

				if (res.data.total != 0) {
					let namee = res.data.list[0].nickname;
					let userName = 'evaluateList.list[0].nickname';

					if (namee.length == 1) {
						//用户名为一个字的显示*
						that.setData({
							[userName]: '*'
						});
					} else if (namee.length == 2) {
						//用户名为2个字
						let newName = namee.slice(0, 1);
						that.setData({
							[userName]: newName + '*'
						});
					} else {
						let startName = namee.slice(0, 1);
						let endName = namee.slice(namee.length - 1, namee.length);

						if (namee.length == 3) {
							//用户名称3个字的
							that.setData({
								[userName]: startName + '*' + endName
							});
						} else {
							//用户名称4个字及以上
							that.setData({
								[userName]: startName + '**' + endName
							});
						}
					}
				}
			});
		},
		//
		add(e) {
			var that = this;
			var param = {
				p_id: that.p_id,
				goods_num: that.buyQuantity,
				goods_sku_id: that.valueStrNum
			};
			ajax({
				url: 'cart/add',
				data: { param },
				success: res => {
					uni.showToast({
						title: res.msg
					});
					if (that.detail.specData) {
						that.closeSku();
					}
				}
			});
		},
		//打开sku弹窗
		showSku(e) {
			if (this.sku_arr.length > 0) {
				console.log(e.type)
				this.sku_show=true,
				this.type=e.type
			} else {
				if (e.currentTarget.dataset.type == 1) {
					this.buyNow();
				} else {
					this.add();
				}
			}
		},

		//关闭sku弹窗
		closeSku() {
			var that = this;
			this.sku_show = false
			var list = that.detail.specData.spec_attr;
			list.forEach(function(v) {
				v.spec_items.forEach(function(val) {
					val.selected = false;
				});
			});
			that.setData({
				'detail.specData.spec_attr': list,
				sku_arr: list,
				// valueStrNum: '',
				valueStr: '',
				'detail.coupon_price': that.detail.spec[0].goods_price,
				'detail.image': that.detail.spec[0].spec_image ? that.detail.spec[0].spec_image : that.detail.image
			});
		},

		toTop(e) {
			var that = this;
			that.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		//查看更多评论
		lookMore() {
			let that = this;
			wx.navigateTo({
				url: '/pages/commentList/commentList?p_id=' + that.p_id + '&collect_p=' + that.collect_p
			});
		},

		/* 获取数据 */
		distachAttrValue: function(commodityAttr) {
			/** 
		      将后台返回的数据组合成类似 
		      { 
		      attrKey:'型号', 
		      attrValueList:['1','2','3'] 
		      } 
		      */
			// 把数据对象的数据（视图使用），写到局部内
			var attrValueList = this.attrValueList; // 遍历获取的数据

			for (var i = 0; i < commodityAttr.length; i++) {
				for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
					var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList); // console.log('属性索引', attrIndex);
					// 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置

					if (attrIndex >= 0) {
						// 如果属性值数组中没有该值，push新值；否则不处理
						if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
							attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
						}
					} else {
						attrValueList.push({
							attrKey: commodityAttr[i].attrValueList[j].attrKey,
							attrValues: [commodityAttr[i].attrValueList[j].attrValue]
						});
					}
				}
			} // console.log('result', attrValueList)

			for (var i = 0; i < attrValueList.length; i++) {
				for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
					if (attrValueList[i].attrValueStatus) {
						attrValueList[i].attrValueStatus[j] = true;
					} else {
						attrValueList[i].attrValueStatus = [];
						attrValueList[i].attrValueStatus[j] = true;
					}
				}
			}

			this.setData({
				attrValueList: attrValueList
			});
		},
		getAttrIndex: function(attrName, attrValueList) {
			// 判断数组中的attrKey是否有该属性值
			for (var i = 0; i < attrValueList.length; i++) {
				if (attrName == attrValueList[i].attrKey) {
					break;
				}
			}

			return i < attrValueList.length ? i : -1;
		},
		isValueExist: function(value, valueArr) {
			// 判断是否已有属性值
			for (var i = 0; i < valueArr.length; i++) {
				if (valueArr[i] == value) {
					break;
				}
			}

			return i < valueArr.length;
		},
		// 结果提交
		submit: function() {
			var that = this;
			var flag = false;

			for (var i = 0; i < this.detail.spec.length; i++) {
				if (this.valueStrNum == this.detail.spec[i].spec_sku_id) {
					this.setData({
						goods_spec_id: this.detail.spec[i].goods_spec_id
					});
					flag = true;
					break;
				}
			}

			if (flag == false) {
				wx.showToast({
					title: '请选择完整的规格！',
					icon: 'loading',
					duration: 1000
				});
				return;
			} else if (!this.valueStr) {
				wx.showToast({
					title: '请选择完整的规格！',
					icon: 'loading',
					duration: 1000
				});
				return;
			} else {
				if (that.type == 1) {
					that.buyNow();
				} else {
					that.add();
				} 
			}
		},
		//收藏商品
		collectP(e) {
			let _this = this;

			util.ajax(
				'/api/goods/goodsCollect',
				{
					p_id: _this.p_id
				},
				res => {
					wx.showToast({
						title: res.msg,
						icon: 'none',
						mask: true
					});

					_this.setData({
						collect_p: !_this.collect_p
					});
				}
			);
		},
		goindex: function() {
			var that = this;
			getApp().globalData.infoModel();
		},

		buyNow() {
			ajax({
				url: '/index/getProfile',
				data: {},
				success: res => {
					var that = this;
					if (!uni.getStorageSync('loginToken')) {
						uni.navigateTo({
							url: '../login/login'
						});
					} else {
						if (that.detail.specData) {
							that.closeSku();
						}

						uni.navigateTo({
							url:
								'sureOrder/sureOrder?type=1&ids=' +
								that.p_id +
								'&now_buy=1&goods_num=' +
								that.buyQuantity +
								'&goods_sku_id=' +
								that.valueStrNum +
								'&goods_spec_id=' +
								that.goods_spec_id
						});
					}
				}
			});
		},

		addCount(e) {
			this.buyQuantity = parseInt(this.buyQuantity)+ 1
		},

		// 减少数量
		minusCount(e) {
			if (this.buyQuantity <= 1) {
				return;
			}
			this.buyQuantity = parseInt(this.buyQuantity)- 1
			// this.setData({
			// 	buyQuantity: parseInt(this.buyQuantity) - 1
			// });
		},

		changeNum: function(e) {
			var that = this;
			that.setData({
				buyQuantity: e.detail.value
			});
		},
		selectAttrValue: function(e) {
			var attrValueList = this.sku_arr;
			// var index = e.currentTarget.dataset.index; //属性索引

			// var key = e.currentTarget.dataset.key;
			// var value = e.currentTarget.dataset.value;
			// var sec_index = e.currentTarget.dataset.sec_index; //属性索引

			// var item = e.currentTarget.dataset.item; //选中
			var index = e.index; //属性索引
			
			var key = e.key;
			var value = e.value;
			var sec_index = e.sec_index; //属性索引
			
			var item = e.item;

			this.selectValue(attrValueList, index, key, value, sec_index, item);
		},

		/* 选中 */
		selectValue: function(attrValueList, index, key, value, sec_index, item) {
			for (var j = 0; j < attrValueList[index].spec_items.length; j++) {
				attrValueList[index].selectedValue = '';

				if (attrValueList[index].spec_items[j].item_id == item.item_id) {
					attrValueList[index].spec_items[j].selected = !attrValueList[index].spec_items[j].selected;
				} else {
					attrValueList[index].spec_items[j].selected = false;
				}
			}

			attrValueList[index].selectedValue = value;
			this.setData({
				sku_arr: attrValueList
			});
			var valueStr = '';
			var valueStrNum = '';

			for (var i = 0; i < attrValueList.length; i++) {
				for (var j = 0; j < attrValueList[i].spec_items.length; j++) {
					if (attrValueList[i].spec_items[j].selected) {
						valueStr += attrValueList[i].selectedValue + ',';
						valueStrNum += attrValueList[i].spec_items[j].item_id + '_';
					}
				}
			}

			if (valueStrNum.substr(valueStrNum.length - 1, valueStrNum.length) == '_') {
				valueStrNum = valueStrNum.substr(0, valueStrNum.length - 1);
			}

			if (valueStr.substr(valueStr.length - 1, valueStr.length) == ',') {
				valueStr = valueStr.substr(0, valueStr.length - 1);
			}

			var str = valueStrNum
				.split('')
				.reverse()
				.join('');

			for (var i = 0; i < this.detail.spec.length; i++) {
				if (valueStrNum == this.detail.spec[i].spec_sku_id || str == this.detail.spec[i].spec_sku_id) {
					if (this.detail.spec[i].spec_image) {
						this.setData({
							'detail.image': this.detail.spec[i].spec_image
						});
					} else {
						this.setData({
							'detail.image': this.main_image
						});
					}

					this.setData({
						'detail.coupon_price': this.detail.spec[i].goods_price
					});
				}
			}

			this.setData({
				valueStr: valueStr,
				valueStrNum: valueStrNum
			});
			console.log(this.valueStrNum, 'ggggggggggg');
		}
	}
};
</script>

<style style lang="less" scoped>
@import './product-detail.css';
.detailPicture {
	width: 750rpx;
	height: 660rpx;
	// margin-top: 90rpx;
}

// .add {
//   width: 210rpx;
//   height: 67rpx;
//   line-height: 67rpx;
//   border: 0;
//   color: #fff;
//   font-size: 30rpx;
//   border-radius: 33rpx;
//   outline: none;
//   background: linear-gradient(to right,#fe6200,#fe6400);
// }
.assmeble {
	background-color: #ffffff;
}
.top_title {
	.input-wrap {
		height: 60rpx;
		background: rgba(239, 239, 239, 1);
		border-radius: 34rpx;
		width: 70%;
		.search {
			width: 32rpx;
			height: 34rpx;
			margin-left: 50rpx;
			margin-right: 22rpx;
		}
		.input {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333;
			line-height: 60rpx;
		}
	}
	.icon1 {
		width: 18rpx;
		height: 32rpx;
	}
	.icon2 {
		height: 44rpx;
		width: 44rpx;
	}
}
</style>
