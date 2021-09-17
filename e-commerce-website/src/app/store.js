import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  // custom middleware nếu gặp warning serialized error
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default store
