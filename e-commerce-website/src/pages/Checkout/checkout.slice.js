import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'

const user = JSON.parse(localStorage.getItem(LocalStorage.user))

const checkout = createSlice({
  name: 'checkout',
  initialState: {
    purchase: {
      delivery: JSON.parse(localStorage.getItem(LocalStorage.purchase)) || {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
      },
      paymentMethod: '',
      cartItems: [],
      totalPayment: 0
    }
  },
  reducers: {
    setCheckoutInfo: (state, action) => {
      state.purchase = action.payload
      localStorage.setItem(
        LocalStorage.purchase,
        JSON.stringify(state.purchase)
      )
    },
    resetCheckoutInfo: () => {
      localStorage.removeItem(LocalStorage.purchase)
    }
  }
})

const checkoutReducer = checkout.reducer
export const checkoutActions = checkout.actions
export default checkoutReducer
