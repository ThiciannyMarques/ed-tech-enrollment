<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Módulo Acadêmico</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>

        <v-card v-if="$route.path === '/academic'" class="pa-4">
          <v-card-title>Bem-vindo ao Módulo Acadêmico</v-card-title>
          <v-card-text> Selecione uma opção no menu lateral para começar. </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AcademicModule',
  data() {
    return {
      selectedItem: 1,
      menuItems: [{ title: 'Alunos', icon: 'mdi-account-group', route: '/students' }],
    }
  },
}
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>
