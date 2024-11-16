const requestList = new Array()
const resultMap = new Map()
var requestId = 0;

var requesting = false;


const addRequest = (next = (next) => { }) => {
    requestId += 1;
    requestList.push(requestId)

    resultMap.set(requestId, next)

    if (!requesting) {
        requesting = true
        consumeRequest()
    }
    return requestId
}


const consumeRequest = () => {

    let requestId = requestList[0]

    let result = resultMap.get(requestId)
    resultMap.delete(requestId)

    // console.log('result',result)

    if(result !=null){
        // 将next 权限回调出去
        result(next)
        return
    }
    next()
}

const next = () => {
    // console.log('下一个')
    if (requestList.length <= 0) {
        requesting = false;
        return;
    }

    setTimeout(() => {
        requestList.shift()
        consumeRequest()
    }, 10)

}

export {
    addRequest
}