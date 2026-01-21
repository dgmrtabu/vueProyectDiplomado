<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import type { Credentials } from '@/interfaces/auth.interface'
import { rules } from '@/tools/rules'
import { reactive, ref } from 'vue'
import { VForm } from 'vuetify/components'

const { login, loading, error } = useAuth() 

const credentials = reactive<Credentials> ({
  username: '',
  password: '',
})

const form = ref<VForm | null>(null)

const submit = async () => {
  await form.value?.validate()
  if (!form.value?.isValid) return
  console.log('Formulario de inicio de sesión válido:', credentials)
  //TODO: Aquí iría la lógica para enviar los datos al servidor
  await login(credentials)

}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="8">
          <v-card-title class="text-center">
            <v-icon size="36">mdi-account-circle</v-icon>
            <div class="mt-2">Iniciar Sesión</div>
            <v-form ref="form" lazy-validation @submit.prevent="submit">
              <v-card-text>
                <v-text-field v-model="credentials.username" prepend-inner-icon="mdi-account" :rules="[rules.required, rules.minLength]" label="Usuarios" type="text" required> </v-text-field>
                <v-text-field v-model="credentials.password" prepend-inner-icon="mdi-lock" :rules="[rules.required, rules.minLength]" label="Password" type="password" required></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn type="submit" :loading="loading" color="primary" class="mt-4" block>Entrar</v-btn>
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
