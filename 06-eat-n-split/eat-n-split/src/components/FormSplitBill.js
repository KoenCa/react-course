import { useState } from 'react'
import { Button } from './Button'

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  const paidByFriend = bill ? bill - paidByUser : ''

  function handlePaidByUserChange(e) {
    const value = Number(e.target.value)
    setPaidByUser(value > bill ? paidByUser : value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!bill || !paidByUser) return

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />

      <label> 🤷🏼‍♂️ Your expense</label>
      <input type="text" value={paidByUser} onChange={handlePaidByUserChange} />

      <label> 🙅🏻‍♂️ {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  )
}
