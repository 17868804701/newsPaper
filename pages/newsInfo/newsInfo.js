// pages/newsInfo/newsInfo.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
      click: options.click,
      images: options.images,
      liudate: options.liudate,
      vername: options.vername,
      title:options.title,
      verorder: options.verorder,
      imgList: getApp().data.imageList,
      length: getApp().data.imageList.length,
      imgUrl: imgUrl
    })
    console.log(getApp().data.imageList.length,"图片数组长度")
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


  
})