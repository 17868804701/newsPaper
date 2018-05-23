//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    array: [],
    timeList: [],
    motto: 'Hello World',
    userInfo: {},
    imgList: [],
    show: 'none',
    index: "0",
    select: "",
    indicatorDots: false,
    interval: 0,
    duration: 0,
    verOrder: 0,
    timeList: [],
    count:"",
    coverShow:"none"
  },
  selectImg: function () {
    // 查出所有版面图
    var that = this;
    wx.request({
      url: `${getApp().data.url}smallroutine.do?epaper=homeSrc`,
      method: 'POST',
      data: {
        "Sj": getApp().data.newTime,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res,"结果");
        res.data.forEach(function (item) {
          that.data.imgList.push(item.perVerImgUrl + item.verOrder)
        })
        var imgList = that.data.imgList.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });
        var imgLists = []
        imgList.forEach(function(item){
          imgLists.push(item.substring(0,item.length-2))
        })
        that.setData({
          imgList: imgLists
        })
     
        console.log(that.data.imgList, "去重后图片列表")
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {
      }
    })
  },
  selectInfo: function () {
    var that = this;
    // 根据时间查出详情
    wx.request({
      url: `${getApp().data.url}smallroutine.do?epaper=homeArticle`,
      method: 'POST',
      data: {
        "Sj": getApp().data.newTime,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data, "获取详情");
        var result = res.data
        var newArr = [];
        for (var i = 0; i < result.length; i++) {
          var item = result[i];
          var arr = (result[i].coordinate.toString()).replace(";", ",").replace(";", ",").replace(";", ",").split(",");
          // console.log(arr)
          item.x1 = arr[0];
          item.x2 = arr[1];
          item.x3 = arr[2];
          item.x4 = arr[3];
          item.x5 = arr[4];
          item.x6 = arr[5];
          item.x7 = arr[6];
          item.x8 = arr[7];
          newArr.push(item);
        }
        console.log(newArr,"新的到的数组");
        that.setData({
          areaItem: newArr
        })
        that.setData({
          img: res.data[0].perVerImgUrl,
          resault: res.data
        })
        console.log(that.data.resault,'**********************************************')
        res.data.forEach(function (item) {
          that.data.array.push(item.verOrder + "-" + item.verName)
        })
        var array = that.data.array.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });
        that.setData({
          array: array
        })
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          imgwidth: res.windowWidth,
          imgheight: res.windowHeight
        })
      }
    }),
      // 查出最新时间
      wx.request({
      url: `${getApp().data.url}smallroutine.do?epaper=homePaper`,
        method: 'POST',
        data: {
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res,"成功*****************************************");
          var newTime = res.data[0].liuDate
          var paperName = res.data[0].paperName
          getApp().data.newTime = newTime
          getApp().data.paperName = paperName
          that.selectImg();
          that.selectInfo();
        }
        ,
        fail: function (err) {
  
        },
        complete: function (data) {
  
        }
      })

  },
  mulu: function () {
    if (this.data.show == 'none') {
      this.setData({
        show: '',
        coverShow:""
      })
    } else {
      this.setData({
        show: 'none',
        coverShow:"none"
      })
    }
  },
  jumpPageInfo: function (e) {
    console.log(e)
    getApp().data.imageList = e.currentTarget.dataset.images
    getApp().data.content = e.currentTarget.dataset.content
    // wx.navigateTo({
    //   url: '../newsInfo/newsInfo?click=' + click + '&&title=' + title + '&&verorder=' + verorder + '&&images=' + images + '&&liudate=' + liudate + '&&vername=' + vername + '&&title1=' + title1 + '&&leadTitle=' + leadTitle,
    // })
  },
  // 3、点击版次
  bindPickerChange: function (e) {
    this.setData({
      show: 'none',
      coverShow: "none"
    })
    console.log("取消弹框框")
    console.log(e)
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value].substring(1, 3))
    var verOrder = parseInt(this.data.array[e.detail.value].substring(1, 3) - 1);
    console.log(verOrder)
    this.setData({
      verOrder: verOrder
    })
    console.log(this.data.verOrder)
  },
  // 点击遮罩层去掉目录
  exit:function(){
    this.setData({
      show: 'none',
      coverShow: "none"
    })
  },
//选择时间
  bindTimeChange: function (e) {
    var that = this;
    this.imgLoad();
    this.setData({
      count:0
    })
    setTimeout(function(){
      that.setData({
        show: 'none',
        coverShow: "none",
      })
    },3000)

    console.log(e)
    console.log('picker发送选择改变，携带值为', this.data.timeList[e.detail.value])
    getApp().data.newTime = this.data.timeList[e.detail.value]
    this.selectImg();
    this.selectInfo();
    this.setData({
      verOrder: 0,
      imgList:[],
    })
  },
  onShow: function () {
    // wx.clearStorage()

    this.setData({
      show: 'none',
      coverShow:"none",
      count:0,
      url: getApp().data.url
    })
    console.log(getApp().data.url, "全局路径")
    var that = this;
    // 查出时间列表
    wx.request({
      url: `${getApp().data.url}smallroutine.do?epaper=homePaperDate`,
      method: 'POST',
      data: {
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data,"获取时间列表");
        that.setData({
          timeList:res.data
        })
        // that.onLoad();
      }
      ,
      fail: function (err) {

      },
      complete: function (data) {

      }
    })
  },
  // 左右滑动
  change: function (e) {
    console.log(e);
    if(e.detail.source=='touch'){
      this.setData({
        verOrder: e.detail.current
      })
    }
  },
  imgLoad:function(e){
    var cuonts = this.data.count+1
    console.log(cuonts,"加载次数")
    console.log(e)
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.count++ == this.data.imgList.length-1){
    wx.hideLoading(); 
    }
  }
})



