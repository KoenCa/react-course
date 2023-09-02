import { useState } from 'react'
import { Logo } from './Logo'
import { Form } from './Form'
import { PackingList } from './PackingList'
import { Stats } from './Stats'

/*
Item structure: { id: 1, description: 'Passports', quantity: 2, packed: false },
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
