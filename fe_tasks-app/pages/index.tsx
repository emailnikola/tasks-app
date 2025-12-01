import { JSX } from 'react'
import { Button, Stack } from '@mantine/core'
import { IconLogin2 } from '@tabler/icons-react'
import Link from 'next/link'

export default function TasksPage(): JSX.Element {
  return (
    <Stack h={300} align="center" justify="center" gap="md">
      <h1 className="text-3xl font-bold">The Tasks App</h1>
      <Button size="xl" rightSection={<IconLogin2 size={24} />} component={Link} href="/tasks">
        Go to Tasks
      </Button>
    </Stack>
  )
}
