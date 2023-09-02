export function Bill({ bill, onBillChange }) {
  function handleBillChange(event) {
    const bill = event.target.valueAsNumber
    onBillChange(isNaN(bill) ? '' : bill)
  }

  return (
    <section>
      <label>
        How much was the bill?
        <input type="number" value={bill} onChange={handleBillChange} />
      </label>
    </section>
  )
}
