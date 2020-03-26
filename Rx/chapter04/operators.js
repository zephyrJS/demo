const { Observable, of, range, generate } = require('rxjs')
const { repeat } = require('rxjs/operators')

console.log('------------of------------')
of(1,2,3).subscribe(console.log)

console.log('------------range------------')
range(1, 10).subscribe(console.log)

console.log('------------generate------------')
generate(
    1,
    x => x < 10,
    x => x + 1,
    x => x
).subscribe(console.log)

console.log('-----repeat-----')
of(1,2,3).pipe(
    repeat(2)
).subscribe(console.log)

Observable.create()
