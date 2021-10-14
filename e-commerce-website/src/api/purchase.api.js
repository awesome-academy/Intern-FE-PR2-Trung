import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  createPurchases(data) {
    return http.post(URL, data)
  },
  getPurchases(config) {
    return http.get(URL, config)
  },
  getAllPurchases(config) {
    return http.get(URL, config)
  },
  updatePurchases({ id, data }) {
    return http.patch(`${URL}/${id}`, data)
  }
}

export default purchaseApi
