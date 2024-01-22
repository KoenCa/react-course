// DEPRECATED: but for learning purposes only
import { combineReducers, createStore } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      }
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      }
    case 'account/requestLoan':
      if (state.loan > 0) return state

      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      }
    default:
      return state
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/create':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: new Date().toISOString(),
      }
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})
const store = createStore(rootReducer)

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  }
}
function payLoan() {
  return { type: 'account/payLoan' }
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, 'buy a car'))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())

function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/create',
    payload: { fullName, nationalId },
  }
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  }
}

store.dispatch(createCustomer("Koen Castermans", "123456789"))
console.log(store.getState())

store.dispatch(updateName("Jaak Trekhaak", "123456789"))
console.log(store.getState())
