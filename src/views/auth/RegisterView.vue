<script lang="ts" setup>
import { useAlert } from '@/composables/useAlert'
import { useRequest } from '@/composables/useRequest'
import type { Register } from '@/interfaces/auth.interface'
import router from '@/router'
import { AutheService } from '@/services/auth.services'
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { VForm } from 'vuetify/components'
import { rules } from '@/tools/rules'

const { open } = useAlert()
const { run, error, loading } = useRequest()

const register = reactive<Register>({
  username: '',
  password: '',
  confirmPassword: '',
})

const form = ref<VForm | null>(null)

const submit = async () => {
  await form.value?.validate()
  if (!form.value?.isValid) return
  try {
    await run(() =>
      AutheService.register({
        username: register.username,
        password: register.password,
      }),
    )
    console.log('Registrando usuario:')
    open('Registro exitoso', 'success')
    router.push({ name: 'login' })
    // Aquí iría la lógica para enviar los datos al servidor
  } catch {
    console.error('Error al registrar:', error)
    open(error.value ?? 'Error al registrar el usuario', 'error')
  }
  console.log('Formulario de registro válido:')
}
</script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="8">
          <v-card-title class="text-center">
            <v-icon size="36">mdi-account-circle</v-icon>
            <div class="mt-2">Crear Cuenta</div>
          </v-card-title>
          <v-form ref="form" lazy-validation @submit.prevent="submit">
            <v-card-text>
              <v-text-field
                v-model="register.username"
                label="Usuarios"
                type="text"
                required
                prepend-icon="mdi-account"
                :rules="[rules.required, rules.minLength]"
              />
              <v-text-field
                v-model="register.password"
                label="Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock"
                :rules="[rules.required, rules.minLength]"
              />
              <v-text-field
                v-model="register.confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                required
                prepend-icon="mdi-lock-check"
                :rules="[rules.required, rules.matchPassword(register.password, register.confirmPassword)]"
              />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="primary" class="mt-4" block :loading="loading" type="submit"
                >Registrar</v-btn
              >
            </v-card-actions>
          </v-form>
          <v-card-actions class="justify-center">
            <span class="text-caption">¿Ya tienes una cuenta?</span>
            <RouterLink :to="{ name: 'login' }" class="text-decoration:none">
              <span class="text-caption">Iniciar Sesión</span>
            </RouterLink>
          </v-card-actions>

          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
