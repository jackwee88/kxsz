<template>
  <view>

    <view class="studySquare">
      <!-- <view class="tabbox">
    <view class="tabcon avtive" class='tabcon{{type==1?"active":""}}' data-type='1' bindtap='changeOil' style="background-color:#E78522">
      成长日记
    </view>
    <view class="tabcon" class='tabcon{{type==2?"active":""}}' data-type='2'  bindtap='changeOil' style="background-color:#00C3A0">
      大脑开发
    </view>
    <view class="tabcon" class='tabcon{{type==3?"active":""}}' data-type='3' bindtap='changeOil' style="background-color:#02A0C3">
      阅读朗诵
    </view>
    <view class="tabcon" class='tabcon{{type==4?"active":""}}' data-type='4' bindtap='changeOil' style="background-color:#2B37C1">
      家长分享
    </view>
    <view class="tabcon more" bindtap="showmore" id="more" style="background-color:#FD0201;text-align:center">
      <text>更多</text>
      <image src="/img/studySquare/more.png">
        <navigator url='/pages/shuhuajs/shuhuajs'>
          <view class="drop-down" style="background-color:#E0BB0D">书画鉴赏</view>
        </navigator>
        <navigator url='/pages/Signature/Signature'>
          <view class="drop-down" style="background-color:#E0BB0D">个性签名</view>
        </navigator>
         <navigator url='/pages/wzgs/wzgs'>
          <view class="drop-down" style="background-color:#E0BB0D">文字故事</view>
        </navigator>
         <navigator url='/pages/worksfor/worksfor'>
          <view class="drop-down" style="background-color:#E0BB0D">作品征集</view>
        </navigator>
     
      </view>
    </view>
      </view>-->
      <view class="tabbox">
        <view
          class="tabcon avtive"
          data-type="1"
          @tap="changeOil"
          style="background-color:#E78522"
        >成长日记</view>
        <view
          data-url="./personsign/personsign"
          class="tabcon"
          data-type="2"
          style="background-color:#00C3A0"
          @tap.stop="toWhere"
        >个性签名</view>
        <!-- <view data-url='/pages/worksfor/worksfor' class="tabcon"  data-type='3' style="background-color:#02A0C3" catchtap='toWhere'>
     作品征集
        </view>-->
        <view
          class="tabcon"
          data-type="3"
          @tap="changeOil"
          style="background-color:#2B37C1"
          v-if="type=3"
        >文字故事</view>
        <navigator url="shuhuajs/shuhuajs" class="tabcon">
          <view class="drop-down" style="background-color:#E0BB0D">书画鉴赏</view>
        </navigator>
        <!-- <view class="tabcon more" bindtap="showmore" id="more" style="background-color:#FD0201;text-align:center">
      <text>更多</text>
      <image src="/img/studySquare/more.png">
        <navigator url='/pages/shuhuajs/shuhuajs'>
          <view class="drop-down" style="background-color:#E0BB0D">书画鉴赏</view>
        </navigator>
        <navigator url='/pages/Signature/Signature'>
          <view class="drop-down" style="background-color:#E0BB0D">个性签名</view>
        </navigator>
         <navigator url='/pages/wzgs/wzgs'>
          <view class="drop-down" style="background-color:#E0BB0D">文字故事</view>
        </navigator>
         <navigator url='/pages/worksfor/worksfor'>
          <view class="drop-down" style="background-color:#E0BB0D">作品征集</view>
        </navigator>
     
      </view>
        </view>-->
      </view>
      <view class="studylist">
        <view class="studyitem" v-for="(item, index) in studylist" :key="index">
          <text class="is_top" v-if="item.is_top == 1">已置顶</text>
          <view class="studylistflex">
            <view class="user_info" @tap="gotoGrowthDairy" :data-uid="item.uid" :data-index="index" :data-thumbs_times="item.thumbs_times" :data-pid="item.dy_id">
            	<view class="left_side">
            		<view class="avatar"><image :src="item.avatar" class="avatar" @tap.stop="gotoUserInfo" :data-uid="item.uid"></image></view>
            		<view class="date">
            			<view class="username">{{ item.nickname }}</view>
            			<view>{{ item.createtime }}</view>
            		</view>
            	</view>
            	<text class="view_count">浏览{{ item.browse_times }}次</text>
            </view>
            <view class="studyitem-middle">
              <text
                class="impression"
                :data-dy_id="item.dy_id"
                @tap="gotoPublished"
                :data-browse_times="item.browse_times"
                :data-p_id="item.dy_id"
                :data-index="index"
                :data-comment_count="item.comment_count"
              >{{ item.content }}</text>

              <view>
                <view style="position:relative;display:inline">
                  <image
                    v-if="item.video_ids"
                    style="width:30%;height:200rpx;margin-right:10rpx"
                    :hidden="item.fullScreen"
                    class="acticleimg"
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
                    src="../../static/studySquare/play3.png"
                    style="width:60rpx;height:60rpx;position:absolute;top:-118rpx;left:78rpx;"
                  />
                </view>
                <image
                  v-for="(items, index2) in item.picture_arr"
                  :key="index2"
                  class="acticleimg"
                  :src="items"
                  :data-src="items"
                  :data-pic_arr="item.picture_ids"
                  @tap="previewImg"
                  mode="aspectFill"
                />
                <audio
                  v-if="item.voice_ids"
                  :src="item.voice_ids"
                  controls
                  loop
                  class="audio"
                  :poster="item.poster"
                  :name="item.name"
                  :author="item.author"
                  :data-index="index"
                  @tap.stop="playorpause"
                  :action="item.action"
                ></audio>
                <view></view>
              </view>

              <view class="hr"></view>
              <view class="thirdlineblock clear">
                <view class="thirdline" :data-dy_id="item.dy_id" :data-index="index" @tap="praise">
                  <image
                    class="collecticon"
                    v-if="item.is_give == true"
                    src="../../static/index/collect.png"
                    style="margin-top:6rpx;"
                  />
                  <image
                    class="collecticon"
                    v-if="item.is_give == false"
                    src="../../static/index/uncollect.png"
                  />
                  <text>{{ item.thumbs_times }}</text>
                </view>
                <button
                  class="thirdline share"
                  :data-dy_id="item.dy_id"
                  open-type="share"
                  :data-nickname="item.nickname"
                  :data-image="item.picture_arr[0]"
                  :data-video="item.video_ids"
                >
                  <image class="shareicon" src="../../static/index/fx.png" />
                  <text>分享</text>
                </button>
                <view
                  class="thirdline share"
                  @tap.stop="gotoPublished"
                  :data-dy_id="item.dy_id"
                  :data-browse_times="item.browse_times"
                  :data-p_id="item.dy_id"
                  :data-index="index"
                  :data-comment_count="item.comment_count"
                  open-type="share"
                >
                  <image class="shareicon" src="../../static/index/message.png" />
                  <text>{{ item.comment_count }}</text>
                </view>
              </view>
            </view>
            <view class="studyitem-bottom" v-if="item.if_input">
              <!-- <text class='dianzanname'>{{item.dianzanname}},{{item.dianzanname}},{{item.dianzanname}}</text> -->
              <view
                v-for="(item, index2) in release"
                :key="index2"
                class="shoppcall comment"
                :data-id="item.id"
              >
                <view class="publish">
                  <view class="publish_list comment">
                    <text class="publish_list_item red">{{ item.name }}:</text>
                    <text class="redtree_text">{{ item.textareaValue }}</text>
                  </view>
                </view>
              </view>
              <input placeholder="请输入评论内容" :focus="if_false" v-if="item.if_input" class="input" />
            </view>
          </view>
        </view>
      </view>
      <view class="fixedbottom">
        <navigator class="dakaleft dakablock" url="./phpublish/phpublish">
          <image class="phbimg" src="../../static/studySquare/paihangbang.png" />
          <text>排行榜</text>
        </navigator>

        <navigator class="dakaright dakablock" url="../onlinestore/onlinestore">
          <image class="sfcgmimg" src="../../static/studySquare/weizaixianshangcheng.png" />
          <text>在线商城</text>
        </navigator>

        <view class="dakaciclecont">
          <navigator
            class="dakatext"
            :url="'/pages/publishedDiary/publishedDiary?type=' + type"
            v-if="type != 4"
          >打卡</navigator>
          <navigator class="dakatext" url="/pages/parentShare/parentShare" v-if="type == 4">打卡</navigator>
        </view>
      </view>
    </view>

    <image class="wait" :src="smodel" v-if="is_wait == 1" />

    <template is="toTop"></template>
  </view>
