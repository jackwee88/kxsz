<template>
<view>
<!--pages/publishedDiary/publishedDiary.wxml-->
<view class="publishedDiary">
  <view class="title">
    <view>打卡主题</view>
    <input class="titletext" placeholder="输入日记标题" @input="titleFun"></input>
    <!-- <view class='titletext'>{{titletext}}</view> -->
  </view>
  <!-- 发表图文内容 -->
  <view class="article">
    <!-- <view class='article_hint'>
      发表要求：发表文字不能少于15字，必须上传至少1张图片
    </view> -->
    <view class="writearticle">
      <textarea class="textareacont" placeholder="说说今天的感想和收获吧!" @input="contentFun" placeholder-style="color:#999999;font-size:36rpx;" auto-focus maxlength="-1">
      </textarea>
    </view>
  </view>

<!-- <view class="luyin" wx:if="{{is_show}}">
  <text class="close">x | </text>
  <text>{{h}}:{{m}}:{{s}}</text> -->
  <!-- <image src="/img/index/play3.png" catchtap='start' wx:if="{{isPlaying==false}}" class="pause"></image> -->
  <!-- <image src="/img/publishedDiary/stop.png" catchtap="pause" class='pause' wx:if="{{isPlaying==true}}"></image> -->
  <!-- <view bindtap='complete' class="complete">完成</view> 
</view> -->

<!-- <view class="luyin" wx:if="{{is_complete}}">
  <image src="/img/index/play3.png" catchtap='play' wx:if="{{isPlayings==true}}"></image>
  <image src="/img/publishedDiary/stop.png" catchtap="playPause" wx:if="{{isPlayings==false}}"></image>
  <text>录音音频</text>
  <text>{{h}}:{{m}}:{{s}}</text>
  <text wx:if="{{isPlaying==true}}" class="close complete">x</text>
</view> -->

  <!-- 上传图文视频 -->
  <view class="uploadinfo">
    <view class="imgwidth" v-for="(item, index) in imgArr" :key="index">
      <image :src="item" @tap="listenerButtonPreviewImage" :data-index="index" style="width: 100%;height:170rpx;border-radius:18rpx" class="uploadimg"></image>
      <!-- 预留删除图片小图标 -->
      <image src="/static/img/index/del.png" class="dacha" :data-index="index" @tap="deleteImg"></image>
    </view>
    <view class="imgwidth" v-if="videoUrl">
      <video :src="videoUrl" class="video"></video>
      <!-- 预留删除图片小图标 -->
      <image src="/static/img/index/del.png" class="dacha" :data-index="index" @tap="deleteVideo"></image>
    </view>
    <!-- 上传视频 -->
    <view class="uploadinfo_video uploadinfoblock" @tap="upload_video" v-if="videoUrl == ''">
      <block>
        <view class="image-plus image-plus-nb" @tap="chooseVideo">
          <view class="image-plus-horizontal"></view>
          <view class="image-plus-vertical"></view>
        </view>
        <view class="image-plus-video" @tap="uploadvideo"></view>
      </block>
      <!-- <block wx:if="{{videoUrl != ''}}">
        <video src="{{videoUrl}}" class="video"></video>
      </block> -->
    </view>
    <!-- 上传图片 -->
    <view class="uploadinfo_picture uploadinfoblock" v-if="num<count">
      <view class="userinfo" @tap="upload">
        <view class="imgicon">
          <!-- <image class='imgpicture'></image> -->
        </view>
      </view>
    </view>
    <!-- 上传录音 -->
    <!-- <view class='uploadinfo_audio uploadinfoblock'>
      <view class='audio_icon' bindtap='audioUpload'>

      </view>
    </view> -->
  </view>
  <!-- 定位 -->
  <view class="address">
    <!-- <view class='address_left addresscont'  bindtap='chooseAddress'>
        <image class='coordinate_icon' src='/img/publishedDiary/coordinate.png'></image>
        <text class="addrress">{{address}}</text>
    </view> -->
    <view class="address_right addresscont">
     <picker @change="bindPickerChange" :value="index" :range="public">
        <image class="public_icon" src="../../static/publishedDiary/public.png">				
				</image>
            <text class="publictext">{{public[index]}}</text>
          </picker>
    </view>
  </view>
  <view class="uploadbtn">
    <button class="btn" type="submit" @tap="submit">发表</button>
  </view>
