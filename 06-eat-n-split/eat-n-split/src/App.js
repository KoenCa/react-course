import { useState } from 'react'
import { Button } from './components/Button'
import { FormAddFriend } from './components/FormAddFriend'
import { FormSplitBill } from './components/FormSplitBill'
import { FriendsList } from './components/FriendsList'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriendForm, setShowAddFriendForm] = useState(false)

  function handleToggleFriendForm() {
    setShowAddFriendForm(show => !show)
  }

  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    setShowAddFriendForm(false)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleToggleFriendForm}>
          {showAddFriendForm ? 'Close' : 'Add friend'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  )
}
