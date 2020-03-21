const { Observable } = require('rxjs')
const { filter, map } = require('rxjs/operators')

const onSubscribe = observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    observer.next(4)
}
const source = Observable.create(onSubscribe)

const result = source.pipe(
    filter(x => x % 2 === 0),
    map(x => x * x)
)

result.subscribe(console.log)
