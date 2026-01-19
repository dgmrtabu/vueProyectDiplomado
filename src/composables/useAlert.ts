import { reactive, readonly } from 'vue'

type AlertType = 'success' | 'error' | 'info' | 'warning'

interface AlertState {
  show: boolean
  message: string
  type: AlertType
}

const state = reactive<AlertState>({
  show: false,
  message: '',
  type: 'info',
})

export const useAlert = () => {
  const open = (message: string, typeValue: AlertType = 'info') => {
    state.message = message
    state.type = typeValue
    state.show = true
  }
  const close = () => {
    state.show = false
  }

  return {
    state: readonly(state),
    open,
    close,
  }
}
