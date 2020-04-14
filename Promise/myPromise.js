const PENDING ='pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function isFunction(fn) {
    return typeof fn === 'function'
}

class Promise {
    constructor(executor) {
        this.value = undefined
        this.reason = undefined
        this.status = PENDING
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if(this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if(this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        }catch(e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {        
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
        onRejected = isFunction(onRejected) ? onRejected : reason => { throw reason }

        const promise2 = new Promise((resolve, reject) => {
            if(this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)                                      
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                })
            }
    
            if(this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        Promise.resolvePromise(promise2, x, resolve, reject)
                    }catch(e) {
                        reject(e)
                    }
                })
            }
    
            if(this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
    
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            Promise.resolvePromise(promise2, x, resolve, reject)
                        }catch(e) {
                            reject(e)
                        }
                    })
                })
            }
        })

        return promise2
    }
}

Promise.resolvePromise = function(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }

    let called = false
    if(x !== null && (typeof x === 'object' || isFunction(x))) {
        try {
            const then = x.then
            if(isFunction(then)) {                
                then.call(x, y => {
                    if(called) return
                    called = true
                    Promise.resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    if(called) return
                    called = true
                    reject(reason)
                })
            }else {
                resolve(x)
            }
        }catch(e) {
            if(called) return
            called = true
            reject(e)
        }        
    }else {
        resolve(x)
    }
}

Promise.all = function(arr = []) {
    if(Array.isArray(arr)) {
        throw new TypeError('需要是一个数组')
    }
    let count = 1
    let res = []

    function resolvePromises() {
        res.push
    }

    for(let i=0; i<arr.length; i++) {}
}

module.exports = Promise
