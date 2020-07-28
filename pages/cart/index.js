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
    allSelect:false
  },
  onShow: function () {
    /**判断本地是否有地址缓存 */
    const address=wx.getStorageSync('address')||{};
    this.setData({address});

    const cart = wx.getStorageSync('cart')||[];
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
  add(e){
    let {index} =e.currentTarget.dataset;
    let cart=this.data.cart;
    cart[index].num++;
    this.reset(cart);
  },
  async reduce(e){
    let {index} =e.currentTarget.dataset;
    let cart=this.data.cart;
    cart[index].num--;
    if(cart[index].num==0){
     const confirm=await _showModel('您是否要删除该商品？');
     if(confirm){
       cart.splice(index,1);
     }else{
       cart[index].num++;
     }
    };
    this.reset(cart);
  },

  /**全选 */
  allchecked(){
    let allSelect=this.data.allSelect;
    let cart=this.data.cart;
    if(allSelect){//全不选
      cart.map(item=>{
        return item.selected=false;
      })
    }else{
      cart.map(item=>{
        return item.selected=true;
      })
    }
    allSelect=!allSelect;
    this.setData({
      allSelect,
      cart
    })
    this.computedCart();
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
    let allSelect=false;
    let totalPrice=0;
    let totalCount=0;
    const arr=this.data.cart.filter(item=>{
      return item.selected;
    });
    totalCount=arr.length;
    if(totalCount==this.data.cart.length&&totalCount!=0){
     allSelect=true;
    }
    totalPrice=arr.reduce((pre,item)=>{
      return pre+item.goods_price*item.num;
    },0);
    this.setData({
      allSelect,
      totalCount,
      totalPrice
    })
  },

  /**获取用户收获地址
   * 1.判断是不是用户第一次获取
   * 是：wx.getSetting 返回值result.authSetting['scope.address']属性undefined,直接获取收货地址，
   * 否：
   * 1.用户之前成功获取过权限，wx.getSetting返回值result.authSetting['scope.address']为ture,也可重复wx.chooseAddress
   * 2.用户之前拒绝授权权限，wx.getSetting返回值result.authSetting['scope.address']为false
   * 2.1调用wx.openSetting重新获取权限
   * 2.2获取权限后调用接口获取收货地址
   */
  async getAddress() {
    try {
      /**获取权限信息 */
      let set = await _getSetting();
      /**getSetting为ture，之前成功获取过权限能直接调用地址接口 */
      if (set.authSetting['scope.address'] || set.authSetting['scope.address'] == undefined) {
        console.log('已授权');
      } else {
        /**用户之前拒绝过授权，打开授权面板重新授权 */
        await _openSetting();
      }
      const address = await _chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      this.setData({ address });
      wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error);
    }
  }
})