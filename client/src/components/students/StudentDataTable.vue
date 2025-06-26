<template>
  <v-data-table
    :headers="tableHeaders"
    :items="students"
    :search="search"
    :loading="loading"
    :items-per-page="10"
    class="elevation-1"
  >
    <template #[`item.actions`]="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="text"
        size="small"
        color="primary"
        @click="$emit('edit', item.ra)"
      />
      <v-btn
        icon="mdi-delete"
        variant="text"
        size="small"
        color="error"
        @click="$emit('delete', item.ra)"
      />
    </template>

    <template #no-data>
      <v-alert v-if="!loading" type="info">
        {{ $t('general.noData') }}
      </v-alert>
      <v-progress-linear v-else indeterminate color="primary" />
    </template>
  </v-data-table>
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
  search: {
    type: String,
    default: '',
  },
})

defineEmits(['edit', 'delete'])

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
    title: t('general.actions'),
    key: 'actions',
    sortable: false,
    align: 'end',
  },
])
</script>
