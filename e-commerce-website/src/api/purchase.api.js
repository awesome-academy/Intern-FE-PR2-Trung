import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  createPurchases(data) {
    return http.post(URL, data)
  },
  getPurchases(config) {
    return http.get(URL, config)
  }
}

export default purchaseApi
