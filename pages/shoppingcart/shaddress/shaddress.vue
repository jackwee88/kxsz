<template>
<view>
<!--pages/onlinestore/shaddress/shaddress.wxml-->
<view class="shaddress">
  <view class="shaddresslist" v-if="catalogueitem != ''">
    <view class="shaddressitem" v-for="(item, index) in catalogueitem" :key="index">
      <view class="top">
        <view class="left">
          <view class="infoname">
            <text class="name">{{item.person}}</text>
            <text class="phone">{{item.mobile}}</text>
          </view>
          <view class="addresscont">
            <text class="address">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</text>
          </view>
          <view class="shiyongicon dagou">
          <image v-if="item.default == 1" class="dagouicon" src="/static/img/onlinestore/greengou.png"></image>
          </view>
          <view v-if="item.default != 1" class="shiyong" @tap="useF" :data-list="item">使用</view>
        </view>
      </view>
      <view class="bottom">
        <view class="moren" @tap="defaultF" :data-index="index" :data-ar_id="item.ar_id">
          <view class="rodio">
            <icon v-if="item.default == 1" type="success" color="#48DB8D" size="15" @tap="selectList" :data-index="index"></icon>
            <icon v-else type="circle" size="15" @tap="selectList" :data-index="index"></icon>
          </view>
          <text class="rodio-default" v-if="item.default == 1">已设为默认</text>
          <text v-else class="morentext" :data-list="item">设为默认</text>
        </view>

        <view class="bottomrght">
          <view class="bottomrght_txt" @tap="edit" :data-index="index" :data-list="item" :data-ar_id="item.ar_id">
            <image class="bianjiicon" src="/static/img/onlinestore/compile.png"></image>
            <text class="bianji">编辑</text>
          </view>
          <view class="bottomrght_txt" @tap="del" :data-id="item.ar_id" :data-index="index" :data-defaults="item.default">
            <image class="shanchuicon" src="/static/img/onlinestore/delete2.png"></image>
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view v-else class="address-w">
    <text>暂无数据</text>
  </view>
  <view class="addressbottom">
    <button class="addressbtn" @tap="add">新增地址</button>
  </view>
</view>


 
<template is="toTop"></template>
</view>
</template>

<script>
var util = require("../../../utils/util.js");

