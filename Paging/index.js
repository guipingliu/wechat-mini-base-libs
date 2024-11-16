const init = (that) => {
  const currentModelKey = that.currentModelKey || 'dataModel'
  let data = []
  if (that.data[currentModelKey]) {
    data = that.data[currentModelKey].data
  }
  that.setData({
    [currentModelKey]: {
      size: 10,
      page: 1,
      hasNextPage: true,
      noData: false,
      data: data,
      isRefreshing: false,
      isLoadingMore: false,
      hasError: false,
    }
  })
}
/**
 * 初始化，刷新第一页调用此页
 * @param {*} http
 * @param {*} url
 * @param {*} that
 * @param {*} body
 * @param {*} showLoading
 * @param {*} pagingStart
 * @param {*} pagingEnd
 */
const refresh = (http, url, that, body = {}, showLoading = true, pagingStart = (body) => {
  return body
}, pagingEnd = (e) => { }) => {
  init(that)
  wx.nextTick(() => {
    paging(http, url, that, body, showLoading, pagingStart, pagingEnd)
  })


}
/**
 * 分页
 * 上拉加载调用此方法
 * @param {*} url
 * @param {*} that
 * @param {*} body
 * @param {*} refresh
 */
const paging = (http, url, that, body = {}, showLoading = true, pagingStart = (body) => {
  return body
}, pagingEnd = (e) => { }) => {
  const currentModelKey = that.currentModelKey || 'dataModel'

  if (that.data[currentModelKey].isRefreshing || that.data[currentModelKey].isLoadingMore || !that.data[currentModelKey].hasNextPage) {
    return
  }

  if (showLoading) {
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
  }
  that.setData({
    [`${currentModelKey}.isRefreshing`]: true,
    [`${currentModelKey}.isLoadingMore`]: that.data[currentModelKey].page > 1,
    [`${currentModelKey}.hasError`]: false
  })
  if (!body.size) {
    // 初始化分页大小
    body.size = that.data[currentModelKey].size
  }

  // 初始化当前页码
  body.page = that.data[currentModelKey].page
  body = pagingStart(body)
  http.request(url, "POST", body).then(res => {
    let data = res.data.data
    if (data && data.list) {
      let page = body.page
      let tempList = that.data[currentModelKey].data
      if (page == 1) {
        tempList = []
      }
      // 添加list到data
      tempList.push(...data.list)

      // 判断是不是没有数据
      let noData = tempList.length == 0 && page == 1

      if (data.hasNextPage) {
        page = page + 1
      }
      that.setData({
        [`${currentModelKey}.noData`]: noData,
        [`${currentModelKey}.data`]: tempList,
        [`${currentModelKey}.page`]: page,
        [`${currentModelKey}.hasNextPage`]: data.hasNextPage,
        [`${currentModelKey}.isRefreshing`]: false,
        [`${currentModelKey}.isLoadingMore`]: false,
        [`${currentModelKey}.hasError`]: false
      })

      if (showLoading) {
        wx.hideLoading()
      }
      pagingEnd(null)

    } else {
      error(that, res.msg, showLoading, pagingEnd)
    }
  }).catch(e => {
    error(that, e, showLoading, pagingEnd)
  })
}

const error = (that, e, showLoading, pagingEnd) => {
  const currentModelKey = that.currentModelKey || 'dataModel'
  that.setData({
    [`${currentModelKey}.noData`]: that.data[currentModelKey].data.length == 0,
    [`${currentModelKey}.isRefreshing`]: false,
    [`${currentModelKey}.isLoadingMore`]: false,
    [`${currentModelKey}.hasError`]: true
  })
  if (showLoading) {
    wx.hideLoading()
  }
  pagingEnd(e)
}



export {
  refresh,
  paging
}