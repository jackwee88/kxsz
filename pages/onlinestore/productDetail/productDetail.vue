<template>
  <view>
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <!-- 		<view class="top_title">
			<navigator open-type="navigateBack" url=""><image src="/static/onlineStore/back@2x.png" mode="aspectFit" class="icon1" /></navigator>
			<navigator url="../shoppingcart/shoppingcart"><image src="/static/index/gwc.png" class="icon2" /></navigator>
    </view>-->
    <!-- 商品详情 -->
    <!-- 		<cover-view class="team-position" v-if="assemble ===1">
			<view class="team-num">{{assmebleTotal}}人团</view>
			<view class="team-total">已拼{{}}件</view>
    </cover-view>-->
    <!-- 商品详情 -->
    <swiper :autoplay="true" :interval="3000" :duration="1000" class="detailPicture">
      <block v-for="(item, index) in detail.icon" :key="index">
        <swiper-item>
          <view>
            <image :src="item" style="width: 100%;height: 660rpx;" />
          </view>
        </swiper-item>
      </block>
    </swiper>
    <!-- 限时秒杀 判断商品是否为秒杀商品-->
    <view class="xsms" v-if="detail.sale_status == 2">
      <view class="back-red">
        <view class="back-red-txt">
          <text style="color: #ffffff;font-size: 32rpx;">¥</text>
          <text style="color: #ffffff;font-size: 52rpx;">{{ detail.sale_detail.price }}</text>
          <view
            style="color: #E5E5E5;font-size: 24rpx;"
            class="origin-price"
          >¥{{ detail.coupon_price }}</view>
        </view>
        <view class="cheap">已抢{{ detail.sale_detail.num }}件</view>
      </view>
      <view class="back-yello">
        <text style="color: #E44A54;font-size: 32rpx; padding-left: 15rpx;">距结束</text>
        <uni-countdown
          backgroundColor="#F3F15B"
          color="#e44a54"
          splitorColor="#e44a54"
          :hour="hour"
          :minute="minute"
          :second="second"
          :showDay="false"
        ></uni-countdown>
      </view>
    </view>
    <!-- 商品价格 库存 -->
    <view class="product-detail">
      <view class="beij">
        <text style="color: #e33944;font-size: 24rpx;">¥</text>
        <text style="color: #e33944;margin-right: 12rpx;">{{ detail.countyprice }}</text>
        <text
          style="color: #A1A4A5;font-size: 28rpx;text-decoration: line-through;"
        >¥{{ detail.coupon_price }}</text>
      </view>
      <view>
        <text style="color: #A1A4A5;font-size: 28rpx;margin-right: 12rpx;">已售{{ detail.sale }}件</text>
        <!-- <text style="color: #A1A4A5;font-size: 28rpx;">库存59</text> -->
      </view>
    </view>
    <view class="product-title">
      <view class="productTxt">
        <text style="font-size: 30rpx;
				color: #333333;font-weight: bolder;">{{ detail.p_name }}</text>
      </view>

      <navigator class="btn-share">
        <image src="../../../static/onlineStore/share.png" style="width:30rpx ;height: 28rpx;" />
        <text style="color:#b3b3b3;font-size: 28rpx;">分享</text>
      </navigator>
    </view>
    <!-- 拼团 -->
    <view class="team-buy" v-if="detail.sale_status===3 && assmebleTotal != 0">
      <view class="youhuiquan">
        <text style="color: #333333;font-size:30rpx ;">{{ assmebleTotal }}个团正在热拼，可直接参与</text>
        <view @click="assmbleDetail()">
          <text style="color: #666666;font-size:24rpx ;">查看全部</text>
          <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
        </view>
      </view>
      <view class="team-buy-detail" v-for="(item, index) in newlist" :key="index">
        <view class="assmebleleft">
          <view class="circle-avator">
            <image
              mode="aspectFit"
              :src="item.user.avatar"
              style="width: 80rpx;height: 80rpx;border-radius: 40rpx;"
            />
          </view>
          <view class="team-user">{{ item.user.nickname }}</view>
        </view>
        <view class="assmebleright">
          <view>
            <view class="pingtuan">
              差
              <text style="font-size: 28rpx;color:#E02020;">{{ item.need_number }}</text>人拼成
            </view>
            <view class="timeSetting">
              <text style="font-size: 28rpx;color: #999999;">剩余</text>
              <uni-countdown
                backgroundColor="#ffffff"
                color="#999999"
                splitorColor="#999999"
                :hour="assembleHour"
                :minute="assmebleMinute"
                :second="assmebleSecond"
                :showDay="false"
              ></uni-countdown>
            </view>
          </view>
          <view class="cantuan" @tap="assembleOrder" data-orderid="item.user_id">
            参团
            <image src="../../../static/index/qj.png" mode />
          </view>
        </view>
      </view>
    </view>
    <!-- 优惠券 -->
    <view></view>
    <view class="youhuiquan">
      <view>
        <text style="color: #666666;font-size:26rpx ;">优惠券</text>
      </view>
      <navigator url="/pages/onlinestore/discountcenter/discountcenter">
        <text style="color: #666666;font-size:26rpx ;">领取优惠券</text>
        <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
      </navigator>
    </view>
    <!-- 售后售前 -->
    <navigator class="pre-sale">
      <view class="pre-detail">
        <image src="../../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;" />
        <view class="jisu">全场包邮</view>
      </view>
      <view class="pre-detail">
        <image src="../../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;" />
        <view class="jisu">极速发货</view>
      </view>
      <view class="pre-detail">
        <image src="../../../static/onlineStore/right.png" style="width:28rpx ;height: 28rpx;" />
        <view class="jisu">七天无理由退换</view>
      </view>
      <view style="margin-left:120rpx ;">
        <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
      </view>
    </navigator>
    <!-- 地址 -->
    <view class="address">
      <text class="txt-address">地址</text>
      <view class="choose-address">{{ detail.place_of_delivery }}</view>
      <!-- <view class="choose-address">选择收货地址</view> -->
      <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
    </view>

    <!-- 		  <view class="comment-wrap">
		    <view class="comment-title">
		      <text>宝贝评价({{evaluateList.total}})</text>
		      <text class="cpmment-more" @tap.stop="evaluateList.total== 0 ? '' : 'lookMore'">查看全部<text class="more-icon">></text></text>
		    </view>

    </view>-->
    <view class="comment-wrap">
      <view class="comment">
        <text class="choose-address">评价({{ evaluateList.total }})</text>
        <text style="color: #A1A4A5;font-size: 28rpx;" @tap.stop="lookMore">查看全部</text>
        <image src="../../../static/onlineStore/go(1).png" style="width: 16rpx;height: 24rpx;" />
      </view>
      <view v-if="evaluateList.total != 0">
        <view class="comment-user">
          <image class="comment-img" :src="evaluateList.list[0].avatar" />
          <text>{{ evaluateList.list[0].nickname }}</text>
        </view>
        <view class="comment-content">{{ evaluateList.list[0].content }}</view>
      </view>
    </view>
    <view class="pic-txt-detail">
      <view class="pic-txt">图文详情</view>
      <view>
        <image
          :src="item"
          style="width: 100%;"
          v-for="(item, index) in detail.html"
          :key="index"
          mode="widthFix"
        />
      </view>
    </view>
    <!-- 加入购物车  固定-->
    <view class="oprate">
      <view class="oprate-content">
        <navigator class="oprate-icon" url="../kefu">
          <image src="../../../static/onlineStore/kf.png" style="width: 36rpx;height: 34rpx;" />
          <view class="oprate-txt">客服</view>
        </navigator>
        <navigator url="../../shoppingcart/shoppingcart" class="oprate-icon">
          <image src="../../../static/onlineStore/gwc.png" style="width: 36rpx;height: 34rpx;" />
          <view class="oprate-txt">购物车</view>
        </navigator>
        <view class="oprate-icon" @tap="collectP">
          <image src="../../../static/onlineStore/sc.png" style="width: 36rpx;height: 34rpx;" />
          <view class="oprate-txt">
            <view class="twobtncont">
              <text class="add" v-if="collect_p == false">收藏商品</text>
              <text class="add" v-else>取消收藏</text>
            </view>
          </view>
        </view>
        <view v-if="detail.sale_status==3">
          <button size="mini" class="btn-assmeble" @tap="showSku" data-type="1">发起拼团</button>
        </view>
        <view v-if="detail.sale_status!=3">
          <button size="mini" class="bth-gwc" @tap="showSku" data-type="2">加入购物车</button>
          <button size="mini" class="btn-fastbuy" @tap="showSku" data-type="1">立即购买</button>
        </view>
      </view>
    </view>
    <scroll-view class="commodity_attr_list" v-if="sku_show" scroll-y="true">
      <view class="sku-img-box">
        <image :src="detail.image" class="sku-img" />
        <view>
          <view style="margin-bottom:10rpx;color:red;font-size:34rpx;">￥{{ detail.coupon_price }}</view>
          <text v-if="valueStr">已选:{{ valueStr }}</text>
          <text v-if="!valueStr">请选择商品规格</text>
        </view>
      </view>
      <view class="attr_box" v-for="(attrValueObj, attrIndex) in sku_arr" :key="attrIndex">
        <view class="attr_name">{{ attrValueObj.group_name }}</view>
        <!-- 		// attrValueObj.item_id
        // data.value-->
        <view class="attr_value_box">
          <view
            v-for="(value, valueIndex) in attrValueObj.spec_items"
            :class="'attr_value ' + (value.selected ? 'attr_value_active' : '')"
            @tap="selectAttrValue"
            :data-value="value.spec_value"
            :data-key="value.item_id"
            :data-index="attrIndex"
            :data-selectedvalue="attrValueObj.selectedValue"
            :key="valueIndex"
            :data-sec_index="valueIndex"
            :data-item="value"
          >{{ value.spec_value }}</view>
        </view>
      </view>

      <!-- 购买数量 -->
      <view class="buyNum">
        <view class="buyNumTitle">购买数量：</view>
        <view class="buyNumRight">
          <text
            :class="'buyNumReduce ' + (buyQuantity >= 1 ? 'buyNumReducebj' : '')"
            @tap="minusCount"
            style="display:flex;align-item:center;justify-content:center;"
          >-</text>
          <text class="buyNumSum">{{ buyQuantity }}</text>
          <text
            :class="'buyNumAdd ' + (buyQuantity >= 1 ? 'buyNumAdd' : '')"
            @tap="addCount"
            style="display:flex;align-item:center;justify-content:center;"
          >+</text>
        </view>
      </view>

      <image src="../../../static/my/close.png" class="close" @tap.stop="closeSku" />
      <view class="weui-btn-area" v-if="sku_show">
        <button class="weui-btn" @tap="submit">确定</button>
      </view>
    </scroll-view>
    <view class="overlayer" v-if="visible">
      <view class="bg"></view>
      <view class="content_wrap">
        <view class="close_wrap">
          <image src="../../../static/my/close.png" mode @tap.stop="closeAssmeble" />
        </view>
        <view class="list" v-for="(item, index) in teamlist" :key="index">
          <view class="item" data-index="index" data-orderid="item.assemeble_order_id">
            <image :src="item.user.avatar" class="avatar" />

            <view class="name">{{item.user.nickname}}</view>

            <view class="num_n_time">
              <view class="num">
                差
                <text>{{item.need_number}}</text>人拼成
              </view>

              <view class="time" style="display: flex;flex-direction: row;align-items: center;">
                <text>剩余</text>
                <uni-countdown
                  backgroundColor="#ffffff"
                  color="#999999"
                  splitorColor="#999999"
                  :hour="assembleHour"
                  :minute="assmebleMinute"
                  :second="assmebleSecond"
                  :showDay="false"
                ></uni-countdown>
              </view>
            </view>
            <view class="cantuan" @tap="assembleOrder">
              参团
              <image src="../../../static/index/qj.png" mode />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { ajax } from "../../../utils/public.js";
