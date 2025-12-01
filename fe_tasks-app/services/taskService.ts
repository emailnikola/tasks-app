import { FetchTasksPayload } from '../types/apiTypes'
import { CreateTaskPayload, Task, TaskQuery, UpdateTaskPayload } from '../types/tasksTypes'
import apiClient from './apiClient'

export const fetchTasksService = async (queryBody: TaskQuery): Promise<FetchTasksPayload> => {
  const response = await apiClient.post('/tasks/query', queryBody)
  return response.data as FetchTasksPayload
}

export const createTaskService = async (data: CreateTaskPayload): Promise<Task> => {
  const response = await apiClient.post('/tasks/create', data)
  return response.data as Task
}

export const updateTaskService = async (data: UpdateTaskPayload): Promise<Task> => {
  const { id, ...updateData } = data
  const response = await apiClient.patch(`/tasks/${id}`, updateData)
  return response.data as Task
}

export const deleteTaskService = async (taskId: string): Promise<void> => {
  const response = await apiClient.delete(`/tasks/${taskId}`)
  if (response.status !== 204 && response.status !== 200) {
    throw new Error('Failed to delete task')
  }
}
