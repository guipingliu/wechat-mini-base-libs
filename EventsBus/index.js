const events = new Map()
const eventsKey = new Map()
let eid = 0

const on = (event, fn) => {

  let funcList = events.get(event)
  eid = eid + 1
  if (!funcList) {
    funcList = new Array()
    events.set(event, funcList)
  }
  funcList.push({
    fn,
    eid
  })
  eventsKey.set(eid, event)
  return eid

}
const off = (eid) => {
  if (!eid) {
    return
  }
  let eventKey = eventsKey.get(eid)
  let funcList = events.get(eventKey)
  if (!funcList) {
    return
  }
  let removeIndex = -1
  for (let i = 0; i < funcList.length; i++) {
    let obj = funcList[i]
    if (eid == obj.eid) {
      removeIndex = i
      break
    }
  }
  if (removeIndex >= 0) {
    funcList.splice(removeIndex, 1)
  }

  if (funcList.length <= 0) {
    events.delete(eventKey)
  }
  eventsKey.delete(eid)
}
const emit = (event, ...msg) => {
  let funcList = events.get(event)
  if (funcList) {
    for (let i = 0; i < funcList.length; i++) {
      let obj = funcList[i]
      if (obj) {
        obj.fn(...msg)
      }
    }
  }
}
export {
  on,
  off,
  emit
}