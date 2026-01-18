<script lang="js">
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="8">
          <v-card-title class="text-center">
            <v-icon size="36">mdi-account-circle</v-icon>
            <div class="mt-2">Crear Cuenta</div>
            <v-form>
              <v-card-text>
                <v-text-field label="Usuarios" type="text" required prepend-icon="mdi-account" />
                <v-text-field label="Contraseña" type="password" required prepend-icon="mdi-lock" />
                <v-text-field
                  label="Confirmar Contraseña"
                  type="password"
                  required
                  prepend-icon="mdi-lock-check"
                />
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" class="mt-4" block>Registrar</v-btn>
              </v-card-actions>
            </v-form>
            <v-card-actions class="justify-center">
              <span class="text-caption">¿Ya tienes una cuenta?</span>
              <RouterLink :to="{ name: 'login' }" class="text-decoration:none">
                <span class="text-caption">Iniciar Sesión</span>
              </RouterLink>
            </v-card-actions>
          </v-card-title>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
