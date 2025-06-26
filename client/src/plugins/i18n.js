import { createI18n } from 'vue-i18n'
import enUS from '@/locales/en-US'
import ptBR from '@/locales/pt-BR'

const messages = {
  'en-US': enUS,
  'pt-BR': ptBR,
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages,
})

export default i18n
