(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/growthDiary/growthDiary"],{"07df":function(t,e,a){},"1d5d":function(t,e,a){"use strict";a.r(e);var i=a("2da0"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=s.a},"2da0":function(t,e,a){"use strict";function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a("ec2b"),n={data:function(){return{canvas:{},p_id:"",user:{},name:"梁雨淇",uid:"",jionNum:"320",pieceNum:"225",modulecont:"超棒的一门课，已经完成前两门课，很系统，思路清晰。配套的练习很有意思.超棒的一门课",geqiancont:"#开心日记#开心日记！",daka:[],is_share:"",index_:"",is_ok:"",type:"",background:"",code:"",avatar:"",isCan:!1,nickname:"",d:"",y:"",title:"",date:"",where:"",word:"",back:0,is_give:"",thumbs_times:"",up:"",is_give_:"",to_details:!1,preview:!1,item:"",indeNum:""}},components:{},props:{},onLoad:function(t){var e=this;t.is_share&&this.setData({is_share:1}),t.uid&&this.setData({uid:t.uid,daka:[],p_id:t.pid,index_:t.index,type:t.type}),this.getData(),this.getSign(),this.getModule();var a=this;if(t.dy_id){s.ajaxs("study/bill",{dy_id:t.dy_id},function(t){a.setData({nickname:t.data.nickname,d:t.data.d,y:t.data.y,title:t.data.title,date:t.data.date,where:t.data.where,word:t.data.word}),wx.downloadFile({url:t.data.avatar,success:function(t){a.setData({avatar:t.tempFilePath}),a.beginCanvas()},fail:function(t){}});var i=t.data.code,s=wx.getFileSystemManager(),n=wx.env.USER_DATA_PATH+"/eeeeeeeeee.jpg",r=i.replace(/^data:image\/\w+;base64,/,"");s.writeFile({filePath:n,data:r,encoding:"base64",success:function(t){e.setData({code:n})},fail:function(t){}}),wx.downloadFile({url:t.data.background,success:function(t){a.setData({background:t.tempFilePath}),a.beginCanvas()},fail:function(t){}})});var i=getCurrentPages(),n=i[i.length-2];n.setData({back:1})}},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(t){var e=this;if("button"===t.from){if(t.target.dataset.hb=1)return this.setData({to_details:!1}),{title:"开心书写",path:"/pages/myPublished/myPublished?dy_id="+this.dy_id+"&is_share=1",success:function(t){}};var a=t.target.dataset.nickname,i=a+"的打卡日记",s=t.target.dataset.image,n=t.target.dataset.video;if(s)var r=s;else if(n)r=n+"?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast";return{title:i,path:"/pages/growthDiary/growthDiary?uid="+e.uid+"&is_share=1",imageUrl:r,success:function(t){}}}},methods:{setData:function(t){for(var e in t){var a=t[e];this[e]=a}},getSign:function(){var t=this;s.ajaxs("index/getSystem",{type:6},function(e){t.setData({geqiancont:e.data})})},getModule:function(){var t=this;s.ajaxs("index/getSystem",{type:7},function(e){t.setData({modulecont:e.data})})},getData:function(){var t=this;t.setData({daka:[]});var e={uid:t.uid};s.ajax("/api/index/UserCenter",e,function(e){for(var a=e.data.list,i={method:"pause"},s=0;s<a.length;s++)a[s].action=i,a[s].poster=a[s].picture_idss[0],a[s].name=a[s].nickname+"的音频";t.setData({user:e.data.user,daka:a})})},praise:function(t){var e=this,a=t.currentTarget.dataset.index,n=t.currentTarget.dataset.dy_id,r=e.index_;s.ajaxs("study/praiseStudy",{dy_id:n},function(t){var s,n,r=e.daka,o="daka["+a+"].is_give",d="daka["+a+"].thumbs_times";t.data.is_ok?e.setData((s={},i(s,o,!r[a].is_give),i(s,d,r[a].thumbs_times+1),i(s,"is_ok","y"),s)):e.setData((n={},i(n,o,!r[a].is_give),i(n,d,r[a].thumbs_times-1),i(n,"is_ok","n"),n))}),setTimeout(function(){var t=e.daka;if("y"==e.is_ok){if(n==e.p_id){var s,o=getCurrentPages(),d=o[o.length-2];if(1==e.type)var u="daily["+r+"].thumbs_times",c="daily["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;else if(3==e.type||4==e.type)u="daka["+r+"].thumbs_times",c="daka["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;else if(2==e.type)u="studylist["+r+"].thumbs_times",c="studylist["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;d.setData((s={},i(s,u,l),i(s,c,f),s))}}else if(n==e.p_id){var g;o=getCurrentPages(),d=o[o.length-2];if(1==e.type)u="daily["+r+"].thumbs_times",c="daily["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;else if(3==e.type||4==e.type)u="daka["+r+"].thumbs_times",c="daka["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;else if(2==e.type)u="studylist["+r+"].thumbs_times",c="studylist["+r+"].is_give",l=t[a].thumbs_times,f=t[a].is_give;d.setData((g={},i(g,u,l),i(g,c,f),g))}},1e3)},previewImg:function(t){var e=t.currentTarget.dataset.src,a=t.currentTarget.dataset.effect_pic;wx.previewImage({currrent:e,urls:a})},details:function(t){var e=t.currentTarget.dataset.dy_id,a=t.currentTarget.dataset.index,i=t.currentTarget.dataset.comment_count,s=t.currentTarget.dataset.browse_times,n=t.currentTarget.dataset.thumbs_times;if(""==this.index_)var r=-1;else r=this.index_;wx.navigateTo({url:"../myPublished/myPublished?dy_id="+e+"&type=4&index="+a+"&comment_count="+i+"&browse_times="+s+"&thumbs_times="+n+"&index_="+r})},playVideo:function(t){this.setData({preview:!1});var e=t.currentTarget.dataset.src;wx.navigateTo({url:"../video/video?src="+e})},goindex:function(){var t=this;getApp().globalData.infoModel(),t.onShow()},playorpause:function(t){var e=this,a=t.target.dataset.index,s="daka["+a+"].action",n={method:"play"},r={method:"pause"};if("pause"==e.daka[a].action.method){e.setData(i({},s,n));for(var o=0;o<e.daka.length;o++)if(a!=o){var d="daka["+o+"].action";e.setData(i({},d,r))}}else e.setData(i({},s,r))},beginCanvas:function(){var t=this;if(t.background&&t.avatar&&t.code){var e=wx.createCanvasContext("customCanvas");e.drawImage(t.background,0,0,320,480),e.setFillStyle("white"),e.setFontSize(32),e.fillText(t.d,25,50),e.setFontSize(16),e.fillText(t.y,25,80),e.setFontSize(16);for(var a=[],i=0;i<t.word.length;i++){var s=Math.ceil((i+1)/15);a[s-1]?a[s-1]+=t.word[i]:a[s-1]=t.word[i]}for(var n=0;n<a.length;n++)e.fillText(a[n],25,120+20*n);t.drawRoundedRect(e,25,250,280,110,8,!0,!1),e.fillText(t.title,25,175),e.drawImage(t.avatar,40,260,50,50),e.setFillStyle("black"),e.setFontSize(16),e.fillText(t.nickname,100,275),e.setFillStyle("gray"),e.setFontSize(12),e.fillText(t.where,100,300),e.moveTo(40,315),e.lineTo(280,317),e.ineWidth=1,e.strokeStyle="#f5f5f5",e.stroke(),e.setFontSize(16),e.fillText("坚持打卡天数",50,340),e.setFillStyle("black"),e.setFontSize(12);var r=t.date+"天";e.fillText(r,250,340),e.setFillStyle("white"),t.drawRoundedRect(e,25,400,280,55,8,!0,!1),e.drawImage("/img/index/logo.png",35,408,100,40),e.drawImage(t.code,240,408,40,40),e.draw(),t.setData({isCan:!0})}},save:function(){wx.canvasToTempFilePath({canvasId:"customCanvas",success:function(t){wx.authorize({scope:"scope.writePhotosAlbum",success:function(){wx.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){wx.showToast({title:"图片保存成功",mask:!0});var t=Date.parse(new Date)/1e3;String(t),String(Math.floor(50*Math.random()))}})}})}},this)},closeCan:function(t){this.setData({isCan:!1})},shares:function(){wx.navigateTo({url:"/pages/myPublished/myPublished?dy_id="+this.dy_id})},drawRoundedRect:function(t,e,a,i,s,n,r,o){t.save(),t.beginPath(),t.moveTo(e+n,a),t.arcTo(e+i,a,e+i,a+n,n),t.arcTo(e+i,a+s,e+i-n,a+s,n),t.arcTo(e,a+s,e,a+s-n,n),t.arcTo(e,a,e+n,a,n),r&&t.fill(),o&&t.stroke(),t.restore()},toTop:function(t){var e=this;e.pageScrollTo({scrollTop:0,duration:0})}}};e.default=n},4381:function(t,e,a){"use strict";(function(t){a("f9cd"),a("921b");i(a("66fd"));var e=i(a("6e87"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])},"6e87":function(t,e,a){"use strict";a.r(e);var i=a("b583"),s=a("1d5d");for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);a("f699");var r,o=a("f0c5"),d=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=d.exports},b583:function(t,e,a){"use strict";var i,s=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",function(){return s}),a.d(e,"c",function(){return n}),a.d(e,"a",function(){return i})},f699:function(t,e,a){"use strict";var i=a("07df"),s=a.n(i);s.a}},[["4381","common/runtime","common/vendor"]]]);