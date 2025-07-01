<template>
  <v-col :cols="12" :sm="4" class="flex-lg-1-0-0 px-1">
    <v-card class="gradient-card pt-2 pb-1 ps-1" elevation="4">
      <v-card-title class="text-h6 text-white">
        {{ title }}
        <v-icon left color="secondary" class="float-end">{{ icon }}</v-icon>
      </v-card-title>

      <v-card-text class="pa-1 text-white">
        <slot name="content" />
      </v-card-text>

      <v-card-actions v-if="showActions" class="pa-1">
        <v-btn variant="text" color="white" small @click="navigate">
          {{ actionText }}
          <v-icon right small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script setup>
const props = defineProps({
  title: String,
  icon: String,
  showActions: Boolean,
  actionText: String,
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
  height: 14rem;
}
</style>
