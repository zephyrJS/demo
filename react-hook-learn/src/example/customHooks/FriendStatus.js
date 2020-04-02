import React, { useState, useEffect } from 'react'
import ChatApi from '../ChatApi'

function useFriednStatus(friendID) {
    const [isOnline, setIsOnline] = useState(friendID)

    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }

    useEffect(() => {
        ChatApi.subscribeToFriendStatus(friendID, handleStatusChange)
        return () => {
            ChatApi.unsubscribeToFriendStatus(friendID, handleStatusChange)
        }
    })

    return isOnline
}

function FriendStatus() {
    const isOnline = useFriednStatus(Math.random())

    if (isOnline === null) {
        return 'Loading...'
    }

    return <div>{isOnline ? 'Online' : 'Offline'}</div>
}

export default FriendStatus
