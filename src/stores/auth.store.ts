
import type { User } from "@/interfaces/auth.interface"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

const TOKEN = 'token'
const USER = 'user'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem(TOKEN))
    const user = ref<User | null>(JSON.parse(localStorage.getItem(USER) || 'null'))

    const login = (paylod: { token: string, user: User }) => {
        token.value = paylod.token
        user.value = paylod.user

        localStorage.setItem(TOKEN, paylod.token)
        localStorage.setItem(USER, JSON.stringify(paylod.user))
    }

    const logout = () => {
        token.value = null
        user.value = null
        localStorage.clear()  
    }

    const isAuthenticated = computed(() => !!token.value)

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout,
    }
})