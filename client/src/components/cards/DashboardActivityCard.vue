<template>
  <v-col cols="12" class="px-2">
    <v-card class="activity-card" elevation="4">
      <v-card-title class="text-h6 text-white">
        <v-icon start icon="mdi-history" color="white" class="mr-1" />
        Atividades Recentes
      </v-card-title>

      <v-card-text>
        <v-list density="compact" class="transparent-list">
          <v-list-item
            v-for="(activity, index) in sampleActivities"
            :key="index"
            class="list-item-hover text-white"
          >
            <template #prepend>
              <v-avatar color="white" size="32">
                <v-icon color="primary" size="20">{{ activity.icon }}</v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>{{ activity.title }}</v-list-item-title>
            <v-list-item-subtitle class="text-white text-caption">
              {{ activity.time }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup>
const sampleActivities = [
  { title: 'Aluno João Silva cadastrado', icon: 'mdi-account-plus', time: 'Há 5 minutos' },
  { title: 'Atualização no curso de Matemática', icon: 'mdi-pencil', time: 'Há 20 minutos' },
  { title: 'Novo evento criado: Simulado', icon: 'mdi-calendar', time: 'Hoje, 10:00' },
]
</script>

<style scoped>
.activity-card {
  background: linear-gradient(135deg, #2c3b48, #1b1f24);
  border-radius: 12px;
  color: white;
  min-height: 280px;
}

.transparent-list {
  background: transparent;
}
</style>
