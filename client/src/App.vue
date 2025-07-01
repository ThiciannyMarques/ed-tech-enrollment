<template>
  <v-app>
    <router-view />
    <app-snackbar />
  </v-app>
</template>

<script setup>
import AppSnackbar from '../src/components/snackBar/AppSnackbar'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sunuwar&display=swap');
</style>
