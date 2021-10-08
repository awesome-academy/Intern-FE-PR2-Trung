import http from '../utils/http'

const URL = 'banners'

const bannerApi = {
  getBanners(config) {
    return http.get(URL, config)
  }
}

export default bannerApi
