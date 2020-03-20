// import { Observable } from 'rxjs'
const { Observable } = require('rxjs')
// Observable 生成数据源
const onSubscribe = observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
}
const source$ = new Observable(onSubscribe)
// 处理数据源
const theObserver = {
    next: item => console.log(item)
}
source$.subscribe(theObserver)