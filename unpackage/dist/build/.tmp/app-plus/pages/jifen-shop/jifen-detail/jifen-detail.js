(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/jifen-shop/jifen-detail/jifen-detail"],{"02f6":function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return a})},"228a":function(e,t,n){"use strict";(function(e){n("f9cd"),n("921b");a(n("66fd"));var t=a(n("b0b5"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"23c4":function(e,t,n){"use strict";var a=n("ae1c"),i=n.n(a);i.a},"8cc0":function(e,t,n){"use strict";n.r(t);var a=n("c868"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},ae1c:function(e,t,n){},b0b5:function(e,t,n){"use strict";n.r(t);var a=n("02f6"),i=n("8cc0");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("23c4");var u,c=n("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"98b4eaf6",null,!1,a["a"],u);t["default"]=r.exports},c868:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n("60db"),i={data:function(){return{detailPicture:[],swiperImages:[],goods_id:"",teamlist:[{name:"与女无瓜",num:"1"},{name:"与女无瓜",num:"1"}],goodsDetail:"",id:"",ar_id:""}},onLoad:function(t){e("log",t," at pages\\jifen-shop\\jifen-detail\\jifen-detail.vue:84"),this.banner=JSON.parse(decodeURIComponent(t.productName)),e("log",this.banner," at pages\\jifen-shop\\jifen-detail\\jifen-detail.vue:86"),this.id=this.banner.goods_id},mounted:function(){var e=this;(0,a.ajax)({url:"integral/goodsDetail",data:{goods_id:"1"},method:"POST",success:function(t){e.goodsDetail=t.data.data;var n=t.data.data.image_text;e.swiperImages=n},error:function(){}})},methods:{exchange:function(){(0,a.ajax)({url:"integral/placeOrder",data:{goods_id:"1",ar_id:"338"},method:"POST",success:function(e){},error:function(){}})}}};t.default=i}).call(this,n("0de9")["default"])}},[["228a","common/runtime","common/vendor"]]]);