const Promise = require('./myPromise')

console.log(1)
const promise1 = new Promise(function (resolve) {
    setTimeout(() => {
        console.log(3)
        resolve()
    })
}).then(value => {
    console.log(4)    
}).then(value => {
    console.log(5)
})
console.log(2)