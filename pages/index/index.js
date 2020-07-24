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
    this.setData({
      foolList: res.data.message
    })
  })
  },

})
