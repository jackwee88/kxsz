# kxsz

uniapp

以 master 为主
每次开发完，要合并 master 要提前 pull 一下
如果合并有冲突
解决一下冲突，查看每个冲突文件，选择是否保存双方代码
然后将再 push

**接口对接**

- [x] 购物车

  - [x] 购物车对接（跳转商品详情未完成）/pages/shoppingcart/shoppingcart
  - [x] 确认订单(支付还未重新对接) /pages/shoppingcart/sureorder/sureorder
  - [x] 开心书写包服务协议 /pages/dzxy/dzxy
  - [x] 发票信息 /pages/invoice
  - [x] 收货地址 /pages/shoppingcart/shaddress/shaddress
  - [x] 新增地址(因为 app 中不支持 picker(mode = region) 待改正) /pages/shoppingcart/newaddress/newaddress

- [x] 大脑开发 /pages/brain/brain

  - [x] 开心连词(分享待做，计划分享到微信显示小程序) /pages/brain/poetry/poetry
  - [x] 趣味选择 /pages/brain/choice/choice
  - [x] 智慧填空(分享功能待做) /pages/brain/fillBlanks/fillBlanks

- [ ] TAB-我的
  - [x] 我的 /pages/my/my
  - [x] 我的积分 /pages/my/huiyuanjifen/huiyuanjifen
  - [x] 积分规则 /pages/my/jifenguize/jifenguize
  - [ ] 会员特权(联系客服按钮未做) /pages/my/huiyuantequan/huiyuantequan
  - [x] 会员信息 /pages/my/huiyuanxinxi/huiyuanxinxi
  - [x] 我的收藏 /pages/my/mycollect/mycollect
  - [x] 我的优惠券 /pages/my/mydiscount/mydiscount
  - [ ] 我的积分订单 /pages/onlinestore/myScoreOrder/myScoreOrder
  - [x] 我的订单 /pages/onlinestore/myOrder/myOrder
  - [ ] 订单详情 (支付以及其他接口已对接，但是还没有测试) /pages/onlinestore/orderdetails/orderdetails
  - [x] 我的视频 /pages/my/videolist/videolist
    - [x] 已购视频 /pages/my/myVideo/myVideo
    - [x] 功能尺教学 /pages/hncjiaoxue_intro/hncjiaoxue_intro
  - [x] 视频礼包 /pages/my/videoGift/videoGift
    - [x] 激活码 /pages/my/activeCode/activeCode
  - [x] 每日签到 /pages/my/daySignin/daySignin
  - [x] 发表日记 /pages/publishedDiary/publishedDiary
  - [x] 打卡记录 /pages/dakaLog/dakaLog
  - [x] **关注** /pages/my/follow/follow
  - [x] **粉丝** /pages/my/fans/fans
