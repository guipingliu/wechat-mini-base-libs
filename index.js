import { on, off, emit } from './EventsBus/index.js';
import {
  init,
  updateToken,
  setTokenTag,
  request,
  upload,
  requestWidthData,
  getBaseURL,
  setRespInterceptor,
  getCurrentToken,
  requestWidthProcessRes
} from './Http/index.js';
import { addRequest } from './NetworkRequest/index.js';
import {
  refresh,
  paging
} from './Paging/index.js';
import {
  set,
  get,
  clean
} from './Storage/index.js';
import {
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
} from './Utils/index.js';

let eventsBus = {
  on, off, emit
}

let http = {
  init,
  updateToken,
  setTokenTag,
  request,
  upload,
  getBaseURL,
  getCurrentToken,
  setRespInterceptor,
  requestWidthData,
  requestWidthProcessRes
}
let networkRequest = {
  addRequest
}
let page = {
  refresh,
  paging
}
let storage = {
  set,
  get,
  clean
}
let utils = {
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
export {
  eventsBus,
  http,
  networkRequest,
  page,
  storage,
  utils
}
