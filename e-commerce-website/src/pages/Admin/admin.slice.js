import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { findIndexById, payLoadCreater } from 'src/utils/helper'
import authApi from 'src/api/auth.api'

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  payLoadCreater(authApi.fetchAllUsers)
)

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  payLoadCreater(authApi.updateUser)
)

const admin = createSlice({
  name: 'admin',
  initialState: {
    allUsers: [],
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
      state.error = action.payload
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false
      const user = action.payload.data
      const itemIndex = findIndexById(user, state.allUsers)
      state.allUsers.splice(itemIndex, 1, user)
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const adminReducer = admin.reducer

export const adminActions = admin.actions
export default adminReducer
