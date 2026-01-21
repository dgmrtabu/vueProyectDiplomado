const rules = {
  required: (v: string) => (!!v && v.trim() !== '') || 'Este campo es obligatorio.',
  minLength: (v: string) => v.length >= 3 || 'La contraseña debe tener al menos 3 caracteres.',
  matchPassword: (password: string, confirmPassword:string) =>
    password === confirmPassword || 'Las contraseñas no coinciden.',
}

export { rules }