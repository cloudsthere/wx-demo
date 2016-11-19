var app = getApp()
Page({
    data: {
        text : 'jj',
    },
    bindInputChange(e) {
        this.setData({
            text : e.detail.value
        })
        console.log(this.data)
    },
    bindButtonTap(e) {
        this.setData({
            text : 'bb'
        })
    }
})
