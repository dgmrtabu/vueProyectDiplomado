import type { AxiosError } from 'axios'
import { ref } from 'vue'

interface ApiErrorResponse {
  message: string
}

export function useRequest() {
  const loading = ref(false)
  const error = ref<null | string>(null)

  const run = async <T>(request: () => Promise<T>): Promise<T> => {
    loading.value = true
    error.value = null

    try {
      return await request()
    } catch (err: unknown) {
      const axioserror = err as AxiosError<ApiErrorResponse>
      error.value = axioserror?.response?.data.message ?? axioserror?.message ?? 'Error desconocido'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    run,
  }
}
