<template>
	<view class="">
		<view class="chatContent" v-for="(data,index) in linkList" :key="index">
			<image class="chatImage" :src="userMsg.portraitUri" mode="aspectFill"></image>
			<view class="chatText">
				<text class="chatTextMsg" v-if="data.messageName=='TextMessage'">{{data.content}}</text>
				<cover-image class="chatImageMsg" :src="data.imageUri" mode="widthFix" v-else-if="data.messageName=='ImageMessage'"></cover-image>
			</view>
		</view>
	</view>
</template>

<script>
	import RongIMLib from '../../../rongyunIM/rongyun.js'
	import Protobuf from '../../../rongyunIM/protobuf-2.3.5.min.js'
	var RongIMClient = RongIMLib.RongIMClient;
	var appkey = 'pwe86ga5p4d36'
	var userId = '924756420'
	var conversationType = RongIMLib.ConversationType.PRIVATE;
	var token = 'ZU5g/RRMEU2RUhfRT95FS0roF+1VR/NPRNBHO7cp39u44UVUi937DYiUHhlkx7cZdusSShxRe04zVZ0awUjVo2Y1rIY6tpSV'
	export default{
		data(){
			return{
				targetId:'',
				linkList: [],
				userMsg:{
					name:'',
					portraitUri:'https://kxsx-front-pic.oss-cn-beijing.aliyuncs.com/pic/20190815/156587576839.png'
				}
			}
		},
		onLoad(option) {
			var _self = this;
			//获取消息列表url传过来的id值
			let targetId=option.targetId;
			_self.targetId=targetId;
			uni.setNavigationBarTitle({
				title:targetId
			});
			//初始化
			RongIMClient.init(appkey, null, {
				protobuf: Protobuf
			})
			//状态监听器
			RongIMClient.setConnectionStatusListener({
				onChanged: function(status) {
					// status 标识当前连接状态
					switch (status) {
						case RongIMLib.ConnectionStatus.CONNECTED:
							break;
						case RongIMLib.ConnectionStatus.CONNECTING:
							break;
						case RongIMLib.ConnectionStatus.DISCONNECTED:
							break;
						case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
							break;
						case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
							break;
						case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
							break;
						default:
							break;
					}
				}
			});
			//消息监听器,当有新的消息在进行刷新
			RongIMClient.setOnReceiveMessageListener({
			    // 接收到的消息
			  onReceived: function (message) {
			    var messageContent = message.content;
				var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
				var count = 20;
				RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
					onSuccess: function(list, hasMsg) {
						/* 
						    list: 获取的历史消息列表
						    hasMsg: 是否还有历史消息可以获取
						  */
						_self.userMsg.name=list[0].content.targetId;
						let listTxet=[];
						for(let i=0;i<list.length;i++){
							listTxet.push(list[i].content)
						}
						 _self.linkList=listTxet;
					},
					onError: function(error) {
						// 请排查：单群聊消息云存储是否开通
					}
				});
			  }
			});
			//连接，登录
			RongIMClient.connect(token, {
				onSuccess: function(userId) {
					// 连接已成功, 此时可通过 getConversationList 获取会话列表并展示
				},
				onTokenIncorrect: function() {
				},
				onError: function(errorCode) {
					var info = '';
					switch (errorCode) {
						case RongIMLib.ErrorCode.TIMEOUT:
							info = '链接超时';
							break;
						case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
							info = '不可接受的协议版本';
							break;
						case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
							info = 'appkey 不正确';
							break;
						case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
							info = '服务器不可用';
							break;
						default:
							info = errorCode;
							break;
					}
					('连接失败, 失败原因: ', info);
				}
			});
			//获取历史消息
			var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
			var count = 20;
			RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
				onSuccess: function(list, hasMsg) {
					/* 
					    list: 获取的历史消息列表
					    hasMsg: 是否还有历史消息可以获取
					  */
					_self.userMsg.name=list[0].content.targetId;
					let listTxet=[];
					for(let i=0;i<list.length;i++){
						listTxet.push(list[i].content)
					}
					 _self.linkList=listTxet;
					 (_self.linkList);
				},
				onError: function(error) {
					// 请排查：单群聊消息云存储是否开通
				}
			});
			
			
			//结束
		},
		onUnload() {
		},
		mounted() {
			
		},
		methods:{
		},
		//销毁页面之前
		beforeDestroy() {
			let id=this.targetId;
			//清除未读消息
			RongIMClient.getInstance().clearUnreadCount(conversationType, id, {
			    onSuccess: function(){
			        // 清除未读消息成功
			    },
			    onError: function(error){
			        // error => 清除未读消息数错误码
			    }
			});
		},
		beforeMount(){
			RongIMClient.init(appkey, null, {
				protobuf: Protobuf
			})
		}
	}
</script>

<style>
	@import "./chatContent.css";
</style>
