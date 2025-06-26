import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useStudentForm() {
  const { t } = useI18n()

  const form = ref({
    ra: '',
    name: '',
    email: '',
    cpf: '',
  })

  const errors = ref({
    ra: '',
    name: '',
    email: '',
    cpf: '',
  })

  const validate = () => {
    let isValid = true
    errors.value = { ra: '', name: '', email: '', cpf: '' }

    if (!form.value.ra) {
      errors.value.ra = t('validation.required', { field: t('student.ra') })
      isValid = false
    }

    if (!form.value.name) {
      errors.value.name = t('validation.required', {
        field: t('student.name'),
      })
      isValid = false
    } else if (form.value.name.length < 3) {
      errors.value.name = t('validation.minLength', {
        field: t('student.name'),
        length: 3,
      })
      isValid = false
    }

    if (!form.value.email) {
      errors.value.email = t('validation.required', {
        field: t('student.email'),
      })
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
      errors.value.email = t('validation.email')
      isValid = false
    }

    if (!form.value.cpf) {
      errors.value.cpf = t('validation.required', { field: t('student.cpf') })
      isValid = false
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.value.cpf)) {
      errors.value.cpf = t('validation.cpfFormat')
      isValid = false
    }

    return { valid: isValid }
  }

  return {
    form,
    errors,
    validate,
  }
}
