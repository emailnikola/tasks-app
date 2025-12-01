import apiClient from './apiClient'
import { notifications } from '@mantine/notifications'
import { AppDispatch } from '../store'
import { setLogin } from '../store/authSlice'
// TYPES
import type {
  AuthResponse,
  LoginData,
  LoginResponseData,
  RegisterData,
  RegisterResponseData
} from '../types/apiTypes'

export const loginUser = async (
  credentials: LoginData,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const response = await apiClient.post('/auth/login', credentials)
    const { user, access_token } = response.data as LoginResponseData
    dispatch(setLogin({ token: access_token, user: user }))
    notifications.show({
      title: 'Login Successful',
      message: `Welcome back, ${user.firstName}!`,
      color: 'green'
    })
    return true
  } catch (error) {
    return false
  }
}

export const registerUserService = async (
  registrationData: RegisterData
): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/register', registrationData)
  const { user, access_token } = response.data as RegisterResponseData
  return { token: access_token, user: user }
}
