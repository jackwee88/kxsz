<template>
  <view>
    <!--pages/shuhuajs/shuhuajs.wxml-->

    <view class="shuhuajs">
      <view class="navtab">
        <view
          :class="'navtab_item ' + (item.typeId == currentId ? 'nav-active':'')"
          v-for="(item, id) in section"
          :key="id"
          @tap.stop="handleTap(item.typeId)"
        >{{item.name}}</view>
      </view>

      <view class="cont-item">
        <view class="search">
          <image class="searchicon" src="/static/img/shuhuajs/search.png" />
          <input
            class="searchinput"
            placeholder-class="place-hoder"
            placeholder="请输入搜索的作品"
            :value="keyword"
            @input="keywordFun"
          />
        </view>
        <!-- <view class='swiperlist'> -->
        <view
          class="swiperitem swiperitem_left"
          v-for="(item, index) in tabcontitem"
          :key="index"
          @tap="details(item.wk_id)"
        >
          <image class="swiperitemimg" :src="item.picture_arr[0]" />
          <view class="texts">
            <text class="workuserinfo">{{item.title}}</text>
          </view>
        </view>
        <!-- </view> -->
      </view>
    </view>

    <template is="toTop"></template>
  </view>
</template>

<script>
import { ajax } from "../../../utils/public.js";
export default {
  data() {
    return {
      page: 1,
      count: 1,
      pagesize: 10,
      section: [
        {
          name: "书画鉴赏",
          typeId: "1"
        },
        {
          name: "学生作品展",
          typeId: "2"
        }
      ],
      type: 1,
      workuserinfo: "王高升中国画",
      tabcontitem: [],
      currentId: 1,
      keyword: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad(){

  // }
  onLoad() {
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  onReachBottom() {
    this.getData();
  },

  methods: {
    setData(param) {
      for (const key in param) {
        const element = param[key];
        this[key] = element;
      }
    },
    //点击切换
    handleTap: function(id) {
      if (id) {
        (this.type = id),
          (this.page = 1),
          (this.tabcontitem = []),
          (this.currentId = id);
        this.getData();
      }
    },
    keywordFun: function(e) {
      var that = this;
      that.setData({
        type: that.type,
        page: 1,
        tabcontitem: [],
        keyword: e.detail.value
      });
      var timer = null;
      clearTimeout(timer);
      timer = setTimeout(function() {
        that.getData();
      }, 1000);
    },

    getData(e) {
      var that = this;
      var param = {
        type: that.type,
        keyword: that.keyword,
        page: that.page,
        page_size: that.pagesize
      };

      if (that.count < that.page) {
        // wx.showToast({
        //   title: '暂无更多信息',
        //   icon:'none'
        // })
      } else {
        ajax({
          url: "works/worksList",
          data: param,
          success: res => {
            var tabcontitem = that.tabcontitem;
            let data = res.data.data;
            that.setData({
              page: that.page + 1,
              count: data.count > 1 ? data.count : 1,
              tabcontitem: tabcontitem.concat(data.list)
            });
            wx.stopPullDownRefresh();
          }
        });
      }
    },

    details: function(wk_id) {
      wx.navigateTo({
        url: "../shjx-detail/shjx-detail?id=" + wk_id
      });
    },

    toTop(e) {
      var that = this;
      that.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
    }
  }
};
</script>
<style>
@import "./shuhuajs.css";
</style>