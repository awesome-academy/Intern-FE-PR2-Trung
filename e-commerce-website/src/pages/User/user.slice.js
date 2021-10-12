import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import { payLoadCreater } from 'src/utils/helper'

export const getPurchases = createAsyncThunk(
  'user/getPurchases',
  payLoadCreater(purchaseApi.getPurchases)
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
    }
  }
})

const userReducer = user.reducer

export const userActions = user.actions
export default userReducer
