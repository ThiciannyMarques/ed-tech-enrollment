<template>
  <v-snackbar v-model="isVisible" :timeout="timeout" :color="color" location="bottom right">
    {{ message }}

    <template #actions>
      <v-btn variant="text" @click="isVisible = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  message: String,
  color: {
    type: String,
    default: 'success',
  },
  timeout: {
    type: Number,
    default: 3000,
  },
})

const emit = defineEmits(['update:show'])

const isVisible = ref(false)

watch(
  () => props.show,
  (val) => {
    isVisible.value = val
  }
)

watch(isVisible, (val) => {
  if (!val) {
    emit('update:show', false)
  }
})
</script>
