const randomStatus = () => ({
    // isOnline: Boolean(Math.random() > 0.5)
    isOnline: false
})

let timer
let count = 0

const ChatApi = {
    subscribeToFriendStatus: (friendId, onStatusChange) => {
        timer = setTimeout(() => {
            onStatusChange(randomStatus())
            console.log('subscribe', count++)
        }, 500)        
    },
    unsubscribeToFriendStatus: (friendId, onStatusChange) => {
        clearTimeout(timer)
        console.log('unsubscribe')
    }
}

export default ChatApi
