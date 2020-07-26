import regeneratorRuntime from '../../libs/runtime/runtime'
import { _getSetting, _chooseAddress, _openSetting ,_showModel,_showToast} from '../../utils/wxSync.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[],
    totalPrice:0,
    totalCount:0,
  },
  onShow: function () {
    /**判断本地是否有地址缓存 */
    const address=wx.getStorageSync('address')||{};
    this.setData({address});

    let cart = wx.getStorageSync('cart')||[];
    
    cart=cart.filter(item=>{
      return item.selected;
    })
    this.setData({cart});

    this.computedCart();
  },
  /**结算 */
  async buy(){
    if(!this.data.address.userName){
      await _showToast({title:'您还没有添加收获地址~'});
      return;
    }
    if(this.data.cart.length==0){
      await _showToast({title:'您还没有要购买的物品~'});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  /**商品复选框 */
  check(e){
    let {index} =e.currentTarget.dataset;
    let cart=this.data.cart;
    cart[index].selected=!cart[index].selected;
    this.reset(cart);
  },
  /**重置 */
  reset(cart){
    this.setData({cart});
    wx.setStorageSync('cart',cart);
    this.computedCart();
  },
  /**获取总价，结算数量，是否全选 */
  computedCart(){
    let totalPrice=0;
    let totalCount=0;
    const arr=this.data.cart.filter(item=>{
      return item.selected;
    });
    totalCount=arr.length;
    totalPrice=arr.reduce((pre,item)=>{
      return pre+item.price*item.num;
    },0);
    this.setData({
      totalCount,
      totalPrice
    })
  },
})