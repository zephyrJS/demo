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
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
        onRejected = typeof onRejected === 'function' ? onRejected : () => {}
        if (this.status === FULFILLED) {
            setTimeout(() => {
                try {
                    onFulfilled(this.value)
                } catch (e) {
                    onRejected(e)
                }
            })
        }

        if (this.status === REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.reason)
                } catch (e) {
                    onRejected(e)
                }
            })
        }

        if (this.status === PENDING) {
            this.fulfilledCallback.push(value => {
                try {
                    onFulfilled(value)
                } catch (e) {
                    onRejected(e)
                }
            })

            this.rejectedCallback.push(reason => {
                try {
                    onRejected(reason)
                } catch (e) {
                    onRejected(e)
                }
            })
        }
    }
}

let p = new MyPromise(resolve => setTimeout(() => resolve('setTimeout')))
console.log('start')
p.then(val => console.log(1, val))
p.then(val => console.log(2, val))
p.then(val => console.log(3, val))
console.log('----')