export default {
  data() {
    return {
      cp_id: '',
      score: '',
      quantity: '',
      p_id: '',
      ct_id: '',
      catalogueitem: [//   {
        //   name: '梁雨琪',
        //   phone:'18695326545',
        //   address:'福建省 厦门市 集美区 杏林湾营运中心1号楼福建省 厦门市 集美区 杏林湾营运中心1号楼 '
        // },
        //   {
        //     name: '梁雨琪',
        //     phone: '18695326545',
        //     address: '福建省 厦门市 集美区 杏林湾营运中心1号楼福建省 厦门市 集美区 杏林湾营运中心1号楼 '
        //   }
      ],
      goods_sku_id: '',
      address: "",
      totals: "",
      transport_total: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let _this = this;

    util.ajax({
      url:'address/index', 
      data:{
        page: 1,
        page_size: 10
      },
      success: res => {
        if (res.status == 1) {
          _this.catalogueitem= res.data.list
        }
      }
    });

    if (options) {
      this.p_id= options.p_id,
      this.quantity= options.quantity,
      this.cp_id= options.cp_id,
      this.score= options.score,
      this.ct_id= options.ct_id,
      this.goods_sku_id= options.goods_sku_id
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
    /**
     * 添加跳转
     */
    add: function () {
      wx.navigateTo({
        url: '../newaddress/newaddress?quantity=' + this.quantity + ' &ct_id=' + this.ct_id + '&p_id=' + this.p_id + "&score=" + this.score + '&cp_id=' + this.cp_id + '&goods_sku_id=' + this.goods_sku_id
      });
    },

    /**
     * 删除
     */
    del: function (e) {
      var that = this;
      var params = {
        ar_id: '',
        p_id: this.p_id,
        quantity: this.quantity,
        score: this.score,
        ct_id: this.ct_id,
        cp_id: this.cp_id
      };
      wx.showModal({
        title: '提示',
        content: '是否确认删除该地址',
        success(res) {
          if (res.confirm) {
            const defaults = e.currentTarget.dataset.defaults;
            util.ajax({
              url:'address/del', 
              data:{
                ar_id: e.currentTarget.dataset.id
              }, 
              success: res => {
                if (res.status == 1) {
                  let list = that.catalogueitem;
                  list.splice(e.currentTarget.dataset.index, 1);
                  that.catalogueitem= list

                  if (defaults == 1) {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2]; //上一个页面

                    prevPage.address= ''
                  }
                }

                wx.showToast({
                  title: res.msg,
                  duration: 2000
                });
              }
            });
          }
        }

      });
    },

    /**
     * 编辑
     */
    edit: function (e) {
      let ar_id = e.currentTarget.dataset.ar_id;
      let index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '../newaddress/newaddress?list=' + JSON.stringify(e.currentTarget.dataset.list + '&ar_id=' + ar_id) + "&index=" + index + '&quantity=' + this.quantity + ' &ct_id=' + this.ct_id + '&p_id=' + this.p_id + "&score=" + this.score + '&cp_id=' + this.cp_id + '&goods_sku_id=' + this.goods_sku_id
      });
    },

    /**
     * 添加地址后返回重新加载数据
     */
    changeData: function () {
      this.catalogueitem= []
      this.onLoad();
    },
    defaultF: function (e) {
      var params = {
        ar_id: e.currentTarget.dataset.ar_id,
        p_id: this.p_id,
        quantity: this.quantity,
        score: this.score,
        ct_id: this.ct_id,
        cp_id: this.cp_id,
        goods_sku_id: this.goods_sku_id
      };
      let index = e.currentTarget.dataset.index;
      var that = this;
      util.ajax({
        url:'address/select',
        data: {
          ar_id: this.catalogueitem[index].ar_id
        },
        success: res => {
          if (res.status == 1) {
            let list = this.catalogueitem;

            if (!list[index].default) {
              for (const n of list) {
                if (n.default) {
                  n.default = false;
                  break;
                }
              }

              list[index].default = true;
              this.catalogueitem= list
            }

            if (list[index].default == true) {
              var addr = list[index];
              util.ajax({
                url:'goods/OrderMoney', 
                data:params, 
                success:res => {
                  if (res.data.send_status == false) {
                    wx.showToast({
                      title: '当前地址不在配送范围哦 ~',
                      icon: 'none'
                    });
                    return false;
                  }

                  var pages = getCurrentPages(); //上一个页面实例对象

                  var prePage = pages[pages.length - 2]; //关键在这里
                  // prePage.changeData(e.currentTarget.dataset.list)

                  prePage.address= addr,
                  prePage.totals= res.data.amount.toFixed(2),
                  prePage.transport_total= res.data.transport //设置数据

                  wx.navigateBack({
                    delta: 1 // 回退前 delta(默认为1) 页面

                  }); // prePage.setData({
                  //   address: addr,
                  //   totals: res.data.amount.toFixed(2),
                  //   transport_total: res.data.transport
                  // })
                  // prePage.changeData(e.currentTarget.dataset.list)
                  //设置数据
                  // wx.navigateBack({
                  //   delta: 1, // 回退前 delta(默认为1) 页面
                  // })
                }
              });
            }
          }
        }
      });
    },
    useF: function (e) {
      var params = {
        ar_id: e.currentTarget.dataset.list.ar_id,
        p_id: this.p_id,
        quantity: this.quantity,
        score: this.score,
        ct_id: this.ct_id,
        cp_id: this.cp_id,
        goods_sku_id: this.goods_sku_id
      };
      util.ajax({
        url:'goods/OrderMoney',
        data: params, 
        success:res => {
          if (res.data.send_status == false) {
            wx.showToast({
              title: '当前地址不在配送范围哦 ~',
              icon: 'none'
            });
            return false;
          }

          var pages = getCurrentPages(); //上一个页面实例对象

          var prePage = pages[pages.length - 2]; //关键在这里

          prePage.changeData(e.currentTarget.dataset.list);
          prePage.totals= res.data.amount.toFixed(2),
          prePage.transport_total= res.data.transport //设置数据

          wx.navigateBack({
            delta: 1 // 回退前 delta(默认为1) 页面
          });
        }
      });
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
@import "./shaddress.css";
</style>