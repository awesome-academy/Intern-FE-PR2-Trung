import productsReducer from 'src/pages/Products/products.slice'
import allProductsReducder from 'src/pages/Products/allProducts.slice'
import authReducer from 'src/pages/Auth/auth.slice'

const rootReducer = {
  products: productsReducer,
  allProducts: allProductsReducder,
  auth: authReducer
}

export default rootReducer
