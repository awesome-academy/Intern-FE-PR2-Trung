import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import LocalStorage from 'src/constants/localStorage'
import { payLoadCreater } from 'src/utils/helper'

const user = JSON.parse(localStorage.getItem(LocalStorage.user))

export const createPurchases = createAsyncThunk(
  'checkout/createPurchases',
  payLoadCreater(purchaseApi.createPurchases)
)

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
    },
    error: '',
    loading: false
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
  },
  extraReducers: {
    [createPurchases.pending]: (state, action) => {
      state.loading = true
    },
    [createPurchases.fulfilled]: (state, action) => {
      state.loading = false
    },
    [createPurchases.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const checkoutReducer = checkout.reducer
export const checkoutActions = checkout.actions
export default checkoutReducer
