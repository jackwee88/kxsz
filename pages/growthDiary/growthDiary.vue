<template>
  <view>
    <view class="growthDiary">
      <view class="growthDiary-top">
        <view class="topLeft topcont">
          <image class="usertoux" :src="user.avatar" />
        </view>
        <view class="topRight topcont">
          <view class="pDiary">
            <text class="name">{{user.nickname}}</text>
            <text class="fengexian"></text>
            <text class="pdiarytext">个人日记</text>
          </view>
        </view>
        <view class="modulejs">
          <view class="modulejs_title">
            <image class="moduleicon" src="/static/img/growthDiary/module.png" />
            <text>模块介绍</text>
          </view>
          <text class="jieshaocont">{{modulecont}}</text>
        </view>
        <view class="Signature">
          <view class="Signature_title">
            <image class="moduleicon" src="/static/img/growthDiary/qianming.png" />个性签名
          </view>
          <text class="geqiancont">{{geqiancont}}</text>
        </view>
      </view>

      <view class="recommend">
        <view class="recommendText">精品推荐</view>
      </view>

      <view class="studylist">
        <view class="studyitem" v-for="(item, index) in daka" :key="index">
          <view class="studyitem-right studylistflex">
            <!-- <navigator url='/pages/myPublished/myPublished'> -->
            <view
              class="studyitem-top info clear"
              @tap.stop="details"
              :data-dy_id="item.dy_id"
              :data-browse_times="item.browse_times"
              :data-p_id="item.dy_id"
              :data-index="index"
              :data-comment_count="item.comment_count"
              :data-thumbs_times="item.thumbs_times"
            >
              <image :src="item.avatar" class="touxiangicon" />
              <view class="info-text">
                <text class="infoname">{{item.nickname}}</text>
                <view class="time">
                  <text class="infodate">{{item.createtime}}</text>
                  <!-- <text class='infotime'>{{item.time}}</text> -->
                  <text class="browse">浏览{{item.browse_times}}次</text>
                </view>
              </view>
            </view>
            <!-- </navigator> -->
            <view class="studyitem-middle">
              <text
                class="impression"
                @tap.stop="details"
                :data-dy_id="item.dy_id"
                :data-browse_times="item.browse_times"
                :data-p_id="item.dy_id"
                :data-index="index"
                :data-comment_count="item.comment_count"
              >{{item.content}}</text>

              <view class="img-box">
                <view style="position:relative;display:inline">
                  <image
                    v-if="item.video_ids"
                    style="width:30%;height:200rpx;margin-bottom:35rpx;margin-right:10rpx"
                    :hidden="item.fullScreen"
                    class="case-picture"
                    :src="item.video_ids + '?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast'"
                    mode="scaleToFill"
                  />
                  <image
                    v-if="item.video_ids"
                    :data-fullScreen="item.fullScreen"
                    class="bt"
                    mode="scaleToFill"
                    :data-src="item.video_ids"
                    :data-index="index"
                    @tap="playVideo"
                    src="/static/img/index/play3.png"
                    style="width:60rpx;height:60rpx;position:absolute;top:-130rpx;left:78rpx;"
                  />
                </view>
                <image
                  v-for="(items, index2) in item.picture_idss"
                  :key="index2"
                  :src="items"
                  @tap="previewImg"
                  :data-effect_pic="item.picture_idss"
                  :data-src="items"
                  mode="scaleToFill"
                  class="acticleimg"
                />
              </view>
              <audio
                v-if="item.voice_ids"
                :src="item.voice_ids"
                controls
                loop
                class="audio"
                :poster="item.poster"
                :name="item.name"
                :author="item.author"
                @tap.stop="playorpause"
                :action="item.action"
                :data-index="index"
              ></audio>
              <view>
                <!--前提一个播放的按钮-->
              </view>

              <!-- <view class="hr"></view> -->
              <view class="thirdlineblock">
                <view class="thirdline" :data-dy_id="item.dy_id" :data-index="index" @tap="praise">
                  <image
                    class="collecticon"
                    v-if="item.is_give==true"
                    src="../../static/index/collect.png"
                    style="margin-top:6rpx;"
                  />
                  <image
                    class="collecticon"
                    v-if="item.is_give==false"
                    src="../../static/index/uncollect.png"
                    style="margin-top:6rpx;"
                  />
                  <text>{{item.thumbs_times}}</text>
                </view>
                <view
                  class="thirdline share"
                  :data-dy_id="item.dy_id"
                  open-type="share"
                  :data-nickname="item.nickname"
                  :data-image="item.picture_idss[0]"
                  :data-video="item.video_ids"
                >
                  <image
                    class="shareicon img-share"
                    src="../../static/index/zf.png" 
										mode=""
                  />
                  <text>转发</text>
                </view>
                <view
                  class="thirdline share"
                  @tap.stop="details"
                  :data-dy_id="item.dy_id"
                  :data-browse_times="item.browse_times"
                  :data-p_id="item.dy_id"
                  :data-index="index"
                  :data-comment_count="item.comment_count"
                  :data-thumbs_times="item.thumbs_times"
                >
                  <image class="shareicon" src="../../static/index/pl.png" />
                  <text>{{item.comment_count}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="dakaciclecont" v-if="is_share==1">
      <!-- <navigator class='dakatext' url='/pages/publishedDiary/publishedDiary?type={{type}}'>首页</navigator> -->
      <view class="dakatext" @tap="goindex">首页</view>
    </view>
    <view class="canvas" v-if="isCan">
      <view class="mask-layer"></view>
      <canvas canvas-id="customCanvas"></canvas>
      <view class="button" style="position:fixed;bottom:10%;left:0;right:0;align-items:center;">
        <button
          class="share l"
          :data-dy_id="dy_id"
          style="padding-left:0;width:200rpx"
          open-type="share"
          data-hb="1"
        >
          <image
            src="/static/img/index/wx.png"
            class="share"
            style="font-size;28rpx;margin-top:0;width:40rpx;height:40rpx;vertical-align:middle"
          />
          <text class="shares">分享</text>
        </button>
        <image
          class="close-can"
          @tap.stop="closeCan"
          style="height:50rpx;width:50rpx"
          src="/static/img/my/close.png"
        />
        <button class="r" @tap="save">
          <image
            src="/static/img/index/xc.png"
            class="share"
            style="font-size;28rpx;vertical-align:middle;width:26rpx;height:26rpx;"
          />保存至相册
        </button>
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
var util = require("../../utils/util.js");
import {ajax} from '../../utils/public.js'
export default {
  data() {
    return {
      canvas: {},
      p_id: "",
      user: {},
      name: "梁雨淇",
      uid: "",
      jionNum: "320",
      pieceNum: "225",
      modulecont:
        "超棒的一门课，已经完成前两门课，很系统，思路清晰。配套的练习很有意思.超棒的一门课",
      geqiancont: "#开心日记#开心日记！",
      daka: [],
      is_share: "",
      index_: "",
      is_ok: "",
      type: "",
      background: "",
      code: "",
      avatar: "",
      isCan: false,
      nickname: "",
      d: "",
      y: "",
      title: "",
      date: "",
      where: "",
      word: "",
      back: 0,
      is_give: "",
      thumbs_times: "",
      up: "",
      is_give_: "",
      to_details: false,
      preview: false,
      item: "",
      indeNum: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.is_share) {
      this.setData({
        is_share: 1
      });
    }

    if (options.uid) {
      this.setData({
        uid: options.uid,
        daka: [],
        p_id: options.pid,
        index_: options.index,
        type: options.type
      });
			console.log('nihao'+this.uid)
    }

    this.getData();
    this.getSign();
    this.getModule();
    var that = this;

    if (options.dy_id) {
      util.ajaxs(
        "study/bill",
        {
          dy_id: options.dy_id
        },
        res => {
          that.setData({
            nickname: res.data.nickname,
            d: res.data.d,
            y: res.data.y,
            title: res.data.title,
            date: res.data.date,
            where: res.data.where,
            word: res.data.word
          }); // that.canvas(res.data)

          wx.downloadFile({
            url: res.data.avatar,
            success: function(res) {
              that.setData({
                avatar: res.tempFilePath
              });
              that.beginCanvas();
            },
            fail: function(fres) {}
          }); /// 将base64转为二进制数据

          var code = res.data.code;
          var fileManager = wx.getFileSystemManager();
          var imgPath = wx.env.USER_DATA_PATH + "/" + "eeeeeeeeee" + ".jpg"; // const buffer = wx.base64ToArrayBuffer(that.data.canvas.code);

          var imageData = code.replace(/^data:image\/\w+;base64,/, "");
          fileManager.writeFile({
            filePath: imgPath,
            data: imageData,
            encoding: "base64",
            success: res => {
              this.setData({
                code: imgPath
              });
            },
            fail: err => {}
          });
          wx.downloadFile({
            url: res.data.background,
            success: function(res) {
              that.setData({
                background: res.tempFilePath
              });
              that.beginCanvas();
            },
            fail: function(fres) {}
          });
        }
      );
      var pages = getCurrentPages(); // 获取页面栈

      var prevPage = pages[pages.length - 2]; // 上一个页面

      prevPage.setData({
        // 给上一个页面变量赋值
        back: 1
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(e) {
    var that = this;

    if (e.from === "button") {
      if ((e.target.dataset.hb = 1)) {
        this.setData({
          to_details: false
        });
        return {
          title: "开心书写",
          path:
            "/pages/myPublished/myPublished?dy_id=" +
            this.dy_id +
            "&is_share=1",
          success: function(res) {}
        };
      } else {
        var nickname = e.target.dataset.nickname;
        var title = nickname + "的打卡日记";
        var image = e.target.dataset.image;
        var video = e.target.dataset.video;

        if (image) {
          var img = image;
        } else if (video) {
          var img =
            video +
            "?spm=a2c4g.11186623.2.1.yjOb8V&x-oss-process=video/snapshot,t_0000,f_jpg,w_800,h_600,m_fast";
        }

        return {
          title: title,
          path:
            "/pages/growthDiary/growthDiary?uid=" + that.uid + "&is_share=1",
          imageUrl: img,
          success: function(res) {}
        };
      }
    } // else{
    //   var tourl = '/pages/growthDiary/growthDiary?uid=' + that.data.uid
    //
    //   return {
    //     title: '开心书写',
    //     path: 'pages/index/index?myshare=1&tourl='+tourl  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    //   }
    // }
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    getSign() {
      let that = this;
      util.ajaxs(
        "index/getSystem",
        {
          type: 6
        },
        res => {
          that.setData({
            geqiancont: res.data
          });
        }
      );
    },

    getModule() {
      let that = this;
      util.ajaxs(
        "index/getSystem",
        {
          type: 7
        },
        res => {
          that.setData({
            modulecont: res.data
          });
        }
      );
    },

    getData() {
      let that = this;
      that.setData({
        daka: []
      });
      let parma = {
        uid: that.uid
      };
      ajax({url:"/index/UserCenter",data: parma, success:(res) => {
        let list = res.data.data.list;
        var action = {
          method: "pause"
        };

        for (var i = 0; i < list.length; i++) {
          list[i].action = action;
          list[i].poster = list[i].picture_idss[0];
          list[i].name = list[i].nickname + "的音频";
        }

        that.setData({
          user: res.data.data.user,
          daka: list
        });
				console.log()
      }});
    },

    praise(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      const dy_id = e.currentTarget.dataset.dy_id;
      var index_ = that.index_;
			console.log(index+'index')
      util.ajaxs(
        "study/praiseStudy",
        {
          dy_id: dy_id
        },
        res => {
          var daka = that.daka;
          const is_give = "daka[" + index + "].is_give";
          const thumbs_times = "daka[" + index + "].thumbs_times";

          if (res.data.is_ok==true) {
						console.log('点赞成功')
              this.daka[index].is_give= !daka[index].is_give,
              this.daka[index].thumbs_times=daka[index].thumbs_times + 1,
              this.is_ok= "y"
          } else {
						console.log('取消点赞')
              this.daka[index].is_give= !daka[index].is_give,
              this.daka[index].thumbs_times=daka[index].thumbs_times - 1,
              this.is_ok= "n"
          }
        }
      );
      setTimeout(function() {
        var daka = that.daka;

        if (that.is_ok == "y") {
          if (dy_id == that.p_id) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面

            if (that.type == 1) {
              var up = "daily[" + index_ + "].thumbs_times";
              var is_give_ = "daily[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            } else if (that.type == 3 || that.type == 4) {
              var up = "daka[" + index_ + "].thumbs_times";
              var is_give_ = "daka[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            } else if (that.type == 2) {
              var up = "studylist[" + index_ + "].thumbs_times";
              var is_give_ = "studylist[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            }

            prevPage.setData({
              [up]: newp,
              [is_give_]: new_is_give
            });
          }
        } else {
          if (dy_id == that.p_id) {
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; //上一个页面

            if (that.type == 1) {
              var up = "daily[" + index_ + "].thumbs_times";
              var is_give_ = "daily[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            } else if (that.type == 3 || that.type == 4) {
              var up = "daka[" + index_ + "].thumbs_times";
              var is_give_ = "daka[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            } else if (that.type == 2) {
              var up = "studylist[" + index_ + "].thumbs_times";
              var is_give_ = "studylist[" + index_ + "].is_give";
              var newp = daka[index].thumbs_times;
              var new_is_give = daka[index].is_give;
            }

            prevPage.setData({
              [up]: newp,
              [is_give_]: new_is_give
            });
          }
        }
      }, 1000);
    },

    // getuserdata: function () {
    //   var that = this;
    //   util.ajax('/api/UserCenter/UserCenter', {uid:that.data.uid}, res => {
    //     that.setData({
    //       userdata: res.data
    //     })
    //   })
    //   if (that.data.count < that.data.page) {
    //     wx.showToast({
    //       title: '暂无更多信息',
    //     })
    //   } else {
    //     util.ajax('/api/index/myDaily', '', res => {
    //       let list = res.data.list;
    //       for (var i = 0; i < list.length; i++) {
    //         list[i].if_input = false;
    //         list[i].fullScreen = false;
    //         list[i].poster = list[i].picture_idss[0];
    //         list[i].name = list[i].nickname + '的音频';
    //       }
    //
    //       that.setData({
    //         daka: that.data.daka.concat(list),
    //         page: that.data.page + 1,
    //         count: res.data.count,
    //       })
    //       wx.stopPullDownRefresh();
    //     })
    //   }
    // },
   previewImg: function(e) {
     let src = e.currentTarget.dataset.src;
     let pic_arr = e.currentTarget.dataset.effect_pic;
   	var imglist=pic_arr.split(',')
     wx.previewImage({
       current: src,
       urls: imglist
     });
   },
		details(e) {
			let param = {
				dy_id: e.currentTarget.dataset.dy_id,
				index: e.currentTarget.dataset.index,
				browse_times: e.currentTarget.dataset.browse_times,
				comment_count: e.currentTarget.dataset.comment_count,
				thumbs_times: e.currentTarget.dataset.thumbs_times,
				type: 4
			};
			// if (this.index_ == "") {
			//   var index_ = -1;
			// } else {
			//   var index_ = this.index_;
			// }
			uni.navigateTo({
				url: '../myPublished/myPublished?pulishedDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
    // details(e) {
    //   const dy_id = e.currentTarget.dataset.dy_id;
    //   const index = e.currentTarget.dataset.index;
    //   const comment_count = e.currentTarget.dataset.comment_count;
    //   const browse_times = e.currentTarget.dataset.browse_times;
    //   const thumbs_times = e.currentTarget.dataset.thumbs_times;

    //   if (this.index_ == "") {
    //     var index_ = -1;
    //   } else {
    //     var index_ = this.index_;
    //   }

    //   uni.navigateTo({
    //     url:
    //       "../myPublished/myPublished?dy_id=" +
    //       dy_id +
    //       "&type=4" +
    //       "&index=" +
    //       index +
    //       "&comment_count=" +
    //       comment_count +
    //       "&browse_times=" +
    //       browse_times +
    //       "&thumbs_times=" +
    //       thumbs_times +
    //       "&index_=" +
    //       index_
    //   });
    // },

    playVideo(e) {
      this.setData({
        preview: false
      });
      var src = e.currentTarget.dataset.src;
      wx.navigateTo({
        url: "../video/video?src=" + src
      });
    },

    goindex: function() {
      var that = this;
      getApp().globalData.infoModel();
      that.onShow();
    },
    playorpause: function(e) {
      var that = this;
      var index = e.target.dataset.index; //获取点击音乐的下标

      var item = "daka[" + index + "].action"; //获取音乐的播放状态

      var actionPlay = {
        method: "play"
      }; //定义播放

      var actionPause = {
        method: "pause"
      }; //定义暂停

      if (that.daka[index].action.method == "pause") {
        //若当前是暂停，则点击后播放
        that.setData({
          [item]: actionPlay
        });

        for (let i = 0; i < that.daka.length; i++) {
          if (index != i) {
            let indeNum = "daka[" + i + "].action";
            that.setData({
              [indeNum]: actionPause
            });
          }
        }
      } else {
        //若当前是播放，则点击后暂停
        that.setData({
          [item]: actionPause
        });
      }
    },
    beginCanvas: function() {
      var that = this;

      if (that.background && that.avatar && that.code) {
        var ctx = wx.createCanvasContext("customCanvas");
        ctx.drawImage(that.background, 0, 0, 320, 480); // ctx.moveTo(600 / 2, 20)//画笔移动到垂直居中位置（高度20不重要，我随便写的）
        // ctx.setTextAlign('center')//设置文字要垂直居中

        ctx.setFillStyle("white"); //字体颜色

        ctx.setFontSize(32);
        ctx.fillText(that.d, 25, 50);
        ctx.setFontSize(16);
        ctx.fillText(that.y, 25, 80);
        ctx.setFontSize(16);
        let arr = [];

        for (var a = 0; a < that.word.length; a++) {
          let i = Math.ceil((a + 1) / 15);

          if (arr[i - 1]) {
            arr[i - 1] += that.word[a];
          } else {
            arr[i - 1] = that.word[a];
          }
        }

        for (var b = 0; b < arr.length; b++) {
          ctx.fillText(arr[b], 25, 120 + b * 20);
        } // ctx.fillStyle = "#FFF";
        // ctx.fillRect(0, 0, 200, 200);  // 画了一个矩形框

        that.drawRoundedRect(ctx, 25, 250, 280, 110, 8, true, false);
        ctx.fillText(that.title, 25, 175);
        ctx.drawImage(that.avatar, 40, 260, 50, 50);
        ctx.setFillStyle("black");
        ctx.setFontSize(16);
        ctx.fillText(that.nickname, 100, 275);
        ctx.setFillStyle("gray");
        ctx.setFontSize(12);
        ctx.fillText(that.where, 100, 300);
        ctx.moveTo(40, 315); // ctx.rect(10, 10, 100, 50)

        ctx.lineTo(280, 317);
        ctx.ineWidth = 1;
        ctx.strokeStyle = "#f5f5f5";
        ctx.stroke();
        ctx.setFontSize(16);
        ctx.fillText("坚持打卡天数", 50, 340);
        ctx.setFillStyle("black");
        ctx.setFontSize(12);
        var day = that.date + "天";
        ctx.fillText(day, 250, 340);
        ctx.setFillStyle("white");
        that.drawRoundedRect(ctx, 25, 400, 280, 55, 8, true, false);
        ctx.drawImage("/img/index/logo.png", 35, 408, 100, 40);
        ctx.drawImage(that.code, 240, 408, 40, 40);
        ctx.draw(); // that.uploadimg()

        that.setData({
          isCan: true
        });
      }
    },
    save: function() {
      var that = this;
      wx.canvasToTempFilePath(
        {
          canvasId: "customCanvas",

          success(res) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",

              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,

                  success() {
                    wx.showToast({
                      title: "图片保存成功",
                      mask: true
                    });
                    const timestamp = Date.parse(new Date()) / 1000;
                    const filename =
                      String(timestamp) +
                      String(Math.floor(Math.random() * 50));
                  }
                });
              }
            });
          }
        },
        this
      );
    },
    closeCan: function(e) {
      this.setData({
        isCan: false
      });
    },
    shares: function() {
      wx.navigateTo({
        url: "/pages/myPublished/myPublished?dy_id=" + this.dy_id
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

    // uploadimg: function () {
    //   var that = this
    //   wx.canvasToTempFilePath({
    //     canvasId: 'customCanvas',
    //     success(res) {
    //       wx.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success() {
    //           // wx.saveImageToPhotosAlbum({
    //           //   filePath: res.tempFilePath,
    //           //   success() {
    //           const timestamp = Date.parse(new Date()) / 1000;
    //           const filename = String(timestamp) + String(Math.floor(Math.random() * 50))
    //           wx.uploadFile({
    //             url: that.data.host,
    //             filePath: res.tempFilePath,
    //             name: 'file',
    //             formData: {
    //               name: res.tempFilePath,
    //               key: that.data.dir + '/' + filename + '.png',
    //               policy: that.data.policy,
    //               OSSAccessKeyId: that.data.accessid,
    //               success_action_status: "200",
    //               signature: that.data.signature
    //             },
    //             success: function (res) {
    //
    //               var imgUrl = that.data.host + '/' + that.data.dir + '/' + filename + '.png'
    //
    //               let param1 = {
    //                 dy_id: that.data.dy_id,
    //                 img: imgUrl
    //               }
    //               util.ajax('/api/study/diaryImg', param1, res => { })
    //               wx.hideToast()
    //             },
    //             fail: function (errMsg) {
    //
    //             }
    //           })
    //           //   }
    //           // })
    //         }
    //       })
    //     }
    //   }, this)
    // },
    //转发
    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }
  }
};
</script>
<style>
@import "./growthDiary.css";
</style>