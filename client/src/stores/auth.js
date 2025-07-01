import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || null)

  function syncUserFromLocalStorage() {
    const userData = localStorage.getItem('user')
    user.value = userData ? JSON.parse(userData) : null
  }

  syncUserFromLocalStorage()

  window.addEventListener('storage', (event) => {
    if (event.key === 'user') {
      syncUserFromLocalStorage()
    }
  })

  async function login(credentials) {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/auth/login', credentials)

      user.value = response.user
      token.value = response.token

      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)
      router.push('/')
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao fazer login'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    try {
      loading.value = true
      error.value = null
      const response = await api.post('/auth/register', {
        ...userData,
        role: 'admin',
      })

      user.value = response.user
      token.value = response.token

      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)

      router.push('/')
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao registrar'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(resetData) {
    try {
      loading.value = true
      error.value = null
      await api.post('/auth/dev-reset-password', resetData)
      router.push('/login')
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao resetar senha'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    user,
    token,
    error,
    loading,
    isAuthenticated,
    userRole,
    login,
    register,
    resetPassword,
    logout,
  }
})
