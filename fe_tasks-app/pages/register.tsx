import Link from 'next/link'
import { JSX, useState } from 'react'
import { Button, PasswordInput, Stack, TextInput, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { registerUser } from '../store/authSlice'
import PublicRouteWrapper from '../components/navigationGuards/PublicRouteWrapper'
import { AppDispatch } from '../store'

function RegisterPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstName: 'FirstName1',
      lastName: 'LastName1',
      email: 'theemail1@gmail.com',
      password: 'password123'
    },
    validate: {
      firstName: (value) => (value.length < 2 ? 'First name must be at least 2 characters' : null),
      lastName: (value) => (value.length < 2 ? 'Last name must be at least 2 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null)
    }
  })

  const handleSubmitRegistration = async (values: typeof form.values): Promise<void> => {
    setLoading(true)
    try {
      await dispatch(registerUser(values)).unwrap()
      await router.push('/tasks')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Group mt={50} justify="center">
      <Stack align="center" justify="center" gap="md">
        <Text size="xl" fw={700}>
          Create Your Account
        </Text>
        <form onSubmit={form.onSubmit(handleSubmitRegistration)} style={{ width: 350 }}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                withAsterisk
                label="First Name"
                placeholder="John"
                key={form.key('firstName')}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                withAsterisk
                label="Last Name"
                placeholder="Doe"
                key={form.key('lastName')}
                {...form.getInputProps('lastName')}
              />
            </Group>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Choose a strong password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
          </Stack>
          <Group justify="space-between" mt="xl">
            <Text size="sm">
              <Link href="/login" passHref>
                <Text span c="dimmed" style={{ cursor: 'pointer' }}>
                  Already have an account?
                </Text>
              </Link>
            </Text>
            <Button type="submit" loading={loading}>
              Register
            </Button>
          </Group>
        </form>
      </Stack>
    </Group>
  )
}

export default function WrappedLoginPage(): JSX.Element {
  return (
    <PublicRouteWrapper>
      <RegisterPage />
    </PublicRouteWrapper>
  )
}
