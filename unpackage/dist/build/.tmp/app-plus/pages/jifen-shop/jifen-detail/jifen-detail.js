(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jifen-shop/jifen-detail/jifen-detail"],{"228a":function(e,t,n){"use strict";(function(e){n("f9cd"),n("921b");a(n("66fd"));var t=a(n("b0b5"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"486b":function(e,t,n){"use strict";var a=n("e6a7"),i=n.n(a);i.a},7176:function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return a})},"8cc0":function(e,t,n){"use strict";n.r(t);var a=n("c868"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},b0b5:function(e,t,n){"use strict";n.r(t);var a=n("7176"),i=n("8cc0");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("486b");var u,r=n("f0c5"),d=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"79a2380e",null,!1,a["a"],u);t["default"]=d.exports},c868:function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("60db"),o={data:function(){return{detailPicture:[],swiperImages:[],goods_id:"",teamlist:[{name:"与女无瓜",num:"1"},{name:"与女无瓜",num:"1"}],goodsDetail:"",id:"",ar_id:""}},onLoad:function(t){e("log",t," at pages\\jifen-shop\\jifen-detail\\jifen-detail.vue:90"),this.banner=JSON.parse(decodeURIComponent(t.productName)),e("log",this.banner," at pages\\jifen-shop\\jifen-detail\\jifen-detail.vue:92"),this.id=this.banner.goods_id},mounted:function(){var e=this;(0,i.ajax)({url:"integral/goodsDetail",data:{goods_id:"1"},method:"POST",success:function(t){e.goodsDetail=t.data.data;var n=t.data.data.image_text;e.swiperImages=n},error:function(){}})},methods:{exchange:function(){(0,i.ajax)({url:"integral/placeOrder",data:{goods_id:"1",ar_id:"338"},method:"POST",success:function(e){a.showToast({title:e.data.msg,duration:1e3})},error:function(){}})}}};t.default=o}).call(this,n("0de9")["default"],n("6e42")["default"])},e6a7:function(e,t,n){}},[["228a","common/runtime","common/vendor"]]]);