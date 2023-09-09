import { Friend } from './Friend'

export function FriendsList({ friends, selectedFriend, onFriendSelected }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          key={friend.id}
          friend={friend}
          selectedFriend={selectedFriend}
          onSelection={onFriendSelected}
        />
      ))}
    </ul>
  )
}
