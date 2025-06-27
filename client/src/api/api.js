import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'].includes('application/json')) {
      return response.data
    }
    throw new Error('Resposta não é JSON válido')
  },
  (error) => {
    let message = 'Erro desconhecido'

    if (error.response) {
      const { status, data } = error.response
      message = `Erro ${status}: ${JSON.stringify(data)}`
    } else if (error.request) {
      message = 'Sem resposta do servidor'
    } else {
      message = `Erro na configuração da requisição: ${error.message}`
    }

    return Promise.reject(new Error(message))
  }
)

export default api
