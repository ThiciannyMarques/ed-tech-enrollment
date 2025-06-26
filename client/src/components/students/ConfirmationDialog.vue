<template>
  <v-dialog
    :model-value="modelValue"
    max-width="500"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" :disabled="loading" @click="$emit('cancel')">
          {{ $t('general.cancel') }}
        </v-btn>
        <v-btn color="primary" :loading="loading" @click="confirm">
          {{ $t('general.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
  message: String,
  loading: Boolean,
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
}
</script>
