import regeneratorRuntime from '../../libs/runtime/runtime'
import {_Search} from '../../network/good_detail'
import {debounce} from '../../utils/tool.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  handInput(e){
    let {value}=e.detail;
    this.setData({value});
    debounce(this.sub(),1500);
  },
  async sub(){
    const res=await _Search(this.data.value);
    let goods=res.data.message;
    this.setData({goods});
  }
})