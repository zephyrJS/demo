const { Observable } = require('rxjs')
const onSubscribe = observer => {
    let n = 1
    let handler = setInterval(() => {
        console.log('in onSubscribe', n)
        observer.next(n++)
    }, 1000)

    return {
        unsubscribe: () => {
            console.log('unSubscribe')
            // clearInterval(handler)
        }
    }
}

const source$ = new Observable(onSubscribe)
const subScription = source$.subscribe(item => console.log(item))

setTimeout(() => {
    subScription.unsubscribe()
}, 3500)
