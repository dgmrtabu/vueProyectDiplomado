export const useAlert = () => {
  const showAlert = (message: string) => {
    alert(message)
  }

  return {
    showAlert,
  }
}
