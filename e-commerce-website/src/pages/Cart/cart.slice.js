import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'
import { findIndexById } from 'src/utils/helper'

const cart = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem(LocalStorage.cart)) || {
      cartItems: [],
      totalPayment: 0
    }
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload
      const itemIndex = findIndexById(product, state.cart.cartItems)

      if (itemIndex >= 0) {
        state.cart.cartItems[itemIndex].inCart += quantity
      } else {
        state.cart.cartItems.push({ ...product, inCart: 1 })
      }

      state.cart.totalPayment += product.price * quantity
      localStorage.setItem(LocalStorage.cart, JSON.stringify(state.cart))
    },
    resetCart: (state, action) => {
      state.cart = {
        cartItems: [],
        totalItemCount: 0,
        totalPayment: 0
      }
      localStorage.setItem(LocalStorage.cart, JSON.stringify(state.cart))
    },
    removeCartItem: (state, action) => {
      const product = action.payload
      const itemIndex = findIndexById(product, state.cart.cartItems)
      state.cart.cartItems.splice(itemIndex, 1)
      state.cart.totalPayment -= product.price * product.inCart
      localStorage.setItem(LocalStorage.cart, JSON.stringify(state.cart))
    },
    changeCarItemQuantity: (state, action) => {
      const { quantity, product } = action.payload

      const itemIndex = findIndexById(product, state.cart.cartItems)

      state.cart.cartItems[itemIndex].inCart = quantity
      state.cart.totalPayment += product.price * (quantity - product.inCart)
      localStorage.setItem(LocalStorage.cart, JSON.stringify(state.cart))
    }
  }
})

const cartReducer = cart.reducer
export const cartActions = cart.actions
export default cartReducer
