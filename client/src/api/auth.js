import api from './api'

export default {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  register(userData) {
    return api.post('/auth/register', userData)
  },
  resetPassword(resetData) {
    return api.post('/auth/dev-reset-password', resetData)
  },
}
