const localData = new Map()

const set = (key, data, local = false) => {
  localData.set(key,data)
  try {
    // 持久化到本地
    if(local){
      wx.setStorageSync(key, data)
    }
  } catch (e) {
    console.log('持久化到本地失败',e)
  }
}

const get = (key) => {
  let result = localData.get(key)

  if(!result){
    try{
      result = wx.getStorageSync(key)
    }catch(e){
      console.log(e)
    }
  }
  return result

}
const clean = (key = '', local = true) => {
  if(!key && key.length<=0){
    localData.clear()
    if(local){
      try{
        wx.clearStorageSync()
      }catch(e){
        console.log(e)
      }
    }
  }else{
    localData.delete(key)
    if(local){
      try{
        wx.removeStorageSync(key)
      }catch(e){
        console.log(e)
      }
    }
  }

}



export {
  set,
  get,
  clean
}