import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      // Use prepare function so we can use action creator with multiple arguments
      // like before. Also for the date creation which is best practice to don't
      // do in the reducer itself. Same like some other logic like random ID generation.
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        }
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName
        state.nationalId = action.payload.nationalId
        state.createdAt = action.payload.createdAt
      },
    },
    updateName(state, action) {
      state.fullName = action.payload
    },
  },
})

export default customerSlice.reducer
export const { createCustomer, updateName } = customerSlice.actions

// OLD WAY BELOW: without Redux toolkit
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case 'customer/create':
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: new Date().toISOString(),
//       }
//     case 'customer/updateName':
//       return {
//         ...state,
//         fullName: action.payload,
//       }
//     default:
//       return state
//   }
// }

// export function createCustomer(fullName, nationalId) {
//   return {
//     type: 'customer/create',
//     payload: { fullName, nationalId },
//   }
// }

// export function updateName(fullName) {
//   return {
//     type: 'customer/updateName',
//     payload: fullName,
//   }
// }
