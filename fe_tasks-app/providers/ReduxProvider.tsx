'use client'
import React, { JSX, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store'

export function ReduxProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const storeRef = useRef<AppStore>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
