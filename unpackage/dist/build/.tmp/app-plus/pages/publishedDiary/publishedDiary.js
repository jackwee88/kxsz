(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/publishedDiary/publishedDiary"],{"137b":function(e,t,a){"use strict";(function(e){function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a("ec2b"),n=wx.getRecorderManager(),o=wx.createInnerAudioContext(),r=0,u={data:function(){return{back:"",titletext:"#我多想出去看看#天气很棒！",src:"",publictext:"公开 其他成员可见",myvideosrc:!1,policy:"",signature:"",host:"",dir:"",count:6,num:0,imgArr:[],videoUrl:"",type:1,username:"",mobile:"",picture_ids:"",voice_ids:"",video_ids:"",title:"",content:"",address:"所在位置",lgt:0,lat:0,is_public:1,public:["公开","私密"],index:0,tempFilePath:"",isPlaying:!1,h:"00",m:"00",s:"00",timer:null,is_show:!1,isPlayings:!1,resume:!1,isCan:!1,countDownNum:0,background:"",code:"",avatar:"",dy_id:"",types:1,voice:"",sign:1,imageSrc:"",tempFilePaths:"",accessid:"",is_complete:!1,to_details:!1}},components:{},props:{},onLoad:function(e){var t=this;s.ajaxs("study/show",a,function(e){}),e.type&&t.setData({type:e.type});var a={type:e.type};s.ajaxs("index/getOssPolicy",a,function(e){t.setData({policy:e.data.policy,signature:e.data.signature,host:e.data.host,dir:e.data.dir,accessid:e.data.accessid})})},onShareAppMessage:function(e){this.setData({to_details:!1});return{title:"开心书写",path:"/pages/myPublished/myPublished?dy_id="+this.dy_id+"&is_share=1",success:function(e){}}},onShow:function(){1==this.back&&wx.navigateBack()},methods:{setData:function(e){for(var t in e){var a=e[t];this[t]=a}},upload:function(){var t=this;t.count>t.num?wx.chooseImage({count:t.count-t.num,sizeType:["compressed"],sourceType:["album","camera"],success:function(a){var i=a.tempFilePaths;e("log",a," at pages\\publishedDiary\\publishedDiary.vue:252"),i.forEach(function(a,i,n){wx.showToast({title:"正在上传...",icon:"success",mask:!0,duration:1e4});var o=Date.parse(new Date)/1e3,r=String(o)+String(Math.floor(50*Math.random()));wx.uploadFile({url:t.host,filePath:a,name:"file",formData:{name:a,key:t.dir+"/"+r+".png",policy:t.policy,OSSAccessKeyId:t.accessid,success_action_status:"200",signature:t.signature},success:function(e){s.ajaxs("index/checkMedia",{media_url:t.host+"/"+t.dir+"/"+r+".png",media_type:2},function(e){var a=t.imgArr,i=t.host+"/"+t.dir+"/"+r+".png";a=a.concat(i),t.setData({imgArr:a,num:a.length}),wx.hideToast()})},fail:function(t){e("log",t," at pages\\publishedDiary\\publishedDiary.vue:327")}})}),t.setData({imageSrc:i});var n=a.tempFilePaths;t.setData({tempFilePaths:n})}}):wx.showToast({title:"上传数量已达上限"})},upload_video:function(){var t,a=this;wx.chooseVideo((t={sourceType:["album","camera"],compressed:!0,maxDuration:60,camera:"back"},i(t,"compressed",!0),i(t,"size",100),i(t,"success",function(t){var s=t.tempFilePath,n=s.lastIndexOf("."),o=s,r=o.substring(n,o.length).toUpperCase();if(".M4A"==r)return wx.showToast({title:"视频格式不正确，请重新选择",icon:"none",mask:!0,duration:1e3}),!1;if(e("log",t.tempFilePath," at pages\\publishedDiary\\publishedDiary.vue:380"),t.size/1024/1024>100)wx.showToast({title:"视频超过100MB,请重新选择",icon:"none",mask:!0,duration:1e4});else{var u=Date.parse(new Date)/1e3,c=String(u)+String(Math.floor(50*Math.random()));wx.showToast(i({title:"正在上传...",icon:"success",mask:!0,duration:1e4},"icon","none")),wx.uploadFile({url:a.host,filePath:t.tempFilePath,name:"file",formData:{name:t.tempFilePaths,key:a.dir+"/"+c+".mp4",policy:a.policy,OSSAccessKeyId:a.accessid,success_action_status:"200",signature:a.signature},success:function(e){var t=a.host+"/"+a.dir+"/"+c+".mp4";a.setData({videoUrl:t}),wx.hideToast()},fail:function(t){wx.hideToast(),e("log",t," at pages\\publishedDiary\\publishedDiary.vue:427")}})}}),t))},listenerButtonPreviewImage:function(e){var t=e.target.dataset.index,a=this;wx.previewImage({current:a.tempFilePaths[t],urls:a.tempFilePaths,success:function(e){},fail:function(){}})},drawRoundedRect:function(e,t,a,i,s,n,o,r){e.save(),e.beginPath(),e.moveTo(t+n,a),e.arcTo(t+i,a,t+i,a+n,n),e.arcTo(t+i,a+s,t+i-n,a+s,n),e.arcTo(t,a+s,t,a+s-n,n),e.arcTo(t,a,t+n,a,n),o&&e.fill(),r&&e.stroke(),e.restore()},titleFun:function(e){this.setData({title:e.detail.value})},contentFun:function(e){this.setData({content:e.detail.value})},chooseAddress:function(){var e=this;wx.authorize({scope:"scope.userLocation",success:function(){wx.chooseLocation({success:function(t){e.setData({address:t.address,lat:t.latitude,lgt:t.longitude})}})}})},submit:function(){var t=this;if(e("log",t.sign," at pages\\publishedDiary\\publishedDiary.vue:505"),0==t.sign)wx.showToast({title:"您已发表",icon:"none"});else if(t.content)if(t.content.length<=0)wx.showToast({title:"请输入文字！",icon:"none"});else if(t.is_public){t.setData({sign:0});var a={title:t.title,content:t.content,picture_ids:t.imgArr.join(","),video_ids:t.videoUrl,voice_ids:t.voice_ids,is_public:t.index+1,address:t.lat,lgt:t.lgt,lat:t.lat,type:t.type};e("log",a," at pages\\publishedDiary\\publishedDiary.vue:564"),s.ajaxs("study/diaryUpload",a,function(e){wx.showToast({title:e.msg,icon:"none"}),t.setData({dy_id:e.data.dy_id});var a=getCurrentPages(),i=a[a.length-2];i.onLoad(),setTimeout(function(){wx.navigateTo({url:"/pages/growthDiary/growthDiary?dy_id="+e.data.dy_id})},2e3)})}else wx.showToast({title:"选择是否公开",icon:"none"});else wx.showToast({title:"说说今天的感想和收获吧！",icon:"none"})},deleteImg:function(e){var t=this.imgArr,a=e.currentTarget.dataset.index;t.splice(a,1),this.setData({imgArr:t})},deleteVideo:function(e){this.setData({videoUrl:""})},bindPickerChange:function(t){e("log",t," at pages\\publishedDiary\\publishedDiary.vue:737"),this.setData({index:t.detail.value})},start:function(){var t=this;if(t.setData({isPlaying:!0,is_show:!0}),e("log",t.resume," at pages\\publishedDiary\\publishedDiary.vue:749"),1==t.resume)n.resume(),n.onResume(function(){}),n.onError(function(e){});else{var a={sampleRate:16e3,numberOfChannels:1,encodeBitRate:96e3,format:"mp3",frameSize:50};n.start(a),n.onStart(function(){e("log",22222,"recorder start"," at pages\\publishedDiary\\publishedDiary.vue:772")}),n.onError(function(t){e("log",222222,t," at pages\\publishedDiary\\publishedDiary.vue:776")})}t.timer=setInterval(function(){t.setData({s:++t.s}),t.s>59&&(t.setData({s:0,m:++t.m}),t.m>59&&t.setData({m:0,h:++t.h})),t.s<10?t.setData({s:"0"+parseInt(t.s)}):t.setData({s:t.s}),t.m<10?t.setData({m:"0"+parseInt(t.m)}):t.setData({m:t.m}),t.h<10?t.setData({h:"0"+parseInt(t.h)}):t.setData({h:t.h})},1e3)},pause:function(){var e=this;n.pause(),n.onPause(function(e){}),e.setData({isPlaying:!1,resume:!0}),clearInterval(e.timer)},complete:function(){var t=this;clearInterval(t.timer),n.stop(),n.onStop(function(a){t.voice_ids=a.tempFilePath,e("log","停止录音",a.tempFilePath," at pages\\publishedDiary\\publishedDiary.vue:846");a.tempFilePath}),t.setData({isPlaying:!1});var a=Date.parse(new Date)/1e3,i=String(a)+String(Math.floor(50*Math.random()));setTimeout(function(){wx.uploadFile({url:t.host,filePath:t.voice_ids,name:"file",formData:{name:t.voice_ids,key:t.dir+"/"+i+".mp3",policy:t.policy,OSSAccessKeyId:t.accessid,success_action_status:"200",signature:t.signature},success:function(e){var a=t.host+"/"+t.dir+"/"+i+".mp3";t.setData({voice_ids:a}),wx.hideToast()},fail:function(t){wx.hideToast(),e("log",t," at pages\\publishedDiary\\publishedDiary.vue:878")}}),t.setData({is_show:!1,is_complete:!0,isPlayings:!0})},3e3)},play:function(){var t=this;o.autoplay=!0,o.src=this.tempFilePath,e("log",o.src," at pages\\publishedDiary\\publishedDiary.vue:892"),o.play(),o.onPlay(function(){e("log","开始播放"," at pages\\publishedDiary\\publishedDiary.vue:895")}),wx.startRecord({success:function(e){wx.playVoice({filePath:t.voice_ids,complete:function(){}})}}),t.countDown(),t.setData({isPlayings:!1}),t.countDown()},playPause:function(){o.autoplay=!1,o.src=this.tempFilePath,o.onPause(function(){e("log","暂停播放"," at pages\\publishedDiary\\publishedDiary.vue:916")}),this.setData({isPlayings:!0})},close:function(){var e=this;e.setData({is_show:!1,is_complete:!1})},countDown:function(){var e="";r=this.h+":"+this.m+":"+this.s;var t=r.split(":")[0],a=r.split(":")[1],i=r.split(":")[2];e=parseInt(3600*t)+parseInt(60*a)+parseInt(i);var s=e,n=setInterval(function(){var e=s,t=Math.floor(e/3600/24),a=t.toString();1==a.length&&(a="0"+a);var i=Math.floor((e-3600*t*24)/3600),o=i.toString();1==o.length&&(o="0"+o);var r=Math.floor((e-3600*t*24-3600*i)/60),u=r.toString();1==u.length&&(u="0"+u);var c=e-3600*t*24-3600*i-60*r,l=c.toString();1==l.length&&(l="0"+l),this.setData({h:o,m:u,s:l}),s--,s<0&&(clearInterval(n),this.setData({h:"00",m:"00",s:"00"}))}.bind(this),1e3)},uploadimg:function(){var t=this;wx.canvasToTempFilePath({canvasId:"customCanvas",success:function(a){wx.authorize({scope:"scope.writePhotosAlbum",success:function(){var i=Date.parse(new Date)/1e3,n=String(i)+String(Math.floor(50*Math.random()));wx.uploadFile({url:t.host,filePath:a.tempFilePath,name:"file",formData:{name:a.tempFilePath,key:t.dir+"/"+n+".png",policy:t.policy,OSSAccessKeyId:t.accessid,success_action_status:"200",signature:t.signature},success:function(a){e("log",a," at pages\\publishedDiary\\publishedDiary.vue:1008");var i=t.host+"/"+t.dir+"/"+n+".png";e("log",i," at pages\\publishedDiary\\publishedDiary.vue:1011");var o={dy_id:t.dy_id,img:i};s.ajax("/api/study/diaryImg",o,function(e){}),wx.hideToast()},fail:function(t){e("log",t," at pages\\publishedDiary\\publishedDiary.vue:1020")}})}})}},this)},save:function(){wx.canvasToTempFilePath({canvasId:"customCanvas",success:function(e){wx.authorize({scope:"scope.writePhotosAlbum",success:function(){wx.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){wx.showToast({title:"图片保存成功",mask:!0});var e=Date.parse(new Date)/1e3;String(e),String(Math.floor(50*Math.random()))}})}})}},this)},closeCan:function(e){this.setData({isCan:!1})},shares:function(){wx.navigateTo({url:"/pages/myPublished/myPublished?dy_id="+this.dy_id})},audioUpload:function(){var t,a=this;wx.chooseVideo((t={sourceType:["album","camera"],compressed:!0,maxDuration:60,camera:"back"},i(t,"compressed",!0),i(t,"size",100),i(t,"success",function(t){var s=t.tempFilePath,n=s.lastIndexOf("."),o=s,r=o.substring(n,o.length).toUpperCase();if(".M4A"!==r)return wx.showToast({title:"音频格式不正确，请重新选择",icon:"none",mask:!0,duration:1e3}),!1;if(e("log",t.tempFilePath," at pages\\publishedDiary\\publishedDiary.vue:1101"),t.size/1024/1024>100)wx.showToast({title:"音频超过100MB,请重新选择",icon:"none",mask:!0,duration:1e4});else{var u=Date.parse(new Date)/1e3,c=String(u)+String(Math.floor(50*Math.random()));wx.showToast(i({title:"正在上传...",icon:"success",mask:!0,duration:1e4},"icon","none")),wx.uploadFile({url:a.host,filePath:t.tempFilePath,name:"file",formData:{name:t.tempFilePaths,key:a.dir+"/"+c+".mp3",policy:a.policy,OSSAccessKeyId:a.accessid,success_action_status:"200",signature:a.signature},success:function(e){var t=a.host+"/"+a.dir+"/"+c+".mp3";a.setData({voice_ids:t}),wx.hideToast()},fail:function(t){wx.hideToast(),e("log",t," at pages\\publishedDiary\\publishedDiary.vue:1148")}})}}),t))}}};t.default=u}).call(this,a("0de9")["default"])},"52a5a":function(e,t,a){"use strict";var i,s=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"b",function(){return s}),a.d(t,"c",function(){return n}),a.d(t,"a",function(){return i})},"52db":function(e,t,a){"use strict";a.r(t);var i=a("52a5a"),s=a("b694");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("b587");var o,r=a("f0c5"),u=Object(r["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=u.exports},"722f":function(e,t,a){"use strict";(function(e){a("f9cd"),a("921b");i(a("66fd"));var t=i(a("52db"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},"81d0":function(e,t,a){},b587:function(e,t,a){"use strict";var i=a("81d0"),s=a.n(i);s.a},b694:function(e,t,a){"use strict";a.r(t);var i=a("137b"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a}},[["722f","common/runtime","common/vendor"]]]);