<template>
  <view>
    <view v-for="(item, i) in list" :key="i" class="wrap">
      <view style="height: 20rpx;"></view>
      <view class="evaluate">
        <image :src="item.image" class="evaluateImg" />
        <text class="evaluateName">{{item.goods_name}}</text>
      </view>
      <view style="height: 20rpx;"></view>
      <!-- 评价的标签 -->
      <view class="evaluateEvaluate">
        <text
          v-for="(items, index) in item.evaluatetext"
          :key="index"
          :class="'LaberList ' + (items.yesId==1 ? 'checkLaber' : '')"
          :data-id="i"
          :data-index="index"
          :data-name="items.name"
          :data-yes_id="items.yesId"
          @tap="changeBtn(i,index,items.name,items.yesId)"
        >{{items.name}}</text>
      </view>
      <view class="proposal">
        <!-- <text class='bigtitle'>其他建议</text> -->

        <textarea
          :data-i="i"
          class="content"
          maxlength="-1"
          @input="proposal"
          :value="item.content"
          placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧"
          placeholder-style="color:#ccc"
          :data-order_id="item.goods_id"
        ></textarea>
      </view>

      <view>
        <view class="addpicture">
          <view class="userinfocont">
            <view
              class="videoinfo addvideo"
              @tap="upload_video"
              :data-i="i"
              v-if="item.videoUrl==''"
            >添加视频</view>
            <view class="videowidth videoinfo addvideo" v-if="item.videoUrl">
              <video id="myVideo" :src="item.videoUrl" enable-danmu danmu-btn controls></video>
              <image src="/static/my/close.png" class="dachas" @tap="deleteVideo" :data-i="i" />
            </view>
            <!-- <view class='videoicon'>
          
          <view class='videowidth' wx:if="{{item.videoUrl}}">
            <video id="myVideo" src="{{item.videoUrl}}" enable-danmu danmu-btn controls></video>
            <image src="/assets/img/order/del.png" class="dachas" bindtap='deleteVideo'>
          </view>
            </view>-->

            <!-- <view class='imgicon clear'> -->
            <view class="imgwidth" v-for="(item, index) in item.images" :key="index">
              <image
                :src="item"
                @tap="listenerButtonPreviewImage"
                :data-index="index"
                style="width: 100%;height:100%"
                class="uploadimg"
                :data-order_id="item.goods_id"
                :data-i="i"
              />
              <!-- 预留删除图片小图标 -->
              <image
                src="/static/my/close.png"
                class="dacha"
                :data-index="index"
                @tap="deleteImg"
                :data-i="i"
              />
            </view>
            <view
              :data-i="i"
              class="userinfo addimg"
              @tap="upload"
              v-if="item.num<item.count"
              :data-goods_id="item.goods_id"
            >添加图片</view>
            <!-- <image class='imgpicture'> -->
            <!-- </view> -->
          </view>
        </view>
      </view>

      <view></view>
    </view>

    <view style="height:150rpx;"></view>
    <view class="button" @tap="proposalClick">提交评价</view>
  </view>
</template>

<script>
var util = require("../../utils/util.js");

