"use strict";var thisRequest;function Request(e){thisRequest=this,this.activeTab=e,this.method=e.find(".ext-method input").val().trim().toLowerCase(),this.bodyType=e.find(".ext-body-type").find("input").val().trim(),this.rawContentType=e.find(".ext-raw-content-type").find("input").val().trim(),this.isPost=isPostType(this.method),this.url=this.getUrl()}Request.prototype.isPostType=function(){return this.isPost},Request.prototype.getMethod=function(){return this.method},Request.prototype.getRawContentType=function(){return this.rawContentType},Request.prototype.getBodyType=function(){return this.bodyType},Request.prototype.getUrl=function(){this.url=this.activeTab.find(".ext-url").children("input").val().trim(),this.url=this.renderEnv(this.url),this.renderUrl();var e=this.url.toLowerCase();return e.startsWith("http://")||e.startsWith("https://")||(this.url="http://"+this.url),this.url},Request.prototype.getProcessData=function(){return(!this.isPost||"form-data"!=this.bodyType)&&null},Request.prototype.getContentType=function(){return this.isPost?"raw"==this.bodyType?getContentType(this.rawContentType):"form-data"!=this.bodyType&&("x-www-form-urlencoded"==this.bodyType?null:void 0):null},Request.prototype.getData=function(){return this.isPost?"raw"==this.bodyType?this.getBodyRaw():"form-data"==this.bodyType?this.getBodyParams():"x-www-form-urlencoded"==this.bodyType?this.getBodyParams():void 0:null},Request.prototype.getHeaders=function(){var e=this.activeTab.find(".ext-header-params"),t=e.find(".dragArea"),r=e.attr("pre-header"),a=t.children(),n={};try{r=thisRequest.renderEnv(r);var s=JSON.parse(r);$.each(s,function(e,t){isNULL(t.key)||(n[t.key]=t.value)})}catch(e){n={}}return $.each(a,function(e,t){t=$(t);var r=AForm.getValue(t,"key");r=thisRequest.renderEnv(r);var a=AForm.getValue(t,"checked");if(""==r||isNULL(a))return!0;var s=AForm.getValue(t,"value");s=thisRequest.renderEnv(s),n[r]=s}),$.isEmptyObject(n)?null:n},Request.prototype.getQueryParams=function(){var e=this.activeTab.find(".ext-query-params .dragArea").children(),t=[];return $.each(e,function(e,r){r=$(r);var a=AForm.getValue(r,"checked"),n=AForm.getValue(r,"key");if(""==(n=thisRequest.renderEnv(n))||isNULL(a))return!0;var s=AForm.getValue(r,"value");s=thisRequest.renderEnv(s),t.push({key:n,value:s})}),t},Request.prototype.getBodyParams=function(){var e=this.activeTab.find(".ext-body-params .dragArea").children(),t=[];return $.each(e,function(e,r){r=$(r);var a=thisRequest.renderEnv(AForm.getValue(r,"key")),n=AForm.getValue(r,"checked"),s=AForm.getValue(r,"value");if(""==a||isNULL(n))return!0;if("form-data"==thisRequest.bodyType)if("FILE"==AForm.getValue(r,"rtype").toUpperCase()){var i=AForm.getValue(r,"file");if(isNULL(i.data))return!0;t.push({key:a,value:i.data,rtype:"FILE",filename:i.name})}else s=thisRequest.renderEnv(s),t.push({key:a,value:s,rtype:"TEXT"});else s=thisRequest.renderEnv(s),t.push({key:a,value:s,rtype:"TEXT"})}),t},Request.prototype.getBodyRaw=function(){var e=this.activeTab.find(".ext-body-raw").find("textarea.hide").val();return e=this.renderEnv(e),isNULL(e)?"":e},Request.prototype.renderEnv=function(e){if("string"!=typeof e)return e;var t=$(".ext-choose-env").attr("choose-env-json");if(isNULL(t))return e;for(var r=$.parseJSON(t),a=0;a<r.length;a++){var n=r[a],s="{{"+n.key+"}}",i=n.value;e=e.replace(new RegExp(s,"g"),i)}return e},Request.prototype.renderUrl=function(){for(var e=this.getQueryParams(),t=0;t<e.length;t++){var r=e[t],a=r.key,n=r.value,s=":"+a,i=new RegExp(s,"g");this.url.contains(s)?this.url=this.url.replace(i,n):this.addOrReplaceGetParam(a,n)}},Request.prototype.addOrReplaceGetParam=function(e,t){var r="([&?]|&amp;)"+(e=encodeURIComponent(e))+"\\b(?:=(?:[^&#]*))*",a=document.createElement("a"),n=new RegExp(r),s=e+(t?"="+encodeURIComponent(t):"");a.href=this.url;var i=a.search.replace(n,"$1"+s);return i===a.search?a.search+=(a.search?"&":"")+s:a.search=i,this.url=a.href,decodeURIComponent(a.href)};