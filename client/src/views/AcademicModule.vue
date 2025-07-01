<template>
  <v-app>
    <v-app-bar app color="black">
      <v-toolbar-title class="d-flex align-center">
        <router-link to="/" class="d-flex align-center text-white text-decoration-none">
          <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
          Módulo Acadêmico
        </router-link>
      </v-toolbar-title>
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
export default {
  name: 'AcademicModule',
  data() {
    return {
      selectedItem: 0,
      menuItems: [
        {
          title: 'Alunos',
          icon: 'mdi-account-school-outline',
          route: 'StudentList',
        },
      ],
    }
  },
  watch: {
    $route(to) {
      this.updateSelectedItem(to)
    },
  },
  created() {
    this.updateSelectedItem(this.$route)
  },
  methods: {
    updateSelectedItem(route) {
      const index = this.menuItems.findIndex((item) => item.route === route.name)
      this.selectedItem = index >= 0 ? index : null
    },
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
