export interface Credentials {
  username: string
  password: string
}

export interface Register extends Credentials {
  confirmPassword: string
}
