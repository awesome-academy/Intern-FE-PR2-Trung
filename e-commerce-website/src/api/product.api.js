import http from '../utils/http'

const URL = 'products'

const productApi = {
  createNewProduct(data) {
    return http.post(URL, data)
  },
  getProducts(config) {
    return http.get(URL, config)
  },
  getProductDetail(id) {
    return http.get(URL + `/${id}`)
  },
  updateProduct({ id, data }) {
    return http.patch(`${URL}/${id}`, data)
  },
  deleteProduct(id) {
    return http.delete(URL + `/${id}`)
  }
}

export default productApi
