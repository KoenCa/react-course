export function Result({ total, bill, tip }) {
  if (bill === '') return <h3>Please fill in the bill</h3>

  return <h3>{`You pay $${total} ($${bill} + $${tip} tip)`}</h3>
}
