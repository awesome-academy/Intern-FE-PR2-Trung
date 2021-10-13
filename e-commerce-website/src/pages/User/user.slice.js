import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import { findIndexById, payLoadCreater } from 'src/utils/helper'

export const getPurchases = createAsyncThunk(
  'user/getPurchases',
  payLoadCreater(purchaseApi.getPurchases)
)

export const updatePurchases = createAsyncThunk(
  'user/updatePurchases',
  payLoadCreater(purchaseApi.updatePurchases)
)

const user = createSlice({
  name: 'user',
  initialState: {
    purchases: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getPurchases.pending]: (state, action) => {
      state.loading = true
    },
    [getPurchases.fulfilled]: (state, action) => {
      state.loading = false
      state.purchases = action.payload.data
    },
    [getPurchases.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.status
    },
    [updatePurchases.pending]: (state, action) => {
      state.loading = true
    },
    [updatePurchases.fulfilled]: (state, action) => {
      const purchase = action.payload.data
      const itemIndex = findIndexById(purchase, state.purchases)
      state.purchases[itemIndex].status = purchase.status
      state.loading = false
    },
    [updatePurchases.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.status
    }
  }
})

const userReducer = user.reducer

export const userActions = user.actions
export default userReducer
