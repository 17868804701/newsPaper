// pages/newsInfo/newsInfo.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  size:30
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    console.log(getApp().data.content);
    console.log(getApp().data.imageList) 
    console.log(getApp().data.newTime.replace(/-/g, "")) 
    var imgUrl = "sxrb/" + getApp().data.newTime.replace(/-/g, "");
    console.log(imgUrl)
    this.setData({
      images: options.images,
      liudate: options.liuDate,
      vername: options.verName,
      title:options.title,
      title1: options.title1,
      leadTitle: options.leadTitle,
      paperName:getApp().data.paperName,
      verorder: options.verorder,
      imgList: getApp().data.imageList,
      miaoshuList: options.miaoshuList,
      // length: getApp().data.imageList.length,
      imgUrl: imgUrl
    })
    var list = []
    var new_list = []
    var lists = []
    console.log(this.data.imgList)
    if (this.data.imgList == undefined){

    }else{
      this.data.imgList.forEach(function (val) {
        list.push(val.split('$$'))
      })
      console.log(list, "结果");
      list.forEach(function(item){
        item.forEach(function(items){
          lists.push(items.replace(/<br>/g, " "))
          console.log(items)
        })
      })
      console.log(lists,"新数组")
      let result = [];
      let size = 2;
      for (let i = 0; i < lists.length;) {
        result.push(lists.slice(i, i + size));
        i += size;
      }
      this.setData({
        list: result
      })
    }
 
    var article = getApp().data.content.replace(/\r\n/g, "<br>&nbsp;&nbsp;");
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)18509161516
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
  var that = this;
   WxParse.wxParse('article', 'html', article, that, 5);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  size:function(){
    this.data.size = this.data.size+5 
    this.setData({
      size: this.data.size
    })
  },
  xsize:function(){
    this.data.size = this.data.size - 5 
    this.setData({
      size: this.data.size 
    })
  }
})