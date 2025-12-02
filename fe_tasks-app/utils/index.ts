import { TaskStatus } from '../types/tasksTypes'

export const getNextStatus = (currentStatus: string): TaskStatus | null => {
  if (currentStatus === 'TODO') {
    return 'IN_PROGRESS'
  }
  if (currentStatus === 'IN_PROGRESS') {
    return 'DONE'
  }
  return null
}
