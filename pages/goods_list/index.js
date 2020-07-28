import regeneratorRuntime from '../../libs/runtime/runtime'
import {_good_List} from '../../network/good-list'
Page({
  data: {
    tabs:['综合','销量','价格'],
    currentIndex:0,
    cid:0,
    query:'',
    pagenum:1,
    pagesize:10,
    goodList:[],
  },
  totalPageSize:0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let cid=options.cid||'';
    let query=options.query||'';
    this.setData({cid,query});
    console.log(this.data.cid,query);
    this.handleData();
  },
  onReachBottom(){
    if(this.totalPageSize==this.data.pagenum){
      wx.showToast({
        title: '没有数据了哦',
      })
    }else{
      let num=this.data.pagenum+1;
      this.setData({
        pagenum:num
      })
      this.handleData();
    }
  },
  onPullDownRefresh(){
    this.setData({
      pagenum:1,
      goodList:[],
    });
    this.handleData();
    wx.stopPullDownRefresh();
  },
  itemClick(e){
    const {detail} =e;
    this.setData({currentIndex:detail});
  },
  /**页面数据 */
  async handleData(){
    const res=await _good_List(this.data.query,this.data.cid,this.data.pagenum,this.data.pagesize);
    console.log(res);
    let {goods,total} =res.data.message;
    this.totalPageSize=Math.ceil(total/this.data.pagesize);
    this.setData({
      goodList:[...this.data.goodList,...goods]
    })
  }
})