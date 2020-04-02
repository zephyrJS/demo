import React, { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
      <div>
        <p>点击统计：{count}</p>
        <button onClick={() => setCount(count + 1)}>加一</button>
      </div>
    )
}

export default App
