//获取应用实例
var app = getApp()
var notes = app.globalData.notes


Page({
   data: {
      note : {
          id : '',
          messages : [],
          title : '',
          reminder : false,
          reminderTimestamp : '',
          timestamp : '',
      },
      inputValue : '',
      file : 'file',
      speakMode : false,
      inputMode : true,
      inputFocus : false,
      date : '',
      time : '',
      dateRangeStart : '',
    },
    onLoad : function(option) {
        // option.index = 1;
        // console.log(this.data.note)
        // console.log(option)

        // 绑定this.data.note与note[index]
        if (option.index) {
            this.data.note = notes[option.index]
        } else {
            var index = notes.length
            notes[index] = this.data.note;
            // this.data.note.id = id;
        }
        // console.log(this.data.note)
        // console.log(notes)
    },
    onReady : function(e){
        var date = this.data.note.reminderTimestamp ? new Date(this.data.note.reminderTimestamp) : new Date();
        var today = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
        var now = [date.getHours(), date.getMinutes()].join(':')


        this.setData({
            date : today, 
            dateRangeStart : today,
            time : now,
        })
    },
    listenTitle : function(e) {
        this.data.note.title = e.detail.value
    },
    listenReminder : function(e) {
        this.data.note.reminder = e.detail.value
        this._updateTimestamp()
    },
    save : function(e) {
        // console.log(this.data.note)
        this.data.note.timestamp = new Date().getTime()
        console.log(notes)
        // 同步接口不可用
        wx.setStorage({
          key:'notes',
          data:notes, 
        })
    },
    listenDatePicker : function(e){

        console.log(e)
        this.setData({
            date : e.detail.value,
        })
        this._updateTimestamp()
    },
    listenTimePicker : function(e){
        this.setData({
            time : e.detail.value,
        })
        this._updateTimestamp()
    },
    _updateTimestamp : function() {
        let date = new Date([this.data.date, this.data.time + ':00'].join(' '))
        this.data.note.reminderTimestamp = date.getTime();
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
