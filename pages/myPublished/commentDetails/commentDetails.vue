<template>
	<!--pages/myPublished/myPublished.wxml-->
	<view class="studylist">
		<view class="studyitem" style="width:100%">

			<view class="studylistflex">
				<view class="studyitem-top info clear">
					<view class="clear" style="float:left">
						<image :src="details.avatar" class="touxiangicon"></image>
					</view>
					<view style="float:left">
						<text class="infoname">{{details.nickname}}</text>
					</view>
				</view>
				<view class="studyitem-middle">
					<text class="impression">{{details.content}}</text>
<!-- 					<view>
						<image class="acticleimg" v-for="(item, index) in details.picture_arr" :key="index" :src="item"></image>
						<audio v-if="item.voice_ids" :src="details.voice_ids" controls loop class="audio"></audio>
						<view v-if="details.video_ids">
							<video :src="details.video_ids" mode="widthFix" class="video"></video>
						</view>
					</view> -->
					<view class="hr"></view>
					<view class="all-comment">全部评论</view>
				</view>
				<view class="studyitem-bottom" v-if="comment_num > 0">

					<view v-for="(item, index) in release" :key="index" class="shoppcall comment" :data-owner_id="id" :data-id="item.id"
					 @tap="ifinput" :data-owner_uid="details.uid" :data-c_id="item.id" :data-d_id="item.d_id" :data-r_uid="item.uid"
					 :data-nickname="item.nickname">
						<view class="publish">
							<view class="publish_list comment">
								<view>
									<image :src="item.avatar" class="comment-avatar"></image>
									<text class="publish_list_item red">{{item.nickname}}</text>
								</view>

								<view class="comment-body">
									<view class="redtree_text">{{item.content}}</view>
									<view class="clear">
										<view class="comment-time l">{{item.createtime}}</view>
										<!-- <view class="comment-count l" catchtap='commentDetail' data-d_id="{{item.d_id}}" data-owner_uid="{{item.id}}" data-type="1">{{item.count}} 回复</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
				<view class="input-box">
					<input :placeholder="placeholder" class="input" @input="getComment" :value="comment_content" :focus="if_false"></input>
					<text class="send" @tap.stop="send">发送</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// pages/myPublished/myPublished.js
	// const app = getApp().globalData;
	// var util = require("../../utils/util.js");
	import {
		ajax
	} from '../../../utils/public.js'
	export default {
		data() {
			return {
				details: [],
				dy_id: '',
				owner_uid: '',
				d_id: '',
				release: [],
				comment_num: 0,
				comment_content: '',
				if_false: false,
				comment_contents: '',
				d_ids: "",
				c_ids: "",
				owner_uids: "",
				id: '',
				page: 1,
				page_size: 10,
				count: 1,
				placeholder: '请输入评论',
				comment_count: '',
				index: '',
				owner_id: 0,
				c_id: "",
				type: 0,
				r_uids: "",
				up: "",
				banner:''
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(event) {
			// console.log('123'+event.commentDetails)
			 this.banner = JSON.parse(decodeURIComponent(event.commentDetails));
			// console.log("this.banner"+this.banner.d_id)
			if (this.banner.d_id) {
				  this.d_id = this.banner.d_id,
					this.id = this.banner.owner_uid,
					this.index = this.banner.index,
					this.comment_count = this.banner.comment_count
				this.getData();
			} else {
				uni.redirectTo({
					url: '../../index/index'
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
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			var that = this;
			that.setData({
				page: 1,
				release: [],
				details: [],
				count: 1
			});
			that.getData();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			var that = this;
			that.getData();
		},
		methods: {
			getData() {
				const that = this;
				if (that.count < that.page) {} else {
					ajax({
						url: 'comment/commentMain',
						data: {
							d_id: that.d_id,
							id: that.id,
							page: that.page,
							page_size: that.page_size
						},
						success:(res)=>{
							console.log(res.data.data)
							const{main,count,list}= res.data.data
							this.details = main
							this.release = list
							this.comment_num=count
							this.page=this.page + 1
							this.owner_id=main.uid
							this.c_id=main.id
							this.d_id=main.d_id
							// console.log(res.data.data.main+'评论主内容')
							// console.log(this.list+'全部评论')
						},
					})
}

			},

			ifinput: function(e) {
				let name = e.currentTarget.dataset.nickname;
				let r_uid = e.currentTarget.dataset.r_uid;
				let c_id = e.currentTarget.dataset.c_id;
				let d_id = e.currentTarget.dataset.d_id;
				let owner_uid = e.currentTarget.dataset.owner_uid;
				let owner_id = e.currentTarget.dataset.owner_id;
					this.if_false= true,
					this.placeholder= '回复' + name + ": ",
					this.type=1
				let that = this;
					this.d_ids=this.d_id,
					this.c_ids= c_id,
					this.owner_uids= owner_uid,
					this.r_uids= r_uid,
					this.owner_id= owner_id
			},
			// comment: function() {
			// 	const that = this;
			// 	const param = {
			// 		d_id: that.d_id,
			// 		owner_uid: that.owner_uid,
			// 		c_id: that.c_id
			// 	};
			// 	util.ajax('/api/comment/comment', param, res => {
			// 		let list = res.data;
			// 		list.if_input = false;
			// 		that.setData({
			// 			release: res.data.list,
			// 			comment_num: res.data.count
			// 		});
			// 	});
			// },
			getComment: function(e) {
					this.comment_content=e.detail.value
			},
			send: function() {
				var that = this;
				var id = parseInt(that.id);

				if (that.type == 1) {
						this.type= ''
						// 回复全部品论中的一条
					var param = {
						content: that.comment_content,
						d_id: that.d_ids,
						c_id: that.c_ids,
						owner_uid: that.owner_uids,
						r_uid: that.r_uids,
						owner_id: id
					};
				} else {
					// 回复朱评论
					var param = {
						content: that.comment_content,
						d_id: that.d_id,
						owner_id: id,
						c_id: that.c_id,
						owner_uid: that.owner_uid
					};
				}
				ajax({url:'comment/commentAdd', data:
					param
				, success:(res) => {
					this.comment_content = ''
					ajax({url:'comment/commentMain', 
					data:{
						did:this.d_id,
						id:this.id
					}, success:(res) => {
							// this.details=res.data.data.main,
							this.release=res=data.data.list,
							this.comment_num= res.data.data.count
					}});
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面

					var index = that.index;
					var up = "release[" + index + "].count";
					var newp = ++that.comment_count;

					if (prevPage) {
						// 可以修改上一页的数据
						prevPage.setData({
							[up]: newp
						});
					}
				}
				});
			},
			// commentDetail: function(e) {
			// 	const d_id = e.currentTarget.dataset.d_id;
			// 	const owner_uid = e.currentTarget.dataset.owner_uid;
			// 	wx.navigateTo({
			// 		url: '../comment_detail/comment_detail?d_id=' + d_id + '&owner_uid=' + owner_uid + '&type=1'
			// 	});
			// }
		}
	};
</script>
<style>
	@import "./comment_detail.css";
</style>
