(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/studySquare/phpublish/phpublish"],{1395:function(t,e,a){"use strict";(function(t){a("f9cd"),a("921b");n(a("66fd"));var e=n(a("2135"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"1fb2":function(t,e,a){"use strict";a.r(e);var n=a("752c"),o=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,function(){return n[t]})}(u);e["default"]=o.a},2135:function(t,e,a){"use strict";a.r(e);var n=a("4521"),o=a("1fb2");for(var u in o)"default"!==u&&function(t){a.d(e,t,function(){return o[t]})}(u);a("a05a");var i,r=a("f0c5"),c=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=c.exports},4521:function(t,e,a){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},u=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return u}),a.d(e,"a",function(){return n})},"752c":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{currentId:"1",section:[{name:"排行榜",typeId:"1"},{name:"勋章",typeId:"2"}],nowdate:"本周",articletitle:"梁雨琪参加一年级教学",addNum:"180",updatedate:"2019-05-12",username:"小包子",grade:"95",leaderboardNum:"4",medalNUm:"10",page:1,page_size:10,count:1,list:[],headImg:"",sections:[{name:"昨天",typeId:"0"},{name:"本周",typeId:"1"},{name:"本月",typeId:"2"},{name:"上月",typeId:"3"}],currentIds:"1",img:"",medal_list:[]}},components:{},props:{},onLoad:function(t){this.getData()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){},methods:{handleTap:function(t){var e=t.currentTarget.id,a=this;this.setData({currentId:e}),1==e||2==e&&wx.request({url:getApp().globalData.requestUrl+"/api/study/medal",method:"post",data:"",header:{"content-type":"application/json",token:wx.getStorageSync("token")},success:function(t){wx.hideLoading(),a.setData({medal_list:t.data.data.list})},fail:function(){wx.hideLoading(),wx.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})},handleTaps:function(e){var a=e.currentTarget.dataset.id;t("log",a," at pages\\studySquare\\phpublish\\phpublish.vue:258");var n=this;a&&(n.setData({currentIds:a,page:1,list:[],count:1}),n.getData())},getSign:function(){},getData:function(){var t=this,e={page:t.page,page_size:t.page_size,type:++t.currentIds};1==t.currentIds?t.setData({nowdate:"昨天"}):2==t.currentIds?t.setData({nowdate:"本周"}):3==t.currentIds?t.setData({nowdate:"本月"}):4==t.currentIds&&t.setData({nowdate:"上月"}),t.count<t.page?wx.showToast({title:"暂无更多信息"}):util.ajax("/api/integral/integral",e,function(e){t.tabcontitem;t.setData({page:t.page+1,count:e.data.count>1?e.data.count:1,list:e.data.list,headImg:e.data.list[0].avatar}),wx.stopPullDownRefresh()})},toTop:function(t){var e=this;e.pageScrollTo({scrollTop:0,duration:0})}}};e.default=a}).call(this,a("0de9")["default"])},a05a:function(t,e,a){"use strict";var n=a("bd1e"),o=a.n(n);o.a},bd1e:function(t,e,a){}},[["1395","common/runtime","common/vendor"]]]);