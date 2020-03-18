<template>
  <view>
    <!--pages/my/mydiscount/mydiscount.wxml-->

    <view class="mydiscount">
      <view class="mydiscount_title">
        优惠券
        <text class="discountNum">{{total}}</text>个
        <view class="wrap" style="float:right" v-if="way==1">
          <view class="checkbox-con">
            <radio-group>
              <label
                :class="item.checked?'checkbox checked':'checkbox'"
                v-for="(item, index) in checkboxArr"
                :key="index"
                @tap="checkboxChange"
                :data-index="index"
                :data-value="item.checked"
              >
                <checkbox :value="item.name" :checked="item.checked"></checkbox>
                {{item.name}}
              </label>
            </radio-group>
          </view>
        </view>
      </view>

      <view
        class="mydiscount_list"
        v-for="(item, index) in mydiscount"
        :key="index"
        @tap="click"
        :data-index="index"
        :data-discount_id="item.cp_id"
        :data-money="item.prices"
        v-if="item.if_use == true"
        :data-if_use="item.if_use"
      >
        <view class="mydiscount_item">
          <view class="left floatcont">{{item.prices}}</view>

          <view class="right floatcont">
            <view class="fullmoney">满{{item.couponcondition}}元可使用</view>
            <view class="perod">有效期:{{item.effectstart}}-{{item.effectend}}</view>
          </view>
        </view>
      </view>

      <view
        class="mydiscount_list"
        v-for="(item, index) in mydiscount"
        :key="index"
        @tap="click"
        :data-index="index"
        :data-discount_id="item.uid"
        :data-money="item.prices"
        v-if="item.if_use == false"
        :data-if_use="item.if_use"
      >
        <view class="mydiscount_items">
          <view class="left floatcont">{{item.prices}}</view>

          <view class="right floatcont">
            <view class="fullmoney">满{{item.couponcondition}}元可使用</view>
            <view class="perod">有效期:{{item.effectstart}}-{{item.effectend}}</view>
          </view>
        </view>
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
// pages/my/mydiscount/mydiscount.js
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      total: "0",
      mydiscount: [],
      //   {
      //   moneybig: '200',
      //   fullmoney: '1000',
      //   beforedate: '2019.9.28',
      //   afterdate: '2019.10.28',
      // },
      // {
      //   moneybig: '100',
      //   fullmoney: '1000',
      //   beforedate: '2019.9.28',
      //   afterdate: '2019.10.28',
      // }
      page: 1,
      page_size: 10,
      count: 1,
      // if_use:false
      prv_money: 0,
      checkboxArr: [
        {
          name: "不使用优惠券",
          checked: false
        }
      ],
      checkValue: false,
      way: "",
      p_id: "",
      ct_id: "",
      ar_id: "",
      score: "",
      quantity: "",
      price: "",
      goods_sku_id: "",
      money: "",
      discount: "",
      totals: "",
      integral: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.way == 1) {
      this.setData({
        way: 1,
        money: options.money,
        prv_money: options.prv_money,
        p_id: options.p_id,
        ct_id: options.ct_id,
        ar_id: options.ar_id,
        quantity: options.quantity,
        price: options.price,
        score: options.score,
        goods_sku_id: options.goods_sku_id
      });
    }

    const that = this;
    that.setData({
      page: 1
    });
    that.getData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    // const that = this
    // that.setData({
    //   page: 1
    // })
    // that.getData()
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    getData() {
      const that = this;
      const param = {
        page: that.page,
        page_size: that.page_size
      };
      const studylis = that.studylist;

      if (that.count < that.page) {
        wx.showToast({
          title: "暂无更多信息"
        });
      } else {
        util.ajaxs("shop/usercouponList", param, res => {
          var mydiscount = that.mydiscount;
          that.setData({
            total: res.data.total,
            page: that.page + 1,
            count: res.data.count > 1 ? res.data.count : 1,
            mydiscount: mydiscount.concat(res.data.list)
          });
          wx.stopPullDownRefresh();

          if (that.way == 1) {
            // this.setData({
            //   money: options.money
            // })
            var len = that.mydiscount.length;
            let mydiscount = that.mydiscount;

            for (var i = 0; i < len; i++) {
              if (that.price > mydiscount[i].couponcondition) {
                mydiscount[i].if_use = true;
              } else {
                mydiscount[i].if_use = false;
              }
            }

            that.setData({
              mydiscount: mydiscount
            });
          } else {
            var len = that.mydiscount.length;
            let mydiscount = that.mydiscount;

            for (var i = 0; i < len; i++) {
              mydiscount[i].if_use = true;
            }

            that.setData({
              mydiscount: mydiscount
            });
          }
        });
      }
    },

    checkboxChange: function(e) {
      var checkValue = !e.currentTarget.dataset.value;
      var index = e.currentTarget.dataset.index; //获取当前点击的下标

      var checkboxArr = this.checkboxArr; //选项集合

      checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值

      this.setData({
        checkValue: checkValue,
        checkboxArr: checkboxArr
      });

      if (this.checkValue == true) {
        if (this.way == 1) {
          var if_use = e.currentTarget.dataset.if_use;
          var discount_id = "";
          var moneys = 0;
          let tols =
            parseFloat(this.money) +
            parseFloat(this.prv_money) -
            parseFloat(moneys);
          let tol = tols.toFixed(2);

          if (tol <= 0) {
            tol = 0.01;
          }

          if (if_use == false) {
            return;
          } else {
            var param = {
              ct_id: this.ct_id,
              p_id: this.p_id,
              ar_id: this.ar_id,
              score: this.score,
              cp_id: 0,
              quantity: this.quantity,
              goods_sku_id: this.goods_sku_id
            };
            util.ajaxs("goods/OrderMoney", param, res => {
              if (res.data.send_status == false) {
                wx.showToast({
                  title: "您的地址不在配送范围内哦 ~,请返回重新选择",
                  icon: "none"
                });
                wx.navigateBack({
                  delta: 1 // 回退前 delta(默认为1) 页面
                });
                return;
              }

              var pages = getCurrentPages();
              var prevPage = pages[pages.length - 2]; //上一个页面

              prevPage.discount = discount_id;
              prevPage.totals = res.data.amount.toFixed(2);
              prevPage.integral = res.data.use_integral;
              prevPage.prv_money = moneys; //设置数据

              wx.navigateBack({
                delta: 1 // 回退前 delta(默认为1) 页面
              });
            }); // prevPage.setData(
            //   {
            //     discount: discount_id,
            //     totals: tol,
            //     prv_money: moneys
            //   }
            // )//设置数据
          }
        } else {
          return;
        }
      }
    },
    confirm: function() {
      // 提交
      console.log(this.checkValue); //所有选中的项的value
    },
    click: function(e) {
      if (this.way == 1) {
        var if_use = e.currentTarget.dataset.if_use;
        var discount_id = e.currentTarget.dataset.discount_id;
        var moneys = e.currentTarget.dataset.money;
        var param = {
          ct_id: this.ct_id,
          p_id: this.p_id,
          ar_id: this.ar_id,
          score: this.score,
          cp_id: discount_id,
          quantity: this.quantity,
          goods_sku_id: this.goods_sku_id
        };
        var that = this;
        let tols =
          parseFloat(this.money) +
          parseFloat(this.prv_money) -
          parseFloat(moneys);
        let tol = tols.toFixed(2);

        if (tol <= 0) {
          tol = 0.01;
        }

        if (if_use == false) {
          return;
        } else {
          util.ajaxs("goods/OrderMoney", param, res => {
            // that.setData({
            //   integral: res.data.use_integral,
            //   totals: parseFloat(res.data.amount)
            // })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面
            prevPage.discount = discount_id;
            prevPage.totals = res.data.amount.toFixed(2);
            prevPage.integral = res.data.use_integral;
            prevPage.prv_money = moneys; //设置数据

            wx.navigateBack({
              delta: 1 // 回退前 delta(默认为1) 页面
            });
          }); // var pages = getCurrentPages();
          // var prevPage = pages[pages.length - 2];  //上一个页面
          // prevPage.setData(
          //   {
          //     discount: discount_id,
          //     totals: tol,
          //     prv_money: moneys
          //   }
          //   )//设置数据
          // wx.navigateBack({
          //   delta: 1, // 回退前 delta(默认为1) 页面
          // })
        }
      } else {
        return;
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
@import "./mydiscount.css";
</style>