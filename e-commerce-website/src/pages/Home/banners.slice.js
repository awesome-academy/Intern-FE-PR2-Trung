import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { payLoadCreater } from 'src/utils/helper'
import bannerApi from 'src/api/banners.api'

export const getBanners = createAsyncThunk(
  'banners/getBanners',
  payLoadCreater(bannerApi.getBanners)
)

const banners = createSlice({
  name: 'banners', // prefix for create action type
  initialState: {
    mainBanners: [],
    rightMainBanners: [],
    subLeftBanners: [],
    loading: false,
    error: ''
  },
  // sử dụng extraReducers khi sử dụng createAsyncThunk, ...
  extraReducers: {
    [getBanners.pending]: (state, action) => {
      state.loading = true
    },
    [getBanners.fulfilled]: (state, action) => {
      const { mainBanners, rightMainBanners, subLeftBanners } =
        action.payload.data
      state.loading = false
      state.mainBanners = mainBanners
      state.rightMainBanners = rightMainBanners
      state.subLeftBanners = subLeftBanners
    },
    [getBanners.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

const bannersReducer = banners.reducer
export default bannersReducer
