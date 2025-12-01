import { useState, useEffect, JSX } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Avatar, Button, Menu } from '@mantine/core'
import {
  IconLogin,
  IconLogout,
  IconMessageCircle,
  IconPhoto,
  IconSettings
} from '@tabler/icons-react'
import Link from 'next/link'
import { setLogout } from '../store/authSlice'

export default function Header(): JSX.Element {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = (): void => {
    dispatch(setLogout())
  }

  const renderAuthContent = (): JSX.Element => {
    if (!mounted) {
      return <div className="text-sm text-gray-400">Loading...</div>
    }
    if (isAuthenticated) {
      return (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar className="cursor-pointer" color="cyan" radius="xl">
              {user ? user.firstName[0].toUpperCase() : ''}
              {user ? user.lastName[0].toUpperCase() : ''}
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
            <Menu.Item leftSection={<IconMessageCircle size={14} />}>Messages</Menu.Item>
            <Menu.Item leftSection={<IconPhoto size={14} />}>Gallery</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )
    }
    return (
      <Button rightSection={<IconLogin size={20} />} component={Link} href="/login">
        Login
      </Button>
    )
  }

  return (
    <div className="flex justify-between items-center h-full px-4">
      <Link href="/" passHref>
        <div className="text-lg font-bold cursor-pointer">LOGO</div>
      </Link>
      {renderAuthContent()}
    </div>
  )
}
