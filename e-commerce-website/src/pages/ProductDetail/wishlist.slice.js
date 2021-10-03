import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'
import { findIndexById } from 'src/utils/helper'

const wishList = createSlice({
  name: 'wishList',
  initialState: {
    wishList: JSON.parse(localStorage.getItem(LocalStorage.wishList)) || []
  },
  reducers: {
    toggleWishList: (state, action) => {
      const product = action.payload
      const itemIndex = findIndexById(product, state.wishList)

      if (itemIndex >= 0) {
        state.wishList.splice(itemIndex, 1)
      } else {
        state.wishList.push(product)
      }

      localStorage.setItem(
        LocalStorage.wishList,
        JSON.stringify(state.wishList)
      )
    }
  }
})

const wishListReducer = wishList.reducer
export const wishListActions = wishList.actions
export default wishListReducer
