export interface Task {
  id: string
  title: string
  description: string
  status: string
  userId: string
  createdAt: string
}

export interface TasksState {
  tasks: Task[]
  totalCount: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  shouldRefetch: boolean
}

export interface TaskQuery {
  skip: number
  take: number
  orderBy: Record<string, 'asc' | 'desc'>
  where?: Record<string, unknown>
}

export interface CreateTaskPayload {
  title?: string
  description?: string
  status: string
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  id: string
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type FilterValue = TaskStatus | 'ALL'
