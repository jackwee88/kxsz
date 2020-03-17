<template>
<!--pages/onlinestore/newaddress/newaddress.wxml-->
<view class="newaddress">
  <form>
  <view class="form">
    <view class="name form_item">
      <label>姓名:</label>
      <input class="input" @input="inputChange" data-value="name" :value="name"></input>
    </view>
    <view class="phone form_item">
      <label>联系电话:</label>
      <input class="input" @input="inputChange" data-value="tel" :value="tel"></input>
    </view>
    <view class="area form_item">
      
      <icon class="righticon"></icon>
      <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="123">
          <label>所在地区:</label>
        <view class="picker" v-if="region != ''">{{region[0]}}，{{region[1]}}，{{region[2]}}</view>
      </picker>
    </view>
    <view class="detailaddress form_item">
      <label>详细地址:</label>
      <input class="dizhiinput input" @input="inputChange" data-value="detailedAddress" placeholder="街道，楼号牌" :value="detailedAddress"></input>
    </view>
    </view>
  </form>

  <view class="moren">
    <text class="morentext">设为默认</text>
      <view class="rodio">
        <icon v-if="selected" type="success" color="#48DB8D" size="20" @tap="selectList" :data-index="index"></icon>
        <icon v-else type="circle" size="20" @tap="selectList" :data-index="index"></icon>
      </view>
  </view>

  <view class="saveaddress">
    <button class="savebtn" @tap="save">保存地址</button>
  </view>

</view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      name: '',
      tel: '',
      detailedAddress: '',
      region: [],
      selected: false,
      type: '',
      ar_id: '',
      index: '',
      p_id: '',
      quantity: '',
      cp_id: '',
      score: '',
      ct_id: '',
      goods_sku_id: '',
      address: "",
      totals: "",
      transport_total: "",
      s: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let ar_id = parseInt(options.ar_id);
    this.goods_sku_id= options.goods_sku_id

    if (options.list != undefined) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      }); // let list = JSON.parse(options.list)
      // this.setData({
      //   name: list.person,
      //   tel: list.mobile
      // })

      if (ar_id == undefined) {
        this.type= ''
        return false;
      } else {
        that.type= 1,
        that.ar_id= ar_id,
        that.index= options.index
      }

      util.ajax({
		url:'address/onelist', 
		data:{
			ar_id: ar_id
		}, 
		success:res => {
			that.name= res.data.person,
			that.tel= res.data.mobile,
			that.region= [res.data.province, res.data.city, res.data.area],
			that.detailedAddress= res.data.address,
			that.selected= res.data.default
		}
	  });
    }

    if (options.p_id) {
      this.p_id= options.p_id,
      this.quantity= options.quantity,
      this.cp_id= options.cp_id,
      this.score= options.score,
      this.ct_id= options.ct_id
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    bindRegionChange(e) {
      this.region= e.detail.value
    },

    /**
     * 获取input的数据
     */
    inputChange: function ({
      currentTarget,
      detail
    }) {
      this[currentTarget.dataset.value]=detail.value
    },

    /**
     * 设置默认
     */
    selectList: function () {
      this.selected= !this.selected
    },

    /**
     * 保存
     */
    save: function () {
      console.log(this.region);
      let address = this.region[0] + this.region[1] + this.region[2] || '';
      address == 'undefined' ? address = '' : '';
      let that = this;

      if (!/^1\d{10}$/.test(this.tel)) {
        wx.showToast({
          title: '手机号不合法',
          icon: 'none'
        });
        return false;
      }

      let param = {
        person: this.name,
        mobile: this.tel,
        address: this.detailedAddress,
        default: this.selected ? 1 : 0,
        province: this.region[0],
        city: this.region[1],
        area: this.region[2],
        ar_id: this.ar_id,
        goods_sku_id: this.goods_sku_id
      };
      var params = {
        ar_id: this.ar_id,
        p_id: this.p_id,
        quantity: this.quantity,
        score: this.score,
        ct_id: this.ct_id,
        cp_id: this.cp_id
      };

      if (this.type == 1) {
        util.ajax({
			url:'address/edit', 
			data: param, 
			success:res => {
			if (res.status == 1) {
				wx.showToast({
				title: '修改成功',
				duration: 2000,
				icon: 'none'
				});
				var pages = getCurrentPages(); //上一个页面实例对象

				var prevPage = pages[pages.length - 2];

				if (that.selected == true) {
					util.ajax({
						url:'goods/OrderMoney', 
						data:params, success:
						reslute => {
							var pages = getCurrentPages();
							var prevPages = pages[pages.length - 3];

							if (prevPages) {
							if (prevPages.__route__ == 'pages/onlinestore/sureorder/sureorder') {
								var obj = {
								address: reslute.data.address,
								ar_is: that.ar_id,
								area: reslute.data.area,
								city: reslute.data.city,
								province: reslute.data.province,
								mobile: that.tel,
								person: that.name
								};
								console.log(obj);
								prevPages.address= obj,
								prevPages.totals= reslute.data.amount.toFixed(2),
								prevPages.transport_total= reslute.data.transport,
								prevPages.s= 1 //设置数据
							}
							}

							console.log(prevPages.data);

							if (prevPage) {
							prevPage.onLoad();
							}

							wx.navigateBack({
							delta: 1 // 回退前 delta(默认为1) 页面

							});
						}
					});
				}
			} else {
				wx.showModal({
				title: '错误提示',
				content: res.msg,
				showCancel: false
				});
			}
			}
		});
      } else {
        util.ajax({
			url:'address/add', 
			data:param,
			success: res => {
			if (res.status == 1) {
				wx.showToast({
				title: '添加成功',
				duration: 2000
				});
				var pages = getCurrentPages(); //上一个页面实例对象

				var prePage = pages[pages.length - 2]; //关键在这里

				prePage.changeData();

				if (that.selected == true) {
				params.ar_id = res.data.ar_id;
				params.goods_sku_id = that.goods_sku_id;
				util.ajax({
					url:'goods/OrderMoney', 
					data:params, 
					success:reslute => {
						if (reslute.data.send_status == false) {
						wx.showToast({
							title: '您所添加的地址不在配送范围内哦 ~',
							icon: 'none'
						});
						wx.navigateBack({
							delta: 1 // 回退前 delta(默认为1) 页面

						});
						return;
						}

						var prevPages = pages[pages.length - 3];

						if (prevPages) {
						if (prevPages.__route__ == 'pages/onlinestore/sureorder/sureorder') {
							var obj = {
							address: res.data.address,
							ar_id: res.data.ar_id,
							area: res.data.area,
							city: res.data.city,
							province: res.data.province,
							mobile: res.data.mobile,
							person: res.data.person
							};
							prevPages.address= obj,
							prevPages.totals= reslute.data.amount.toFixed(2),
							prevPages.transport_total= reslute.data.transport //设置数据
						}

						wx.navigateBack({
							delta: 1 // 回退前 delta(默认为1) 页面

						});
						}
					}
				});
				}
			} else {
				wx.showModal({
				title: '错误提示',
				content: res.msg,
				showCancel: false
				});
			}
			}
		});
      }
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
@import "./newaddress.css";
</style>