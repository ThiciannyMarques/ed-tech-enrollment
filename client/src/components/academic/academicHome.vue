<template>
  <v-row class="mb-2" mr="0" no-gutters>
    <v-col cols="12">
      <v-card class="welcome-card pa-3 pa-sm-6" dark>
        <v-card-title class="text-h5 text-sm-h4">Bem-vindo ao Sistema Acadêmico</v-card-title>
        <v-card-subtitle class="text-caption text-sm-body-2"
          >Gerencie seus alunos e atividades acadêmicas</v-card-subtitle
        >

        <v-row class="cards-row ga-1 mt-3 mt-sm-5 mt-md-3" no-gutters>
          <DashboardCard
            title="Total de Alunos"
            icon="mdi-account-school-outline"
            showActions
            actionText="Ver todos"
            :route="{ name: 'StudentList' }"
            @navigate="$router.push($event)"
          >
            <template #content>
              <div class="text-start ml-3">
                <div class="text-h4 text-sm-h3 font-weight-bold">{{ totalStudents }}</div>
                <v-progress-linear
                  v-if="loading"
                  indeterminate
                  color="white"
                  class="mt-1"
                ></v-progress-linear>
              </div>
            </template>
          </DashboardCard>

          <DashboardCard title="Últimos Cadastros" icon="mdi-clock-outline">
            <template #content>
              <v-list v-if="recentStudents.length > 0" class="transparent-list" density="compact">
                <v-list-item
                  v-for="student in recentStudents"
                  :key="student.ra"
                  :title="student.name"
                  :subtitle="`RA: ${student.ra}`"
                  class="list-item-hover text-white"
                >
                  <template #prepend>
                    <v-avatar color="white" size="28">
                      <span class="primary--text text-caption">{{
                        getInitials(student.name)
                      }}</span>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert
                v-else
                type="info"
                variant="tonal"
                class="mt-1"
                density="compact"
                color="white"
              >
                Nenhum aluno cadastrado recentemente
              </v-alert>
            </template>
          </DashboardCard>

          <DashboardCard title="Ações Rápidas" icon="mdi-rocket-launch">
            <template #content>
              <v-list lines="two" class="transparent-list" density="compact">
                <v-list-item
                  v-for="action in quickActions"
                  :key="action.title"
                  :title="action.title"
                  :subtitle="action.subtitle"
                  link
                  class="list-item-hover text-white"
                  @click="$router.push(action.route)"
                >
                  <template #prepend>
                    <v-icon :icon="action.icon" color="white" size="x-small"></v-icon>
                  </template>
                </v-list-item>
              </v-list>
            </template>
          </DashboardCard>

          <DashboardChartCard />
          <DashboardActivityCard />
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import DashboardCard from '../cards/DashboardCard'
import DashboardChartCard from '../cards/DashboardChartCard.vue'
import DashboardActivityCard from '../cards/DashboardActivityCard.vue'

const studentStore = useStudentStore()

onMounted(async () => {
  await studentStore.fetchStudents()
})

const totalStudents = computed(() => studentStore.students.length)
const loading = computed(() => studentStore.loading)

const recentStudents = computed(() => {
  return [...studentStore.students]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)
})

const quickActions = [
  {
    title: 'Cadastrar Novo Aluno',
    subtitle: 'Adicione um novo aluno ao sistema',
    icon: 'mdi-account-plus',
    route: { name: 'StudentCreate' },
  },
  {
    title: 'Listar Todos os Alunos',
    subtitle: 'Visualize todos os alunos cadastrados',
    icon: 'mdi-format-list-bulleted',
    route: { name: 'StudentList' },
  },
]

const getInitials = (fullName) => {
  if (!fullName?.trim()) return ''
  const [firstName, ...restNames] = fullName.trim().split(/\s+/)
  const lastName = restNames.pop() || ''
  return `${firstName[0]}${lastName[0] || ''}`.toUpperCase()
}
</script>

<style scoped>
.transparent-list {
  background: transparent;
}

.v-list-item {
  min-height: 36px;
}

.v-card {
  transition: all 0.2s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 599px) {
  .welcome-card {
    width: 23rem;
    margin: auto;
  }
  .cards-row {
    flex-wrap: wrap;
  }
}
</style>
