var app = getApp()
var notes = app.globalData.notes;
Page({
    data : {
        notes : notes,
    },
    onLoad(option) {
        console.log(this.data.notes)
    },
    onShow() {
        this.setData({
            notes : notes,
        })
    },
    addNote(e) {
        wx.navigateTo({
            url : '/pages/index/index?index=',
        })
    }
})