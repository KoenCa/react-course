export function Result({ bill, myPercentage, friendPercentage }) {
  if (bill === '') return <h3>Please fill in the bill</h3>

  const averagePercentage = (myPercentage + friendPercentage) / 2
  const tip = bill * (averagePercentage / 100)
  const total = bill + tip

  return <h3>{`You pay $${total} ($${bill} + $${tip} tip)`}</h3>
}
