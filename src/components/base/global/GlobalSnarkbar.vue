<script lang="ts" setup>
import { useAlert } from '@/composables/useAlert'
const { state, close } = useAlert()
</script>
S

<template>
  <v-snackbar
    :model-value="state.show"
    @update:model-value="close"
    :color="state.type"
    timeout="5000"
    location="top right"
    elevation="20"
  >
    <div>
      <v-icon start icon="mdi-information-outline" />
      {{ state.message }}
    </div>

    <template #actions>
      <v-btn variant="text" icon="mdi-close" @click="close"></v-btn>
    </template>
  </v-snackbar>
</template>
