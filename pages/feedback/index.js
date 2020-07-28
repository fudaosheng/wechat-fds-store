import regeneratorRuntime from '../../libs/runtime/runtime'
import {_chooseImage,_showToast} from '../../utils/wxSync'
Page({
  data: {
    tempFilePaths:[],
    list:['功能建议','购买遇到的问题','性能问题','其他'],
    currentIndex:0,
    value:''
  },

  onLoad: function (options) {

  },
  /**提交 */
  sub(){
    if(this.data.value==''){
      _showToast({title:'反馈内容不能为空'});
      return;
    }else{
      _showToast({title:'上传成功',icon:'success'});
      wx.navigateBack({
        delta: 1,
      });
      this.setData({
        tempFilePaths:[],
        currentIndex:0,
        value:''
      });
    }
  },
  async chooseImg(){
    const res=await _chooseImage();
    console.log(res);
    let {tempFilePaths} = res;
    this.setData({
      tempFilePaths:[...this.data.tempFilePaths,...tempFilePaths]
    });
  },
  handleTap(e){
    let {index}=e.currentTarget.dataset;
    this.setData({currentIndex:index});
  },
  hanleInput(e){
    let {value}=e.detail;
    this.setData({value});
  }
})