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
    autoplay: false,
    interval: 500,
    duration: 10,
    verOrder: 0,
    timeList: []
  },

  selectImg: function () {
    // 查出所有版面图
    var that = this;
    wx.request({
      url: `${getApp().data.url}tbpaper.do?epaper=homeSrc`,
      method: 'POST',
      data: {
        "Sj": getApp().data.newTime,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        res.data.forEach(function (item) {
          that.data.imgList.push(item.perVerImgUrl)
        })
        var imgList = that.data.imgList.filter(function (element, index, self) {
          return self.indexOf(element) === index;
        });
        that.setData({
          imgList: imgList
        })
        console.log(that.data.imgList)
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
      url: `${getApp().data.url}tbpaper.do?epaper=homeArticle`,
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
        url: `${getApp().data.url}tbpaper.do?epaper=homePaper`,
        method: 'POST',
        data: {
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data[0]);
          var newTime = res.data[0].liuDate
          getApp().data.newTime = newTime
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
        show: ''
      })
    } else {
      this.setData({
        show: 'none'
      })
    }
  },
  jumpPageInfo: function (e) {
    console.log(e)
    var click = e.currentTarget.dataset.click
    var title = e.currentTarget.dataset.title
    var verorder = e.currentTarget.dataset.verorder

    var images = e.currentTarget.dataset.images
    var liudate = e.currentTarget.dataset.liudate
    var vername = e.currentTarget.dataset.vername

    getApp().data.imageList = e.currentTarget.dataset.images
    getApp().data.content = e.currentTarget.dataset.content
    wx.navigateTo({
      url: '../newsInfo/newsInfo?click=' + click + '&&title=' + title + '&&verorder=' + verorder + '&&images=' + images + '&&liudate=' + liudate + '&&vername=' + vername,
    })
  },
  // 3、点击版次
  bindPickerChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value].substring(0, 2))
    var verOrder = parseInt(this.data.array[e.detail.value].substring(0, 2) - 1);
    this.setData({
      verOrder: verOrder
    })
    console.log(this.data.verOrder)
  },

//选择时间
  bindTimeChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', this.data.timeList[e.detail.value])
    getApp().data.newTime = this.data.timeList[e.detail.value]
    this.selectImg();
    this.selectInfo();
    this.setData({
      verOrder: 0
    })
  },
  onShow: function () {
    wx.clearStorage()
    this.setData({
      show: 'none',
      url: getApp().data.url
    })
    console.log(getApp().data.url, "全局路径")
    var that = this;
    // 查出时间列表
    wx.request({
      url: `${getApp().data.url}tbpaper.do?epaper=homePaperDate`,
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
    console.log(e.detail.current);
    this.setData({
      verOrder: e.detail.current
    })
  }
})


