<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-text-field
          v-model="searchTerm"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
          class="mr-4"
        />

        <v-spacer />

        <v-btn color="primary" :to="{ name: 'StudentCreate' }" prepend-icon="mdi-plus">
          {{ $t('register') }}
        </v-btn>
      </v-card-title>

      <students-data-table
        :students="studentStore.students"
        :loading="studentStore.loading"
        :search="searchTerm"
        @edit="handleEditStudent"
        @delete="openDeleteDialog"
      />

      <confirmation-dialog
        v-model="isDeleteDialogOpen"
        :title="$t('confirmation.title')"
        :message="$t('confirmation.deleteMessage')"
        :loading="isDeleting"
        @confirm="confirmDeleteStudent"
        @cancel="closeDeleteDialog"
      />
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '../../stores/studentStore.js'
import StudentsDataTable from '../../components/students/StudentDataTable'
import ConfirmationDialog from '../../components/students/ConfirmationDialog'

const router = useRouter()
const studentStore = useStudentStore()

const searchTerm = ref('')
const isDeleteDialogOpen = ref(false)
const isDeleting = ref(false)
const studentRaToDelete = ref(null)

const fetchStudents = async () => {
  try {
    await studentStore.fetchStudents()
  } catch (error) {
    handleError('Failed to load students.', error)
  }
}

const handleEditStudent = (ra) => {
  router.push({ name: 'StudentEdit', params: { ra } })
}

const openDeleteDialog = (ra) => {
  studentRaToDelete.value = ra
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  studentRaToDelete.value = null
}

const confirmDeleteStudent = async () => {
  if (!studentRaToDelete.value) return

  isDeleting.value = true
  try {
    await studentStore.deleteStudent(studentRaToDelete.value)
  } catch (error) {
    handleError('Failed to delete student.', error)
  } finally {
    await fetchStudents()
    isDeleting.value = false
    closeDeleteDialog()
  }
}

const handleError = (message, error) => {
  throw new Error(message, { cause: error })
}

onMounted(fetchStudents)
</script>
