import { createSlice } from '@reduxjs/toolkit'

const app = createSlice({
  name: 'app',
  initialState: {
    loading: false
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true
        }
      )
      .addMatcher(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false
        }
      )
  }
})

const appReducer = app.reducer
export default appReducer
