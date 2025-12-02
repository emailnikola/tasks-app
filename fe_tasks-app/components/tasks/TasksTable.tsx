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
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { JSX, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SortIcon from './SortIcon'
import { fetchTasks, updateTask } from '../../store/tasksSlice'
import { RootState, AppDispatch } from '../../store'
import { FilterValue, Task, TaskQuery } from '../../types/tasksTypes'
import { TasksTableProps } from '../../types/misc'
import { getNextStatus } from '../../utils'

export default function TasksTable({
  onAddTask,
  onEditTask,
  onDeleteTask
}: TasksTableProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const { tasks, fetchStatus, totalCount, shouldRefetch, updateLoadingId } = useSelector(
    (state: RootState) => state.tasks
  )
  const [isClient, setIsClient] = useState(false)

  const pageSize = 10
  const [activePage, setActivePage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<FilterValue>('ALL')
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState<keyof Task | null>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    setIsClient(true)
  }, [])

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
      if (sortDirection === 'desc') {
        setSortBy('createdAt')
        setSortDirection('desc')
      } else {
        setSortDirection('desc')
      }
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

  const taskRows = useMemo(() => {
    const handleStatusClick = async (taskId: string, currentStatus: string): Promise<void> => {
      const nextStatus = getNextStatus(currentStatus)
      if (nextStatus) {
        await dispatch(updateTask({ id: taskId, status: nextStatus }))
      }
    }
    return tasks.map((task: Task) => {
      const isUpdating = updateLoadingId === task.id
      return (
        <Table.Tr key={task.id}>
          <Table.Td>{task.title}</Table.Td>
          <Table.Td>
            <Button
              variant={task.status === 'TODO' ? 'outline' : 'filled'}
              color={task.status === 'TODO' ? 'red' : task.status === 'DONE' ? 'green' : 'orange'}
              onClick={() => void handleStatusClick(task.id, task.status)}
              loading={isUpdating}
              size="xs"
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
      )
    })
  }, [tasks, onEditTask, onDeleteTask, dispatch, updateLoadingId])

  if (!isClient) {
    return (
      <Stack className="min-h-100" align="center" justify="center" gap="md">
        <Loader size="xl" type="bars" />
      </Stack>
    )
  }

  return (
    <Stack className="min-h-100" align="center" justify="center" gap="md">
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
      <Table className="min-h-130">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="min-w-45">
              <UnstyledButton onClick={() => handleSort('title' as keyof Task)}>
                <Group gap="xs">
                  <Text fw={500}>Task</Text>
                  <SortIcon sorted={sortBy === 'title'} reversed={sortDirection === 'desc'} />
                </Group>
              </UnstyledButton>
            </Table.Th>
            <Table.Th>
              <UnstyledButton onClick={() => handleSort('status' as keyof Task)}>
                <Group gap="xs">
                  <Text fw={500}>Status</Text>
                  <SortIcon sorted={sortBy === 'status'} reversed={sortDirection === 'desc'} />
                </Group>
              </UnstyledButton>
            </Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {fetchStatus === 'loading' && isAuthenticated ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                <Group className="min-h-100 m-auto" align="center" justify="center" gap="md">
                  <Loader size="xl" type="dots" />
                </Group>
              </Table.Td>
            </Table.Tr>
          ) : fetchStatus === 'succeeded' && tasks.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} style={{ textAlign: 'center' }}>
                {statusFilter === 'ALL' && searchFilter.trim() === ''
                  ? 'No tasks created yet. Click "Add Task" to get started!'
                  : 'No tasks found matching current filters.'}
              </Table.Td>
            </Table.Tr>
          ) : (
            fetchStatus === 'succeeded' && tasks.length > 0 && taskRows
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
