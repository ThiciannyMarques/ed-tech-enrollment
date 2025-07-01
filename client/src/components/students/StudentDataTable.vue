<template>
  <div class="enhanced-data-table pa-4">
    <v-data-table
      :headers="tableHeaders"
      :items="students"
      :loading="loading"
      :items-per-page="10"
      class="rounded-lg"
      :header-props="{ class: 'font-weight-bold text-uppercase text-primary' }"
      density="comfortable"
      item-value="ra"
      hide-default-footer
    >
      <template #[`item.actions`]="{ item }">
        <div class="d-flex align-center ga-1">
          <v-tooltip text="Editar">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="small"
                variant="text"
                color="secondary"
                @click="$emit('edit', item.ra)"
              >
                <v-icon>mdi-square-edit-outline</v-icon>
              </v-btn>
            </template>
          </v-tooltip>

          <v-tooltip text="Excluir">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon
                size="small"
                variant="text"
                color="error"
                @click="$emit('delete', item.ra)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </template>

      <template #no-data>
        <div class="no-data-container">
          <v-alert
            v-if="!loading"
            type="info"
            class="ma-4"
            border="start"
            color="primary"
            variant="tonal"
          >
            {{ $t('noData') }}
          </v-alert>

          <v-btn
            v-if="!loading"
            color="primary"
            variant="outlined"
            class="refresh-btn"
            prepend-icon="mdi-refresh"
            @click="$emit('refresh')"
          >
            Tentar Novamente
          </v-btn>

          <v-progress-linear v-else indeterminate color="primary" class="ma-4" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  students: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete', 'refresh'])

const tableHeaders = computed(() => [
  {
    title: t('student.ra'),
    key: 'ra',
    align: 'start',
    sortable: true,
  },
  {
    title: t('student.name'),
    key: 'name',
    sortable: true,
  },
  {
    title: t('student.email'),
    key: 'email',
    sortable: true,
  },
  {
    title: t('student.cpf'),
    key: 'cpf',
    sortable: true,
  },
  {
    title: t('Ações'),
    key: 'actions',
    sortable: false,
  },
])
</script>

<style scoped>
.enhanced-data-table {
  background-color: #f8f9fa;
  overflow: hidden;
}

.v-data-table tbody tr:hover {
  background-color: #f5faff;
  transition: background-color 0.2s ease;
}

.v-btn {
  transition: transform 0.15s ease;
}

.v-btn:hover {
  transform: scale(1.1);
}

.no-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
}

.refresh-btn {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.refresh-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.refresh-btn:active {
  transform: translateY(0);
}
</style>
