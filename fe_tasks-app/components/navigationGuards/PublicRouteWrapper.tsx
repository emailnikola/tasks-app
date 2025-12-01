import { JSX, useEffect, useState } from 'react' // ⭐️ Import useState
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Loader, Center } from '@mantine/core'
import { RootState } from '../../store'

interface PublicRouteWrapperProps {
  children: React.ReactNode
}

export default function PublicRouteWrapper({ children }: PublicRouteWrapperProps): JSX.Element {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      void router.replace('/')
    }
  }, [isMounted, isAuthenticated, router])
  if (isMounted && isAuthenticated) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    )
  }
  return <>{children}</>
}
