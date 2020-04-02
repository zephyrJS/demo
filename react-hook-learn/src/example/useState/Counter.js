import React, { useState } from 'react'

function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>统计： {count}</div>
            <button onClick={() => setCount(count + 1)}>add</button>
        </div>
    )
}

export default Counter
