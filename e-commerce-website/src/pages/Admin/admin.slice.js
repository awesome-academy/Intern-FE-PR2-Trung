import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payLoadCreater } from 'src/utils/helper'
import authApi from 'src/api/auth.api'

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  payLoadCreater(authApi.fetchAllUsers)
)

const admin = createSlice({
  name: 'admin',
  initialState: {
    allUsers: []
  },
  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.data
    }
  }
})

const adminReducer = admin.reducer

export const adminActions = admin.actions
export default adminReducer
