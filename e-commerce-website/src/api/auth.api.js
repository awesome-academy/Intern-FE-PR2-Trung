import http from '../utils/http'

const authApi = {
  register(data) {
    return http.post('users', data)
  }
}

export default authApi
