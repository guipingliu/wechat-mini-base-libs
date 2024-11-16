
const rpx2px = (rpx) => {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth
}
const px2rpx = (px) => {
  return px * 750 / wx.getSystemInfoSync().windowWidth
}

/**
 * 格式化日期
 * 2020-02-02
 * @param {*} date new Date()
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatDate = (date, joiner) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(joiner)
}

//字符串转日期格式，strDate要转为日期格式的字符串 
const strToDate = (strDate) => {
  var st = strDate;
  var a = st.split(" "); //这个根据你的字符串决定，如果中间为T则改T
  var b = a[0].split("-");
  var c = a[1].split(":");
  var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
  return date;
}


/**
 * 校验手机号
 */
function checkPhone(phone) {
  if (!(/^1\d{10}$/.test(phone))) {
    return false;
  }
  return true;
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 *
 * 判断对象是否为空
 * @param {*} obj
 */
const isEmpty = (obj) => {

  if (obj === null) {
    return true
  }

  let type = typeof (obj)
  switch (type) {
    case 'undefined':
      return true
    case 'string':
      return obj.length <= 0
    case 'object':
      return Object.keys(obj).length <= 0
  }

  return false

}
/**
 * 函数节流
 * @param fn 需要进行节流操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function throttle(fn, interval) {
  let enterTime = 0; //触发的时间
  let gapTime = interval || 500; //间隔时间，如果interval不传，则默认500ms
  return function () {
    let context = this;
    let backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments[0]); //arguments[0]是事件处理函数默认事件参数event call绑定当前page对象
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/**
 * 函数防抖
 * @param fn 需要进行防抖操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function debounce(fn, interval) {
  let timer;
  let gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments[0]; //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
    timer = setTimeout(function () {
      fn.call(context, args); //args是事件处理函数默认事件参数event  call绑定当前page对象
    }, gapTime);
  };
}

export {
  isEmpty,
  rpx2px,
  px2rpx,
  formatTime,
  formatNumber,
  formatDate,
  strToDate,
  checkPhone,
  throttle,
  debounce
}