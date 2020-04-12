const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(executor) {
        this.state = PENDING
        this.value = null
        this.reason = null
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
            }
        }

        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.value = reason
                this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : (value) => value
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {throw reason}

        const promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    let x = onFulfilled(this.value)
                    resolve(x)
                })
            }

            if (this.state === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.value)
                    resolve(x)
                })
            }

            if (this.state === PENDING) {
                this.onFulfilledCallbacks.push((value) => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    })
                })

                this.onRejectedCallbacks.push((reason) => {
                    setTimeout(() => {
                        let x = onRejected(this.reason)
                        resolve(x)
                    })
                })
            }
        })

        return promise2
    }
}

module.exports = Promise
