<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-text-field
          v-model="searchTerm"
          append-icon="mdi-magnify"
          :label="$t('pesquisar')"
          single-line
          hide-details
          class="mr-4"
        />

        <v-spacer />

        <v-btn color="primary" :to="{ name: 'StudentCreate' }" prepend-icon="mdi-plus">
          {{ $t('Cadastrar estudante') }}
        </v-btn>
      </v-card-title>

      <students-data-table
        :students="studentStore.students"
        :loading="studentStore.loading"
        :search="searchTerm"
        @edit="navigateToEdit"
        @delete="openDeleteConfirmation"
      />

      <confirmation-dialog
        v-model="isDeleteDialogOpen"
        :title="$t('confirmation.title')"
        :message="$t('confirmation.deleteMessage')"
        :loading="isDeleting"
        @confirm="handleStudentDeletion"
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
const selectedStudentRa = ref(null)

const loadStudents = async () => {
  try {
    await studentStore.fetchStudents()
  } catch {
    throw new Error('Falha ao carregar alunos.')
  }
}

const navigateToEdit = (ra) => {
  router.push({ name: 'StudentEdit', params: { ra } })
}

const openDeleteConfirmation = (ra) => {
  selectedStudentRa.value = ra
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  isDeleteDialogOpen.value = false
  selectedStudentRa.value = null
}

const handleStudentDeletion = async () => {
  if (!selectedStudentRa.value) return

  isDeleting.value = true

  try {
    await studentStore.deleteStudent(selectedStudentRa.value)
  } catch {
    throw new Error('Erro ao deletar aluno.')
  } finally {
    isDeleting.value = false
    await loadStudents()
    closeDeleteDialog()
  }
}

onMounted(() => {
  loadStudents()
})
</script>
