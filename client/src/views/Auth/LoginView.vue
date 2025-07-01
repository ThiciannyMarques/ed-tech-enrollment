<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
            <v-btn icon :to="{ name: 'Register' }" title="Criar conta">
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.username"
                label="Username"
                prepend-icon="mdi-account"
                :rules="[(v) => !!v || 'Campo obrigatório']"
                required
              />

              <v-text-field
                v-model="form.password"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[(v) => !!v || 'Campo obrigatório']"
                required
                @click:append="showPassword = !showPassword"
              />

              <v-alert v-if="auth.error" type="error" class="mt-3">
                {{ auth.error }}
              </v-alert>

              <v-btn type="submit" color="primary" block :loading="auth.loading" class="mt-4">
                Login
              </v-btn>

              <v-btn text color="secondary" block class="mt-2" :to="{ name: 'ResetPassword' }">
                Esqueci minha senha
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- Nova seção para cadastro -->
          <v-divider class="my-2"></v-divider>

          <v-card-actions class="justify-center pb-4">
            <span class="mr-2">Não tem uma conta?</span>
            <v-btn color="primary" variant="outlined" :to="{ name: 'Register' }">
              Criar conta
            </v-btn>
          </v-card-actions>
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
  password: '',
})
const showPassword = ref(false)

const handleLogin = async () => {
  await auth.login(form.value)
}
</script>
