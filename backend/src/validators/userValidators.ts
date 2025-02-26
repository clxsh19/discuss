import ValidateFieldNotEmpty from "./validateFieldNotEmpty"

export const validateUserCredentials = [
  ValidateFieldNotEmpty('username', 'Username'),
  ValidateFieldNotEmpty('password', 'Password')
]
