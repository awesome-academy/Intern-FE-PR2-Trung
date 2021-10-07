import { createSlice } from '@reduxjs/toolkit'

const language = createSlice({
  name: 'language',
  initialState: {
    language: 'vi'
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})

const languageReducer = language.reducer
export const languageActions = language.actions
export default languageReducer
