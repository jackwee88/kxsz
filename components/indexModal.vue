
<template name='indexModal'>
    <view v-if="isVisible" class="uniPop" :class="opts.isCloseCls">
			<view class="containerModal">
				<view class="modalTitle">恭喜您获得新人礼包</view>
				<view class="youhuiquan" >
					<view class="youhuiNum">
						<text style="font-size:36rpx ;">¥<text style="font-size: 54rpx;">10</text></text>
					</view>
					<view class="youhuiDetail">
						<view class="detail">每满99减10元</view>
						<view class="date">2019.03.20-2019.05.20</view>
						<image class="image" src="../../static/index/newPerpson.png" style="width: 84rpx;height: 78rpx;"></image>
					</view>
				</view>
			
				<view class="btn" @click="gotoNovice">
					快去完成新人任务吧！
				</view>
			</view>
<!--        <view class="unipop__ui_panel">
            <view v-if="opts.shade" class="unipop__ui_mask" @tap="shadeTaped"></view>
            <view class="unipop__ui_main">
                <view class="unipop__ui_child" :style="opts.style">
                    <view v-if="opts.title" class="unipop__ui_tit">{{opts.title}}</view>
                    <view v-if="opts.content" class="unipop__ui_cnt" :style="opts.contentStyle">
                        {{opts.content}}
                    </view>
                    <view v-if="opts.btns" class="unipop__ui_btns">
                        <text v-for="(item,index) in opts.btns" :key="index" class="btn" :style="item.style" @tap="btnTaped(item)">{{item.text}}</text>
                    </view>
                </view>
                <view v-if="opts.xclose" class="unipop__xclose" @tap="close"></view>
            </view>
        </view> -->
    </view>
</template>

<script>
	export default {
		name:'indexModal',
	data() {
	    return {
	        // defaultOptions: {
	        //     isVisible: false,       //是否显示弹窗
	            
	        //     title: '',              //标题
	        //     content: '',            //内容
	        //     contentStyle: '',       //内容样式
	        //     style: null,            //自定义弹窗样式
	        //     skin: '',               //弹窗风格
	        //     icon: '',               //弹窗图标
	        //     xclose: false,          //自定义关闭按钮
	            
	        //     shade: true,            //遮罩层
	        //     shadeClose: true,       //点击遮罩关闭
	        //     opacity: '',            //遮罩透明度
	        //     time: 0,                //自动关闭秒数
	        //     end: null,              //销毁弹窗回调函数
	            
	        //     anim: 'scaleIn',        //弹窗动画  scaleIn(默认) | fadeIn | shake | top | right | bottom | left
	        //     position: '',           //弹窗位置  top | right | bottom | left
	            
	        //     btns: null,             //弹窗按钮
	        // },
	        // opts: {},
	        // timer: null
	    }
	},
	props:{
		isVisible: {
			type: Boolean,
			default: false
		},
	},
		methods: {
			 // show(args) {
			 //        this.opts = Object.assign({}, this.defaultOptions, args, {isVisible: true})
			 //        // console.log(this.opts)
			        
			 //        // 自动关闭
			 //        if(this.opts.time) {
			 //            this.timer = setTimeout(() => {
			 //                this.close()
			 //            }, this.opts.time * 1000)
			 //        }
			 //    },
		}
	}
</script>

<style>

</style>

