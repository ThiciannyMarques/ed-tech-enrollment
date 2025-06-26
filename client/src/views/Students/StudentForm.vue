<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Editar Aluno' : 'Novo Aluno' }}
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.ra"
            label="RA"
            :disabled="isEdit"
            :rules="[required]"
          ></v-text-field>

          <v-text-field v-model="form.name" label="Nome" :rules="[required]"></v-text-field>

          <v-text-field v-model="form.email" label="E-mail" :rules="[emailRules]"></v-text-field>

          <v-text-field
            v-model="form.cpf"
            v-mask="'###.###.###-##'"
            label="CPF"
            :disabled="isEdit"
            :rules="[required]"
          ></v-text-field>

          <v-btn type="submit" color="primary" :loading="loading"> Salvar </v-btn>
          <v-btn class="ml-2" @click="$router.push('/students')"> Cancelar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStudentStore } from '../../stores/studentStore.js'
import studentApi from '../../api/studentApi.js'

const router = useRouter()
const route = useRoute()
const studentStore = useStudentStore()
const loading = ref(false)

const form = ref({
  ra: '',
  name: '',
  email: '',
  cpf: '',
})

const isEdit = computed(() => !!route.params.ra)

const required = (value) => !!value || 'Campo obrigatório'
const emailRules = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value) || 'E-mail inválido'
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      loading.value = true
      const student = await studentApi.getStudent(route.params.ra)
      if (student) {
        form.value = { ...student }
      }
    } finally {
      loading.value = false
    }
  }
})

const handleSubmit = async () => {
  try {
    loading.value = true
    const payload = {
      name: form.value.name,
      email: form.value.email,
    }
    if (isEdit.value) {
      await studentStore.updateStudent(route.params.ra, payload)
    } else {
      await studentStore.createStudent(form.value)
    }

    await studentStore.fetchStudents()
    router.push('/students')
  } finally {
    loading.value = false
  }
}
</script>
