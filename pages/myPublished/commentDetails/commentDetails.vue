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
					<view>
						<image class="acticleimg" v-for="(item, index) in details.picture_arr" :key="index" :src="item"></image>
						<audio v-if="item.voice_ids" :src="details.voice_ids" controls loop class="audio"></audio>
						<view v-if="details.video_ids">
							<video :src="details.video_ids" mode="widthFix" class="video"></video>
						</view>
					</view>
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
				up: ""
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(event) {
			const {
				d_id,
				owner_uid,
				index,
				comment_count
			} = JSON.parse(decodeURIComponent(event.commentDetails));
			console.log('123'+event.commentDetails)
			if (d_id) {
				this.d_id = d_id,
					this.id = owner_uid,
					this.index = index,
					this.comment_count = comment_count
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
							var release = that.release;
							console.log(res.data.data)
						}
					})
					// util.ajax('/api/comment/commentMain', param, res => {
					// 	var release = that.release; // for(var i=0;i<len;i++){
					// 	//   res.data.list[i].if_input = false
					// 	// }

					// 	that.setData({
					// 		page: that.page + 1,
					// 		count: res.data.count > 1 ? res.data.count : 1,
					// 		details: res.data.main,
					// 		release: release.concat(res.data.list),
					// 		comment_num: res.data.count,
					// 		owner_uid: res.data.main.uid,
					// 		c_id: res.data.main.id,
					// 		d_id: res.data.main.d_id
					// 	});
					// });
				} // util.ajax('/api/comment/commentMain', param, res => {
				//   var release = that.data.release
				//   // for(var i=0;i<len;i++){
				//   //   res.data.list[i].if_input = false
				//   // }
				//   that.setData({
				//     page: that.data.page + 1,
				//     count: res.data.count > 1 ? res.data.count : 1,
				//     details: res.data.main,
				//     release: release.concat(res.data.list),
				//     comment_num:res.data.count,
				//     owner_uid: res.data.main.uid,
				//     c_id: res.data.main.id,
				//     d_id: res.data.main.d_id
				//   })
				// })

			},

			ifinput: function(e) {
				let name = e.currentTarget.dataset.nickname;
				let r_uid = e.currentTarget.dataset.r_uid;
				let c_id = e.currentTarget.dataset.c_id;
				let d_id = e.currentTarget.dataset.d_id;
				let owner_uid = e.currentTarget.dataset.owner_uid;
				let owner_id = e.currentTarget.dataset.owner_id;
				this.setData({
					if_false: true,
					placeholder: '回复' + name + ": ",
					type: 1
				});
				let that = this;
				that.setData({
					d_ids: d_id,
					c_ids: c_id,
					owner_uids: owner_uid,
					r_uids: r_uid,
					owner_id: owner_id
				});
			},
			comment: function() {
				const that = this;
				const param = {
					d_id: that.d_id,
					owner_uid: that.owner_uid,
					c_id: that.c_id
				};
				util.ajax('/api/comment/comment', param, res => {
					let list = res.data;
					list.if_input = false;
					that.setData({
						release: res.data.list,
						comment_num: res.data.count
					});
				});
			},
			getComment: function(e) {
				this.setData({
					comment_content: e.detail.value
				});
			},
			send: function() {
				var that = this;
				var id = parseInt(that.id);

				if (that.type == 1) {
					that.setData({
						type: ''
					});
					var param = {
						content: that.comment_content,
						d_id: that.d_ids,
						c_id: that.c_ids,
						owner_uid: that.owner_uids,
						r_uid: that.r_uids,
						owner_id: id
					};
				} else {
					var param = {
						content: that.comment_content,
						d_id: that.d_id,
						owner_id: id,
						c_id: that.c_id,
						owner_uid: that.owner_uid
					};
				}

				util.ajax('/api/comment/commentAdd', param, res => {
					const that = this;
					let params = {
						d_id: that.d_id,
						id: that.id
					};
					util.ajax('/api/comment/commentMain', params, res => {
						that.setData({
							details: res.data.main,
							release: res.data.list,
							comment_num: res.data.count
						});
					});
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
				});
			},
			commentDetail: function(e) {
				const d_id = e.currentTarget.dataset.d_id;
				const owner_uid = e.currentTarget.dataset.owner_uid;
				wx.navigateTo({
					url: '../comment_detail/comment_detail?d_id=' + d_id + '&owner_uid=' + owner_uid + '&type=1'
				});
			}
		}
	};
</script>
<style>
	@import "./comment_detail.css";
</style>
