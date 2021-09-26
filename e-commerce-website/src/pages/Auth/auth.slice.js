import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payLoadCreater } from 'src/utils/helper'
import authApi from 'src/api/auth.api'
import LocalStorage from 'src/constants/localStorage'

export const register = createAsyncThunk(
  'auth/register',
  payLoadCreater(authApi.register)
)

const handleAuthFulfilled = (state, action) => {
  state.profile = action.payload.data
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
}

const auth = createSlice({
  name: 'auth',
  initialState: {
    profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {}
  },
  extraReducers: {
    [register.fulfilled]: handleAuthFulfilled
  }
})

const authReducer = auth.reducer

export const authActions = auth.actions
export default authReducer