var util = require("../../../utils/util.js");
export default {
  data() {
    return {
      evaluateList: {
        total: 56,
        count: 6,
        list: [
          {
            avatar: "",
            nickname: "",
            content: ""
          }
        ]
      },
      assmebleTotal: 0,
      visible: false,
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
      // detailIcon:{}
      detail: {},
      html: {},
      icon: {},
      p_id: 0,
      is_share: "",
      collect_p: false,
      buyQuantity: 1,
      //购买数量
      sku_arr: [],
      //规格数组
      sku_show: false,
      //是否出现sku弹窗
      valueStr: "",
      //所选的规格名称
      valueStrNum: "",
      //所选的规格goods_sku_id
      type: "",
      //1立即购买，2加入购物车
      goods_spec_id: "",
      main_image: "",
      userName: "",
      attrValueList: "",
      swiperImages: [],
      productDetail: {},
      hour: 0,
      minute: 0,
      second: 0,
      assemble: 0,
      assembleHour: 0,
      assmebleSecond: 0,
      assmebleMinute: 0,
			newlist:[],
      teamlist: [],
      banner: "",
      pid: ""
    };
  },
  onLoad(event) {
    // this.banner = JSON.parse(decodeURIComponent(event.gd_id));
    // (this.banner);
    // if(this.banner.p_id){
    // 	this.pid = this.banner.id
    // }else{
    // 	this.pid = this.banner.id;
    // }
    this.pid = event.p_id;
    this.getData();
    this.getEvaluateList();
    this.getAssemble();
  },

  onShareAppMessage: function(res) {
    if (res.from === "button") {
      var p_name = res.target.dataset.p_name;
    } else {
      var p_name = "开心书写";
    }

    var that = this;
    return {
      title: p_name,
      path:
        "pages/onlinestore/productDetail/productDetail?is_share=1&p_id=" +
        that.p_id,
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
      valueStrNum: "",
      valueStr: ""
    });
		var token=uni.getStorageSync('loginToken')
		if(!token){
			uni.navigateTo({
				url:'../../login/login'
			})
		}
  },
  mounted() {},
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    assmbleDetail: function() {
      this.visible = true;
    },
    getData() {
      ajax({
        url: "goods/detail",
        data: {
          p_id: this.pid
          // p_id: '1201'
        },
        method: "POST",
        success: res => {
          res.data.data.coupon_price = res.data.data.spec
            ? res.data.data.spec[0].goods_price
            : res.data.data.coupon_price;
          res.data.data.image = res.data.data.spec
            ? res.data.data.spec[0].spec_image
            : res.data.data.image;
          (this.detail = res.data.data),
            (this.collect_p = res.data.data.if_collect);
          this.main_image = res.data.data.image;
          if (res.data.data.specData) {
            const { spec_attr, spec_list } = res.data.data.specData;
            this.sku_arr = spec_attr;
          }
          if (res.data.data.sale_status == 2) {
            this.getflashtime();
          }
          this.goods_spec_id = res.data.data.spec[0].goods_spec_id;
          this.valueStrNum = res.data.data.spec[0].spec_sku_id;
        },
        error: function() {}
      });
    },
    // 获取拼团详情
    getAssemble() {
      ajax({
        url: "assemble/wait",
        method: "POST",
        data: {
          goods_id: this.pid
        },
        success: res => {
          const { count, list } = res.data.data;
          this.teamlist = list;
          this.assmebleTotal = list.length;
          if (this.assmebleTotal > 0) {
            this.assemble = 1;
          }
    			var newlist=[]
    			for(var i=0;i<list.length;i++){
    
    			}
    			var str=""
    			var newlist=[]
    			newlist = this.teamlist.slice(0,2)
          for (var i = 0; i < list.length; i++) {
            let timeNoew = new Date().getTime() / 1000;
            var lastTime = list[i].endtime - timeNoew;
    				 //(当前时间距离秒杀结束的秒)
    				 var lastTime = parseInt(lastTime);
    				 if (lastTime > 60) {
    				   var middle = parseInt(lastTime / 60);
    				   lastTime = parseInt(lastTime % 60);
    				   if (middle > 60) {
    				     var hour = parseInt(middle / 60);
    				     middle = parseInt(middle % 60);
    				     this.assembleHour = hour;
    				 		this.teamlist[i]['assembleHour']=hour
    				   }
    				 }
    				 var result = parseInt(lastTime);
    				 this.assmebleSecond = result; //秒
    				 this.teamlist[i]['assmebleSecond']=result
    				 if (middle > 0) {
    				   var minute = parseInt(middle);
    				   this.assmebleMinute = minute;
    				 	this.teamlist[i]['assmebleMinute']=minute
    				 }
    				 if (hour > 0) {
    				   var hour = parseInt(hour);
    				   this.assembleHour = hour;
    				 }
          }
        },
        error: function() {}
      });
    },
    getflashtime() {
      ajax({
        url: "assemble/flashSale",
        data: {},
        success: res => {
          const { count, list } = res.data.data;
          this.flashSale = list[0].goods;
          // 获取当前时间戳
          let timeNoew = new Date().getTime() / 1000;
          if (timeNoew > list[0].endtime) {
          } else if (timeNoew < list[0].createTime) {
          } else {
            var lastTime = list[0].endtime - timeNoew; //(当前时间距离秒杀结束的秒)
            // 然后将秒转化成时间  (定时器每秒更新一次)
            this.timeChange(lastTime);
          }
        }
      });
    },
    closeAssmeble() {
      this.visible = false;
    },
    AssmebleChange(value) {
      var lastTime = parseInt(value);
      if (lastTime > 60) {
        var middle = parseInt(lastTime / 60);
        lastTime = parseInt(lastTime % 60);
        if (middle > 60) {
          var hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
          this.assembleHour = hour; 
					// this.teamlist.push({hour:hour})//小时
        }
      }
      var result = parseInt(lastTime);
      this.assmebleSecond = result; //秒
      if (middle > 0) {
        var minute = parseInt(middle);
        this.assmebleMinute = minute;
      }
      if (hour > 0) {
        var hour = parseInt(hour);
        this.assembleHour = hour;
      }
    },
    timeChange(value) {
      var lastTime = parseInt(value);
      if (lastTime > 60) {
        var middle = parseInt(lastTime / 60);
        lastTime = parseInt(lastTime % 60);
        if (middle > 60) {
          var hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
          this.hour = hour; //小时
        }
      }
      var result = parseInt(lastTime);
      this.second = result; //秒
      if (middle > 0) {
        var minute = parseInt(middle);
        this.minute = minute;
      }
      if (hour > 0) {
        var hour = parseInt(hour);
        this.hour = hour;
      }
      return result;
    },
    getEvaluateList() {
      let that = this;
      ajax({
        url: "evaluate/getEvaluateList",
        data: { goods_id: this.pid },
        success: res => {
          this.evaluateList = res.data.data;

          if (res.data.data.total != 0) {
            let namee = res.data.data.list[0].nickname;
            let userName = "evaluateList.list[0].nickname";

            if (namee.length == 1) {
              //用户名为一个字的显示*
              that.setData({
                [userName]: "*"
              });
            } else if (namee.length == 2) {
              //用户名为2个字
              let newName = namee.slice(0, 1);
              that.setData({
                [userName]: newName + "*"
              });
            } else {
              let startName = namee.slice(0, 1);
              let endName = namee.slice(namee.length - 1, namee.length);

              if (namee.length == 3) {
                //用户名称3个字的
                that.setData({
                  [userName]: startName + "*" + endName
                });
              } else {
                //用户名称4个字及以上
                that.setData({
                  [userName]: startName + "**" + endName
                });
              }
            }
          }
        }
      });
      util.ajax();
    },
    //
    add(e) {
      ajax({
        url: "cart/add",
        data: {
          p_id: this.pid,
          goods_num: this.buyQuantity,
          goods_sku_id: this.valueStrNum
        },
        success: res => {
          uni.showToast({
            title: res.data.msg
          });
          if (this.detail.specData) {
            this.closeSku();
          }
        }
      });
    },
    //打开sku弹窗
    showSku(e) {
      if (this.sku_arr.length > 0) {
        (this.sku_show = true), (this.type = e.currentTarget.dataset.type);
      } else {
        if (e.currentTarget.dataset.type == 1) {
          if (this.detail.sale_status == 3) {
            this.assembleOrder();
          } else {
            this.buyNow();
          }
        } else {
          this.add();
        }
      }
    },

    //关闭sku弹窗
    closeSku() {
      var that = this;
      this.sku_show = false;
      var list = that.detail.specData.spec_attr;
      list.forEach(function(v) {
        v.spec_items.forEach(function(val) {
          val.selected = false;
        });
      });
      that.setData({
        "detail.specData.spec_attr": list,
        sku_arr: list,
        // valueStrNum: '',
        valueStr: "",
        "detail.coupon_price": that.detail.spec[0].goods_price,
        "detail.image": that.detail.spec[0].spec_image
          ? that.detail.spec[0].spec_image
          : that.detail.image
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
      if (this.evaluateList.total == 0) return;
      let that = this;
      uni.navigateTo({
        url:
          "commentList/commentList?p_id=" +
          that.pid +
          "&collect_p=" +
          that.collect_p
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
          var attrIndex = this.getAttrIndex(
            commodityAttr[i].attrValueList[j].attrKey,
            attrValueList
          ); // ('属性索引', attrIndex);
          // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置

          if (attrIndex >= 0) {
            // 如果属性值数组中没有该值，push新值；否则不处理
            if (
              !this.isValueExist(
                commodityAttr[i].attrValueList[j].attrValue,
                attrValueList[attrIndex].attrValues
              )
            ) {
              attrValueList[attrIndex].attrValues.push(
                commodityAttr[i].attrValueList[j].attrValue
              );
            }
          } else {
            attrValueList.push({
              attrKey: commodityAttr[i].attrValueList[j].attrKey,
              attrValues: [commodityAttr[i].attrValueList[j].attrValue]
            });
          }
        }
      }

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
          this.goods_spec_id = this.detail.spec[i].goods_spec_id;
          flag = true;
          break;
        }
      }

      if (flag == false) {
        wx.showToast({
          title: "请选择完整的规格！",
          icon: "loading",
          duration: 1000
        });
        return;
      } else if (!this.valueStr) {
        wx.showToast({
          title: "请选择完整的规格！",
          icon: "loading",
          duration: 1000
        });
        return;
      } else {
        if (that.type == 1) {
          if (this.detail.sale_status == 3) {
            this.assembleOrder();
          } else {
            that.buyNow();
          }
        } else {
          that.add();
        }
      }
    },
    //收藏商品
    collectP(e) {
      let _this = this;
      ajax({
        url: "goods/goodsCollect",
        data: {
          p_id: this.pid
        },
        success: res => {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            mask: true
          });
          this.collect_p = !_this.collect_p;
        }
      });
    },
    goindex: function() {
      var that = this;
      getApp().globalData.infoModel();
    },
    /* 拼团 */
    assembleOrder(e) {
				let param = {
        goods_sku_id: this.valueStrNum,
        goods_spec_id: this.goods_spec_id,
        goods_num: this.buyQuantity,
        ids: this.detail.p_id,
        quantity: 1,
        type: 1,
        assemble_order_id: 0
			} 
      uni.navigateTo({
        url:
          "sureOrder/sureOrder?sureOrder=" +
          encodeURIComponent(JSON.stringify(param))
      });
      if (this.detail.specData) {
        this.closeSku();
      }
    },
    buyNow() {
      ajax({
        url: "index/getProfile",
        success: res => {
          var that = this;
          if (!uni.getStorageSync("loginToken")) {
            uni.navigateTo({
              url: "../login/login"
            });
          } else {
            let param = {
              type: 1,
              ids: this.pid,
              now_buy: 1,
              goods_num: this.buyQuantity,
              goods_sku_id: this.valueStrNum,
              goods_spec_id: this.goods_spec_id
            };
            uni.navigateTo({
							url:'../../product-detail/sureOrder/sureOrder?sureOrder='+
                encodeURIComponent(JSON.stringify(param))
            });
            if (that.detail.specData) {
              that.closeSku();
            }
          }
        }
      });
    },

    addCount(e) {
      this.buyQuantity = parseInt(this.buyQuantity) + 1;
    },

    // 减少数量
    minusCount(e) {
      if (this.buyQuantity <= 1) {
        return;
      }
      this.buyQuantity = parseInt(this.buyQuantity) - 1;
      // this.setData({
      // 	buyQuantity: parseInt(this.buyQuantity) - 1
      // });
    },

    // 选择商品属性
    selectAttrValue: function(e) {
      var attrValueList = this.sku_arr;
      var index = e.currentTarget.dataset.index; //属性索引
      var key = e.currentTarget.dataset.key;
      var value = e.currentTarget.dataset.value;
      var sec_index = e.currentTarget.dataset.sec_index; //属性索引
      this.selectValue(attrValueList, index, key, value, sec_index);
    },

    /* 选中 */
    selectValue: function(attrValueList, index, key, value, sec_index) {
      for (var j = 0; j < attrValueList[index].spec_items.length; j++) {
        attrValueList[index].selectedValue = "";
        if (attrValueList[index].spec_items[j].item_id == key) {
          attrValueList[index].spec_items[j].selected = !attrValueList[index]
            .spec_items[j].selected;
        } else {
          attrValueList[index].spec_items[j].selected = false;
        }
      }

      attrValueList[index].selectedValue = value; //此时等于蓝色
      this.sku_arr = attrValueList;
      var valueStr = "";
      var valueStrNum = "";

      for (var i = 0; i < attrValueList.length; i++) {
        for (var j = 0; j < attrValueList[i].spec_items.length; j++) {
          if (attrValueList[i].spec_items[j].selected) {
            valueStr += attrValueList[i].selectedValue + ",";
            valueStrNum += attrValueList[i].spec_items[j].item_id + "_";
          }
        }
      }
      if (
        valueStrNum.substr(valueStrNum.length - 1, valueStrNum.length) == "_"
      ) {
        valueStrNum = valueStrNum.substr(0, valueStrNum.length - 1);
      }

      if (valueStr.substr(valueStr.length - 1, valueStr.length) == ",") {
        valueStr = valueStr.substr(0, valueStr.length - 1);
      }
      var str = valueStrNum
        .split("")
        .reverse()
        .join("");
      for (var i = 0; i < this.detail.spec.length; i++) {
        if (
          valueStrNum == this.detail.spec[i].spec_sku_id ||
          str == this.detail.spec[i].spec_sku_id
        ) {
          if (this.detail.spec[i].spec_image) {
            this.detail.image = this.detail.spec[i].spec_image;
          } else {
            this.detail.image = this.main_image;
          }
          this.detail.coupon_price = this.detail.spec[i].goods_price;
        }
      }

      (this.valueStr = valueStr), (this.valueStrNum = valueStrNum);
    }
  }
};
</script>

