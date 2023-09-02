export function ServicePercentage({
  children,
  percentage,
  onPercentageChange,
}) {
  function handlePercentageChange(event) {
    const percentage = Number(event.target.value)
    onPercentageChange(percentage)
  }

  return (
    <section>
      <label htmlFor="servicePercentage">
        {children}
        <select
          name="servicePercentage"
          value={percentage}
          onChange={handlePercentageChange}
        >
          <option value="0">Dissatisfied (0%)</option>
          <option value="5">It was okay (5%)</option>
          <option value="10">It was good (10%)</option>
          <option value="20">Absolutelty amazing! (20%)</option>
        </select>
      </label>
    </section>
  )
}
