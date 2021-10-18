import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { findIndexById, payLoadCreater } from 'src/utils/helper'
import authApi from 'src/api/auth.api'
import purchaseApi from 'src/api/purchase.api'
import productApi from 'src/api/product.api'

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

export const updateOrder = createAsyncThunk(
  'admin/updatePurchases',
  payLoadCreater(purchaseApi.updatePurchases)
)

export const fetchAllProducts = createAsyncThunk(
  'admin/fetchAllProducts',
  payLoadCreater(productApi.getProducts)
)

export const createNewProduct = createAsyncThunk(
  'admin/createNewProduct',
  payLoadCreater(productApi.createNewProduct)
)

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  payLoadCreater(productApi.updateProduct)
)

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  payLoadCreater(productApi.deleteProduct)
)

const admin = createSlice({
  name: 'admin',
  initialState: {
    allUsers: [],
    allOrders: [],
    allProducts: [],
    loading: false,
    error: ''
  },
  reducers: {
    removeProductInStore: (state, action) => {
      const newProductList = state.allProducts.filter(
        item => item.id !== action.payload.id
      )
      state.allProducts = newProductList
    }
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
    },
    [updateOrder.pending]: (state, action) => {
      state.loading = true
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      const order = action.payload.data
      const itemIndex = findIndexById(order, state.allOrders)
      state.allOrders.splice(itemIndex, 1, order)
    },
    [updateOrder.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [fetchAllProducts.pending]: (state, action) => {
      state.loading = true
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      state.allProducts = action.payload.data
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [createNewProduct.pending]: (state, action) => {
      state.loading = true
    },
    [createNewProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      state.allProducts.unshift(action.payload.data)
    },
    [createNewProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [updateProduct.pending]: (state, action) => {
      state.loading = true
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
      const updatedProduct = action.payload.data
      const itemIndex = findIndexById(updatedProduct, state.allProducts)
      state.allProducts.splice(itemIndex, 1, updatedProduct)
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.error = ''
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const adminReducer = admin.reducer

export const adminActions = admin.actions
export default adminReducer
