<template>
  <v-app>
    <router-view />
    <app-snackbar />
  </v-app>
</template>

<script setup>
import AppSnackbar from '../src/components/snackBar/AppSnackbar'
</script>
