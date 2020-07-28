// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectCount:0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo=wx.getStorageSync('userInfo');
    this.setData({userInfo});

    /**获取收藏商品数量 */
    const collect = wx.getStorageSync('collect')||[];
    const collectCount=collect.length;
    this.setData({
      collectCount
    })
  },
})