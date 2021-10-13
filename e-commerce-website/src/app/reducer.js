import productsReducer from 'src/pages/Products/products.slice'
import allProductsReducder from 'src/pages/Products/allProducts.slice'
import authReducer from 'src/pages/Auth/auth.slice'
import productDetailReducer from 'src/pages/ProductDetail/productDetail.slice'
import productReviewsReducer from 'src/pages/ProductDetail/components/ProductReviews/productReviews.slice'
import cartReducer from 'src/pages/Cart/cart.slice'
import checkoutReducer from 'src/pages/Checkout/checkout.slice'
import bannersReducer from 'src/pages/Home/banners.slice'
import wishListReducer from 'src/pages/ProductDetail/wishlist.slice'
import userReducer from 'src/pages/User/user.slice'
import adminReducer from 'src/pages/Admin/admin.slice'

const rootReducer = {
  products: productsReducer,
  allProducts: allProductsReducder,
  productDetail: productDetailReducer,
  productReviews: productReviewsReducer,
  banners: bannersReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer,
  admin: adminReducer,
  auth: authReducer,
  wishList: wishListReducer
}

export default rootReducer
