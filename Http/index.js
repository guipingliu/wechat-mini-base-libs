// token
var token = ''
// 基础token
var baseToken = ''
// baseURL
var baseURL = ''
// 公共基础header
var baseHeader = {}
// 回调拦截
var respInterceptor = null
var _tokenTag = 'Authorization'
var _tokenPrefix = 'Bearer '

/**
 * 初始化库 网络请求库
 * @param {*} cBaseURL 基础url
 * @param {*} cBaseToken 基础token
 * @param {*} cBaseHeader 基础header
 */
const init = (cBaseURL, cBaseToken, cBaseHeader = {}) => {
  baseURL = cBaseURL
  baseToken = cBaseToken
  baseHeader = cBaseHeader
}

/**
 * 更新token
 * @param {*} cToken 
 */
const updateToken = (cToken) => {
  token = cToken
}

/**
 * http 请求
 * @param {*} url 地址url
 * @param {*} method "GET" "POST"
 * @param {*} data body
 * @param {*} customHeader 自定义header
 */
const request = (url, method = "GET", data = {}, customHeader = {}) => {

  return new Promise((resolve, reject) => {

    let header = getAllHeader(customHeader)
    url = baseURL + url
    wx.request({
      url,
      data,
      method,
      header,
      success: (res) => {
        _processRes(true, res, resolve, reject)
      },
      fail: (res) => {
        _processRes(false, res, resolve, reject)
      }
    })
  })
}

const requestWidthProcessRes = (url, method = "GET", data = {}, loading = true, customHeader = {}) => {

  return new Promise((resolve, reject) => {
    if (loading) {
      wx.showLoading({
        mask: true,
        title: '加载中...',
      })
    }
    request(url, method, data, customHeader).then(res => {
      if (res.data.code == 200) {
        if (loading) {
          wx.hideLoading()
        }
        resolve(res.data.data)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
          mask: true,
        })
        reject(res.data.msg)
      }
    }).catch(e => {
      wx.showToast({
        icon: 'none',
        title: '出错了',
        mask: true,
      })
      reject('出错了')
    })
  })
}

const requestWidthData = (that, url, method = "GET", data = {}, loading = false, customHeader = {}) => {
  requestWidthProcessRes(url, method, data, loading, customHeader).then(res => {
    that.setData({
      data: res
    })
  })
}

/**
 * 上传文件 仅支持单个文件上传
 * @param {*} url 接口地址
 * @param {*} filePath 
 * @param {*} name 
 * @param {*} formData 
 */
const upload = (url, filePath, name = 'files', formData = {
  'fileType': 'IMG'
}, customHeader = {}) => {

  return new Promise((resolve, reject) => {

    let header = getAllHeader(customHeader)
    url = baseURL + url
    wx.uploadFile({
      filePath,
      name,
      url,
      formData,
      header,
      success: (res) => {
        _processRes(true, res, resolve, reject)
      },
      fail: (res) => {
        _processRes(false, res, resolve, reject)
      }
    })
  })

}
const _processRes = (success, res, resolve, reject) => {


  if (respInterceptor) {
    if (respInterceptor(success, res, resolve, reject)) {
      return
    }
  }

  if (success) {

    resolve(res)
  } else {
    reject(res)
  }

}



const getAllHeader = (customHeader = {}) => {

  let header = {
    [_tokenTag]: `${_tokenPrefix}${token && token.length > 0 ? token : baseToken}`
  }
  for (let key in baseHeader) {
    header[key] = baseHeader[key]
  }

  for (let key in customHeader) {
    header[key] = customHeader[key]
  }
  return header
}
const getBaseURL = () => {
  return baseURL
}

const getCurrentToken = () => {
  return token
}
const setRespInterceptor = (_respInterceptor) => {
  respInterceptor = _respInterceptor
}
const setTokenTag = (tokenTag,tokenPrefix) =>{
  _tokenTag =  tokenTag
  _tokenPrefix = tokenPrefix

}

export {
  init,
  setTokenTag,
  updateToken,
  getBaseURL,
  getCurrentToken,
  setRespInterceptor,
  request,
  upload,
  requestWidthData,
  requestWidthProcessRes
}