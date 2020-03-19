<template>
	<view>
		<scroll-view scroll-y>
			<view class="recommend-item">
				<view class="item-top">
					<image class="touxiangicon" :src="studyDetails.avatar" mode="widthFix"></image>
					<view class="info">
						<text class="title">{{ studyDetails.nickname }}</text>
						<text class="time">{{ studyDetails.createtime }}</text>
						<text class="time">浏览{{ browse_times }}次</text>
					</view>
				</view>
				<view class="item-middle">
					<view class="detail">
						<text class="conttext">{{ studyDetails.content }}</text>
					</view>
					<view class="middle-image">
						<view v-for="(item, index) in studyDetails.picture_arr"><image :src="item" mode="" style="width: 220rpx;height: 220rpx;"></image></view>
					</view>
				</view>
				<view class="smallicon">
					<view class="smallicon-flex" @tap="praise">
						<image class="collecticon" v-if="studyDetails.is_give" src="../../static/index/collect.png" style="width: 45rpx;height: 42rpx;"></image>
						<image class="collecticon" v-else src="../../static/index/uncollect.png" style="width: 45rpx;height: 42rpx;"></image>
						<text>{{ thumbs_times }}</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/fx.png" mode="widthFix" style="width: 45rpx;height: 42rpx;"></image>
						<text>分享</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/messageicon.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<text>{{ comment_count }}</text>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="studyitem-bottom">
				<view class="shoppcall comment">
					<view class="comment-item" v-for="(item, index) in commenlist" :key="index">
						<view class="publish_list comment" @tap.stop="commentDetail(item)">
							<view class="">
								<image :src="item.avatar" mode="widthFix" class="comment-avatar"></image>
								<text class="publish_list_item textred">{{ item.nickname }}</text>
							</view>
							<view class="comment-body">
								<view class="redtree_text">{{ item.content }}</view>
								<view class="">
									<view class="comment-time l">{{ item.createtime }}</view>
									<view class="comment-count l" @click="openCommentDetails">{{ item.count }} 回复</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="input-box">
<!-- 				<input placeholder="请输入评论内容" class="input" 
				@input="getComment" 
				:value="comment_content"
				v-model="comment_content"/> -->
				<input placeholder="请输入评论内容" class="input"
				v-model="comment_content"/>
				<text class="send" @tap.stop="send">发送</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { ajax } from '../../utils/public.js';
