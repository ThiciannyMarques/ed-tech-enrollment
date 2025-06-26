import api from './api'

export default {
  async getStudents() {
    try {
      const response = await api.get('/students')
      return Array.isArray(response) ? response : []
    } catch {
      return []
    }
  },

  async getStudent(ra) {
    try {
      const response = await api.get(`/students/${ra}`)
      return response || null
    } catch {
      return null
    }
  },

  createStudent(studentData) {
    return api.post('/students', studentData)
  },

  updateStudent(ra, studentData) {
    return api.patch(`/students/${ra}`, studentData)
  },

  deleteStudent(ra) {
    return api.delete(`/students/${ra}`)
  },
}
