const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/create',
    payload: { fullName, nationalId },
  }
}

export function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  }
}
