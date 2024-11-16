/**
 * 如何使用!
 *
 * 第一步：
 *
 * // 导入文件
 const navCore = require('./NavCore.js')
 *
 * // 使用登录拦截
 navCore.useLoginIntercept(false, '/pages/auth/auth')
 *
 * // 更新登录状态
 navCore.isLogin = true
 *
 * 第二步：
 *
 * // 在需要登录拦截的方法上（注意格式）
 * // 当authNav为true时候未登录将自动跳转授权页面
 xxx: navCore.loginIntercept(function (e) {
      })
 */
// 当前登录状态
var isLogin = false
// 登录授权页面
var loginPage = null
export const loginStatus = () => {
  return isLogin
}

export const updateLogin = (login) => {
  isLogin = login
}
/**
 * 使用登录拦截
 * @param {*} cIsLogin
 * @param {*} cLoginPage
 */
export const useLoginIntercept = (cIsLogin, cLoginPage) => {
  isLogin = cIsLogin
  loginPage = cLoginPage
}

/**
 * 登录拦截
 * @param {*} fn 需要绑定的函数
 * @param {*} authNav 是否自动跳转登录页面
 * @param {*} navParmas "?xx=xx"
 */
export const loginIntercept = (fn, authNav = true, navParmas = '') => {
  return function (e) {
    e._isLogin = isLogin

    if (!isLogin && authNav) {
      if (!loginPage) {
        console.e('loginPage == null')
        return
      }
      if (authNav) {
        wx.navigateTo({
          url: loginPage + navParmas,
        })
      }
    } else {
      fn.call(this, e)
    }
  }
}
