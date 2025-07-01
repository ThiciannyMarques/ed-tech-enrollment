<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Resetar Senha</v-toolbar-title>
            <v-spacer />
            <v-btn icon :to="{ name: 'Login' }">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleReset">
              <v-text-field
                v-model="form.username"
                label="Username"
                prepend-icon="mdi-account"
                :rules="[(v) => !!v || 'Campo obrigatório']"
                required
              />

              <v-text-field
                v-model="form.newPassword"
                label="Nova Senha"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[
                  (v) => !!v || 'Campo obrigatório',
                  (v) => v.length >= 6 || 'Mínimo 6 caracteres',
                ]"
                required
                @click:append="showPassword = !showPassword"
              />

              <v-alert v-if="auth.error" type="error" class="mt-3">
                {{ auth.error }}
              </v-alert>

              <v-btn type="submit" color="primary" block :loading="auth.loading" class="mt-4">
                Resetar Senha
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
const form = ref({
  username: '',
  newPassword: '',
})
const showPassword = ref(false)

const handleReset = async () => {
  await auth.resetPassword(form.value)
}
</script>
