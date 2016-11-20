//index.js
//获取应用实例
var app = getApp()
var notes = app.globalData.notes;
Page({
   data: {
      id : '',
      messages : [],
      inputValue : '',
      file : 'file',
      title : '',
      speakMode : false,
      inputMode : true,
      inputFocus : false,
      date : '',
      time : '',
      dateRangeStart : '',
    },
    onLoad : function(option) {
        var id = option.query.id
        if (!id) {
            var ids = Object.keys(notes)
            id = ids.length == 0 ? 1 : Math.max(...ids) + 1
        }
        console.log(id)

        this.setData({
            id : id,
        })
    },
    onReady : function(e){
        var date = new Date();
        var today = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
        var now = [date.getHours(), date.getMinutes()].join(':')


        this.setData({
            date : today, 
            dateRangeStart : today,
            time : now,
        })
    },
    listenTitle : function(e) {
        this.data.title = e.detail.value
    },
    save : function(e) {
        notes[this.data.id] = this.data

        console.log(notes)
        wx.setStorageSync({
          key:key,
          data:notes
        })
    },
    datePickerListener : function(e){
        this.setData({
            date : e.detail.value,
        })
    },
    timePickerListener : function(e){
        this.setData({
            time : e.detail.value,
        })
    },
    switcher : function(e) {
        this.setData({
            speakMode : ! this.data.speakMode,
            inputMode : ! this.data.inputMode,
            inputFocus : ! this.data.inputMode
        })
    },
    sendMessage : function(e){
        if (this.data.inputValue == '') return 
        
        this.data.messages.push({
                text : this.data.inputValue,
                date  : {
                    hour : (new Date()).getHours(),
                    minute : (new Date()).getMinutes(),
                    second : (new Date()).getSeconds(),
                }
            })
        this.setData({
            messages : this.data.messages,
        })

        // console.log(this.data)
    }, 

    listenInput : function(e) {
        this.data.inputValue = e.detail.value
    },

    bindSend : function(e) {
        console.log(this.data.inputValue)
        this.setData({
            inputValue : '',
        })
        console.log(this.data.inputValue)
    },

    record(e) {
        console.log(e)
        // wx.showToast({title : 'toast'})
        var that = this;
        wx.startRecord({
            success : function(res) {
                console.log(res)

                var file = res.tempFilePath
                wx.saveFile({
                    tempFilePath : res.tempFilePath,
                    success : function(res) {
                      console.log('save success')
                      console.log(res.savedFilePath)
                      that.setData({
                          file : res.savedFilePath,
                      })
                        
                    }
                })
                // wx.showToast({title : 'success'})
            },
            fail : function(res) {
                console.log('fail')

                wx.showToast({title : 'fail'})
            },
            complete : function() {
              wx.showToast({title : 'complete'})
            }
        })
    },

    stopRecord(e) {
        wx.stopRecord();
    },

    play(e) {
      console.log('play')
      console.log(this.data.file)
       // this.audioCtx.play();
       wx.playVoice({
          filePath : this.data.file,
          
       })
    },

    startPlay(e) {
        console.log('start')
    }


})
