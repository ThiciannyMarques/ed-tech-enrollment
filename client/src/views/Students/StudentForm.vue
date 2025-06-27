<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Editar Aluno' : 'Novo Aluno' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="formRef">
          <v-text-field
            v-model="form.ra"
            label="RA"
            :disabled="isEdit"
            :rules="[required]"
            :error-messages="errors.ra"
            @input="clearError('ra')"
          />
          <v-text-field
            v-model="form.name"
            label="Nome"
            :rules="[required, minLength(3)]"
            :error-messages="errors.name"
            @input="clearError('name')"
          />
          <v-text-field
            v-model="form.email"
            label="E-mail"
            :rules="[required, emailRules]"
            :error-messages="errors.email"
            @input="clearError('email')"
          />
          <v-text-field
            v-model="cpfFormatted"
            label="CPF"
            :disabled="isEdit"
            :rules="[required, cpfRules]"
            :error-messages="errors.cpf"
            @input="handleCpfInput"
          />
          <v-btn type="submit" color="primary" :loading="loading">Salvar</v-btn>
          <v-btn class="ml-2" @click="handleCancel" :disabled="loading">Cancelar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStudentStore } from '../../stores/studentStore.js'
import studentApi from '../../api/studentApi.js'
import { useSnackbar } from '../../composables/useSnackbar'

const router = useRouter()
const route = useRoute()
const studentStore = useStudentStore()
const { showSnackbar } = useSnackbar()

const loading = ref(false)
const formRef = ref(null)

const form = ref({
  ra: '',
  name: '',
  email: '',
  cpf: '',
})

const errors = ref({
  ra: '',
  name: '',
  email: '',
  cpf: '',
})

const cpfFormatted = ref('')

const isEdit = computed(() => !!route.params.ra)

const required = (value) => !!value || 'Campo obrigatório'
const minLength = (length) => (value) => value.length >= length || `Mínimo de ${length} caracteres`
const emailRules = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'E-mail inválido'
const cpfRules = (value) => {
  const cleaned = value.replace(/\D/g, '')

  if (!cleaned) return 'CPF é obrigatório'
  if (cleaned.length !== 11) return 'CPF deve ter 11 dígitos'
  if (!/^\d+$/.test(cleaned)) return 'CPF deve conter apenas números'

  // Valida dígitos repetidos (111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleaned)) return 'CPF inválido'

  // Valida sequências comuns (123.456.789-09)
  if (cleaned === '12345678909') return 'CPF inválido'

  // Cálculo dos dígitos verificadores (algoritmo oficial)
  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return 'CPF inválido'

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return 'CPF inválido'

  return true
}

function formatCpf(value) {
  const digits = value.replace(/\D/g, '')
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
    .slice(0, 14)
}

function clearError(field) {
  errors.value[field] = ''
}

function handleCpfInput(e) {
  cpfFormatted.value = formatCpf(e.target.value)
}

watch(cpfFormatted, (newVal) => {
  form.value.cpf = newVal.replace(/\D/g, '')
})

async function handleSubmit() {
  loading.value = true
  try {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    const payload = {
      name: form.value.name,
      email: form.value.email,
    }

    if (isEdit.value) {
      await studentStore.updateStudent(route.params.ra, payload)
    } else {
      payload.ra = form.value.ra
      payload.cpf = form.value.cpf
      await studentStore.createStudent(payload)
    }

    router.push('/students')
  } catch (error) {
    handleApiErrors(error)
  } finally {
    loading.value = false
  }
}

function handleApiErrors(error) {
  if (error.response?.data?.errors) {
    error.response.data.errors.forEach(({ path, msg }) => {
      if (errors.value[path] !== undefined) errors.value[path] = msg
    })
  } else {
    showSnackbar({ message: 'Erro ao salvar', color: 'error' })
  }
}

function handleCancel() {
  router.push('/students')
}

onMounted(loadStudentIfEdit)

async function loadStudentIfEdit() {
  if (!isEdit.value) return
  loading.value = true
  try {
    const student = await studentApi.getStudent(route.params.ra)
    if (student) {
      form.value.ra = student.ra || ''
      form.value.name = student.name || ''
      form.value.email = student.email || ''
      form.value.cpf = student.cpf || ''
      cpfFormatted.value = formatCpf(student.cpf || '')
    }
  } catch {
    showSnackbar({ message: 'Erro ao carregar aluno', color: 'error' })
    router.push('/students')
  } finally {
    loading.value = false
  }
}
</script>
