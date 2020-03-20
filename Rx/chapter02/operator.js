const { Observable } = require('rxjs')
const { map } = require('rxjs/operators')

const onSubscribe = observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
}

const source$ = Observable.create(onSubscribe)
const mapped$ = source$.pipe(map(x => x * x))
mapped$.subscribe(console.log)