export default {
  data() {
    return {
      policy: "",
      signature: "",
      host: "",
      dir: "",
      accessid: "",
      evaluateList: [],
      //评价列表
      getEvaluate: [],
      //评价标签列表
      // orderIdArr:[],
      stars: [0, 1, 2, 3, 4],
      normalSrc: "/img/news/v.png",
      selectedSrc: "/img/news/five-pointed_star.png",
      halfSrc: "/img/news/v.png",
      // content: '',
      keylist: [0, 0],
      titlelist: ["物流服务", "服务态度"],
      scrollTop: 0,
      starDesc: "非常满意，无可挑剔",
      policy: "",
      signature: "",
      host: "",
      dir: "",
      accessid: "",
      videoUrl: "",
      images: [],
      depict_star: 0,
      order_id: 0,
      page: 1,
      page_size: 10,
      count: 1,
      list: [],
      check: 0,
      tempFilePaths: ""
    };
  },

  components: {},
  props: {},
  onLoad: function(options) {
    if (options.order_id) {
      this.setData({
        order_id: options.order_id
      });
    } //this.getEvaluate()

    this.getData();
    this.getAli();
  },

  onShow() {},

  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      page: 1
    });
  },
  onReachBottom: function() {
    var that = this;
  },
  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    //获取评价的标签
    getEvaluateFun() {
      let that = this;
      util.ajaxs("evaluate/getLableList", "", res => {
        that.setData({
          getEvaluate: res.data.list
        });
      });
    },

    //文本输入
    proposal: function(e) {
      var goods_id = e.currentTarget.dataset.goods_id;
      var i = e.currentTarget.dataset.i;
      var list = this.list;
      list[i].content = e.detail.value;
      this.setData({
        list: list
      });
    },
    //提交评价点击
    proposalClick: function(e) {
      var that = this;
      var list = this.list;
      var array = [];
      list.forEach(function(v) {
        var obj = {
          depict_star: v.depict_star,
          content: v.content,
          //评价的内容
          images: v.images,
          //上传的图片
          depict_star: v.keylist[0],
          videoUrl: v.videoUrl,
          //上传的视频
          goods_id: v.goods_id,
          //商品id
          order_goods_id: v.og_id,
          //订单id
          labeldata: v.labeldata //标签
        };
        array.push(obj);
      });
      let parem = {
        order_id: that.order_id,
        array: array
      };
      util.ajaxs("evaluate/evaluate", parem, result => {
        wx.showToast({
          title: result.msg,
          icon: "none",
          mask: true
        });

        if (result.status == 1) {
          wx.setStorage({
            //储存一个刷新值，返回到前一页然后获取到，有就进行刷新
            key: "refreshIds",
            data: "1"
          });
          setTimeout(function() {
            wx.navigateBack({
              delta: 1 //返回到前一个页面
            });
          }, 500);
        }
      });
    },

    //标签点击
    changeBtn(id, index, name, yes_id) {
      let that = this;
      let check = "list[" + id + "].evaluatetext[" + index + "].yesId";
      let arr = name;
      let checkLabel = "list[" + id + "].labeldata";
      if (yes_id == 0) {
        this.list[id].evaluatetext[index].yesId = 1;
        //选中评论标签
        let nowLabel = that.list[id].labeldata;
      } else {
        //取消选中评论标签
        let nowLabel = that.list[id].labeldata;
        nowLabel.splice(nowLabel.indexOf(arr), 1);
        this.list[id].evaluatetext[index].yesId = 0;
      }
    },

    //上传图片
    upload: function(e) {
      let that = this;
      var i = e.currentTarget.dataset.i;
      var list = that.list;

      if (that.list[i].count > that.list[i].num) {
        wx.chooseImage({
          count: that.list[i].count - that.list[i].num,
          // 默认6
          sizeType: ["compressed"],
          // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"],
          // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            var imageSrc = res.tempFilePaths;
            imageSrc.forEach(function(value, index, arrSelf) {
              wx.showToast({
                title: "正在上传...",
                icon: "success",
                mask: true,
                duration: 8000
              });
              const timestamp = Date.parse(new Date()) / 1000; //时间戳

              const filename =
                String(timestamp) + String(Math.floor(Math.random() * 50));
              wx.uploadFile({
                url: that.host,
                filePath: value,
                name: "file",
                formData: {
                  name: value,
                  key: that.dir + "/" + filename + ".png",
                  policy: that.policy,
                  OSSAccessKeyId: that.accessid,
                  success_action_status: "200",
                  signature: that.signature
                },
                success: function(res) {
                  var imgArr = list[i].images;
                  var imgUrl =
                    that.host + "/" + that.dir + "/" + filename + ".png";
                  list[i].images = list[i].images.concat(imgUrl);
                  list[i].num = list[i].num + 1;
                  that.setData({
                    list: list
                  });
                  wx.hideToast();
                },
                fail: function(errMsg) {}
              });
            }); // that.setData({
            //   imageSrc
            // })
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

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
          title: "上传数量已达上限"
        });
      }
    },
    listenerButtonPreviewImage: function(e) {
      let index = e.target.dataset.index; //预览图片的编号

      let i = e.currentTarget.setdata.i;
      let that = this;
      wx.previewImage({
        current: that.list[i].images[index],
        //预览图片链接
        urls: that.list[1].images,
        //图片预览list列表
        success: function(res) {},
        fail: function() {}
      });
    },
    // 删除图片
    deleteImg: function(e) {
      let i = e.currentTarget.dataset.i;
      let upload_picture_list = this.list;
      let index = e.currentTarget.dataset.index;
      upload_picture_list[i].images.splice(index, 1);
      this.setData({
        list: upload_picture_list
      });
    },
    //上传视频
    upload_video: function(e) {
      var that = this;
      var i = e.currentTarget.dataset.i;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        compressed: true,
        size: 100,

        success(res) {
          var imageSrc = res.tempFilePath;
          let extStart = imageSrc.lastIndexOf(".");
          let imageName = imageSrc;
          let ext = imageName
            .substring(extStart, imageName.length)
            .toUpperCase(); //判断图片格式

          if (ext == ".M4A") {
            wx.showToast({
              title: "视频格式不正确，请重新选择",
              icon: "none",
              mask: true,
              duration: 1000
            });
            return false;
          }

          if (res.size / 1024 / 1024 > 100) {
            wx.showToast({
              title: "视频超过100MB,请重新选择",
              icon: "none",
              mask: true,
              duration: 1000
            });
            return;
          } // that.setData({
          //   myvideosrc: res.tempFilePath
          // })

          const timestamp = Date.parse(new Date()) / 1000; //时间戳

          const filename =
            String(timestamp) + String(Math.floor(Math.random() * 50));
          wx.showToast({
            title: "正在上传...",
            icon: "success",
            mask: true,
            duration: 10000,
            icon: "none"
          });
          wx.uploadFile({
            url: that.host,
            filePath: res.tempFilePath,
            name: "file",
            formData: {
              name: res.tempFilePaths,
              key: that.dir + "/" + filename + ".mp4",
              policy: that.policy,
              OSSAccessKeyId: that.accessid,
              success_action_status: "200",
              signature: that.signature
            },
            success: function(res) {
              var videoUrl =
                that.host + "/" + that.dir + "/" + filename + ".mp4";
              var list = that.list;
              list[i].videoUrl = videoUrl;
              that.setData({
                // videoUrl: videoUrl
                list: list
              });
              wx.hideToast();
            },
            fail: function(errMsg) {
              wx.hideToast();
            }
          });
        },

        fail(res) {}
      });
    },
    // 删除视频
    deleteVideo: function(e) {
      // let upload_picture_list = this.data.videoUrl;
      // let index = e.currentTarget.dataset.index;
      // upload_picture_list.splice(index, 1);
      var i = e.currentTarget.dataset.i;
      const videoUrl = "list[" + i + "].videoUrl";
      this.setData({
        [videoUrl]: ""
      });
    },

    //获取待评价列表
    getData() {
      var that = this;
      let param = {
        // page: that.data.page,
        // page_size: that.data.page_size,
        order_id: that.order_id
      };
      util.ajaxs("evaluate/getLableList", "", res => {
        that.setData({
          getEvaluate: res.data.list
        });
      });
      util.ajaxs("evaluate/evaluateOrder", param, res => {
        if (res.data.list) {
          res.data.list.forEach(function(v) {
            v.num = 0;
            v.count = 9;
            v.content = "";
            v.keylist = [5];
            v.images = [];
            (v.titlelist = ["描述相符"]), (v.stars = [0, 1, 2, 3, 4]);
            v.normalSrc = "/assets/img/goods/v.png";
            v.selectedSrc = "/assets/img/goods/five-pointed_star.png";
            v.halfSrc = "/assets/img/goods/v.png";
            v.scrollTop = 0;
            v.videoUrl = "";
            v.labeldata = []; //v.evaluatetext = that.data.getEvaluate

            let arry = [];

            for (let i = 0; i < that.getEvaluate.length; i++) {
              let arrys = {
                name: that.getEvaluate[i],
                yesId: 0
              };
              arry.push(arrys);
            }

            v.evaluatetext = arry;
          });
        }

        that.setData({
          list: res.data.list
        });
      });
    },

    //上传图片需要用到
    getAli() {
      var that = this;
      var param = {
        type: 1
      };
      util.ajaxs("index/getOssPolicy", param, res => {
        that.setData({
          policy: res.data.policy,
          signature: res.data.signature,
          host: res.data.host,
          dir: res.data.dir,
          accessid: res.data.accessid
        });
      });
    }
  }
};
</script>
<style>
@import "./addComment.css";
</style>