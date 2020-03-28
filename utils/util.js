const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
let requestUrl;
if (process.env.NODE_ENV === 'development') {
  requestUrl = '/api/';
} else {
  requestUrl = 'http://kxsx.zcycs.com/api/';
}
const ajax = opt => {
  opt = opt || {};
  opt.url = opt.url || '';
  opt.data = opt.data || null;
  opt.method = opt.method || 'POST';
  opt.header = opt.header || {
    'content-type': 'application/x-www-form-urlencoded'
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
      token: uni.getStorageSync('loginToken'),
      'content-type': 'application/x-www-form-urlencoded'
    },
    dataType: 'json',
    success: function(res) {
      uni.hideLoading();
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
        });
      } else if (res.data.status == 1) {
        opt.success(res.data);
      } else if (res.data.status == -10086 || res.data.status == -1) {
        uni.navigateTo({
          url: '../pages/login/login'
        });
      } else if (res.data.status == -10087) {
        //用户被拉黑
        uni.navigateTo({
          url: '/pages/first/first?msg=' + res.data.msg
        });
      } else if (res.data.status == -10088) {
        //未通过 1:通过中，2：认证通过，3：认证失败,未审核通过,4:禁用',
        uni.navigateTo({
          url:
            '/pages/first/first?real_status=' +
            res.data.data.real_status +
            '&msg=' +
            res.data.msg
        });
      } else if (res.data.status == -10089) {
        //未提交 -1未审核
        uni.navigateTo({
          url:
            '/pages/first/first?real_status=' +
            res.data.data.real_status +
            '&msg=' +
            res.data.msg
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: res.data.msg
        });
      }
    },
    fail: function() {
      uni.hideLoading();
      uni.showToast({
        icon: 'none',
        title: '请稍后重试'
      });
    },
    complete: function() {}
  });
};
const ajaxs = (url, data, success, header='application/x-www-form-urlencoded') => {
  let opt = {};
  opt.url = url;
  opt.data = data;
  opt.method = 'POST';
  opt.header = {
    'content-type': 'application/x-www-form-urlencoded'
  };
  opt.success = success || function() {};
  uni.showLoading({
    title: '加载中'
  });
  uni.request({
    url: requestUrl + opt.url,
    //url: "http://www.mt.com/com/" + opt.url,
    data: opt.data,
    method: opt.method,
    header: {
      token: uni.getStorageSync('loginToken'),
      'content-type': header
    },
    dataType: 'json',
    success: function(res) {
      uni.hideLoading();
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
        });
      } else if (res.data.status == 1) {
        opt.success(res.data);
      } else if (res.data.status == -10086 || res.data.status == -1) {
        uni.navigateTo({
          url: '/pages/login/login'
        });
      } else if (res.data.status == -10087) {
        //用户被拉黑
        uni.navigateTo({
          url: '/pages/first/first?msg=' + res.data.msg
        });
      } else if (res.data.status == -10088) {
        //未通过 1:通过中，2：认证通过，3：认证失败,未审核通过,4:禁用',
        uni.navigateTo({
          url:
            '/pages/first/first?real_status=' +
            res.data.data.real_status +
            '&msg=' +
            res.data.msg
        });
      } else if (res.data.status == -10089) {
        //未提交 -1未审核
        uni.navigateTo({
          url:
            '/pages/first/first?real_status=' +
            res.data.data.real_status +
            '&msg=' +
            res.data.msg
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: res.data.msg
        });
      }
    },
    fail: function() {
      uni.hideLoading();
      uni.showToast({
        icon: 'none',
        title: '请稍后重试'
      });
    },
    complete: function() {}
  });
};

function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500;
  }

  let _lastTime = null;
  return function() {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn();
      _lastTime = _nowTime;
    }
  };
}
module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  ajaxs: ajaxs,
  throttle: throttle
};