<style style lang="less" scoped>
@import "./product-detail.css";
.detailPicture {
  width: 100%;
  height: 660rpx;
  box-sizing: border-box;
}

.overlayer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .content_wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 600rpx;
    background-color: #fff;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
  }
  .close_wrap {
    padding: 20rpx;
    text-align: right;
    image {
      display: inline-block;
      width: 36rpx;
      height: 36rpx;
    }
  }
  .item {
    display: flex;
    align-items: center;
    padding: 20rpx 14rpx 28rpx 32rpx;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      margin-right: 34rpx;
    }
    .name {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 28rpx;
      color: rgba(51, 51, 51, 1);
      line-height: 40rpx;
    }
    .num_n_time {
      text-align: left;
      margin-left: 30rpx;
      .num {
        font-size: 28rpx;
        color: rgba(51, 51, 51, 1);
        line-height: 40rpx;
        // letter-spacing: 4rpx;
        text {
          color: #e02020;
        }
      }
      .time {
        font-size: 28rpx;
        color: rgba(153, 153, 153, 1);
        line-height: 40rpx;
      }
    }
    .cantuan {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140rpx;
      height: 70rpx;
      margin-left: 24rpx;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 1);
      background: rgba(184, 224, 176, 1);
      border-radius: 35rpx;
      image {
        width: 16rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
    }
  }
}
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
.cantuan {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140rpx;
  height: 70rpx;
  margin-left: 24rpx;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 1);
  background: rgba(184, 224, 176, 1);
  border-radius: 35rpx;
  image {
    width: 16rpx;
    height: 24rpx;
    margin-left: 10rpx;
  }
}
.overlayer {
  z-index: 1000;
  .bg {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .content_wrap {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
