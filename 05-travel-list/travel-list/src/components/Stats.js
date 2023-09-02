export function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const amountOfItems = items.length;
  const amountOfPackedItems = items.filter(item => item.packed).length;
  const percentageOfPackedItems = Math.round(
    (amountOfPackedItems / amountOfItems) * 100
  );

  return (
    <footer className="stats">
      <em>
        {percentageOfPackedItems === 100
          ? 'You got everything! Ready to go ✈️'
          : `You have ${amountOfItems} items on your list and you already packed
        ${amountOfPackedItems} (${percentageOfPackedItems}%)`}
      </em>
    </footer>
  );
}
