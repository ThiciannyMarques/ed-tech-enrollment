<template>
  <v-col cols="12" class="px-2">
    <v-card class="gradient-card-chart" elevation="4">
      <v-card-title class="text-h6 text-white d-flex justify-space-between align-center">
        <div>
          <v-icon start icon="mdi-chart-line" color="white" class="mr-1" />
          Desempenho Geral
        </div>
        <v-chip color="white" text-color="primary" size="small">Em Análise</v-chip>
      </v-card-title>

      <v-card-text class="py-4">
        <v-skeleton-loader type="image" class="rounded-lg" height="180"></v-skeleton-loader>

        <v-row class="mt-4" justify="space-around">
          <v-col cols="6">
            <div class="text-white text-caption">Média de Alunos</div>
            <div class="text-h5 font-weight-bold">124</div>
          </v-col>
          <v-col cols="6">
            <div class="text-white text-caption">Aprovados</div>
            <div class="text-h5 font-weight-bold green--text">92%</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup>
//
</script>

<style scoped>
.gradient-card-chart {
  background: linear-gradient(135deg, #1d3557, #457b9d);
  color: white;
  border-radius: 12px;
  min-height: 280px;
}
</style>
