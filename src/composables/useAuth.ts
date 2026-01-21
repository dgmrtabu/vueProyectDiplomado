import type { Credentials, Login, ResponseLogin } from "@/interfaces/auth.interface"
import { AuthService } from "@/services/auth.services"
import { useRequest } from "./useRequest"
import { useAlert } from "./useAlert"
import router from "@/router"

export function useAuth() {
    const { loading, error, run } = useRequest()
    const { open } = useAlert()

    const login = async (payload: Credentials) => {
        try {
                const response: ResponseLogin = await run(() => AuthService.login(payload))

                const login: Login = {
                    token: response.token,
                    user:{
                        username: payload.username, 
                    }
                }

                //TODO: Guardar el token Usuar Pinia
                router.push({ name: 'profile' })
                open('Inicio de sesión exitoso' + payload.username, 'success')
        }catch {
            open('Error al iniciar sesión', 'error')
            console.error('Error al iniciar sesión:', error)
        }
    }
}
