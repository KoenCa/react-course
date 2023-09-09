import { Friend } from "./Friend";

export function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  )
}
