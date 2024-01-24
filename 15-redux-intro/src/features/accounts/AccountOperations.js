import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deposit, payLoan, requestLoan, withdraw } from './accountSlice'

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [loanPurpose, setLoanPurpose] = useState('')
  const [currency, setCurrency] = useState('USD')

  const {
    loan: currentLoanAmount,
    loanPurpose: currentLoanPurpose,
    balance,
  } = useSelector(state => state.account)
  const dispatch = useDispatch()

  console.log(balance)

  function handleDeposit(e) {
    e.preventDefault()
    if (!depositAmount) return

    dispatch(deposit(depositAmount))
    setDepositAmount('')
  }

  function handleWithdrawal(e) {
    e.preventDefault()
    if (!withdrawalAmount) return

    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount('')
  }

  function handleRequestLoan(e) {
    e.preventDefault()
    if (!loanAmount || !loanPurpose) return

    dispatch(requestLoan(loanAmount, loanPurpose))
    setLoanAmount('')
    setLoanPurpose('')
  }

  function handlePayLoan() {
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <form onSubmit={handleDeposit}>
          <label>Deposit</label>
          <input
            type="number"
            required
            value={depositAmount}
            onChange={e => setDepositAmount(+e.target.value)}
          />
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button type="submit">Deposit {depositAmount}</button>
        </form>

        <form onSubmit={handleWithdrawal}>
          <label>Withdraw</label>
          <input
            type="number"
            required
            value={withdrawalAmount}
            onChange={e => setWithdrawalAmount(+e.target.value)}
          />
          <button type="submit">Withdraw {withdrawalAmount}</button>
        </form>

        <form onSubmit={handleRequestLoan}>
          <label>Request loan</label>
          <input
            type="number"
            required
            value={loanAmount}
            onChange={e => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            required
            value={loanPurpose}
            onChange={e => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button type="submit">Request loan</button>
        </form>

        {currentLoanAmount ? (
          <div>
            <p>
              Pay back {currentLoanAmount} ({currentLoanPurpose})
            </p>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AccountOperations
