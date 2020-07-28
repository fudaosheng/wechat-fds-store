import { _Swiper, _Cate, _foolData} from '../../network/home.js'
const app = getApp()

Page({
  data: {
    swiperList: [],
    cateList: [],
    foolList:[],
  },
  onLoad: function () {
    _Swiper().then(res => {
      this.setData({
        swiperList: res.data.message
      })
    });
    _Cate().then(res => {
      this.setData({
        cateList: res.data.message
      })
    })
  _foolData().then(res=>{
    let foolList=res.data.message;
    /**对链接进行转换 */
    for(let i of foolList){
      for(let j=0,length=i.product_list.length;j<length;j++){
        let list=i.product_list;
        list[j].navigator_url=list[j].navigator_url.replace('?','/index?');
      }
    }
    this.setData({foolList})
  })
  },

})
