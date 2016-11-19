//index.js
//获取应用实例
var app = getApp()
Page({
   data: {
      focus: false,
      messages : [],
      inputValue : '',
      file : 'file',
    },
    onReady : function(e) {
        this.audioCtx = wx.createAudioContext('record')
    },
    sendMessage : function(e){
        console.log(this.data.inputValue)
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

        console.log(this.data)
    }, 

    bindInputChange : function(e) {
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
