import { defineStore } from 'pinia'
import { ref } from 'vue'
import studentApi from '../api/studentApi'

export const useStudentStore = defineStore('student', () => {
  const students = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchStudents = async () => {
    try {
      loading.value = true
      const response = await studentApi.getStudents()
      students.value = response || []
    } catch (err) {
      error.value = err.message
      students.value = []
    } finally {
      loading.value = false
    }
  }

  const createStudent = async (studentData) => {
    try {
      loading.value = true
      const response = await studentApi.createStudent(studentData)
      students.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateStudent = async (ra, studentData) => {
    try {
      loading.value = true
      await studentApi.updateStudent(ra, studentData)

      await fetchStudents()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteStudent = async (ra) => {
    try {
      loading.value = true
      await studentApi.deleteStudent(ra)
      await fetchStudents()
      students.value = students.value.filter((s) => s.ra !== ra)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  }
})
