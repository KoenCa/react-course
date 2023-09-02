import { useState } from 'react';
import { Item } from './Item';

export function PackingList({ items, onDeleteItem, onItemPacked, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  else if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description)
    );
  else if (sortBy === 'packed')
    sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onItemPacked={onItemPacked} />
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
  );
}
