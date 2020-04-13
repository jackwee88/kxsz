<template>
	<view>
		<scroll-view scroll-y>
			<view class="recommend-item">
				<view class="item-top" >
					<image class="touxiangicon" :src="studyDetails.avatar" mode="widthFix" @tap="gotoUserInfo" :data-uid="studyDetails.uid"/>
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
						<view v-for="(item, index) in studyDetails.picture_arr" :key="index"><image :src="item" style="width: 220rpx;height: 220rpx;"
						@tap.stop="previewImg"
						:data-effect_arr="studyDetails.picture_arr"
						:data-src="item"
						/></view>
					</view>
				</view>
				<view class="smallicon">
					<view class="smallicon-flex" @tap="praise">
						<image class="collecticon" v-if="studyDetails.is_give" src="../../static/index/collect.png" style="width: 45rpx;height: 42rpx;" />
						<image class="collecticon" v-else src="../../static/index/uncollect.png" style="width: 45rpx;height: 42rpx;" />
						<text>{{ studyDetails.thumbs_times }}</text>
					</view>
					<view class="smallicon-flex" v-show="false">
						<image src="../../static/index/fx.png" mode="widthFix" style="width: 45rpx;height: 42rpx;" />
						<text>分享</text>
					</view>
					<view class="smallicon-flex">
						<image src="../../static/index/pl.png" mode="widthFix" style="width: 40rpx;height: 40rpx;" />
						<text>{{ comment_count }}</text>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="studyitem-bottom">
				<view class="shoppcall comment">
					<view class="comment-item" v-for="(item, index) in commenlist" :key="index">
						<view class="publish_list comment">
							<view class>
								<image :src="item.avatar" mode="widthFix" class="comment-avatar" />
								<text class="publish_list_item textred">{{ item.nickname }}</text>
							</view>
							<view class="comment-body">
								<view class="redtree_text">{{ item.content }}</view>
								<view class>
									<view class="comment-time l">{{ item.createtime }}</view>
									<view class="comment-count l" 
									@tap.stop="commentDetail" 
									:data-d_id="item.d_id" 
									:data-owner_uid="item.id" 
									:data-index="index" 
									:data-comment_count="item.count"
									>
										{{ item.count }} 回复
									</view>
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
        v-model="comment_content"/>-->
				<input placeholder="请输入评论内容" class="input" v-model="comment_content" :focus="if_false" />
				<text class="send" @tap.stop="send">发送</text>
			</view>
		</scroll-view>
		<view class="big-box" v-if="visible">
			<view class="containerModal">
					<view class="modalTitle">请绑定手机号再评论</view>
				<view class="bindbtn" style="position: absolute;">
					<view class="console" @tap="goconsole">取消</view>
					<view class="confirm" @tap="bindPhone">去绑定</view>
				</view>
			</view>
		</view>
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
			if_false:false,
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
			commenlist: [],
			mobile:'',
			visible:false,
		};
	},
	onLoad(event) {
		const { dy_id, browse_times, comment_count, thumbs_times ,type,index} = JSON.parse(decodeURIComponent(event.pulishedDetail));
		if (dy_id) {
			this.dy_id = dy_id;
			this.browse_times = browse_times;
			this.comment_count = comment_count;
			this.thumbs_times = thumbs_times;
			this.index = index
			this.type = type
			setTimeout(function() {
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];
				 if(type){
					 if (type == 1) {
					let times = browse_times
					prevPage.$vm.studylist[index].browse_times = ++times;
				} else if (type==2) {
					let times = browse_times
					prevPage.$vm.studylist[index].browse_times = ++times;
				} else if (type == 3) {
					let times = browse_times
					prevPage.$vm.logList[index].browse_times = ++times;
				}else if(type == 4){
					let times=browse_times
					prevPage.$vm.daka[index].browse_times = ++times
				}
				 }//上一个页面
				
			}, 1000);
			
			this.getData();
			this.comment();
		} 
		// else if (options.scene) {
		// 	that.setData({
		// 		this.dy_id= decodeURIComponent(options.scene)
		// 	});
		// 	this.getData();
		// 	this.comment();
		// } 
		else {
			uni.redirectTo({
				url: '../index/index'
			});
		}
	},
	mounted() {},
	methods: {
		//评论详情
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
		commentDetail: function(e) {
			let param = {
				d_id: e.currentTarget.dataset.d_id,
				owner_uid: e.currentTarget.dataset.owner_uid,
				index: e.currentTarget.dataset.index,
				comment_count: e.currentTarget.dataset.comment_count
			};
			uni.navigateTo({
				url: 'commentDetails/commentDetails?commentDetails=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		//获取详情
		getData() {
			ajax({
				url: 'study/studyDetails',
				data: { id: this.dy_id },
				// data:{id:'926'},
				success: res => {
					this.studyDetails = res.data.data;
				}
			});
		},
		//获取评论列表
		comment() {
			ajax({
				url: 'comment/comment',
				data: { d_id: this.dy_id },
				// data: { d_id: '926' },
				success: res => {
					if (this.count < this.page) {
					} else {
						let release = this.release;
						const { count, list } = res.data.data;
						this.commenlist = list;
						(this.page = this.page + 1), (this.count = count > 1 ? count : 1), (this.release = release.concat(list)), (this.comment_num = count);
					}
				}
			});
		},
		//发送评论
		send: function() {
			let that = this;
			ajax({
				url:'index/getProfile',
				success:(res)=>{
					this.mobile=res.data.data.mobile
					console.log(res.data.data)
					if(this.mobile==''){
						this.visible=true
					}else{
						ajax({
							url: 'comment/commentAdd',
							data: { content: this.comment_content, d_id: this.dy_id },
							method: 'POST',
							success: res => {
								this.comment_content = '';
								uni.showModal({
									title: '提示',
									content: res.data.msg,
									showCancel: false,
									duration: 1000,
									success: function(res) {}
								});
								ajax({
									url: 'comment/comment',
									data: { d_id: this.dy_id},
									success: (res) => {
										let list = res.data.data;
										list.if_input = false;
										this.release = res.data.list;
										this.comment_num = res.data.count;
										
										var pages = getCurrentPages();
										var prevPage = pages[pages.length - 2]; //上一个页面
										var index = this.index;
										if (that.type == 1) {
											prevPage.$vm.studyList[index].comment_count = 'daily[' + index + '].comment_count';
										} else if (that.type == 2) {
											var up = 'studyList[' + index + '].comment_count';
										} else if (that.type == 3 || that.type == 4) {
											var up = 'daka[' + index + '].comment_count';
										}
										var newp = ++that.comment_count; 
									}
								});
							}
						});
					}
				}
			})

		},
		//跳转用户详情
		gotoUserInfo: function(e) {
			let param = {
				uid: e.currentTarget.dataset.uid,
		
			};
			uni.navigateTo({
				url: '../userInfo/otherInfo?infoDetail=' + encodeURIComponent(JSON.stringify(param))
			});
		},
		//点赞
		previewImg(e) {
			getApp().globalData.preview = false;
			var src = e.currentTarget.dataset.src; //获取data-src  循环单个图片链接
			var str= e.currentTarget.dataset.effect_arr; //获取data-effect_pic   图片列表
			var imgList= str.split(',')
			uni.previewImage({
				current: src,
				// 当前显示图片的http链接
				urls: imgList // 需要预览的图片http链接列表
			});
		},
		goconsole(){
			this.visible=false
		},
		bindPhone(){
			this.visible=false
			uni.navigateTo({
				url:'../login/bindPhone/bindPhone'
			})
			},
				praise(e) {
			var that = this;
			var index_ = that.index_;
			ajax({
				url: 'study/praiseStudy',
				data: {
					dy_id: this.dy_id
				},
				success: res => {
					const details = this.studyDetails;
					if (res.data.data.is_ok == true) {
						this.studyDetails.is_give = !details.is_give, 
						this.studyDetails.thumbs_times = details.thumbs_times + 1;
						
					} else {
						this.studyDetails.is_give = !details.is_give, 
						this.studyDetails.thumbs_times = details.thumbs_times - 1;
					}
					var pages = getCurrentPages();
					var index = that.index;
					var prevPage = pages[pages.length - 2]; //上一页面指针 
					if (that.type == 1) {
					prevPage.$vm.studylist[index].thumbs_times = this.studyDetails.thumbs_times
					prevPage.$vm.studylist[index].is_give = this.studyDetails.is_give
					} else if (that.type ==2) {
					prevPage.$vm.studylist[index].thumbs_times = this.studyDetails.thumbs_times
					prevPage.$vm.studylist[index].is_give = this.studyDetails.is_give
					} else if (that.type == 3) {
					prevPage.$vm.loglist[index].thumbs_times = this.studyDetails.thumbs_times
					prevPage.$vm.loglist[index].is_give = this.studyDetails.is_give
					}else if(that.type==4){
						prevPage.$vm.daka[index].thumbs_times = this.studyDetails.thumbs_times
						prevPage.$vm.daka[index].is_give = this.studyDetails.is_give
					}

				},
				error: function() {}
			});
		}
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

	.bindbtn{
		height: 100rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
		width: 600rpx;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		border-top: 1px solid #2f881e;
	}
	.console{
		border-right: 2rpx solid #2F881E;
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.confirm{
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
	}

</style>
