import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import tasksReducer from './tasksSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      tasks: tasksReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['auth.user', 'auth.token']
        }
      })
  })
}

export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
