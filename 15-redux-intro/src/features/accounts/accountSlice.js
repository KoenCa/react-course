import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } }
      },
      reducer(state, action) {
        if (state.loan > 0) return state

        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      },
    },
    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ''
    },
    convertingCurrency(state) {
      state.isLoading = true
    },
  },
})

export default accountSlice.reducer
export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions

// Break out of Redux toolkit's createSlice to handle async actions with Thunk
export function deposit(amount, currency) {
  // Using Redux toolkit, the type string should follow the pattern 'sliceName/reducerName'
  if (currency === 'USD') return { type: 'account/deposit', payload: amount }

  // When returning a function, it will be handled by the thunk middleware
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' })

    const result = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await result.json()
    const convertedAmount = data.rates.USD

    return dispatch({ type: 'account/deposit', payload: convertedAmount })
  }
}

// OLD WAY: without Redux toolkit
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       }
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       }
//     case 'account/requestLoan':
//       if (state.loan > 0) return state

//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       }
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       }
//     case 'account/convertingCurrency':
//       return {
//         ...state,
//         isLoading: true,
//       }
//     default:
//       return state
//   }
// }

// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount }
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount, purpose },
//   }
// }
// export function payLoan() {
//   return { type: 'account/payLoan' }
// }
