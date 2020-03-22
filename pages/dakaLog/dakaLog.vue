<template>
  <view>
    <!-- 		<view class="info_wrap">
			<image src="../../static/reg/log.png" class="avatar">

			<view class="info_text">
				<view class="top">
    <view class="name">大鱼</view>-->
    <!-- <view class="btn had_btn">
						<image src="../../static/my/add.png" class="addhao">
						关注
    </view>-->

    <!-- <view class="btn">
						<image src="../../static/my/ygz.png" class="ygz">
						已关注
    </view>-->

    <!-- 					<view class="btn">
						<image src="../../static/my/hxgz.png" class="hxgz">
						互相关注
					</view>
				</view>
				<view class="sub">开心号：kx12345</view>
				<view class="sub">男</view>
			</view>
    </view>-->

    <view class="section_title">
      <text>最近打卡</text>
    </view>

    <view class="works_list">
      <navigator
        class="work_item"
        v-for="(item,index) in logList"
        :key="index"
        @click="gotoPublished()"
      >
        <view class="user_info">
          <view class="left_side">
            <view class="date">{{item.date}}</view>
          </view>

          <text class="view_count">浏览{{item.logNum}}次</text>
        </view>
        <view class="msg">{{item.msg}}</view>
        <view class="gallery">
          <view
            v-for="(imageItem,imageIndex) in item.imageList"
            :key="imageIndex"
            class="imageList"
          >
            <image :src="imageItem.imageUrl" mode />
          </view>
        </view>
        <view class="actions">
          <view class="item">
            <image src="../../static/index/zf.png" mode />
            <text>{{item.shareNum}}</text>
          </view>
          <view class="item">
            <image src="../../static/index/pl.png" mode />
            <text>{{item.commentNum}}</text>
          </view>
          <view class="item">
            <image src="../../static/index/sc.png" mode />
            <text>{{item.likeNum}}</text>
          </view>
        </view>
      </navigator>
    </view>

    <!-- <view class="talk_btn">聊天</view> -->
  </view>
</template>

<script>
import { ajax } from "../../utils/public.js";
export default {
  data() {
    return {
      logList: [],
			uid: '',

    };
  },

	  onLoad() {
	    // if (options.is_share) {
	    //   this.setData({
	    //     is_share: 1
	    //   });
	    // }
			ajax({
				url:"index/getProfile", data:{}, success:(res) => {
				  console.log(res);
				  this.uid = res.data.data.id;
					this.getData()
				}
			})
	//     if (options.uid) {
	//       this.setData({
	//         uid: options.uid,
	//         daka: [],
	//         p_id: options.pid,
	//         index_: options.index,
	//         type: options.type
	//       });
	//     }
	
	    // // this.getData();
	    // this.getSign();
	    // this.getModule();
	    // var that = this;
	
	//     if (options.dy_id) {
	//       util.ajax('/api/study/bill', {
	//         dy_id: options.dy_id
	//       }, res => {
	//         that.setData({
	//           nickname: res.data.nickname,
	//           d: res.data.d,
	//           y: res.data.y,
	//           title: res.data.title,
	//           date: res.data.date,
	//           where: res.data.where,
	//           word: res.data.word
	//         }); // that.canvas(res.data)
	
	//         wx.downloadFile({
	//           url: res.data.avatar,
	//           success: function (res) {
	//             that.setData({
	//               avatar: res.tempFilePath
	//             });
	//             that.beginCanvas();
	//           },
	//           fail: function (fres) {}
	//         }); /// 将base64转为二进制数据
	
	//         var code = res.data.code;
	//         var fileManager = wx.getFileSystemManager();
	//         var imgPath = wx.env.USER_DATA_PATH + '/' + 'eeeeeeeeee' + '.jpg'; // const buffer = wx.base64ToArrayBuffer(that.data.canvas.code);
	
	//         var imageData = code.replace(/^data:image\/\w+;base64,/, "");
	//         fileManager.writeFile({
	//           filePath: imgPath,
	//           data: imageData,
	//           encoding: 'base64',
	//           success: res => {
	//             this.setData({
	//               code: imgPath
	//             });
	//           },
	//           fail: err => {}
	//         });
	//         wx.downloadFile({
	//           url: res.data.background,
	//           success: function (res) {
	//             that.setData({
	//               background: res.tempFilePath
	//             });
	//             that.beginCanvas();
	//           },
	//           fail: function (fres) {}
	//         });
	//       });
	//       var pages = getCurrentPages(); // 获取页面栈
	
	//       var prevPage = pages[pages.length - 2]; // 上一个页面
	
	//       prevPage.setData({
	//         // 给上一个页面变量赋值
	//         back: 1
	//       });
	//     }
	  },
  methods: {
    //传参 打卡数据id
    gotoPublished: function(e) {
			let param ={type:3}
      uni.navigateTo({
        url: "../myPublished/myPublished?="+encodeURIComponent(JSON.stringify(param))
      });
    },
		getData() {
		  ajax({
				url:"index/UserCenter",data:{uid:this.uid}, success:(res) => {
					console.log(res)
		    const {count,list}= res.data.data;
		    var action = {
		      method: "pause"
		    };
		    for (var i = 0; i < list.length; i++) {
		      list[i].action = action;
		      list[i].poster = list[i].picture_idss[0];
		      list[i].name = list[i].nickname + "的音频";
		    }
		
		      this.user=res.data.data.user,
		      this.dakaLog=list
		  }});
		},
  },
  mounted() {
    //请求接口数据

  }
};
</script>

