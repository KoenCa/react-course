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

  function handleItemPacked(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function handleClearList() {
    window.confirm('Are you sure you want to clear the list?') && setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onItemPacked={handleItemPacked}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onItemPacked, onClearList }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems

  if (sortBy === 'input') sortedItems = items
  else if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    )
  else if (sortBy === 'packed')
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onItemPacked={onItemPacked}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  )
}

function Item({
  item: { id, description, quantity, packed },
  onDeleteItem,
  onItemPacked,
}) {
  function handleDeleteItem() {
    onDeleteItem(id)
  }

  function handleItemPacked() {
    onItemPacked(id)
  }

  return (
    <li>
      <input type="checkbox" value={packed} onChange={handleItemPacked} />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={handleDeleteItem}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    )

  const amountOfItems = items.length
  const amountOfPackedItems = items.filter(item => item.packed).length
  const percentageOfPackedItems = Math.round(
    (amountOfPackedItems / amountOfItems) * 100
  )

  return (
    <footer className="stats">
      <em>
        {percentageOfPackedItems === 100
          ? 'You got everything! Ready to go ✈️'
          : `You have ${amountOfItems} items on your list and you already packed
        ${amountOfPackedItems} (${percentageOfPackedItems}%)`}
      </em>
    </footer>
  )
}
