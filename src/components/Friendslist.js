import React, { useEffect } from 'react'

export default function FriendsList(props) {
    const { getFriends, friends } = props

    useEffect(() => {
        getFriends()
    }, [])

    return (
        <div>
            <h2>FRIEND LIST:</h2>
          {friends.map(friend => 
              <h2 key={friend.id}>{friend.name || friend.username}</h2>
          )}  
        </div>
            
        
    )
}