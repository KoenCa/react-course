import { useState } from 'react'

/*
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 12, packed: true },
]
*/

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(newItem) {
    setItems(items => [...items, newItem])
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!description) return

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    }

    onAddItems(newItem)

    setQuantity(1)
    setDescription('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item: { id, description, quantity, packed }, onDeleteItem }) {
  function handleDeleteItem() {
    onDeleteItem(id)
  }

  return (
    <li>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={handleDeleteItem}>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  )
}
