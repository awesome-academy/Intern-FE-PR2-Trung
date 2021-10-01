import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'

const cart = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem(LocalStorage.cart)) || {
      cartItems: [],
      totalItemCount: 0,
      totalPayment: 0
    }
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const itemIndex = state.cart.cartItems.findIndex(
        item => item.id === product.id
      )

      if (itemIndex >= 0) {
        state.cart.cartItems[itemIndex].inCart += quantity
      } else {
        state.cart.cartItems.push({ ...product, inCart: 1 })
      }

      state.cart.totalItemCount += quantity
      state.cart.totalPayment += product.price * quantity
      localStorage.setItem(LocalStorage.cart, JSON.stringify(state.cart))
    }
  }
})

const cartReducer = cart.reducer
export const cartActions = cart.actions
export default cartReducer
