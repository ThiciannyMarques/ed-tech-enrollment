<template>
  <v-app>
    <v-app-bar app color="black">
      <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="d-flex align-center">
        <router-link to="/" class="d-flex align-center text-white text-decoration-none">
          <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
          <span class="d-none d-sm-flex">Módulo Acadêmico</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn color="error" text class="text-caption text-lg-body-2" @click="logout">
        <v-icon left size="small" class="d-sm-none">mdi-logout</v-icon>
        <span class="d-none d-sm-flex">
          <v-icon left small>mdi-logout</v-icon>
          Sair
        </span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="black"
      :permanent="$vuetify.display.lgAndUp"
      :temporary="$vuetify.display.mdAndDown"
    >
      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="item.title"
            :to="{ name: item.route }"
            class="custom-list-item"
            :class="{ 'selected-item': selectedItem === index }"
            @click="handleItemClick"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center text-caption text-lg-body-2">
                <v-icon class="mr-2" size="small">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
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
    const drawer = ref(null)
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

    function handleItemClick() {
      if (window.innerWidth < 1280) {
        drawer.value = false
      }
    }

    onMounted(() => {
      updateSelectedItem(route)
      drawer.value = window.innerWidth >= 1280
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
      drawer,
      logout,
      handleItemClick,
    }
  },
}
</script>

<style scoped>
.custom-list-item {
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
  border-radius: 4px;
  min-height: 40px;
}

.custom-list-item:hover {
  background-color: rgba(33, 150, 243, 0.1);
  border-left: 4px solid #2196f3;
}

.selected-item {
  background-color: rgba(33, 150, 243, 0.2);
  border-left: 4px solid #2196f3;
}

@media (max-width: 600px) {
  .v-toolbar__content {
    padding: 0 8px;
  }
}
</style>
