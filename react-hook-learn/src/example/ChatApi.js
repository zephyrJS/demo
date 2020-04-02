const randomStatus = () => ({
    isOnline: Boolean(Math.random() > 0.5)
})

let timer

const ChatApi = {
    subscribeToFriendStatus: (friendId, onStatusChange) => {
        timer = setTimeout(() => {
            onStatusChange(randomStatus())
        }, 500)
        console.log('subscribe')
    },
    unsubscribeToFriendStatus: (friendId, onStatusChange) => {
        clearTimeout(timer)
        console.log('unsubscribe')
    }
}

export default ChatApi
