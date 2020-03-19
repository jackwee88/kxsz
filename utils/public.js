let requestUrl = ''
if (process.env.NODE_ENV === 'development') {
  requestUrl = '/api/';
} else {
  requestUrl = 'http://kxsx.zcycs.com/api/';
}
const ajax = (opt) => {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.header = opt.header || {
		'content-type': 'application/x-www-form-urlencoded',
	};
	opt.success = opt.success || function() {};
	uni.showLoading({
		title: '加载中'
	});
	uni.request({
		url: requestUrl + opt.url,
		//url: "http://www.mt.com/com/" + opt.url,
		data: opt.data,
		method: opt.method,
		header: {
			"token": uni.getStorageSync('loginToken'),
			'content-type': 'application/x-www-form-urlencoded',
		},
		dataType: 'json',
		success: function(res) {
			uni.hideLoading();
			console.log(res.data.status)
			if (res.data.status == 0) {
				// uni.showToast({
				//     title: res.data.msg
				// });
				uni.showModal({
					title: '提示',
					content: res.data.msg,
					showCancel: false,
					duration: 1000,
					success: function(res) {}
				})
			} else if (res.data.status == 1) {
				opt.success(res);
			} else if (res.data.status == -10086) {
				uni.navigateTo({
					url: '/pages/loginapp/loginapp',
				});
			} else if (res.data.status == -10087) { //用户被拉黑
				uni.navigateTo({
					url: '/pages/first/first?msg=' + res.data.msg,
				});
			} else if (res.data.status == -10088) { //未通过 1:通过中，2：认证通过，3：认证失败,未审核通过,4:禁用',
				uni.navigateTo({
					url: '/pages/first/first?real_status=' + res.data.data.real_status + '&msg=' + res.data.msg,
				});
			} else if (res.data.status == -10089) { //未提交 -1未审核
				uni.navigateTo({
					url: '/pages/first/first?real_status=' + res.data.data.real_status + '&msg=' + res.data.msg,
				});
			} else {
				uni.showToast({
					title: '请稍后重试,staus:000001'
				});
			}
		},
		fail: function() {
			uni.hideLoading();
			uni.showToast({
				title: '请稍后重试'
			});
		},
		complete: function() {

		}
	})
}
//const uploadUrl = 'http://www.mt.com/com/ajax/uploadImage'; 
const uploadUrl = 'http://193.112.253.206/com/ajax/uploadImage';
export {
	ajax,
	uploadUrl
}
