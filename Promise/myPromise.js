const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = null
        this.reason = null
        this.fulfilledCallback = []
        this.rejectedCallback = []
        this.initBind()
        executor(this.resolve, this.reject)
    }

    initBind() {
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
    }

    resolve(value) {
        if (this.status === PENDING) {
            setTimeout(() => {
                this.status = FULFILLED
                this.value = value
                this.fulfilledCallback.forEach(cb => cb(value))
            })
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            setTimeout(() => {
                this.status = REJECTED
                this.reason = reason
                this.rejectedCallback.forEach(cb => cb(reason))
            })
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        let p
        if (this.status === FULFILLED) {
            p = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let res = onFulfilled(this.value)
                        resolve(res)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        if (this.status === REJECTED) {
            p = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let res = onRejected(this.reason)
                        resolve(res)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        if (this.status === PENDING) {
            p = new MyPromise((resolve, reject) => {
                this.fulfilledCallback.push(value => {
                    try {
                        let res = onFulfilled(value)
                        resolve(res)
                    } catch (e) {
                        reject(e)
                    }
                })

                this.rejectedCallback.push(reason => {
                    try {
                        let res = onRejected(reason)
                        reject(res)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }

        return p
    }
}

let p = new MyPromise((resolve,reject) => setTimeout(() => reject('error')))
console.log('start')
p
.then()
.then()
.then()
.then(()=>{}, val => console.log(1, val))
console.log('----')
