<template>
  <v-container class="py-6">
    <v-card class="pa-6 rounded-xl">
      <v-card-title class="text-h5 font-weight-bold d-flex mb-4">
        <v-icon class="mr-4" color="secondary">mdi-school</v-icon>
        {{ isEdit ? 'Editar Aluno' : 'Cadastrar Novo Aluno' }}
      </v-card-title>

      <v-form ref="formRef" @submit.prevent="handleSubmit">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.ra"
              label="RA (6 dígitos)"
              :disabled="isEdit"
              :rules="[required, raRules]"
              :error-messages="errors.ra"
              maxlength="6"
              type="text"
              outlined
              density="comfortable"
              prepend-inner-icon="mdi-numeric"
              @update:model-value="onRaInput"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.name"
              label="Nome"
              :rules="[required, minLength(3)]"
              :error-messages="errors.name"
              outlined
              density="comfortable"
              prepend-inner-icon="mdi-account"
              @input="clearError('name')"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.email"
              label="E-mail"
              :rules="[required, emailRules]"
              :error-messages="errors.email"
              outlined
              density="comfortable"
              prepend-inner-icon="mdi-email"
              @input="clearError('email')"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="cpfFormatted"
              label="CPF"
              :disabled="isEdit"
              :rules="[required, cpfRules]"
              :error-messages="errors.cpf"
              outlined
              density="comfortable"
              prepend-inner-icon="mdi-card-account-details"
              @input="handleCpfInput"
            />
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-6">
          <v-btn type="submit" color="primary" :loading="loading" class="me-2" variant="flat">
            Salvar
          </v-btn>
          <v-btn :disabled="loading" variant="tonal" @click="handleCancel"> Cancelar </v-btn>
        </div>
      </v-form>
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

const emailRules = (value) => {
  if (!value) return 'E-mail é obrigatório'
  const atIndex = value.indexOf('@')
  const dotIndex = value.lastIndexOf('.')
  return (atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < value.length - 1) || 'E-mail inválido'
}

const raRules = (value) => {
  if (!value) return 'RA é obrigatório'
  if (value.length !== 6) return 'RA deve conter exatamente 6 números'
  return !isNaN(value) || 'RA deve conter apenas números'
}

const cpfRules = (value) => {
  const cleaned = value.replace(/\D/g, '')
  if (!cleaned) return 'CPF é obrigatório'
  if (cleaned.length !== 11) return 'CPF deve ter 11 dígitos'
  if (isNaN(cleaned)) return 'CPF deve conter apenas números'

  let allSame = true
  for (let i = 1; i < cleaned.length; i++) {
    if (cleaned[i] !== cleaned[0]) {
      allSame = false
      break
    }
  }
  if (allSame) return 'CPF inválido'

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== parseInt(cleaned[9])) return 'CPF inválido'

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== parseInt(cleaned[10])) return 'CPF inválido'

  return true
}

function onRaInput(value) {
  let digitsOnly = ''
  for (const char of value) {
    if (char >= '0' && char <= '9') {
      digitsOnly += char
    }
  }
  form.value.ra = digitsOnly.length <= 6 ? digitsOnly : digitsOnly.slice(0, 6)
  clearError('ra')
}

function formatCpf(value) {
  let digits = ''
  for (const char of value) {
    if (char >= '0' && char <= '9') {
      digits += char
    }
  }

  let formatted = ''
  for (let i = 0; i < digits.length && i < 11; i++) {
    if (i === 3 || i === 6) {
      formatted += '.'
    } else if (i === 9) {
      formatted += '-'
    }
    formatted += digits[i]
  }
  return formatted
}

function handleCpfInput(e) {
  cpfFormatted.value = formatCpf(e.target.value)
}

watch(cpfFormatted, (newVal) => {
  let digitsOnly = ''
  for (const char of newVal) {
    if (char >= '0' && char <= '9') {
      digitsOnly += char
    }
  }
  form.value.cpf = digitsOnly
})

function clearError(field) {
  errors.value[field] = ''
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return input

  const dangerousChars = [';', '"', "'", '\\', '--', '/*', '*/', '<', '>', '=', '(', ')']
  let sanitized = input
  dangerousChars.forEach((char) => {
    sanitized = sanitized.split(char).join('')
  })

  return sanitized.trim()
}

async function handleSubmit() {
  loading.value = true
  try {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    const payload = {
      name: sanitizeInput(form.value.name),
      email: sanitizeInput(form.value.email),
    }

    if (isEdit.value) {
      await studentStore.updateStudent(route.params.ra, payload)
    } else {
      payload.ra = sanitizeInput(form.value.ra)
      payload.cpf = sanitizeInput(form.value.cpf)
      await studentStore.createStudent(payload)
    }

    router.push('/students')
  } catch (error) {
    if (error.response?.data?.errors) {
      error.response.data.errors.forEach(({ path, msg }) => {
        if (errors.value[path] !== undefined) errors.value[path] = msg
      })
    } else {
      showSnackbar({ message: 'Erro ao salvar', color: 'error' })
    }
  } finally {
    loading.value = false
  }
}

function handleCancel() {
  router.push('/students')
}

onMounted(async () => {
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
})
</script>
