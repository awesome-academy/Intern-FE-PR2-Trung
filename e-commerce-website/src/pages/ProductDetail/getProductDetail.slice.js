import { createAsyncThunk } from '@reduxjs/toolkit'
import productApi from 'src/api/product.api'
import { payLoadCreater } from 'src/utils/helper'

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  payLoadCreater(productApi.getProductDetail)
)
