
export function Item({
  item: { id, description, quantity, packed }, onDeleteItem, onItemPacked,
}) {
  function handleDeleteItem() {
    onDeleteItem(id);
  }

  function handleItemPacked() {
    onItemPacked(id);
  }

  return (
    <li>
      <input type="checkbox" value={packed} onChange={handleItemPacked} />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={handleDeleteItem}>❌</button>
    </li>
  );
}
