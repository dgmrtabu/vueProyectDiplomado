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
            <div class="mt-2">Iniciar Sesión</div>
            <v-form>
              <v-card-text>
                <v-text-field label="Usuarios" type="text" required> </v-text-field>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" class="mt-4" block>Entrar</v-btn>
              </v-card-actions>
            </v-form>
            <v-card-actions class="justify-center">
              <span class="text-caption">¿No tienes una cuenta?</span>
              <RouterLink :to="{ name: 'register' }" class="text-decoration:none">
                <span class="text-caption">Regístrate aqui</span>
              </RouterLink>
            </v-card-actions>
          </v-card-title>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