</template>

<script>
import { ajax } from "../../utils/public.js";
import util from "../../utils/util";
export default {
  data() {
    return {
      back: "",
      host: getApp().globalData.requestUrl,
      quanziText: "多读书 读好书",
      dakaNum: "180",
      studylist: [],
      show: false,
      page: 1,
      page_size: 10,
      count: 1,
      type: 1,
      is_wait: "",
      comment_num: 0,
      release: [
        {
          name: "1",
          textareaValue: "sfdf"
        }
      ],
      smodel: "",
      wait: "",
      is_give: "",
      thumbs_times: "",
      releaseFocus: false,
      releaseValue: "",
      item: "",
      indeNum: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // var that = this;
    // that.setData({
    // 	page: 1,
    // 	page_size: this.page_size,
    // 	studylist: []
    // });
    this.getData();
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    // prevPage.setData({
    // 	is_wait: '',
    // 	wait: ''
    // });
  },
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      page: 1,
      studylist: [],
      count: 1
    });
    that.getData();
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
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;

    that.getData();
    let param = {
      page: that.page,
      page_size: that.page_size,
      type: that.type
    };
    util.ajaxs("study/studyList", param, res => {
      if (page < res.data.count) {
        that.setData({
          studyList: that.studylist.concat(res.data.list),
          page: ++page
        });
      } else {
        uni.showToast({
          title: "到底了...",
          icon: "none"
        });
      }
    });
  },
  //转发
  onShareAppMessage: function(e) {
    if (e.from === "button") {
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

      var that = this;
      return {
        title: title,
        path:
          "/pages/myPublished/myPublished?dy_id=" +
          e.target.dataset.dy_id +
          "&is_share=1",
        imageUrl: img,
        success: function(res) {}
      };
    } else {
      return {
        title: "开心书写",
        path: "pages/index/index?myshare=1&tourl=/pages/studySquare/studySquare" // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
      };
    }
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    praise(e) {
      var that = this;
      const index = e.currentTarget.dataset.index;
      const dy_id = e.currentTarget.dataset.dy_id;
      console.log("123" + dy_id);
      ajax({
        url: "study/praiseStudy",
        data: {
          dy_id: dy_id
        },
        success: res => {
          const daily = that.studylist;
          const is_give = "daily[" + index + "].is_give";
          const thumbs_times = "daily[" + index + "].thumbs_times";

          if (res.data.data.is_ok == true) {
            (this.studylist[index].is_give = !daily[index].is_give),
              (this.studylist[index].thumbs_times =
                daily[index].thumbs_times + 1);
            uni.showToast({
              title: "点赞成功",
              icon: "none"
            });
          } else {
            (this.studylist[index].is_give = !daily[index].is_give),
              (this.studylist[index].thumbs_times =
                daily[index].thumbs_times - 1);
          }
        }
      });
    },

    gotoPublished(e) {
      console.log("this.type" + this.type);
      let param = {
        dy_id: e.currentTarget.dataset.dy_id,
        index: e.currentTarget.dataset.index,
        browse_times: e.currentTarget.dataset.browse_times,
        comment_count: e.currentTarget.dataset.comment_count,
        thumbs_times: e.currentTarget.dataset.thumbs_times,
        type: 2
      };
      uni.navigateTo({
        url:
          "../myPublished/myPublished?pulishedDetail=" +
          encodeURIComponent(JSON.stringify(param))
      });
    },
gotoUserInfo: function(e) {
			console.log(e.currentTarget.dataset.uid + '123');
			let param = {
				uid: e.currentTarget.dataset.uid
			};
			uni.navigateTo({
				url: '../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
    getData() {
      const studylist = this.studylist;
      if (this.count < this.page) {
        uni.showToast({
          title: "暂无更多信息"
        });
      } else {
        ajax({
          url: "study/studyList",
          data: {
            page: this.page,
            page_size: this.page_size,
            type: this.type
          },
          success: res => {
            console.log(res.data.data);
            const { list, count } = res.data.data;
            this.studylist = list;
            var action = {
              method: "pause"
            };
            for (var i = 0; i < list.length; i++) {
              list[i].if_input = false;
              list[i].fullScreen = false;

              if (list[i].picture_arr.length > 0) {
                list[i].poster = list[i].picture_arr[0];
              }

              list[i].action = action;
              list[i].name = list[i].nickname + "的音频";
            }

            (this.page = this.page + 1),
              (this.count = count > 1 ? res.data.count : 1);
            // this.studylist= list
            // wx.stopPullDownRefresh();
          }
        });
      }
    },

    showmore: function() {
      if (this.show) {
        this.setData({
          show: false
        });
      } else {
        this.setData({
          show: true
        });
      }
    },
    ifinput: function(e) {
      let that = this;
      const index = e.currentTarget.dataset.index;
      const studylist = that.studylist;
      studylist[index].if_input = !studylist[index].if_input; // studylist[index].if_jp = !studylist[index].if_jp

      that.setData({
        studylist: studylist
      });
    },
    // 点击发表评论
    formSubmit: function(e) {
      console.log("form发生了submit事件，携带数据为：", e.detail.value);

      if (e.detail.value.input == "") {
        wx.showToast({
          title: "请输入内容"
        });
      } else {
        var that = this;
        var textarea_item = {};
        var textareaValue = e.detail.value.input;
        var release = this.release;
        var id = release.length;
        textarea_item.textareaValue = textareaValue;
        release.push(textarea_item); // 将评论内容添加到评论列表

        this.setData({
          release: release,
          releaseFocus: true,
          //隐藏输入框
          releaseValue: "" //清空输入框内容
        });
        console.log(release);
      }
    },
		
		gotoGrowthDairy: function(e) {
			let uid = e.currentTarget.dataset.uid;
			let pid = e.currentTarget.dataset.pid;
			let index = e.currentTarget.dataset.index;
			const thumbs_times = e.currentTarget.dataset.thumbs_times;
			getApp().globalData.preview = false;
			uni.navigateTo({
				url: '../growthDiary/growthDiary?uid=' + uid + '&pid=' + pid + '&index=' + index + '&type=1' + '&thumbs_times=' + thumbs_times
			});
		},
    changeOil: function(e) {
      console.log(e.target.dataset.type);
      const that = this;
      (this.type = e.target.dataset.type),
        (this.page = 1),
        (this.studylist = []),
        (this.count = 1),
        (this.show = false);
      that.getData();
    },
    toWhere(e) {
      var url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url
      });
    },

    getoShop() {
      var that = this;
      wx.request({
        url: getApp().globalData.requestUrl + "/api/index/storeStartPage",
        method: "post",
        data: "",
        header: {
          "content-type": "application/json",
          token: wx.getStorageSync("token")
        },
        success: function(res) {
          that.setData({
            smodel: res.data.data.smodel,
            is_wait: 1
          }); // setTimeout(function () {
          // wx.switchTab({
          //   url: '/pages/onlinestore/onlinestore',
          // })
          // }, 3000)

          wx.navigateTo({
            url: "/pages/catalogues/catalogues"
          });
        },
        fail: function() {
          wx.hideLoading();
          wx.showModal({
            title: "网络错误",
            content: "网络出错，请刷新重试",
            showCancel: false
          });
          return typeof cb == "function" && cb(false);
        }
      }); // wx.switchTab({
      //       url: '/pages/onlinestore/onlinestore',
      //     })
    },

    // shuhuajs(){
    //   console.log(12)
    //   wx.navigateTo({
    //     url: '/pages/shuhuajs/shuhuajs',
    //   })
    // }
    previewImg: function(e) {
      let src = e.currentTarget.dataset.src;
      let pic_arr = e.currentTarget.dataset.pic_arr;
			var imglist=pic_arr.split(',')
      wx.previewImage({
        current: src,
        urls: imglist
      });
    },
    growthDaily: function(e) {
      let uid = e.currentTarget.dataset.uid;
      let pid = e.currentTarget.dataset.pid;
      let index = e.currentTarget.dataset.index;
      const thumbs_times = e.currentTarget.dataset.thumbs_times;
      wx.navigateTo({
        url:
          "../myPublished/myPublished?uid=" +
          uid +
          "&pid=" +
          pid +
          "&index=" +
          index +
          "&type=2" +
          "&thumbs_times=" +
          thumbs_times
      });
    },

    playVideo(e) {
      var src = e.currentTarget.dataset.src;
      wx.navigateTo({
        url: "../video/video?src=" + src
      });
    },

    playorpause: function(e) {
      var that = this;
      var index = e.target.dataset.index; //获取点击音乐的下标

      var item = "studylist[" + index + "].action"; //获取音乐的播放状态

      var actionPlay = {
        method: "play"
      }; //定义播放

      var actionPause = {
        method: "pause"
      }; //定义暂停

      if (that.studylist[index].action.method == "pause") {
        //若当前是暂停，则点击后播放
        that.setData({
          [item]: actionPlay
        });

        for (let i = 0; i < that.studylist.length; i++) {
          if (index != i) {
            let indeNum = "studylist[" + i + "].action";
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
<style lang="less" scoped>
@import "./studySquare.css";
		.user_info {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			height: 80rpx;
			margin-bottom: 10rpx;

			.left_side {
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}

					.name {
						margin-bottom: 10rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: rgba(50, 50, 50, 1);
						line-height: 1;
						
					}

					.date {
						font-size: 20rpx;
						color: rgba(153, 153, 153, 1);
						line-height: 1;
					}
			}

			.view_count {
				font-size: 20rpx;
				color: rgba(153, 153, 153, 1);
				line-height: 28rpx;
			}
		}
</style>
