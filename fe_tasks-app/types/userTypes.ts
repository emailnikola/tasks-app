export interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface AuthContextType {
  token: string | null
  user: UserData | null
  login: (accessToken: string, userData: UserData) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthState {
  token: string | null
  user: UserData | null
  isAuthenticated: boolean
}
