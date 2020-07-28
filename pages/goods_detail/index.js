import regeneratorRuntime from '../../libs/runtime/runtime'
import {_goodDetail,Good} from "../../network/good_detail"
Page({

  data: {
    goods_id:0,
    good:null,
    isCollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {goods_id}=options;
    this.setData({goods_id});
    this.getGoodDetail();
  },
  /**收藏商品 */
  collect(){
    let isCollect=!this.data.isCollect;
    this.setData({isCollect});
    let collect=wx.getStorageSync('collect')||[];
    if(this.data.isCollect){
      let obj=this.data.good;
      let good=new Good(this.data.goods_id,obj.goods_name,obj.pics[0],obj.goods_price,1);
      collect.push(good);
    }else{
      let index=collect.findIndex(item=>{
        return item.goods_id==this.data.goods_id;
      });
      collect.splice(index,1);
    }
    wx.setStorageSync('collect', collect);
  },
  /**加入购物车 */
  addCart(){
    let obj=this.data.good;
    let good=new Good(this.data.goods_id,obj.goods_name,obj.pics[0],obj.goods_price,1);
    /**获取本地缓存
     * getStorage异步获取参数Object，getStorageSync同步获取参数String
     */
    let cart = wx.getStorageSync("cart")||[];
    
    /**查找购物车是否有本商品 */
    let index=cart.findIndex(item=>{
      return item.goods_id==this.data.goods_id;
    })

    if(index==-1){//cart中没有本商品
      cart.push(good);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    if(index==-1){
      wx.showToast({
        title: '添加购物车成功',
        icon:'success',
        mask:true
      })
    }else{
      wx.showToast({
        title:'商品数量+1',
        icon:'success',
        mask:true
      })
    }
  },
  /**放大预览滚动条图片 */
  swiperItemClick(e){
    console.log(e);
    let current=e.currentTarget.dataset.url;
    let urls=this.data.good.pics.map(item=>{
      return item.pics_mid_url;
    });
    /**priviewImage的urls只能是string数组 */
    wx.previewImage({
      urls,
      current
    })
  },
  async getGoodDetail(){
   const res=await _goodDetail(this.data.goods_id);
   let {message} =res.data;
   this.setData({
     good:{
      pics:message.pics,
      goods_price:message.goods_price,
      goods_name:message.goods_name,
      /**aphone不支持webp格式图片 ,对webp图片进行个简单替换
       * replace正则如果不是全局匹配只会替换一个
      */
      goods_introduce:message.goods_introduce.replace(/\.webp/g,'.jpg'),
     }
   })
  }
})