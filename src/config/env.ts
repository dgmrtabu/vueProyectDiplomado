function getEnvVariable(key: string): string {
  const value = import.meta.env[key]

  if (value === undefined || value === null || value === '') {
    throw new Error(
      `Error de configuracion: la variable de entorno ${key} es obligatoria pero no está definida.`,
    )
  }

  return value
}

export const ENV = {
  API_URL: getEnvVariable('VITE_API_URL'),
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Diplomado Vue',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
}