export default {
	data() {
		return {
			inits: '',
			page: 1,
			page_size: 10,
			studylist: [
				{
					name: '梁雨淇',
					nameSign: '每天签到不迟到',
					date: '2019-04-19',
					time: '10:20',
					browseNum: '27',
					impression:
						'课后感言,老师教学认真，课堂效率高，授课内容详细，,我们学生大部分都能跟着老师思路学习，气氛活 课学下来有收获，欣喜，使人对此门课程感兴趣课后感言,老师教学认真，课堂效率高，授课内容详细，,我们学生大部分都能跟着老师思路学习，气氛活 课学下来有收获，欣喜，使人对此门课程感兴趣...',
					collectNum: '10',
					messageNum: '12',
					dianzanname: '小芊芊'
				}
			],
			details: '',
			dy_id: '',
			release: [],
			comment_num: 0,
			comment_content: '',
			count: 1,
			comment_count: 0,
			index: '',
			browse_times: '',
			type: '',
			thumbs_times: '',
			fullScreen: false,
			myDaily: false,
			is_share: '',
			index_: '',
			up: '',
			is_give: '',
			preview: false,
			to_details: false,
			item: '',
			studyDetails: {},
			picturelist: [],
			commenlist: []
		};
	},
	onLoad(event) {
		console.log(event);
		// this.getData()
		const { dy_id, browse_times, comment_count, thumbs_times } = JSON.parse(decodeURIComponent(event.pulishedDetail));
		if (dy_id) {
			this.dy_id = dy_id;
			this.browse_times = browse_times;
			this.comment_count = comment_count;
			this.thumbs_times = thumbs_times;
			setTimeout(function() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				var that = this;
				var index = that.index;
				// if (options.type == 2) {
				// 	//type:1首页，2我的，3学习广场
				// 	var up = 'studylist[' + index + '].browse_times';
				// } else if (options.type == 3 || options.type == 4) {
				// 	var up = 'daka[' + index + '].browse_times';
				// } else if (options.type == 1) {
				// 	var up = 'daily[' + index + '].browse_times';
				// }

				var newp = ++that.browse_times;

				if (prevPage) {
					// 可以修改上一页的数据
					prevPage.setData({
						[up]: newp
					});
				}
			}, 1000);
			this.getData();
			this.comment();
		} else if (options.scene) {
			that.setData({
				dy_id: decodeURIComponent(options.scene)
			});
			this.getData();
			this.comment();
		} else {
			uni.redirectTo({
				url: '../index/index'
			});
		}
	},
	mounted() {},
	methods: {
		//评论详情
		    commentDetail: function (e) {
				let param={
					d_id:e.d_id,
					owner_uid:e.owner_uid,
					index : e.index,
					comment_count:e.comment_count
				}
		      uni.navigateTo({
		        url: 'commentDetails/commentDetails?commentDetails' + encodeURIComponent(JSON.stringify(param))
		      });
		    },
		//获取详情
		getData() {
			ajax({
				url: 'study/studyDetails',
				data: { id: this.dy_id },
				// data:{id:'926'},
				success: res => {
					// console.log(res.data.data);
					this.studyDetails = res.data.data;
				}
			});
		},
		//获取评论列表
		comment() {
			ajax({
				url: 'comment/comment',
				data:{d_id:this.dy_id},
				// data: { d_id: '926' },
				success: res => {
					if (this.count < this.page) {
					} else {
						let release = this.release;
						const { count, list } = res.data.data;
						this.commenlist = list;
						console.log(list);
						(this.page = this.page + 1), (this.count = count > 1 ? count : 1), (this.release = release.concat(list)), (this.comment_num = count);
					}
				}
			});
		},
		//发送评论
		    send: function () {
			  ajax({
				  url:'comment/commentAdd',
				  data:{content: this.comment_content,
		        d_id: this.dy_id},
				  method:'POST',
				  success:(res)=>{
					  this.comment_content= ''
					  ajax({
						  url:'comment/comment',
						  data:{d_id: this.dy_id},
						  success:(res)=>{
							  console.log(res.data.data)
							  let list = res.data.data
							  list.if_input = false
							  this.release = res.data.list
							  this.comment_num = res.data.count
							  var pages = getCurrentPages();
							  var prevPage = pages[pages.length - 2]; //上一个页面
							  		
							  var index = this.index;
							  		
							  if (that.type == 1) {
							    var up = "daily[" + index + "].comment_count";
							  } else if (that.type == 2) {
							    var up = "studyList[" + index + "].comment_count";
							  } else if (that.type == 3 || that.type == 4) {
							    var up = "daka[" + index + "].comment_count";
							  }
							  		
							  var newp = ++that.comment_count; // that.setData({
							  //   comment_count:newp
							  // })
							  		
							  if (prevPage) {// 可以修改上一页的数据
							    // prevPage.setData({
							    //   [up]: newp
							    // })
							  }
							  		
							  var prevPages = pages[pages.length - 3];
							  		
							  if (prevPages) {
							    if (prevPages.__route__ == 'pages/index/index') {
							      var up = "daily[" + index + "].comment_count";
							    } else if (prevPages.__route__ == 'pages/my/my') {
							      var up = "daka[" + index + "].comment_count";
							    } else if (prevPages.__route__ == 'pages/studySquare/studySquare') {
							      var up = "studylist[" + index + "].comment_count";
							    } // prevPages.setData({
							    //   [up]: newp
							    // })
							  		
							  }
						  }
					  })
				  }
			  })
		    },
		//点赞
		    praise(e) {
		      var that = this;
		      var index_ = that.index_;
		      ajax({
						url:'study/praiseStudy', 
						data:{
						  dy_id: this.dy_id
						}, success:(res) => {
						  const details = this.studyDetails;
								
						  if (res.data.data.is_ok) {
						    this.studyDetails.is_give=!details.is_give,
						    this.studyDetails.thumbs_times = details.thumbs_times + 1
						    var pages = getCurrentPages();
						    var prevPage = pages[pages.length - 2]; //上一个页面
								
						    var index = that.index;
								
						    if (that.type == 1) {
						      var up = "daily[" + index + "].thumbs_times";
						      var is_give = "daily[" + index + "].is_give";
						      var newp = details.thumbs_times;
						      var new_is_give = details.is_give;
						    } else if (that.type == 3 || that.type == 4) {
						      var up = "daka[" + index + "].thumbs_times";
						      var is_give = "daka[" + index + "].is_give";
						      var newp = details.thumbs_times;
						      var new_is_give = details.is_give;
						    } else if (that.type == 2) {
						      var up = "studylist[" + index + "].thumbs_times";
						      var is_give = "studylist[" + index + "].is_give";
						      var newp = details.thumbs_times;
						      var new_is_give = details.is_give;
						    }
								
						    if (prevPage) {
						      // 可以修改上一页的数据
						      prevPage.setData({
						        [up]: newp,
						        [is_give]: new_is_give
						      });
						    }
								
						    var prevPages = pages[pages.length - 3];
						    console.log(prevPages);
								
						    if (prevPages) {
						      if (prevPages.__route__ == 'pages/index/index') {
						        var up = "daily[" + index_ + "].thumbs_times";
						        var is_give = "daily[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						        console.log(new_is_give);
						      } else if (prevPages.__route__ == 'pages/my/my') {
						        var up = "daka[" + index_ + "].thumbs_times";
						        var is_give = "daka[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						      } else if (prevPages.__route__ == 'pages/studySquare/studySquare') {
						        var up = "studylist[" + index_ + "].thumbs_times";
						        var is_give = "studylist[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						      }
								
						      prevPages.setData({
						        [up]: newp,
						        [is_give]: new_is_give
						      });
						    }
								
						    ;
						  } else {
						   this.studyDetails.is_give=!details.is_give,
						   this.studyDetails.thumbs_times = details.thumbs_times - 1
						    var pages = getCurrentPages();
						    var prevPage = pages[pages.length - 2]; //上一个页面
								
						    var index = that.index;
								
						    if (that.type == 1) {
						      console.log(new_is_give);
						      var up = "daily[" + index + "].thumbs_times";
						      var is_give = "daily[" + index + "].is_give";
						      var newp = details.thumbs_times - 1;
						      var new_is_give = details.is_give;
						    } else if (that.type == 3 || that.type == 4) {
						      var up = "daka[" + index + "].thumbs_times";
						      var is_give = "daka[" + index + "].is_give";
						      var newp = details.thumbs_times - 1;
						      var new_is_give = details.is_give;
						    } else if (that.type == 2) {
						      var up = "studylist[" + index + "].thumbs_times";
						      var is_give = "studylist[" + index + "].is_give";
						      var newp = details.thumbs_times;
						      var new_is_give = details.is_give;
						    }
								
						    var newp = details.thumbs_times;
								
						    if (prevPage) {
						      // 可以修改上一页的数据
						      prevPage.setData({
						        [up]: newp,
						        [is_give]: new_is_give
						      });
						    }
								
						    var prevPages = pages[pages.length - 3];
								
						    if (prevPages) {
						      if (prevPages.__route__ == 'pages/index/index') {
						        var up = "daily[" + index_ + "].thumbs_times";
						        var is_give = "daily[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						      } else if (prevPages.__route__ == 'pages/my/my') {
						        var up = "daka[" + index_ + "].thumbs_times";
						        var is_give = "daka[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						      } else if (prevPages.__route__ == 'pages/studySquare/studySquare') {
						        var up = "studylist[" + index_ + "].thumbs_times";
						        var is_give = "studylist[" + index_ + "].is_give";
						        var newp = details.thumbs_times;
						        var new_is_give = details.is_give;
						      }
								
						      prevPages.setData({
						        [up]: newp,
						        [is_give]: new_is_give
						      });
						    }
						  }
						},
						error:function(){
							
						}
					})
		    },
	},
	mounted() {}
};
</script>

<style style lang="less" scoped>
@import './myPublished.css';
.input-box {
	position: fixed;
	width: 100%;
	bottom: 14rpx;
	height: 100rpx;
	line-height: 150rpx;
	display: flex;
	left: 0;
	justify-content: center;
	/* align-items:center; */
}
.send {
	width: 120rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 30rpx;
	background-color: #008800;
	margin-left: 20rpx;
	font-size: 28rpx;
	color: white;
	margin-top: 22rpx;
}
.input {
	font-size: 24rpx;
	margin-top: 20rpx;
	background-color: #f5f5f5;
	border-radius: 50rpx;
	padding-left: 30rpx;
	height: 70rpx;
	line-height: 70rpx;
	width: 70%;
	/* margin-left:70rpx */
}
.comment-item {
	padding: 10rpx 0 20rpx 0;
}
</style>
