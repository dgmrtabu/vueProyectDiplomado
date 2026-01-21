import type { Credentials, Login, ResponseLogin } from "@/interfaces/auth.interface"
import { AutheService } from "@/services/auth.services"
import { useRequest } from "./useRequest"
import { useAlert } from "./useAlert"
import router from "@/router"
import { useAuthStore } from "@/stores/auth.store"
import { computed } from "vue"

export function useAuth() {
    const { loading, error, run } = useRequest()
    const { open } = useAlert()
    const authStore = useAuthStore()

    const isAuthenticated = () => computed(() => authStore.isAuthenticated)
    const user = () => computed(() => authStore.user)

    const login = async (payload: Credentials) => {
        try {
                const response: ResponseLogin = await run(() => AutheService.login(payload))
                const login: Login = {
                    token: response.token,
                    user:{
                        username: payload.username, 
                    }
                }

                //TODO: Guardar en store
                authStore.login(login)
                router.push({ name: 'profile' })
                open('Inicio de sesión exitoso' + payload.username, 'success')
        }catch {
            open(error.value?? 'Error al iniciar sesión', 'error')
        }
    }

     const logout = () => {
        authStore.logout()
        router.push({ name: 'login' })
        open('Cierre de sesión exitoso', 'success')
     }

     return {
        loading,
        error,
        isAuthenticated,
        user,
        login,
        logout,
     }
}
