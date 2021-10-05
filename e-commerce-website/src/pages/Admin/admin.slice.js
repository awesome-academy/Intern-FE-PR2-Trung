import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { findIndexById, payLoadCreater } from 'src/utils/helper'
import authApi from 'src/api/auth.api'
import purchaseApi from 'src/api/purchase.api'

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  payLoadCreater(authApi.fetchAllUsers)
)

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  payLoadCreater(authApi.updateUser)
)

export const fetchAllOrders = createAsyncThunk(
  'admin/fetchAllOrders',
  payLoadCreater(purchaseApi.getAllPurchases)
)

const admin = createSlice({
  name: 'admin',
  initialState: {
    allUsers: [],
    allOrders: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.loading = false
      state.allUsers = action.payload.data
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = false
      state.error = ''
      state.error = action.payload
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      const user = action.payload.data
      const itemIndex = findIndexById(user, state.allUsers)
      state.allUsers.splice(itemIndex, 1, user)
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [fetchAllOrders.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      state.allOrders = action.payload.data
    },
    [fetchAllOrders.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const adminReducer = admin.reducer

export const adminActions = admin.actions
export default adminReducer
