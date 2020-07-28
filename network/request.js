let ajaxTimer = 0;
export function request(option) {
    ajaxTimer++;
    wx.showLoading({
        title: '加载中',
    })
    const baseUrl = 'https://api-hmugo-web.itheima.net';
    const { url, method, data } = option;
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + url,
            timeout: 5000,
            data: data || '',
            method: method || 'GET',
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject(err);
            },
            complete: () => {
                ajaxTimer--;
                if (ajaxTimer == 0) wx.hideLoading();
            }
        })
    })
}