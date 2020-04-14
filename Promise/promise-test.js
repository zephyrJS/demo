const Promise = require('./myPromise')
console.log(1)
const promise1 = new Promise(function (resolve) {
    console.log(2)
    resolve(new Promise(resolve => {
        resolve(new Promise(resolve => {
            resolve(4)
        }))
    }))
}).then(value => {
    console.log(value)
    return new Promise(resolve => {
        resolve(5)
    })
}).then(value => {
    console.log(value)
})
console.log(3)