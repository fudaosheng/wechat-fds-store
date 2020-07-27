// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo(){
    wx.getUserInfo({
      success:res=>{
        const {userInfo}=res;
        wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
          delta: 1,
        })
      },
      fail:err=>{
        console.log(err);
      }
    })
  }
})