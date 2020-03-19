// 2.1 promise state
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise() {
    this.state = PENDING
    this.result = null
}

// 2.2 then Method
MyPromise.prototype.then = function(onFulfilled, onRejected) {
    // 2.2.1 如果 onFulfilled、onRejected，则忽略
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : () => {}
    onRejected = isFunction(onRejected) ? onRejected : () => {}

    return new MyPromise((resolve, reject) => {
        let callback = { onFulfilled, onRejected, resolve, reject }
        if(this.state === PENDING) {
            this.callbacks.push(callback)
        }else {
            
        }
    })
}

// pending -> fulfilled or pending -> rejected
// 2.1.1 如果 state 是 pending 的时候，可以转为 fulfilled 或者 rejected
// 2.1.2 如果 state 是 fulfilled，状态不能改变，值为 value
// 2.1.3 如果 state 是 rejected， 状态不可变，值为 reason
const transition = (promise, state, result) => {
    if (promise.state !== PENDING) return
    promise.state = state
    promise.result = result
}

const isFunction = fn => {
    return typeof fn === 'function'
}
