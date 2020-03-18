<template>
    <view>
        <view class="green">
            <view class="white">
                <image class="adv" src="/static/novice/12@2x.png" />
                <view class="glay">
                    说明：仅限新用户参与一次，任务奖励不可转赠
                </view>
            </view>
        </view>
        <view class="glay-bg">
            <view class="white" v-for="(item,index) in tackList">
                <view class="flex flex-space glay-item">
                    <view class="left-item">
                        <view class="flex">
                            <view class="black14 m-r-5" @click="">{{item.name}}</view>
                            <view class="red18">+{{item.score}}</view>
                        </view>
                        <view class="flex" v-if="item.status === '0'">
                            <view class="glay-back"></view>
                            <view class="gray14 m-l-9"><text style="color: #eb555f;">0</text>/1</view>
                        </view>
												<view class="flex" v-if="item.status === '1'">
												    <view class="red-back"></view>
												    <view class="red14 m-l-9">1/1</view>
												</view>
                    </view>
                    <view class="right-button" v-if="item.status === '0'">
                        去完成
                    </view>
										<view class="completed-button" v-if="item.status === '1'">
										    已完成
										</view>
                </view>
                
            </view>
        </view>
				<view class="footer">
					<view class="foot-content">
					<button class="btn"
					:disabled="isdisabled?true:false"
					:class="isdisabled?'btn BtnYes':'btn BtnNo' "
					>领取任务奖励 <text style="font-size:36rpx">+500</text></button>
					<text style="color: #999999;font-size: 24rpx;">完成任务后可领取奖励</text>
					</view>
				</view>
    </view>
</template>

<script>
	import {ajax} from '../../utils/public.js'
	export default{
		data(){
			return{
				isdisabled:true,
				status:'',
				tackList:[{
					status:'0',
					name:'绑定手机号码',
					score:'10',
				},
				{
					status:'1',
					name:'绑定手机号码',
					score:'30',
				}]
			}
		},
		mounted() {
			// ajax({
			// 	url:'index/tackList',
			// 	data:{},
			// 	method:'POST',
			// 	success:(res)=>{
			// 		const {count,list} = res.data.data
					// this.tackList = list
			// 	},
			// 	error:function(){
					
			// 	}
			// })
			ajax({
				url:'index/checkBind',
				data:{
					
				},
				method:'POST',
				success:(res)=>{
					this.status=res.data.status
				}
			})
		},
		methods:{
			
		}
		}
</script>

<style lang="less" scoped>
	.BtnNo{
		background-color: #CDCDCD;
	}
	.BtnYes{
		background-color: #038800;
	}
	.btn{
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: white;
		font-size: 28rpx;
		border: none;
		border-radius: 40rpx;
	}
	.footer{
		position: fixed;
		bottom: 60rpx;
		width: 750rpx;
		.foot-content{
			width: 100%;
			text-align: center;
			margin: 0 auto;
		}
	}
    .green{
        width: 100%;
        height:350rpx;
        padding: 24rpx 22rpx 0;
        box-sizing: border-box;
        background:linear-gradient(356deg,rgba(4,137,0,1) 50%,rgba(0,136,0,1) 100%);
        .white{
            width:100%;
            height:100%;
            background:rgba(255,255,255,1);
            border-radius:8rpx 8rpx 0 0;
            padding: 16rpx 26rpx;
            box-sizing: border-box;
            .adv{
                box-sizing: border-box;
                width: 100%;
                height: 244rpx;
            }
            .glay{
                font-size:24rpx;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:34rpx;
            }
        }
    }
		.red14{
			font-size:28rpx ;
			color: #eb555f;
			margin-left: 20rpx;
		}
		.gray14{
			font-size:28rpx ;
			color: #999999;
			margin-left: 20rpx;
		}
		.red18{
			font-size: 36rpx;
			color: #eb555f;
		}
    .glay-bg{
        background-color: #f5f5f5;
        padding: 0 16rpx;
        box-sizing: border-box;
        .white{
            background-color: white;
            padding: 16rpx 30rpx;
            box-sizing: border-box;
        }
        .glay-item{
            margin-bottom: 48rpx;
        }
        .glay-back{
            width:80rpx;
            height:10rpx;
            background:rgba(230,230,230,1);
            border-radius:6rpx;
        }
				.red-back{
				    width:80rpx;
				    height:10rpx;
				    background:#EB555F;
				    border-radius:6rpx;
				}
        .right-button{
            width:120rpx;
            height:48rpx;
            border-radius:24rpx;
            border:1px solid rgba(235,85,95,1);
            font-size:28rpx;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(235,82,92,1);
						box-sizing: border-box;
						text-align: center;
        }
				.completed-button{
				    width:120rpx;
				    height:48rpx;
				    border-radius:24rpx;
				    border:1px solid #999999;
				    font-size:28rpx;
				    font-family:PingFangSC-Regular,PingFang SC;
				    font-weight:400;
				    color:#999999;
						text-align: center;						
						box-sizing: border-box;
				}
    }
</style>
