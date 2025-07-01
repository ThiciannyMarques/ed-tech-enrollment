<template>
  <v-col cols="12" md="6">
    <v-text-field
      :model-value="modelValue"
      :label="label"
      :rules="rules"
      :error-messages="error"
      :disabled="disabled"
      :maxlength="maxlength"
      outlined
      density="comfortable"
      :prepend-inner-icon="icon"
      @update:model-value="$emit('update:modelValue', $event)"
      @input="$emit('input', $event)"
    />
  </v-col>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  icon: String,
  rules: Array,
  error: String,
  disabled: Boolean,
  maxlength: [Number, String],
})

defineEmits(['update:modelValue', 'input'])
</script>
