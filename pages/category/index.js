import { _cateGory } from '../../network/category'
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({

  data: {
    menu: [],
    content: [],
    currentIndex: 0,
    scrollTo:0
  },
  Cates: [],
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    /**使用本地存储 */
    /**1.本地存储为空 */
    if (!Cates) {
      this.handleDate();
    } else {
      /**2.本地存储不为空 
       * 2.1判断数据是否过期
      */
      if (Date.now() - Cates.time > 1000 * 60 * 10) { //10分钟,说据过期
        this.handleDate();
      } else {
        this.Cates=Cates.data;
        let _menu = this.Cates.map(item => {
          return item.cat_name;
        })
        let _contnet = this.Cates[0].children;
        this.setData({
          menu: _menu,
          content: _contnet
        })
      }
    }
  },

  /**自定义函数 */
  menuClick(e) {
    let currentIndex = e.currentTarget.dataset.index;
    this.setData({ currentIndex });
    this.setContent();
  },
  /**设置右侧数据 */
  setContent() {
    //  console.log(Object.prototype.toString.call(this.data.currentIndex));
    this.setData({
      content: this.Cates[this.data.currentIndex].children,
      scrollTo:0
    })
  },
  /**获取初始化数据 */
  async handleDate() {
    /**es6写法 */
    
    // _cateGory().then(res => {
    //   this.Cates = res.data.message;
    //   /**保存数据 */
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    //   let _menu = this.Cates.map(item => {
    //     return item.cat_name;
    //   })
    //   let _contnet = this.Cates[0].children;
    //   this.setData({
    //     menu: _menu,
    //     content: _contnet
    //   })
    // })

    /**es7写法 */
    const res = await _cateGory();
    this.Cates = res.data.message;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      let _menu = this.Cates.map(item => {
        return item.cat_name;
      });
      let _contnet = this.Cates[0].children;
      this.setData({
        menu: _menu,
        content: _contnet
  })
}
})