<style lang="less" scoped>
.imageList {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-right: 14rpx;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
.info_wrap {
  display: flex;
  align-items: center;
  padding: 0 44rpx;
  margin: 54rpx 0 82rpx;

  .avatar {
    width: 160rpx;
    height: 160rpx;
    margin-right: 48rpx;
  }
  .info_text {
    flex: 1;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .name {
      font-size: 40rpx;
      font-weight: 500;
      color: rgba(50, 50, 50, 1);
    }

    .btn {
      display: flex;
      align-items: center;
      height: 48rpx;
      padding: 0 18rpx;
      font-size: 24rpx;
      color: rgba(153, 153, 153, 1);
      background: #fff;
      border-radius: 26rpx;
      border: 1px solid rgba(221, 221, 221, 1);

      image {
        width: 24rpx;
        height: 24rpx;
        margin-right: 10rpx;
      }
      .ygz {
        height: 18rpx;
      }

      .hxgz {
        height: 16rpx;
      }
    }

    .had_btn {
      color: #fff;
      background: rgba(63, 174, 42, 1);
    }

    .sub {
      font-size: 32rpx;
      color: rgba(153, 153, 153, 1);
      line-height: 44rpx;
    }
  }
}

.section_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 44rpx;
  margin: 44rpx 0 22rpx;

  text {
    font-size: 32rpx;
    font-weight: 500;
    color: rgba(50, 50, 50, 1);
    line-height: 40rpx;
  }
}

.works_list {
  padding: 0 44rpx;
  .work_item {
    padding-bottom: 50rpx;
    margin: 30rpx 0 50rpx;
    border-bottom: 1rpx solid #ddd;
    &:last-of-type {
      border: 0;
    }
    .user_info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left_side {
        display: flex;
        align-items: center;

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

    .msg {
      margin-top: 20rpx;
      margin-bottom: 10rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: rgba(50, 50, 50, 1);
      line-height: 34rpx;
    }

    .gallery {
      display: flex;
      flex-direction: row;
    }

    .actions {
      display: flex;
      justify-content: space-around;
      margin-top: 38rpx;

      .item {
        display: flex;
        align-items: center;

        image {
          width: 30rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }

        text {
          font-size: 24rpx;
          color: rgba(153, 153, 153, 1);
          line-height: 34rpx;
        }
      }
    }
  }
}

.talk_btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 36rpx 0;
  font-size: 36rpx;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  line-height: 50rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
}
</style>
