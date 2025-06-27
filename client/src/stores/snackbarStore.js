import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const color = ref('')
  const show = ref(false)

  function showMessage({ text, color: msgColor }) {
    message.value = text
    color.value = msgColor
    show.value = true

    // eslint-disable-next-line no-undef
    setTimeout(() => {
      show.value = false
    }, 3000)
  }

  return { message, color, show, showMessage }
})
