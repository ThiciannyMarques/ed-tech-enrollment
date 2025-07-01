import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

const customLightTheme = {
  dark: false,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  colors: {
    background: '#e4e9ed',
    surface: '#ffffff',
    primary: '#2c3b48',
    'primary-darken-1': '#1d1d1d',
    secondary: '#00cad2',
    'secondary-darken-1': '#008f94',
    error: '#ff203b',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  textColor: {
    surface: '#ffffff',
    primary: '#2c3b48',
    secondary: '#00cad2',
    error: '#ff203b',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
    },
    variations: {
      colors: ['primary', 'secondary', 'error'],
      lighten: 3,
      darken: 3,
    },
  },
  defaults: {
    VContainer: {
      class: 'pa-0',
    },
  },
})