</view>
<view class="canvas" v-if="isCan">
  <view class="mask-layer"></view>
  <canvas canvas-id="customCanvas"></canvas>
  <view class="button">
    <button class="share l" :data-dy_id="dy_id" style="padding-left:0;width:290rpx" open-type="share">
            <image src="/static/img/index/wx.png" class="share" style="margin-top:0;"></image>
             <text class="shares">分享</text>
    </button>
    <button class="r" @tap="save">
     <image src="/static/img/index/xc.png" class="share" style="margin-top:-7rpx;width:34rpx;height:34rpx;"></image>保存至相册</button>
    <view class="close-can" @tap.stop="closeCan">x</view>
  </view>
</view>
</view>
</template>

<script>
export default {
  data() {
    return {
      back: '',
      titletext: '#我多想出去看看#天气很棒！',
      src: '',
      publictext: '公开 其他成员可见',
      myvideosrc: false,
      policy: "",
      signature: "",
      host: "",
      dir: '',
      count: 6,
      num: 0,
      imgArr: [],
      videoUrl: '',
      type: 1,
      username: '',
      mobile: '',
      picture_ids: '',
      voice_ids: '',
      video_ids: '',
      title: '',
      content: '',
      address: '所在位置',
      lgt: 0.000000,
      lat: 0.000000,
      is_public: 1,
      public: ["公开", "私密"],
      index: 0,
      tempFilePath: '',
      isPlaying: false,
      h: '00',
      m: '00',
      s: '00',
      timer: null,
      is_show: false,
      isPlayings: false,
      resume: false,
      isCan: false,
      countDownNum: 0,
      background: '',
      code: '',
      avatar: '',
      dy_id: '',
      types: 1,
      voice: '',
      sign: 1,
      imageSrc: "",
      tempFilePaths: "",
      accessid: "",
      is_complete: false,
      to_details: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // if(options.type){
    //   types:options.type
    // }
    var that = this;
    util.ajax('/api/study/show', param, res => {}); // context.setStrokeStyle("#00ff00")
    // context.setLineWidth(5)
    // context.rect(0, 0, 200, 200)
    // context.stroke()
    // context.setStrokeStyle("#ff0000")
    // context.setLineWidth(2)
    // context.moveTo(160, 100)
    // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    // context.moveTo(140, 100)
    // context.arc(100, 100, 40, 0, Math.PI, false)
    // context.moveTo(85, 80)
    // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // context.moveTo(125, 80)
    // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    // context.stroke()

    if (options.type) {
      that.setData({
        type: options.type
      }); // wx.setNavigationBarTitlonloade({
      //   title: that.data.TitleText[options.type]
      // })
    }

    var param = {
      'type': 1
    };
    util.ajax('/api/index/getOssPolicy', param, res => {
      that.setData({
        policy: res.data.policy,
        signature: res.data.signature,
        host: res.data.host,
        dir: res.data.dir,
        accessid: res.data.accessid
      });
    });
  },
  //转发
  onShareAppMessage: function (e) {
    this.setData({
      to_details: false
    });
    var that = this;
    return {
      title: '开心书写',
      path: '/pages/myPublished/myPublished?dy_id=' + this.dy_id + '&is_share=1',
      success: function (res) {}
    };
  },

  onShow() {
    if (this.back == 1) {
      // wx.redirectTo({
      //   url: '/pages/studySquare/studySquare?type='+this.data.types,
      // })
      wx.navigateBack();
    }
  },

  methods: {
    upload: function () {
      let that = this;

      if (that.count > that.num) {
        wx.chooseImage({
          count: that.count - that.num,
          // 默认6
          sizeType: ['compressed'],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],
          // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            var imageSrc = res.tempFilePaths;
            console.log(res);
            imageSrc.forEach(function (value, index, arrSelf) {
              wx.showToast({
                title: '正在上传...',
                icon: 'success',
                mask: true,
                duration: 10000
              });
              const timestamp = Date.parse(new Date()) / 1000;
              const filename = String(timestamp) + String(Math.floor(Math.random() * 50)); // util.ajax('/api/index/checkMedia', { media_url: value, media_type:2}, res => {
              //   wx.uploadFile({
              //     url: that.data.host,
              //     filePath: value,
              //     name: 'file',
              //     formData: {
              //       name: value,
              //       key: that.data.dir + '/' + filename + '.png',
              //       policy: that.data.policy,
              //       OSSAccessKeyId: that.data.accessid,
              //       success_action_status: "200",
              //       signature: that.data.signature
              //     },
              //     success: function (res) {
              //       console.log(res)
              //       var imgArr = that.data.imgArr
              //       var imgUrl = that.data.host + '/' + that.data.dir + '/' + filename + '.png'
              //       imgArr = imgArr.concat(imgUrl)
              //       that.setData({
              //         imgArr: imgArr,
              //         num: imgArr.length
              //       })
              //       console.log("imgArr", imgArr)
              //       wx.hideToast()
              //     },
              //     fail: function (errMsg) {
              //       console.log(errMsg)
              //     }
              //   })
              // })

              wx.uploadFile({
                url: that.host,
                filePath: value,
                name: 'file',
                formData: {
                  name: value,
                  key: that.dir + '/' + filename + '.png',
                  policy: that.policy,
                  OSSAccessKeyId: that.accessid,
                  success_action_status: "200",
                  signature: that.signature
                },
                success: function (res) {
                  util.ajax('/api/index/checkMedia', {
                    media_url: that.host + '/' + that.dir + '/' + filename + '.png',
                    media_type: 2
                  }, res => {
                    var imgArr = that.imgArr;
                    var imgUrl = that.host + '/' + that.dir + '/' + filename + '.png';
                    imgArr = imgArr.concat(imgUrl);
                    that.setData({
                      imgArr: imgArr,
                      num: imgArr.length
                    });
                    wx.hideToast();
                  });
                },
                fail: function (errMsg) {
                  console.log(errMsg);
                }
              });
            });
            that.setData({
              imageSrc
            }); // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

            let tempFilePaths = res.tempFilePaths;
            that.setData({
              tempFilePaths: tempFilePaths
            });
            /**
             * 上传完成后把文件上传到服务器
             */

            var count = 0;
          }
        });
      } else {
        wx.showToast({
          title: '上传数量已达上限'
        });
      }
    },
    upload_video: function () {
      var that = this;
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 60,
        camera: 'back',
        compressed: true,
        size: 100,

        success(res) {
          var imageSrc = res.tempFilePath;
          let extStart = imageSrc.lastIndexOf(".");
          let imageName = imageSrc;
          let ext = imageName.substring(extStart, imageName.length).toUpperCase(); //判断图片格式

          if (ext == '.M4A') {
            wx.showToast({
              title: '视频格式不正确，请重新选择',
              icon: 'none',
              mask: true,
              duration: 1000
            });
            return false;
          }

          console.log(res.tempFilePath); // that.setData({
          //   myvideosrc: res.tempFilePath
          // })

          if (res.size / 1024 / 1024 > 100) {
            wx.showToast({
              title: '视频超过100MB,请重新选择',
              icon: 'none',
              mask: true,
              duration: 10000
            });
            return;
          }

          const timestamp = Date.parse(new Date()) / 1000; //时间戳

          const filename = String(timestamp) + String(Math.floor(Math.random() * 50));
          wx.showToast({
            title: '正在上传...',
            icon: 'success',
            mask: true,
            duration: 10000,
            icon: 'none'
          });
          wx.uploadFile({
            url: that.host,
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
              name: res.tempFilePaths,
              key: that.dir + '/' + filename + '.mp4',
              policy: that.policy,
              OSSAccessKeyId: that.accessid,
              success_action_status: "200",
              signature: that.signature
            },
            success: function (res) {
              var videoUrl = that.host + '/' + that.dir + '/' + filename + '.mp4';
              that.setData({
                videoUrl: videoUrl
              });
              wx.hideToast();
            },
            fail: function (errMsg) {
              wx.hideToast();
              console.log(errMsg);
            }
          });
        }

      });
    },
    listenerButtonPreviewImage: function (e) {
      let index = e.target.dataset.index; //预览图片的编号

      let that = this;
      wx.previewImage({
        current: that.tempFilePaths[index],
        //预览图片链接
        urls: that.tempFilePaths,
        //图片预览list列表
        success: function (res) {},
        fail: function () {}
      });
    },

    drawRoundedRect(ctx, x, y, width, height, r, fill, stroke) {
      ctx.save();
      ctx.beginPath(); // draw top and top right corner 

      ctx.moveTo(x + r, y);
      ctx.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 

      ctx.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 

      ctx.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 

      ctx.arcTo(x, y, x + r, y, r);

      if (fill) {
        ctx.fill();
      }

      if (stroke) {
        ctx.stroke();
      }

      ctx.restore();
    },

    titleFun(e) {
      this.setData({
        title: e.detail.value
      });
    },

    contentFun(e) {
      this.setData({
        content: e.detail.value
      });
    },

    chooseAddress() {
      var that = this;
      wx.authorize({
        scope: "scope.userLocation",

        success() {
          wx.chooseLocation({
            success: res => {
              // 用户选中地址 点击右上角 确定后  返回数据 res
              that.setData({
                address: res.address,
                lat: res.latitude,
                lgt: res.longitude
              });
            }
          });
        }

      });
    },

    submit() {
      var that = this;
      console.log(that.sign);

      if (that.sign == 0) {
        wx.showToast({
          title: '您已发表',
          icon: 'none'
        });
      } else // if (!that.data.title) {
        //   wx.showToast({
        //     title: '您还没输入日记标题哦',
        //     icon: 'none'
        //   })
        // }
        if (!that.content) {
          wx.showToast({
            title: '说说今天的感想和收获吧！',
            icon: 'none'
          });
        } else if (that.content.length <= 0) {
          wx.showToast({
            title: '请输入文字！',
            icon: 'none'
          });
        } //  else if (that.data.imgArr.length == 0){
        //   wx.showToast({
        //     title: '分享一下图片吧',
        //     icon: 'none'
        //   })
        // } 
        else if (!that.is_public) {
            wx.showToast({
              title: '选择是否公开',
              icon: 'none'
            });
          } // else if (!that.data.address || !that.data.lgt || !that.data.lat) {
          //   wx.showToast({
          //     title: '请选择所在位置',
          //     icon: 'none'
          //   })
          // }
          else {
              that.setData({
                sign: 0
              });
              var param = {
                title: that.title,
                content: that.content,
                picture_ids: that.imgArr.join(","),
                video_ids: that.videoUrl,
                voice_ids: that.voice_ids,
                is_public: that.index + 1,
                // province: that.data.province,
                // city: that.data.city,
                // area: that.data.area,
                address: that.lat,
                lgt: that.lgt,
                lat: that.lat,
                type: that.type
              };
              console.log(param);
              util.ajax('/api/study/diaryUpload', param, res => {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                }); // wx.showToast({
                //   title: '正在生成海报，请耐心等待...',
                //   icon: 'none',
                //   duration: 1000
                // })

                that.setData({
                  // isCan:true,
                  dy_id: res.data.dy_id
                });
                var pages = getCurrentPages();
                var beforePage = pages[pages.length - 2];
                beforePage.onLoad(); // that.canvas(res.data)

                setTimeout(function () {
                  wx.navigateTo({
                    url: '/pages/growthDiary/growthDiary?dy_id=' + res.data.dy_id
                  }); // wx.navigateBack({
                  //   delta: 1,
                  // })
                }, 2000); //uploadimg
              });
            }
    },

    //   canvas(data){
    //     var that = this
    //     that.setData({
    //       canvas: data
    //     })
    //     wx.downloadFile({
    //       url: that.data.canvas.avatar,
    //       success: function (res) {
    //         that.setData({
    //           avatar: res.tempFilePath
    //         })
    //         that.beginCanvas()
    //       }, fail: function (fres) {
    //       }
    //     })
    //     // var code = wx.base64ToArrayBuffer(that.data.canvas.code)
    //     // const FILE_BASE_NAME = 'tmp_base64src';
    //     // var fsm = wx.getFileSystemManager();
    //     // const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${that.data.canvas.code}`;
    //     // fsm.writeFile({
    //     //   filePath,
    //     //   data: code,
    //     //   encoding: 'base64',
    //     //   success(res) {
    //     //     console.log('111333333', res)
    //     //     that.setData({
    //     //       code: res
    //     //     })
    //     //     that.beginCanvas()
    //     //   },
    //     //   fail() {},
    //     // });
    //     /// 将base64转为二进制数据
    //     var code = that.data.canvas.code
    //     var fileManager = wx.getFileSystemManager()
    //     var imgPath = wx.env.USER_DATA_PATH + '/鸭蛋评分-' + 'eeeeeeeeee' + '.jpg'
    //     // const buffer = wx.base64ToArrayBuffer(that.data.canvas.code);
    //     var imageData = code.replace(/^data:image\/\w+;base64,/, "")
    //     fileManager.writeFile({
    //       filePath: imgPath,
    //       data: imageData,
    //       encoding: 'base64',
    //       success: res => {
    //         this.setData({
    //           code: imgPath
    //         })
    //       },
    //       fail: err => {
    //         console.log(err)
    //       }
    //     })
    //     wx.downloadFile({
    //       url: that.data.canvas.background,
    //       success: function (res) {
    //         that.setData({
    //           background: res.tempFilePath
    //         })
    //         that.beginCanvas()
    //       }, fail: function (fres) {
    //       }
    //     })
    //   },
    // beginCanvas:function(){
    //   var that = this
    //   if (that.data.background && that.data.code && that.data.avatar) {
    //     // setTimeout(function () {
    //       var ctx = wx.createCanvasContext('customCanvas')
    //       ctx.drawImage(that.data.background, 0, 0, 650, 650)
    //       // ctx.moveTo(600 / 2, 20)//画笔移动到垂直居中位置（高度20不重要，我随便写的）
    //       // ctx.setTextAlign('center')//设置文字要垂直居中
    //       ctx.setFillStyle('white')//字体颜色
    //       ctx.setFontSize(32)
    //       ctx.fillText(that.data.canvas.d, 20, 50)
    //       ctx.setFontSize(16)
    //       ctx.fillText(that.data.canvas.y, 20, 80)
    //       ctx.setFontSize(16)
    //       let arr = []
    //       for (var a = 0; a < that.data.canvas.word.length; a++) {
    //         let i = Math.ceil((a + 1) / 15)
    //         if (arr[i - 1]) {
    //           arr[i - 1] += that.data.canvas.word[a];
    //         } else {
    //           arr[i - 1] = that.data.canvas.word[a];
    //         }
    //       }
    //       for (var b = 0; b < arr.length; b++) {
    //         ctx.fillText(arr[b], 20, 120 + b * 20)
    //       }
    //       // ctx.fillStyle = "#FFF";
    //       // ctx.fillRect(0, 0, 200, 200);  // 画了一个矩形框
    //       that.drawRoundedRect(ctx, 20, 250, 280, 110, 8, true, false)
    //       ctx.fillText(that.data.canvas.title, 20, 170)
    //       ctx.drawImage(that.data.avatar, 40, 260, 50, 50)
    //       ctx.setFillStyle('black')
    //       ctx.setFontSize(16)
    //       ctx.fillText(that.data.canvas.nickname, 100, 275)
    //       ctx.setFillStyle('gray')
    //       ctx.setFontSize(12)
    //     ctx.fillText(that.data.canvas.where, 100, 300)
    //       ctx.moveTo(40, 315)
    //       // ctx.rect(10, 10, 100, 50)
    //       ctx.lineTo(280, 315)
    //       ctx.ineWidth = 1
    //       ctx.strokeStyle = "#f5f5f5"
    //       ctx.stroke()
    //       ctx.setFontSize(16)
    //       ctx.fillText("坚持打卡天数", 50, 340)
    //       ctx.setFillStyle('black')
    //       ctx.setFontSize(12)
    //       var day = that.data.canvas.date + '天'
    //       ctx.fillText(day, 250, 340)
    //       ctx.setFillStyle('white')
    //       that.drawRoundedRect(ctx, 20, 400, 280, 55, 8, true, false)
    //       ctx.drawImage("/img/index/logo.png", 35, 408, 100, 40)
    //       ctx.drawImage(that.data.code, 240, 408, 40, 40)
    //       ctx.draw()
    //       that.uploadimg()
    //       that.setData({
    //         isCan: true
    //       })
    //     // }, 3000);
    //   }
    // },
    // 删除图片
    deleteImg: function (e) {
      let upload_picture_list = this.imgArr;
      let index = e.currentTarget.dataset.index;
      upload_picture_list.splice(index, 1);
      this.setData({
        imgArr: upload_picture_list
      });
    },
    // 删除视频
    deleteVideo: function (e) {
      // let upload_picture_list = this.data.videoUrl;
      // let index = e.currentTarget.dataset.index;
      // upload_picture_list.splice(index, 1);
      this.setData({
        videoUrl: ''
      });
    },

    bindPickerChange(e) {
      console.log(e);
      this.setData({
        index: e.detail.value
      });
    },

    start: function () {
      let that = this;
      that.setData({
        isPlaying: true,
        is_show: true
      });
      console.log(that.resume);

      if (that.resume == true) {
        recorderManager.resume();
        recorderManager.onResume(() => {}); //错误回调

        recorderManager.onError(res => {});
      } else {
        const options = {
          // duration: 10000,//指定录音的时长，单位 ms
          sampleRate: 16000,
          //采样率
          numberOfChannels: 1,
          //录音通道数
          encodeBitRate: 96000,
          //编码码率
          format: 'mp3',
          //音频格式，有效值 aac/mp3
          frameSize: 50 //指定帧大小，单位 KB

        }; //开始录音

        recorderManager.start(options);
        recorderManager.onStart(() => {
          console.log(22222, 'recorder start');
        }); //错误回调

        recorderManager.onError(res => {
          console.log(222222, res);
        });
      }

      that.timer = setInterval(function () {
        that.setData({
          s: ++that.s
        });

        if (that.s > 59) {
          that.setData({
            s: 0,
            m: ++that.m
          });

          if (that.m > 59) {
            that.setData({
              m: 0,
              h: ++that.h
            });
          }
        }

        if (that.s < 10) {
          that.setData({
            s: '0' + parseInt(that.s)
          });
        } else {
          that.setData({
            s: that.s
          });
        }

        if (that.m < 10) {
          that.setData({
            m: '0' + parseInt(that.m)
          });
        } else {
          that.setData({
            m: that.m
          });
        }

        if (that.h < 10) {
          that.setData({
            h: '0' + parseInt(that.h)
          });
        } else {
          that.setData({
            h: that.h
          });
        }
      }, 1000);
    },
    pause: function () {
      let that = this;
      recorderManager.pause();
      recorderManager.onPause(res => {});
      that.setData({
        isPlaying: false,
        resume: true
      });
      clearInterval(that.timer);
    },
    complete: function () {
      var that = this;
      clearInterval(that.timer);
      recorderManager.stop();
      recorderManager.onStop(res => {
        that.voice_ids = res.tempFilePath;
        console.log('停止录音', res.tempFilePath);
        const {
          tempFilePath
        } = res;
      });
      that.setData({
        isPlaying: false
      });
      const timestamp = Date.parse(new Date()) / 1000; //时间戳

      const filename = String(timestamp) + String(Math.floor(Math.random() * 50));
      setTimeout(function () {
        wx.uploadFile({
          url: that.host,
          filePath: that.voice_ids,
          name: 'file',
          formData: {
            name: that.voice_ids,
            key: that.dir + '/' + filename + '.mp3',
            policy: that.policy,
            OSSAccessKeyId: that.accessid,
            success_action_status: "200",
            signature: that.signature
          },
          success: function (res) {
            var videoUrl = that.host + '/' + that.dir + '/' + filename + '.mp3';
            that.setData({
              voice_ids: videoUrl
            });
            wx.hideToast();
          },
          fail: function (errMsg) {
            wx.hideToast();
            console.log(errMsg);
          }
        });
        that.setData({
          is_show: false,
          is_complete: true,
          isPlayings: true
        });
      }, 3000);
    },
    play: function () {
      var that = this;
      innerAudioContext.autoplay = true;
      innerAudioContext.src = this.tempFilePath, console.log(innerAudioContext.src);
      innerAudioContext.play();
      innerAudioContext.onPlay(() => {
        console.log('开始播放');
      });
      wx.startRecord({
        success(res) {
          wx.playVoice({
            filePath: that.voice_ids,

            complete() {}

          });
        }

      });
      that.countDown();
      that.setData({
        isPlayings: false
      });
      that.countDown();
    },
    playPause: function () {
      innerAudioContext.autoplay = false;
      innerAudioContext.src = this.tempFilePath, innerAudioContext.onPause(() => {
        console.log('暂停播放');
      });
      this.setData({
        isPlayings: true
      });
    },
    close: function () {
      let that = this;
      that.setData({
        is_show: false,
        is_complete: false
      });
    },
    countDown: function () {
      var s = '';
      time = this.h + ':' + this.m + ':' + this.s;
      var hour = time.split(':')[0];
      var min = time.split(':')[1];
      var sec = time.split(':')[2];
      s = parseInt(hour * 3600) + parseInt(min * 60) + parseInt(sec);
      var totalSecond = s;
      var interval = setInterval(function () {
        // 秒数
        var second = totalSecond;
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr; // 小时位

        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr; // 分钟位

        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr; // 秒位

        var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;
        this.setData({
          h: hrStr,
          m: minStr,
          s: secStr
        });
        totalSecond--;

        if (totalSecond < 0) {
          clearInterval(interval); // wx.showToast({
          //   title: '活动已结束',
          // });

          this.setData({
            h: '00',
            m: '00',
            s: '00'
          });
        }
      }.bind(this), 1000);
    },
    uploadimg: function () {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'customCanvas',

        success(res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',

            success() {
              // wx.saveImageToPhotosAlbum({
              //   filePath: res.tempFilePath,
              //   success() {
              const timestamp = Date.parse(new Date()) / 1000;
              const filename = String(timestamp) + String(Math.floor(Math.random() * 50));
              wx.uploadFile({
                url: that.host,
                filePath: res.tempFilePath,
                name: 'file',
                formData: {
                  name: res.tempFilePath,
                  key: that.dir + '/' + filename + '.png',
                  policy: that.policy,
                  OSSAccessKeyId: that.accessid,
                  success_action_status: "200",
                  signature: that.signature
                },
                success: function (res) {
                  console.log(res);
                  var imgUrl = that.host + '/' + that.dir + '/' + filename + '.png';
                  console.log(imgUrl);
                  let param1 = {
                    dy_id: that.dy_id,
                    img: imgUrl
                  };
                  util.ajax('/api/study/diaryImg', param1, res => {});
                  wx.hideToast();
                },
                fail: function (errMsg) {
                  console.log(errMsg);
                }
              }); //   }
              // })
            }

          });
        }

      }, this);
    },
    save: function () {
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'customCanvas',

        success(res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',

            success() {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,

                success() {
                  wx.showToast({
                    title: '图片保存成功',
                    mask: true
                  });
                  const timestamp = Date.parse(new Date()) / 1000;
                  const filename = String(timestamp) + String(Math.floor(Math.random() * 50));
                }

              });
            }

          });
        }

      }, this);
    },
    closeCan: function (e) {
      this.setData({
        isCan: false
      });
    },
    shares: function () {
      wx.navigateTo({
        url: '/pages/myPublished/myPublished?dy_id=' + this.dy_id
      });
    },
    audioUpload: function () {
      var that = this;
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        compressed: true,
        maxDuration: 60,
        camera: 'back',
        compressed: true,
        size: 100,

        success(res) {
          var imageSrc = res.tempFilePath;
          let extStart = imageSrc.lastIndexOf(".");
          let imageName = imageSrc;
          let ext = imageName.substring(extStart, imageName.length).toUpperCase(); //判断图片格式

          if (ext !== '.M4A') {
            wx.showToast({
              title: '音频格式不正确，请重新选择',
              icon: 'none',
              mask: true,
              duration: 1000
            });
            return false;
          }

          console.log(res.tempFilePath); // that.setData({
          //   myvideosrc: res.tempFilePath
          // })

          if (res.size / 1024 / 1024 > 100) {
            wx.showToast({
              title: '音频超过100MB,请重新选择',
              icon: 'none',
              mask: true,
              duration: 10000
            });
            return;
          }

          const timestamp = Date.parse(new Date()) / 1000; //时间戳

          const filename = String(timestamp) + String(Math.floor(Math.random() * 50));
          wx.showToast({
            title: '正在上传...',
            icon: 'success',
            mask: true,
            duration: 10000,
            icon: 'none'
          });
          wx.uploadFile({
            url: that.host,
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
              name: res.tempFilePaths,
              key: that.dir + '/' + filename + '.mp3',
              policy: that.policy,
              OSSAccessKeyId: that.accessid,
              success_action_status: "200",
              signature: that.signature
            },
            success: function (res) {
              var videoUrl = that.host + '/' + that.dir + '/' + filename + '.mp3';
              that.setData({
                voice_ids: videoUrl
              });
              wx.hideToast();
            },
            fail: function (errMsg) {
              wx.hideToast();
              console.log(errMsg);
            }
          });
        }

      });
    }
  }
};
</script>

<style>
	@import "./publishedDiary.css";
</style>
