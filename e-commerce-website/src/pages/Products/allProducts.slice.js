import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { extractData, payLoadCreater } from 'src/utils/helper'
import productApi from 'src/api/product.api'

export const getAllProducts = createAsyncThunk(
  'allProducts/getAllProducts',
  payLoadCreater(productApi.getProducts)
)

const allProducts = createSlice({
  name: 'allProducts', // prefix for create action type
  initialState: {
    allProducts: [],
    allCategories: [],
    allBrands: [],
    loading: false,
    error: ''
  },
  // sử dụng extraReducers khi sử dụng createAsyncThunk, ...
  extraReducers: {
    [getAllProducts.pending]: (state, action) => {
      state.loading = true
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.allProducts = action.payload.data
      state.allCategories = extractData('category', action.payload.data)
      state.allBrands = extractData('brand', action.payload.data)

      extractData('brand', allProducts)
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const allProductsReducer = allProducts.reducer
export default allProductsReducer
