import { Task } from './tasksTypes'
import { UserData } from './userTypes'

export interface FetchTasksPayload {
  tasks: Task[]
  totalCount: number
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponseData {
  user: UserData
  access_token: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface RegisterResponseData {
  user: UserData
  access_token: string
}

export interface AuthResponse {
  token: string
  user: UserData
}

export interface ErrorResponseData {
  message: string
  [key: string]: unknown
}
