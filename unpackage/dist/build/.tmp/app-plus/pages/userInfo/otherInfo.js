(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userInfo/otherInfo"],{2219:function(e,n,t){"use strict";t.r(n);var u=t("cb59"),o=t.n(u);for(var a in u)"default"!==a&&function(e){t.d(n,e,function(){return u[e]})}(a);n["default"]=o.a},aea8:function(e,n,t){"use strict";var u=t("e84f"),o=t.n(u);o.a},b764:function(e,n,t){"use strict";(function(e){t("f9cd"),t("921b");u(t("66fd"));var n=u(t("cee6"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},bf23:function(e,n,t){"use strict";var u,o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"b",function(){return o}),t.d(n,"c",function(){return a}),t.d(n,"a",function(){return u})},cb59:function(e,n,t){"use strict";(function(e,u){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("60db");function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var r=a({data:function(){return{logList:[{date:"2020-02-02 08:32:23",logNum:"99",msg:"打卡",imageList:[{imageUrl:"../../static/index/dnkf.png"},{imageUrl:"../../static/index/dnkf.png"},{imageUrl:"../../static/index/dnkf.png"}],likeNum:"345",shareNum:"345",commentNum:"345"}],userinfo:"",id:""}},methods:{gotoPublished:function(n){e.navigateTo({url:"../myPublished/myPublished"})}},onLoad:function(e){this.userinfo=JSON.parse(decodeURIComponent(e.userInfo)),this.id=this.userinfo.id},mounted:function(){var e=this;(0,o.ajax)({url:"friend/userDetail",data:{friend_uid:"366"},method:"POST",success:function(n){var t=n.data.data;e.userinfo=t},error:function(){}})}},"methods",{follow:function(){(0,o.ajax)({url:"friend/follow",data:{},method:"POST",success:function(e){u("log",e," at pages\\userInfo\\otherInfo.vue:135")},error:function(){u("log","111"," at pages\\userInfo\\otherInfo.vue:138")}})}});n.default=r}).call(this,t("6e42")["default"],t("0de9")["default"])},cee6:function(e,n,t){"use strict";t.r(n);var u=t("bf23"),o=t("2219");for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);t("aea8");var r,i=t("f0c5"),f=Object(i["a"])(o["default"],u["b"],u["c"],!1,null,"4289cb8f",null,!1,u["a"],r);n["default"]=f.exports},e84f:function(e,n,t){}},[["b764","common/runtime","common/vendor"]]]);