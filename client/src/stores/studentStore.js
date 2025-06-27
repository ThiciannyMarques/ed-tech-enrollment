import { defineStore } from 'pinia'
import { ref } from 'vue'
import studentApi from '../api/studentApi'
import { useSnackbar } from '../composables/useSnackbar'

export const useStudentStore = defineStore('student', () => {
  const { showSnackbar } = useSnackbar()
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
      showSnackbar({
        message: 'Erro ao carregar alunos',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  const createStudent = async (studentData) => {
    try {
      loading.value = true
      await studentApi.createStudent(studentData)
      await fetchStudents()
      showSnackbar({
        message: 'Aluno criado com sucesso!',
      })
    } catch (err) {
      error.value = err.message
      showSnackbar({
        message: err.response?.data?.message || 'Erro ao criar aluno',
        color: 'error',
      })
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
      showSnackbar({
        message: 'Aluno atualizado com sucesso!',
      })
    } catch (err) {
      error.value = err.message
      showSnackbar({
        message: err.response?.data?.message || 'Erro ao atualizar aluno',
        color: 'error',
      })
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
      showSnackbar({
        message: 'Aluno removido com sucesso!',
      })
    } catch (err) {
      error.value = err.message
      showSnackbar({
        message: err.response?.data?.message || 'Erro ao remover aluno',
        color: 'error',
      })
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
