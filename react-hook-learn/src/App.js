import React, { Component } from 'react'
import Counter from './example/useState/Counter'
import FriendStatus from './example/customHooks/FriendStatus'

class App extends Component {
    render() {
        return (
            <div>
                <Counter />
                <FriendStatus></FriendStatus>
            </div>
        )
    }
}

export default App
