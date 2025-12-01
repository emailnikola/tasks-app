import { Button, Checkbox, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import Link from 'next/link'
import { JSX, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../services/authService'
import { useRouter } from 'next/router'
import PublicRouteWrapper from '../components/navigationGuards/PublicRouteWrapper'

function LoginPage(): JSX.Element {
  const dispatch = useDispatch()
  const router = useRouter()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: 'alice@example.com',
      password: 'password123',
      termsOfService: false
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null)
    }
  })

  const [loading, setLoading] = useState(false)
  const handleSubmitLoginForm = async (values: typeof form.values): Promise<void> => {
    const { email, password } = values
    setLoading(true)
    try {
      const success = await loginUser({ email, password }, dispatch)
      if (success) {
        await router.push('/tasks')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Stack align="center" justify="center" gap="md">
      <p>Login</p>
      <form onSubmit={form.onSubmit(handleSubmitLoginForm)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          className="mt-2"
          label="Password"
          placeholder="Enter your password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          key={form.key('termsOfService')}
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </Group>
      </form>
      <Text size="sm" mt="md">
        Don&apos;t have an account yet?
        <Link className="ml-1" href="/register" passHref>
          <Text span variant="link" c="blue" style={{ cursor: 'pointer' }}>
            Register here
          </Text>
        </Link>
      </Text>
    </Stack>
  )
}

export default function WrappedLoginPage(): JSX.Element {
  return (
    <PublicRouteWrapper>
      <LoginPage />
    </PublicRouteWrapper>
  )
}
