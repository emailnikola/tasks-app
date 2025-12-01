import Link from 'next/link'
import {
  Button,
  Stack,
  Text,
  Loader,
  Table,
  Pagination,
  ActionIcon,
  Group,
  Select,
  Input,
  CloseButton,
  UnstyledButton
} from '@mantine/core'
import {
  IconLogin2,
  IconEdit,
  IconTrash,
  IconSelector,
  IconChevronUp,
  IconChevronDown
} from '@tabler/icons-react'
import { JSX, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, updateTask } from '../../store/tasksSlice'
import { RootState, AppDispatch } from '../../store'
import { FilterValue, Task, TaskQuery, TaskStatus } from '../../types/tasksTypes'
import { TasksTableProps } from '../../types/misc'

const SortIcon = ({ sorted, reversed }: { sorted: boolean; reversed: boolean }): JSX.Element => {
  if (!sorted) {
    return <IconSelector size={14} style={{ opacity: 0.5 }} />
  }
  return reversed ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
}

export default function TasksTable({
  onAddTask,
  onEditTask,
  onDeleteTask
}: TasksTableProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const { tasks, status, error, totalCount, shouldRefetch } = useSelector(
    (state: RootState) => state.tasks
  )
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const pageSize = 10
  const [activePage, setActivePage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<FilterValue>('ALL')
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState<keyof Task | null>('title')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const setPage = (selectedPage: number): void => {
    setActivePage(selectedPage)
  }

  const handleStatusFilterChange = (value: string | null): void => {
    setActivePage(1)
    setStatusFilter((value as FilterValue) ?? 'ALL')
  }

  const handleSearchFilterChange = (value: string): void => {
    setActivePage(1)
    setSearchFilter(value)
  }

  const handleClearSearch = (): void => {
    setActivePage(1)
    setSearchFilter('')
  }

  const handleSort = (key: keyof Task): void => {
    if (key === 'id' || key === 'description') {
      return
    }
    setActivePage(1)
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortDirection('asc')
    }
  }

  const QUERY_BODY: TaskQuery = useMemo(() => {
    const where: Record<string, unknown> = {}
    if (statusFilter !== 'ALL') {
      where.status = statusFilter
    }
    if (searchFilter.trim() !== '') {
      where.OR = [
        { title: { contains: searchFilter, mode: 'insensitive' } },
        { description: { contains: searchFilter, mode: 'insensitive' } }
      ]
    }

    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (sortBy && sortBy !== 'id' && sortBy !== 'description') {
      orderBy[sortBy] = sortDirection
    } else {
      orderBy.createdAt = 'desc'
    }

    return {
      skip: pageSize * (activePage - 1),
      take: pageSize,
      orderBy,
      where
    }
  }, [activePage, statusFilter, searchFilter, sortBy, sortDirection])

  useEffect(() => {
    if (isClient && isAuthenticated) {
      void dispatch(fetchTasks(QUERY_BODY))
    }
  }, [isClient, isAuthenticated, dispatch, QUERY_BODY, shouldRefetch])

  const getNextStatus = (currentStatus: string): TaskStatus | null => {
    if (currentStatus === 'TODO') {
      return 'IN_PROGRESS'
    }
    if (currentStatus === 'IN_PROGRESS') {
      return 'DONE'
    }
    return null
  }

  const taskRows = useMemo(() => {
    const handleStatusClick = async (taskId: string, currentStatus: string): Promise<void> => {
      const nextStatus = getNextStatus(currentStatus)
      if (nextStatus) {
        await dispatch(updateTask({ id: taskId, status: nextStatus }))
      }
    }
    return tasks.map((task: Task) => (
      <Table.Tr key={task.id}>
        <Table.Td>{task.title}</Table.Td>
        <Table.Td>
          <Button
            variant={task.status === 'TODO' ? 'outline' : 'filled'}
            color={task.status === 'TODO' ? 'red' : task.status === 'DONE' ? 'green' : 'orange'}
            onClick={() => void handleStatusClick(task.id, task.status)}
          >
            {task.status === 'IN_PROGRESS' ? 'DOING' : task.status}
          </Button>
        </Table.Td>
        <Table.Td>
          <ActionIcon variant="transparent" aria-label="Edit" onClick={() => onEditTask(task.id)}>
            <IconEdit size={20} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            color="red"
            aria-label="Delete"
            onClick={() => onDeleteTask(task.id)}
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ))
  }, [tasks, onEditTask, onDeleteTask, dispatch])

  const renderStatusContent = (): JSX.Element | null => {
    if (!isAuthenticated) {
      // ... (authentication content)
      return (
        <>
          <Text size="lg" c="red">
            Please authenticate to view your tasks.
          </Text>
          <Button size="xl" rightSection={<IconLogin2 size={24} />} component={Link} href="/login">
            Login
          </Button>
        </>
      )
    }
    if (status === 'loading') {
      return <Loader size="xl" />
    }
    if (status === 'failed') {
      return (
        <Text size="lg" c="red">
          Error fetching tasks: {error}
        </Text>
      )
    }
    if (status === 'succeeded' && tasks.length === 0) {
      return <Text size="lg">You have no tasks yet.</Text>
    }
    return null
  }

  const content = renderStatusContent()

  if (!isClient) {
    // ... (client-side loading state)
    return (
      <Stack align="center" justify="center" gap="md">
        <Loader size="xl" />
      </Stack>
    )
  }

  if (content && !isAuthenticated) {
    // ... (unauthenticated content)
    return (
      <Stack align="center" justify="center" gap="md">
        {content}
      </Stack>
    )
  }

  return (
    <Stack align="center" justify="center" gap="md">
      <Group className="w-full">
        <Select
          placeholder="All Tasks"
          data={[
            { value: 'ALL', label: 'All Tasks' },
            { value: 'TODO', label: 'Todo' },
            { value: 'IN_PROGRESS', label: 'Doing' },
            { value: 'DONE', label: 'Done' }
          ]}
          value={statusFilter}
          onChange={handleStatusFilterChange}
          allowDeselect={false}
          w={110}
        />
        <Input
          placeholder="Search by Title or Description"
          value={searchFilter}
          onChange={(event) => handleSearchFilterChange(event.currentTarget.value)}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={handleClearSearch}
              style={{ display: searchFilter ? undefined : 'none' }}
            />
          }
        />
        <Button onClick={onAddTask}>Add Task</Button>
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {/* ⭐️ Task Header (Sortable) */}
            <Table.Th>
              <UnstyledButton onClick={() => handleSort('title' as keyof Task)}>
                <Group gap="xs">
                  <Text fw={500}>Task</Text>
                  <SortIcon sorted={sortBy === 'title'} reversed={sortDirection === 'desc'} />
                </Group>
              </UnstyledButton>
            </Table.Th>

            {/* ⭐️ Status Header (Sortable) */}
            <Table.Th>
              <UnstyledButton onClick={() => handleSort('status' as keyof Task)}>
                <Group gap="xs">
                  <Text fw={500}>Status</Text>
                  <SortIcon sorted={sortBy === 'status'} reversed={sortDirection === 'desc'} />
                </Group>
              </UnstyledButton>
            </Table.Th>

            {/* Actions Header (Not Sortable) */}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {status === 'succeeded' && tasks.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                {statusFilter === 'ALL' && searchFilter.trim() === ''
                  ? 'No tasks created yet. Click "Add Task" to get started!'
                  : 'No tasks found matching current filters.'}
              </Table.Td>
            </Table.Tr>
          ) : (
            status === 'succeeded' && tasks.length > 0 && taskRows
          )}
        </Table.Tbody>
      </Table>
      <Pagination
        total={Math.ceil(totalCount / pageSize)}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
    </Stack>
  )
}
