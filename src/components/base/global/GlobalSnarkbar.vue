<script lang="ts" setup></script>

<template>
  <v-snackbar>
    <div>
      <v-icon start icon="mdi-information-outline"> This is a global snackbar message. </v-icon>
    </div>

    <template #actions>
      <v-btn variant="text" icon="mdi-close">Close</v-btn>
    </template>
  </v-snackbar>
</template>
