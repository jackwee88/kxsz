"use strict";var URL="",bodyDom=$("body");function sending(e){var t=e.find(".ext-send-request");t.children("label").addClass("italic").text("发送..."),t.attr("disabled","true")}function sended(e){var t=e.find(".ext-send-request");t.children("label").removeClass("italic").text("发送"),t.removeAttr("disabled")}bodyDom.delegate(".ext-send-request","click",function(){var e=$(this).attr("api-id"),t=$("#tab-content-"+e),s=new Request(t);Response.changeResponseStatus(t,"loading");var a={};if(a.method=s.getMethod(),a.url=s.getUrl(),a.headers=s.getHeaders(),a.data=s.getData(),a.processData=s.getProcessData(),a.contentType=s.getContentType(),a.bodyType=s.getBodyType(),a.isPost=s.isPostType(),a.apiID=e,URL=a.url,!isNULL(a.url)&&a.url.startsWith("http"))try{chrome.runtime.sendMessage(a),sending(t)}catch(e){alert("插件错误或是上传的文件太大，请刷新页面"),console.log(e),sended(t)}}),chrome.runtime.onMessage.addListener(function(e,t,s){var a=e,r=a.apiID;if(r||"abort"==a.statusText){var n=$("#tab-content-"+r);if(0==a.readyState)"abort"!=a.statusText&&Response.changeResponseStatus(n,"error",URL);else{var o=a.status,i=a.responseText,d=a.headers,u=a.headerStatus,c=a.contentType;Response.responseView(n,o,i,d,u,c,URL,a.runtime)}sended(n)}else{var p={};p.status=a.status,p.data=a.responseText,p.headers=Response.formatHeaders(a.headers),p.headerStatus=a.headerStatus,p.contentType=a.contentType,p.flowApiId=a.flowApiId,p.runtime=a.runtime,p.url=a.url,a.contentType&&a.contentType.contains("image")&&(p.data="<img src='"+a.url+"' />"),window.postMessage({from:"EXT",type:"TESTERFLOW-V2",response:p,flowApiId:a.flowApiId},"*")}}),bodyDom.delegate(".ext-request-stop","click",function(){chrome.runtime.sendMessage("stop");var e=$(this).attr("apiId"),t=$("#tab-content-"+e);sended(t),Response.changeResponseStatus(t,"init")});var manifest=chrome.runtime.getManifest();$("#footer").attr("chrome-app-version",manifest.version),window.addEventListener("message",function(e){if(e.source==window){if("PAGE"==e.data.from&&"TESTERFLOW"==e.data.type)for(var t=e.data.requests,s=0;s<t.length;s++){var a=t[s];if(isNULL(a.url))return;if(!a.url.startsWith("http"))return;try{chrome.runtime.sendMessage(a)}catch(e){alert("插件错误，请刷新页面"),sended(activeTab)}}if("PAGE"==e.data.from&&"TESTERFLOW-V2"==e.data.type){a=e.data.request;if(isNULL(a.url))return;if(!a.url.startsWith("http"))return;try{chrome.runtime.sendMessage(a)}catch(e){alert("插件错误，请刷新页面")}}}});