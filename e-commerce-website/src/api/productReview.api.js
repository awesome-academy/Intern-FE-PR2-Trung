import http from '../utils/http'

const URL = 'productReviews'

const productReviewsApi = {
  postProductReviews(data) {
    return http.post(URL, data)
  },
  getProductReviews(productId) {
    return http.get(URL + `?productId=${productId}`)
  }
}

export default productReviewsApi
