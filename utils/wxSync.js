/**对wx api进行promise封装 */
export function _getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function _chooseAddress() {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    })
  })
}

/**打开权限面板 */
export function _openSetting() {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: res => {
        resolve(res)
      }
    })
  })
}
/**对话框封装 */
export function _showModel(title) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      success: res => {
        resolve(res.confirm);
      }
    })
  })
}
/**提示框封装 */
export function _showToast(option) {
  const { title, icon, mask } = option;
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: icon||'none',
      mask: mask,
      success: () => {
        resolve()
      }
    })
  })
}