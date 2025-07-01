<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="d-flex align-center">
        <router-link to="/" class="d-flex align-center text-white text-decoration-none">
          <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
          Módulo Acadêmico
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn @click="logout" color="error" text>
        <v-icon left>mdi-logout</v-icon>
        Sair
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app color="black">
      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="item.title"
            :to="{ name: item.route }"
            class="custom-list-item"
            :class="{ 'selected-item': selectedItem === index }"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AcademicModule',
  setup() {
    const auth = useAuthStore()
    const route = useRoute()
    const selectedItem = ref(0)
    const menuItems = ref([
      {
        title: 'Alunos',
        icon: 'mdi-account-school-outline',
        route: 'StudentList',
      },
    ])

    function updateSelectedItem(currentRoute) {
      const index = menuItems.value.findIndex((item) => item.route === currentRoute.name)
      selectedItem.value = index >= 0 ? index : null
    }

    onMounted(() => {
      updateSelectedItem(route)
    })

    watch(route, (to) => {
      updateSelectedItem(to)
    })

    const logout = () => {
      auth.logout()
    }

    return {
      selectedItem,
      menuItems,
      logout,
    }
  },
}
</script>

<style scoped>
.custom-list-item {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
  border-radius: 4px;
}

.custom-list-item:hover {
  background-color: rgba(33, 150, 243, 0.1);
  border-left: 4px solid #2196f3;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.selected-item {
  background-color: rgba(33, 150, 243, 0.2);
  border-left: 4px solid #2196f3;
}
</style>
