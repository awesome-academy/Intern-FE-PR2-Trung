import http from '../utils/http'

const URL = 'users'

const authApi = {
  register(data) {
    return http.post(URL, data)
  },
  fetchUser(userId) {
    return http.get(URL + `?id=${userId}`)
  },
  fetchAllUsers(config) {
    return http.get(URL, config)
  },
  updateUser({ userId, data }) {
    return http.patch(`${URL}/${userId}`, data)
  }
}

export default authApi
