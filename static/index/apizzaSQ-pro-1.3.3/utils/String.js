"use strict";String.prototype.isNULL=function(){return null==this||null==this||""==this.toString()},String.prototype.startsWith||(String.prototype.startsWith=function(t,r){return r=r||0,this.substr(r,t.length)===t}),String.prototype.contains=function(t){return this.toString().indexOf(t)>=0},String.prototype.isJSON=function(){try{JSON.parse(this.toString())}catch(t){return!1}return!0},String.prototype.isXML=function(){try{var t=$.parseXML(this.toString());return null!=t&&null!=t&&""!=t.toString()}catch(t){return!1}},String.prototype.textType=function(){return 1==this.isJSON()?"json":1==this.isXML()?"xml":"text"};