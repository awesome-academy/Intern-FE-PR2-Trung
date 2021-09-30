import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productReviewApi from 'src/api/productReview.api'
import { payLoadCreater } from 'src/utils/helper'

export const getProductReviews = createAsyncThunk(
  'productReviews/getProductReviews',
  payLoadCreater(productReviewApi.getProductReviews)
)

export const postProductReviews = createAsyncThunk(
  'productReviews/postProductReviews',
  payLoadCreater(productReviewApi.postProductReviews)
)

const productReviews = createSlice({
  name: 'productReviews',
  initialState: {
    productReviews: [],
    loading: false,
    loadingError: '',
    sending: false,
    sendingError: ''
  },
  extraReducers: {
    [getProductReviews.pending]: (state, action) => {
      state.loading = true
    },
    [getProductReviews.fulfilled]: (state, action) => {
      state.loading = false
      state.productReviews = action.payload.data
    },
    [getProductReviews.rejected]: (state, action) => {
      state.loading = false
      state.loadingError = action.payload.status
    },
    [postProductReviews.pending]: (state, action) => {
      state.sending = true
    },
    [postProductReviews.fulfilled]: (state, action) => {
      state.sending = false
      state.productReviews.push(action.payload.data)
    },
    [postProductReviews.rejected]: (state, action) => {
      state.sending = false
      state.sendingError = action.payload.status
    }
  }
})

const productReviewsReducer = productReviews.reducer
export default productReviewsReducer
