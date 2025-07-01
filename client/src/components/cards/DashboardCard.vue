<template>
  <v-col cols="12" sm="6" lg="4" class="pa-1">
    <v-card class="gradient-card pt-2 pb-1 ps-1" elevation="4">
      <v-card-title class="text-h6 text-white d-flex justify-space-between align-center">
        <span class="text-subtitle-1 text-sm-h6">{{ title }}</span>
        <v-icon color="secondary" size="small">{{ icon }}</v-icon>
      </v-card-title>

      <v-card-text class="pa-1 text-white">
        <slot name="content" />
      </v-card-text>

      <v-card-actions v-if="showActions" class="pa-1">
        <v-btn
          variant="text"
          color="white"
          size="small"
          class="text-caption text-sm-body-2"
          @click="navigate"
        >
          {{ actionText }}
          <v-icon right size="small">mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup>
const props = defineProps({
  title: String,
  icon: String,
  showActions: {
    type: Boolean,
    default: false,
  },
  actionText: {
    type: String,
    default: 'Ver mais',
  },
  route: Object,
})

const emit = defineEmits(['navigate'])

const navigate = () => {
  if (props.route) {
    emit('navigate', props.route)
  }
}
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #000000, #2c3b48);
  color: white;
  border-radius: 8px;
  height: 100%;
  min-height: 180px;
}

@media (max-width: 600px) {
  .gradient-card {
    min-height: 160px;
  }
}
</style>
