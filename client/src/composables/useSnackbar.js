import { ref } from 'vue'

export function useSnackbar() {
  const snackbar = ref({
    show: false,
    message: '',
    color: 'success',
  })

  const showSnackbar = ({ message, color = 'success' }) => {
    snackbar.value = {
      show: true,
      message,
      color,
    }
  }

  return {
    snackbar,
    showSnackbar,
  }
}
