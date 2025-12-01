import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUserService } from '../services/authService'
import { AuthState } from '../types/userTypes'
import { AuthResponse, RegisterData } from '../types/apiTypes'

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: ((): AuthState['user'] => {
    if (typeof window === 'undefined') {
      return null
    }
    const storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== 'undefined') {
      try {
        return JSON.parse(storedUser) as AuthState['user']
      } catch (e) {
        console.error('Bad user data in localStorage:', storedUser)
        return null
      }
    }
    return null
  })(),
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
}

export const registerUser = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/register',
  async (registrationData, { dispatch, rejectWithValue }) => {
    try {
      const responseData = await registerUserService(registrationData)
      dispatch(setLogin(responseData))
      return responseData
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed')
    }
  }
)

const authStoreSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<AuthResponse>) {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      state.isAuthenticated = true
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    setLogout(state) {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }
})

export const { setLogin, setLogout } = authStoreSlice.actions
export default authStoreSlice.reducer
